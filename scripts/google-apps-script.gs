/* ============================================================
   Next Door Nutritionist – Google Apps Script
   Handles leads from the website form with proper routing

   Four payload shapes arrive at this one webhook:
     /api/feedback        -> { name, email, phone, suggestions, source }
     /api/submit-lead     -> { name, phone, location, healthGoal, source }
     /api/fertility-leads -> { stage:'stage1', form, name, phone, concern, source }
     /api/fertility-leads -> { stage:'stage2', form, name, phone, concern,
                               location, date, time, source }
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
//  SHEET CREATORS  (with proper spreadsheet reference)
// ─────────────────────────────────────────────────────────────────────────────

function createLeadsSheet(ss) {
  try {
    if (!ss) ss = getSpreadsheet();

    var existingSheet = ss.getSheetByName('Leads');
    if (existingSheet) {
      Logger.log('Leads sheet already exists');
      return existingSheet;
    }

    var s = ss.insertSheet('Leads');
    s.appendRow(['Timestamp', 'Name', 'Phone', 'Location', 'Health Goal', 'Source']);
    _styleHeader(s, 6, '#0B4A35');
    [170, 160, 130, 160, 200, 250].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, 6).createFilter();
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
    s.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Suggestions', 'Source']);
    _styleHeader(s, 6, '#0B4A35');
    [170, 160, 190, 130, 280, 220].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, 6).createFilter();
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
    s.appendRow(['Timestamp', 'Name', 'Phone', 'Concern', 'Source']);
    _styleHeader(s, 5, '#0B4A35');
    [170, 170, 130, 220, 280].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, 5).createFilter();
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
    s.appendRow(['Timestamp', 'Name', 'Phone', 'Concern', 'Location',
                 'Preferred Date', 'Preferred Time', 'Source']);
    _styleHeader(s, 8, '#0B4A35');
    [170, 160, 130, 200, 160, 130, 170, 240].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);
    s.getRange(1, 1, 1, 8).createFilter();
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
      sheet.appendRow([ts, data.name || '', data.phone || '',
                       data.concern || 'Not specified', data.location || '',
                       data.date || '', data.time || '', source]);
      styleRow(sheet, nextRow, 8);
      sheet.getRange(nextRow, 3).setHorizontalAlignment('center');
      sheet.getRange(nextRow, 6).setHorizontalAlignment('center');
      Logger.log('Consultation saved to row: ' + nextRow);
      return _json({ success: true, tab: 'Fertility Consultations', row: nextRow });
    }

    // ── 2. Fertility Stage 1 — landing page lead ─────────────
    if (data.stage === 'stage1') {
      sheet = ss.getSheetByName('Fertility Leads') || createFertilityLeadsSheet(ss);
      nextRow = sheet.getLastRow() + 1;
      sheet.appendRow([ts, data.name || '', data.phone || '',
                       data.concern || 'Not specified', source]);
      styleRow(sheet, nextRow, 5);
      sheet.getRange(nextRow, 3).setHorizontalAlignment('center');
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
      styleRow(sheet, nextRow, 6);
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

    styleRow(sheet, nextRow, 6);
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
    phone: '9876543210',
    concern: 'Not specified',
    pageUrl: 'https://example.com/fertility'
  });
}

function testFertilityStage2() {
  _mockPost({
    stage: 'stage2',
    form: 'fertility online consultation lp leads',
    name: 'Stage Two Test',
    phone: '9876543210',
    concern: 'PCOS / Hormonal Imbalance',
    location: 'Hyderabad',
    date: '2026-07-15',
    time: '10:00 AM – 10:30 AM',
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
  testFertilityStage2();
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

    s.getRange(1, 1, 1, 6)
     .setValues([['Timestamp', 'Name', 'Phone', 'Location', 'Health Goal', 'Source']]);

    _styleHeader(s, 6, '#0B4A35');
    [170, 160, 130, 160, 200, 250].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, 6).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, 6);
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

    _styleHeader(s, 6, '#0B4A35');
    [170, 160, 190, 130, 280, 220].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, 6).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, 6);
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

    s.getRange(1, 1, 1, 5)
     .setValues([['Timestamp', 'Name', 'Phone', 'Concern', 'Source']]);

    _styleHeader(s, 5, '#0B4A35');
    [170, 170, 130, 220, 280].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, 5).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, 5);
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

    s.getRange(1, 1, 1, 8)
     .setValues([['Timestamp', 'Name', 'Phone', 'Concern', 'Location',
                  'Preferred Date', 'Preferred Time', 'Source']]);

    _styleHeader(s, 8, '#0B4A35');
    [170, 160, 130, 200, 160, 130, 170, 240].forEach(function(w, i) {
      try { s.setColumnWidth(i + 1, w); } catch(e) {}
    });
    s.setRowHeight(1, 42);
    s.setFrozenRows(1);

    var filter = s.getFilter();
    if (filter) filter.remove();
    s.getRange(1, 1, 1, 8).createFilter();

    var last = s.getLastRow();
    for (var i = 2; i <= last; i++) {
      styleRow(s, i, 8);
      s.getRange(i, 3).setHorizontalAlignment('center');
      s.getRange(i, 6).setHorizontalAlignment('center');
    }
    Logger.log('Fertility Consultations reformatted. Rows: ' + last);
  } catch (e) {
    Logger.log('Error reformatting Fertility Consultations sheet: ' + e.message);
  }
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
