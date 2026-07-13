/* ============================================================
   Next Door Nutritionist – Google Apps Script
   Handles leads from the website form with proper routing

   Four payload shapes arrive at this one webhook:
     /api/feedback        -> { name, email, phone, suggestions, source }
     /api/submit-lead     -> { name, phone, location, healthGoal, source }
     /api/fertility-leads -> { stage:'stage1', form, name, phone (WhatsApp,
                               full intl e.g. +9198...), country, concern, source }
     /api/fertility-leads -> { stage:'stage2', form, name, phone (WhatsApp),
                               country, concern, location, date, time (visitor
                               local), timeIST (clinic IST), timezone, source }

   NOTE: The fertility forms now collect an international WhatsApp number with a
   country selector, and the consultation "time" is shown in the visitor's local
   timezone. We therefore also store Country, the clinic-side IST time, and the
   visitor timezone.

   ⚠️ If the "Fertility Leads" / "Fertility Consultations" tabs already exist
   from the old layout, run reformatFertilityLeadsSheet() and
   reformatFertilityConsultationsSheet() (or setupSheets()) once after pasting
   this code so the new column headers are applied.
   ============================================================ */

// ── Get or create spreadsheet reference ──────────────────────────────────────
function getSpreadsheet() {
  try {
    // Try to get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch (e) {
    Logger.log('No active spreadsheet found, creating/opening by ID...');
  }

  // If no active spreadsheet, try to get by ID
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (spreadsheetId) {
    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (e) {
      Logger.log('Could not open spreadsheet by ID: ' + e.message);
    }
  }

  // Fallback: create a new spreadsheet
  Logger.log('Creating a new spreadsheet...');
  var ss = SpreadsheetApp.create('Next Door Nutritionist - Leads');
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId());
  Logger.log('New spreadsheet created with ID: ' + ss.getId());
  return ss;
}

// ── Authorize function ──────────────────────────────────────────────────────
function authorize() {
  var ss = getSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
  Logger.log('Spreadsheet ID: ' + ss.getId());
  return ss;
}

// ── Web App entry points ──────────────────────────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Next Door Nutritionist API is live',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function _styleHeader(sheet, colCount, bgColor) {
  if (!sheet) return;
  try {
    sheet.getRange(1, 1, 1, colCount)
         .setBackground(bgColor || '#0B4A35')
         .setFontColor('#ffffff')
         .setFontWeight('bold')
         .setFontSize(11)
         .setHorizontalAlignment('center')
         .setVerticalAlignment('middle');
  } catch (e) {
    Logger.log('Error styling header: ' + e.message);
  }
}

function styleRow(sheet, rowIndex, colCount) {
  if (!sheet) return;
  try {
    var row = sheet.getRange(rowIndex, 1, 1, colCount);
    row.setBackground(rowIndex % 2 === 0 ? '#f8faf8' : '#ffffff')
       .setFontColor('#1a1c1b')
       .setFontSize(10)
       .setVerticalAlignment('middle')
       .setHorizontalAlignment('left');
    sheet.setRowHeight(rowIndex, 36);
    row.setBorder(false, false, true, false, false, false,
                  '#e8e0e4', SpreadsheetApp.BorderStyle.SOLID);
  } catch (e) {
    Logger.log('Error styling row ' + rowIndex + ': ' + e.message);
  }
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────────────────────────────────────
//  COLUMN DEFINITIONS  (single source of truth per tab)
// ─────────────────────────────────────────────────────────────────────────────

var LEADS_HEADERS = ['Timestamp', 'Name', 'Phone', 'Location', 'Health Goal', 'Source'];
var LEADS_WIDTHS  = [170, 160, 130, 160, 200, 250];

var FEEDBACK_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Suggestions', 'Source'];
var FEEDBACK_WIDTHS  = [170, 160, 190, 130, 280, 220];

var FERTILITY_LEADS_HEADERS = ['Timestamp', 'Name', 'WhatsApp Number', 'Country', 'Concern', 'Source'];
var FERTILITY_LEADS_WIDTHS  = [170, 150, 160, 120, 210, 250];

var FERTILITY_CONSULT_HEADERS = ['Timestamp', 'Name', 'WhatsApp Number', 'Country', 'Concern',
                                 'Location', 'Preferred Date', 'Preferred Time (Local)',
                                 'Clinic Time (IST)', 'Timezone', 'Source'];
var FERTILITY_CONSULT_WIDTHS  = [170, 150, 160, 120, 190, 140, 130, 200, 170, 160, 230];

// ─────────────────────────────────────────────────────────────────────────────
//  SHEET CREATORS  (with proper spreadsheet reference)
// ─────────────────────────────────────────────────────────────────────────────

function _applyWidths(sheet, widths) {
  widths.forEach(function (w, i) {
    try { sheet.setColumnWidth(i + 1, w); } catch (e) {}
  });
}

// Write the header row WITHOUT clobbering data. If row 1 isn't already the
// header (e.g. the sheet was created without one), insert a fresh row on top
// so no existing data is lost.
function _ensureHeaderRow(sheet, headers) {
  var a1 = String(sheet.getRange(1, 1).getValue()).trim().toLowerCase();
  if (a1 !== String(headers[0]).toLowerCase()) {
    if (sheet.getLastRow() >= 1) sheet.insertRowBefore(1);
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

function createLeadsSheet(ss) {
  try {
    if (!ss) ss = getSpreadsheet();

    var existingSheet = ss.getSheetByName('Leads');
    if (existingSheet) {
      Logger.log('Leads sheet already exists');
      return existingSheet;
    }

    var s = ss.insertSheet('Leads');
    s.appendRow(LEADS_HEADERS);
    _styleHeader(s, LEADS_HEADERS.length, '#0B4A35');
    _applyWidths(s, LEADS_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, LEADS_HEADERS.length).createFilter();
    Logger.log('Created Leads sheet');
    return s;
  } catch (e) {
    Logger.log('Error creating Leads sheet: ' + e.message);
    throw e;
  }
}

function createFeedbackSheet(ss) {
  try {
    if (!ss) ss = getSpreadsheet();

    var existingSheet = ss.getSheetByName('Feedback');
    if (existingSheet) {
      Logger.log('Feedback sheet already exists');
      return existingSheet;
    }

    var s = ss.insertSheet('Feedback');
    s.appendRow(FEEDBACK_HEADERS);
    _styleHeader(s, FEEDBACK_HEADERS.length, '#0B4A35');
    _applyWidths(s, FEEDBACK_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, FEEDBACK_HEADERS.length).createFilter();
    Logger.log('Created Feedback sheet');
    return s;
  } catch (e) {
    Logger.log('Error creating Feedback sheet: ' + e.message);
    throw e;
  }
}

function createFertilityLeadsSheet(ss) {
  try {
    if (!ss) ss = getSpreadsheet();

    var existingSheet = ss.getSheetByName('Fertility Leads');
    if (existingSheet) {
      Logger.log('Fertility Leads sheet already exists');
      return existingSheet;
    }

    var s = ss.insertSheet('Fertility Leads');
    s.appendRow(FERTILITY_LEADS_HEADERS);
    _styleHeader(s, FERTILITY_LEADS_HEADERS.length, '#0B4A35');
    _applyWidths(s, FERTILITY_LEADS_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, FERTILITY_LEADS_HEADERS.length).createFilter();
    Logger.log('Created Fertility Leads sheet');
    return s;
  } catch (e) {
    Logger.log('Error creating Fertility Leads sheet: ' + e.message);
    throw e;
  }
}

function createFertilityConsultationsSheet(ss) {
  try {
    if (!ss) ss = getSpreadsheet();

    var existingSheet = ss.getSheetByName('Fertility Consultations');
    if (existingSheet) {
      Logger.log('Fertility Consultations sheet already exists');
      return existingSheet;
    }

    var s = ss.insertSheet('Fertility Consultations');
    s.appendRow(FERTILITY_CONSULT_HEADERS);
    _styleHeader(s, FERTILITY_CONSULT_HEADERS.length, '#0B4A35');
    _applyWidths(s, FERTILITY_CONSULT_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, FERTILITY_CONSULT_HEADERS.length).createFilter();
    Logger.log('Created Fertility Consultations sheet');
    return s;
  } catch (e) {
    Logger.log('Error creating Fertility Consultations sheet: ' + e.message);
    throw e;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  doPost  — runs on every form submission
//  Appends ONE new row only. All existing rows untouched.
// ─────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    if (!e || !e.postData) {
      return _json({ error: 'No data received' });
    }

    var data = JSON.parse(e.postData.contents);
    var ss = getSpreadsheet();
    var ts = data.timestamp ||
             new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var source = data.pageUrl || data.source || data.form ||
                 'Next Door Nutritionist – Website Form';

    var sheet, nextRow;

    Logger.log('Processing lead: ' + JSON.stringify(data));

    // ── 1. Fertility Stage 2 — online consultation booking ───
    //    Checked before everything else: these payloads also carry
    //    name/phone/location, which the generic Leads path would swallow.
    if (data.stage === 'stage2') {
      sheet = ss.getSheetByName('Fertility Consultations') || createFertilityConsultationsSheet(ss);
      nextRow = sheet.getLastRow() + 1;
      sheet.appendRow([
        ts,
        data.name || '',
        data.phone || '',                 // full international WhatsApp number
        data.country || 'India',
        data.concern || 'Not specified',
        data.location || '',
        data.date || '',
        data.time || '',                  // visitor's local time slot
        data.timeIST || '',               // clinic-side time (IST)
        data.timezone || '',              // visitor IANA timezone
        source
      ]);
      styleRow(sheet, nextRow, FERTILITY_CONSULT_HEADERS.length);
      sheet.getRange(nextRow, 3).setHorizontalAlignment('center');  // WhatsApp
      sheet.getRange(nextRow, 7).setHorizontalAlignment('center');  // Preferred Date
      sheet.getRange(nextRow, 9).setHorizontalAlignment('center');  // Clinic Time (IST)
      Logger.log('Consultation saved to row: ' + nextRow);
      return _json({ success: true, tab: 'Fertility Consultations', row: nextRow });
    }

    // ── 2. Fertility Stage 1 — landing page lead ─────────────
    if (data.stage === 'stage1') {
      sheet = ss.getSheetByName('Fertility Leads') || createFertilityLeadsSheet(ss);
      nextRow = sheet.getLastRow() + 1;
      sheet.appendRow([
        ts,
        data.name || '',
        data.phone || '',                 // full international WhatsApp number
        data.country || 'India',
        data.concern || 'Not specified',
        source
      ]);
      styleRow(sheet, nextRow, FERTILITY_LEADS_HEADERS.length);
      sheet.getRange(nextRow, 3).setHorizontalAlignment('center');  // WhatsApp
      Logger.log('Fertility lead saved to row: ' + nextRow);
      return _json({ success: true, tab: 'Fertility Leads', row: nextRow });
    }

    // ── 3. Feedback tab ──────────────────────────────────────
    //    `suggestions` is the field only the feedback form sends.
    var isFeedback = data.suggestions ||
                     (data.source && data.source.toLowerCase().indexOf('feedback') !== -1);
    if (isFeedback) {
      sheet = ss.getSheetByName('Feedback') || createFeedbackSheet(ss);
      nextRow = sheet.getLastRow() + 1;
      sheet.appendRow([ts, data.name || '', data.email || '', data.phone || '',
                       data.suggestions || '', data.source || '']);
      styleRow(sheet, nextRow, FEEDBACK_HEADERS.length);
      sheet.getRange(nextRow, 4).setHorizontalAlignment('center');
      return _json({ success: true, tab: 'Feedback', row: nextRow });
    }

    // ── 4. Main Leads tab (default for Next Door Nutritionist) ──
    sheet = ss.getSheetByName('Leads') || createLeadsSheet(ss);
    nextRow = sheet.getLastRow() + 1;

    sheet.appendRow([
      ts,
      data.name || '',
      data.phone || '',
      data.location || 'Not specified',
      data.healthGoal || 'Not specified',
      source
    ]);

    styleRow(sheet, nextRow, LEADS_HEADERS.length);
    sheet.getRange(nextRow, 3).setHorizontalAlignment('center');

    Logger.log('Lead saved to row: ' + nextRow);
    return _json({ success: true, tab: 'Leads', row: nextRow });

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return _json({ error: err.toString() });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  TEST FUNCTIONS  — each mirrors the exact payload its route sends
// ─────────────────────────────────────────────────────────────────────────────

function _mockPost(payload) {
  payload.timestamp = payload.timestamp ||
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  var result = doPost({ postData: { contents: JSON.stringify(payload) } });
  Logger.log('Result: ' + result.getContent());
}

function testFertilityStage1() {
  _mockPost({
    stage: 'stage1',
    form: 'fertility lp leads',
    name: 'Stage One Test',
    phone: '+919876543210',
    country: 'India',
    concern: 'Not specified',
    pageUrl: 'https://example.com/fertility'
  });
}

function testFertilityStage1International() {
  _mockPost({
    stage: 'stage1',
    form: 'fertility lp leads',
    name: 'Dubai Lead Test',
    phone: '+971501234567',
    country: 'United Arab Emirates',
    concern: 'Not specified',
    pageUrl: 'https://example.com/fertility'
  });
}

function testFertilityStage2() {
  _mockPost({
    stage: 'stage2',
    form: 'fertility online consultation lp leads',
    name: 'Stage Two Test',
    phone: '+919876543210',
    country: 'India',
    concern: 'PCOS / Hormonal Imbalance',
    location: 'Hyderabad',
    date: '2026-07-15',
    time: '10:00 AM – 10:30 AM',
    timeIST: '10:00 AM – 10:30 AM',
    timezone: 'Asia/Kolkata',
    pageUrl: 'https://example.com/fertility/watch'
  });
}

function testFertilityStage2International() {
  _mockPost({
    stage: 'stage2',
    form: 'fertility online consultation lp leads',
    name: 'Sydney Consult Test',
    phone: '+61412345678',
    country: 'Australia',
    concern: 'Trying to Conceive',
    location: 'Sydney',
    date: '2026-07-23',
    time: '2:30 PM – 3:00 PM GMT+10',
    timeIST: '10:00 AM – 10:30 AM',
    timezone: 'Australia/Sydney',
    pageUrl: 'https://example.com/fertility/watch'
  });
}

function testLeadSubmission() {
  _mockPost({
    name: 'Test User',
    phone: '9876543210',
    location: 'Mumbai, Maharashtra',
    healthGoal: 'Weight Management',
    source: 'Next Door Nutritionist – Test',
    pageUrl: 'Next Door Nutritionist – Test'
  });
}

function testFeedback() {
  _mockPost({
    name: 'Feedback Test',
    email: 'test@example.com',
    phone: '9876543210',
    suggestions: 'Great experience with the clinic.',
    source: 'Next door nutrition – Client Feedback'
  });
}

function testAll() {
  testFertilityStage1();
  testFertilityStage1International();
  testFertilityStage2();
  testFertilityStage2International();
  testLeadSubmission();
  testFeedback();
  listSheets();
}

function testCreateSheets() {
  try {
    var ss = getSpreadsheet();
    createLeadsSheet(ss);
    createFeedbackSheet(ss);
    createFertilityLeadsSheet(ss);
    createFertilityConsultationsSheet(ss);
    Logger.log('Sheets created successfully');
    listSheets();
  } catch (e) {
    Logger.log('Error creating sheets: ' + e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function listSheets() {
  try {
    var ss = getSpreadsheet();
    var sheets = ss.getSheets();
    Logger.log('=== Sheets in ' + ss.getName() + ' ===');
    sheets.forEach(function(sheet) {
      Logger.log('  - ' + sheet.getName() + ' (rows: ' + sheet.getLastRow() + ')');
    });
  } catch (e) {
    Logger.log('Error listing sheets: ' + e.message);
  }
}

function setupSheets() {
  try {
    var ss = getSpreadsheet();
    Logger.log('Setting up sheets in: ' + ss.getName());
    Logger.log('Spreadsheet URL: ' + ss.getUrl());

    createLeadsSheet(ss);
    createFeedbackSheet(ss);
    createFertilityLeadsSheet(ss);
    createFertilityConsultationsSheet(ss);

    // Make sure existing tabs pick up any new columns / headers.
    reformatFertilityLeadsSheet();
    reformatFertilityConsultationsSheet();

    listSheets();
    Logger.log('setupSheets complete.');
    Logger.log('Spreadsheet ID: ' + ss.getId());
  } catch (e) {
    Logger.log('setupSheets failed: ' + e.message);
  }
}

function reformatLeadsSheet() {
  try {
    var ss = getSpreadsheet();
    var s = ss.getSheetByName('Leads');
    if (!s) {
      Logger.log('Leads sheet not found. Creating...');
      s = createLeadsSheet(ss);
      if (!s) return;
    }

    _ensureHeaderRow(s, LEADS_HEADERS);
    _styleHeader(s, LEADS_HEADERS.length, '#0B4A35');
    _applyWidths(s, LEADS_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, LEADS_HEADERS.length).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, LEADS_HEADERS.length);
      s.getRange(i, 3).setHorizontalAlignment('center');
    }
    Logger.log('Leads reformatted. Rows: ' + last);
  } catch (e) {
    Logger.log('Error reformatting Leads sheet: ' + e.message);
  }
}

function reformatFeedbackSheet() {
  try {
    var ss = getSpreadsheet();
    var s = ss.getSheetByName('Feedback');
    if (!s) {
      Logger.log('Feedback sheet not found. Creating...');
      s = createFeedbackSheet(ss);
      if (!s) return;
    }

    _ensureHeaderRow(s, FEEDBACK_HEADERS);
    _styleHeader(s, FEEDBACK_HEADERS.length, '#0B4A35');
    _applyWidths(s, FEEDBACK_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, FEEDBACK_HEADERS.length).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, FEEDBACK_HEADERS.length);
      s.getRange(i, 4).setHorizontalAlignment('center');
    }
    Logger.log('Feedback reformatted. Rows: ' + last);
  } catch (e) {
    Logger.log('Error reformatting Feedback sheet: ' + e.message);
  }
}

function reformatFertilityLeadsSheet() {
  try {
    var ss = getSpreadsheet();
    var s = ss.getSheetByName('Fertility Leads');
    if (!s) {
      Logger.log('Fertility Leads sheet not found. Creating...');
      s = createFertilityLeadsSheet(ss);
      if (!s) return;
    }

    _ensureHeaderRow(s, FERTILITY_LEADS_HEADERS);
    _styleHeader(s, FERTILITY_LEADS_HEADERS.length, '#0B4A35');
    _applyWidths(s, FERTILITY_LEADS_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, FERTILITY_LEADS_HEADERS.length).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, FERTILITY_LEADS_HEADERS.length);
      s.getRange(i, 3).setHorizontalAlignment('center');
    }
    Logger.log('Fertility Leads reformatted. Rows: ' + last);
  } catch (e) {
    Logger.log('Error reformatting Fertility Leads sheet: ' + e.message);
  }
}

function reformatFertilityConsultationsSheet() {
  try {
    var ss = getSpreadsheet();
    var s = ss.getSheetByName('Fertility Consultations');
    if (!s) {
      Logger.log('Fertility Consultations sheet not found. Creating...');
      s = createFertilityConsultationsSheet(ss);
      if (!s) return;
    }

    _ensureHeaderRow(s, FERTILITY_CONSULT_HEADERS);
    _styleHeader(s, FERTILITY_CONSULT_HEADERS.length, '#0B4A35');
    _applyWidths(s, FERTILITY_CONSULT_WIDTHS);
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, FERTILITY_CONSULT_HEADERS.length).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, FERTILITY_CONSULT_HEADERS.length);
      s.getRange(i, 3).setHorizontalAlignment('center');  // WhatsApp
      s.getRange(i, 7).setHorizontalAlignment('center');  // Preferred Date
      s.getRange(i, 9).setHorizontalAlignment('center');  // Clinic Time (IST)
    }
    Logger.log('Fertility Consultations reformatted. Rows: ' + last);
  } catch (e) {
    Logger.log('Error reformatting Fertility Consultations sheet: ' + e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  ONE-TIME MIGRATION  — upgrade old fertility rows to the new column layout
//  Old "Fertility Consultations": [Timestamp, Name, Phone, Concern, Location,
//                                  Date, Time, Source]                  (8 cols)
//  New:                            [Timestamp, Name, WhatsApp, Country, Concern,
//                                  Location, Date, Time (Local),
//                                  Clinic Time (IST), Timezone, Source] (11 cols)
//
//  Old "Fertility Leads":          [Timestamp, Name, Phone, Concern, Source] (5)
//  New:                            [Timestamp, Name, WhatsApp, Country,
//                                  Concern, Source]                         (6)
//
//  Safe to run more than once: rows already in the new layout are left as-is.
// ─────────────────────────────────────────────────────────────────────────────

function migrateFertilityConsultations() {
  try {
    var ss = getSpreadsheet();
    var s = ss.getSheetByName('Fertility Consultations');
    if (!s) {
      Logger.log('Fertility Consultations not found — creating fresh.');
      createFertilityConsultationsSheet(ss);
      return;
    }

    var lastRow = s.getLastRow();
    if (lastRow < 1) {
      reformatFertilityConsultationsSheet();
      return;
    }

    var firstCell = String(s.getRange(1, 1).getValue()).trim().toLowerCase();
    var hasHeader = firstCell === 'timestamp';
    var dataStart = hasHeader ? 2 : 1;
    var numData = lastRow - dataStart + 1;

    var out = [];
    if (numData > 0) {
      var width = Math.max(s.getLastColumn(), FERTILITY_CONSULT_HEADERS.length);
      var rows = s.getRange(dataStart, 1, numData, width).getValues();
      out = rows.map(function (r) {
        // A row is already new-format if the Timezone column (index 9) is filled.
        var isNew = r[9] !== '' && r[9] != null;
        if (isNew) return r.slice(0, FERTILITY_CONSULT_HEADERS.length);
        // Old 8-column row -> new 11-column layout.
        var ts = r[0], name = r[1], phone = r[2], concern = r[3],
            location = r[4], date = r[5], time = r[6], source = r[7];
        return [ts, name, phone, 'India', concern, location, date,
                time, time, 'Asia/Kolkata', source];
      });
    }

    s.clearContents();
    s.getRange(1, 1, 1, FERTILITY_CONSULT_HEADERS.length).setValues([FERTILITY_CONSULT_HEADERS]);
    if (out.length) {
      s.getRange(2, 1, out.length, FERTILITY_CONSULT_HEADERS.length).setValues(out);
    }
    reformatFertilityConsultationsSheet();
    Logger.log('Migrated Fertility Consultations. Data rows: ' + out.length);
  } catch (e) {
    Logger.log('Error migrating Fertility Consultations: ' + e.message);
  }
}

function migrateFertilityLeads() {
  try {
    var ss = getSpreadsheet();
    var s = ss.getSheetByName('Fertility Leads');
    if (!s) {
      Logger.log('Fertility Leads not found — creating fresh.');
      createFertilityLeadsSheet(ss);
      return;
    }

    var lastRow = s.getLastRow();
    if (lastRow < 1) {
      reformatFertilityLeadsSheet();
      return;
    }

    var firstCell = String(s.getRange(1, 1).getValue()).trim().toLowerCase();
    var hasHeader = firstCell === 'timestamp';
    var dataStart = hasHeader ? 2 : 1;
    var numData = lastRow - dataStart + 1;

    var out = [];
    if (numData > 0) {
      var width = Math.max(s.getLastColumn(), FERTILITY_LEADS_HEADERS.length);
      var rows = s.getRange(dataStart, 1, numData, width).getValues();
      out = rows.map(function (r) {
        // New-format rows have Source in column 6 (index 5) filled.
        var isNew = r[5] !== '' && r[5] != null;
        if (isNew) return r.slice(0, FERTILITY_LEADS_HEADERS.length);
        // Old 5-column row -> new 6-column layout (insert Country).
        var ts = r[0], name = r[1], phone = r[2], concern = r[3], source = r[4];
        return [ts, name, phone, 'India', concern, source];
      });
    }

    s.clearContents();
    s.getRange(1, 1, 1, FERTILITY_LEADS_HEADERS.length).setValues([FERTILITY_LEADS_HEADERS]);
    if (out.length) {
      s.getRange(2, 1, out.length, FERTILITY_LEADS_HEADERS.length).setValues(out);
    }
    reformatFertilityLeadsSheet();
    Logger.log('Migrated Fertility Leads. Data rows: ' + out.length);
  } catch (e) {
    Logger.log('Error migrating Fertility Leads: ' + e.message);
  }
}

// Run this ONE function to upgrade both fertility tabs at once.
function migrateFertilityTabs() {
  Logger.log('=== Migrating fertility tabs to the new layout ===');
  migrateFertilityLeads();
  migrateFertilityConsultations();
  listSheets();
  Logger.log('=== Migration complete ===');
}

function checkDeployment() {
  try {
    Logger.log('=== Next Door Nutritionist - Apps Script Check ===');
    var ss = getSpreadsheet();
    Logger.log('Spreadsheet: ' + ss.getName());
    Logger.log('Spreadsheet ID: ' + ss.getId());
    Logger.log('Spreadsheet URL: ' + ss.getUrl());

    listSheets();

    var required = ['Leads', 'Feedback', 'Fertility Leads', 'Fertility Consultations'];
    var missing = [];
    required.forEach(function(name) {
      var exists = ss.getSheetByName(name) !== null;
      Logger.log(name + ' sheet exists: ' + exists);
      if (!exists) missing.push(name);
    });

    if (missing.length) {
      Logger.log('WARNING: missing tabs -> ' + missing.join(', '));
      Logger.log('Run setupSheets() to create them.');
    }

    Logger.log('=== Check Complete ===');
    Logger.log('To deploy: Deploy > New Deployment > Web App');
    Logger.log('Set "Execute as" to "Me" and "Who has access" to "Anyone"');
    Logger.log('Copy the Web App URL into .env as GOOGLE_SHEETS_WEBHOOK_URL');

    return {
      success: true,
      spreadsheetName: ss.getName(),
      spreadsheetId: ss.getId(),
      spreadsheetUrl: ss.getUrl(),
      missingTabs: missing
    };
  } catch (e) {
    Logger.log('Check failed: ' + e.message);
    return { success: false, error: e.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  FIX FOR THE "insertSheet" ERROR - Run this first!
// ─────────────────────────────────────────────────────────────────────────────

function fixSpreadsheetBinding() {
  try {
    Logger.log('=== Fixing Spreadsheet Binding ===');

    var ss = getSpreadsheet();

    if (ss) {
      Logger.log('Successfully connected to spreadsheet: ' + ss.getName());
      Logger.log('   ID: ' + ss.getId());
      Logger.log('   URL: ' + ss.getUrl());

      PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId());

      createLeadsSheet(ss);
      createFeedbackSheet(ss);
      createFertilityLeadsSheet(ss);
      createFertilityConsultationsSheet(ss);

      // Apply the latest column layout to any pre-existing fertility tabs.
      reformatFertilityLeadsSheet();
      reformatFertilityConsultationsSheet();

      listSheets();

      Logger.log('=== Fix Complete ===');
      Logger.log('Your script is now properly bound to the spreadsheet.');
    } else {
      Logger.log('Could not connect to or create a spreadsheet.');
      Logger.log('Create a Google Sheet manually, then:');
      Logger.log('1. Extensions > Apps Script');
      Logger.log('2. Paste this code into the editor');
      Logger.log('3. Run fixSpreadsheetBinding() again');
    }
  } catch (e) {
    Logger.log('Error: ' + e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  QUICK SETUP - Run this if everything else fails
// ─────────────────────────────────────────────────────────────────────────────

function quickSetup() {
  Logger.log('=== Quick Setup - Run this first ===');
  fixSpreadsheetBinding();
  Logger.log('=== Quick Setup Complete ===');
  Logger.log('Next steps:');
  Logger.log('1. Click Deploy > New Deployment > Web App');
  Logger.log('2. Set "Execute as" to "Me"');
  Logger.log('3. Set "Who has access" to "Anyone"');
  Logger.log('4. Click Deploy and copy the Web App URL');
  Logger.log('5. Add the URL to your .env as GOOGLE_SHEETS_WEBHOOK_URL');
}
