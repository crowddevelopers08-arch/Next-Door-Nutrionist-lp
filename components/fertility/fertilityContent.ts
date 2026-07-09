export type FertilityWhoItsForItem = {
  title: string;
  description: string;
  image?: string;
};

export const fertilityWhoItsForItems: FertilityWhoItsForItem[] = [
  {
    title: 'Irregular Ovulation',
    description:
      'Irregular periods, PCOS/PMOS, or unpredictable ovulation who need a focused cycle, nutrition, and lifestyle approach.',
    image: '/irregulares.jpg',
  },
  {
    title: 'Low AMH / Egg Health Concerns',
    description:
      'For women with Low AMH or egg health concerns who want targeted nutrition and lifestyle planning before conception.',
    image: '/awh.jpg',
  },
  {
    title: 'Hormonal Imbalance',
    description:
      'Thyroid issues, insulin resistance, cravings, weight gain, fatigue, or cycle-related hormone concerns.',
    image: '/hormone.webp',
  },
  {
    title: 'IVF / IUI Preparation',
    description:
      'Preparing for fertility treatments who want to ensure their body is nutritionally and hormonally ready before starting IVF or IUI.',
    image: '/neui.png',
  },
  {
    title: 'Pregnancy Loss / Repeated Miscarriage Support',
    description:
      "Experienced pregnancy loss and need focused nutrition and lifestyle planning alongside their doctor's guidance.",
    image: '/preg.jpg',
  },
];

export type FertilityProcessStep = {
  title: string;
  description: string;
  image?: string;
};

export const fertilityProcessSteps: FertilityProcessStep[] = [
  {
    title: 'Initial Consultation',
    description:
      'Begin with a consultation call to understand your health concern, fertility journey, reports, lifestyle, food habits, and goals.',
    image: '/initial.jpg',
  },
  {
    title: 'Choose & Enroll',
    description:
      'Select the program duration that suits your concern and complete the enrollment process.',
    image: '/enroll.jpg',
  },
  {
    title: 'Post Assessment Consultation',
    description:
      'Complete your detailed assessment with your dedicated clinical nutritionist, where your symptoms, routine, clinical reports, and body requirements are reviewed.',
    image: '/PostAssessmentConsultation.jpg',
  },
  {
    title: 'Receive Your Personalised Nutrition Plan',
    description:
      'Get your customized nutrition plan within four working days, along with supportive guides to help you follow it better.',
    image: '/ReceiveYourPersonalisedNutritionPlan.jpg',
  },
  {
    title: 'Ongoing Support',
    description:
      'Stay supported with continuous monitoring, meal tracking, follow-ups, and regular counselling sessions.',
    image: '/process-step-5.jpg',
  },
  {
    title: '10-Day Check-In',
    description:
      'On Day 10, we review your progress, symptoms, ovulation, cycle phase, and body response, then realign your plan with phase-specific nutrition for the follicular, ovulation, and luteal phases to support better fertility preparation.',
    image: '/process-step-6.jpg',
  },
  {
    title: 'Proper Monitoring & Plan Updates',
    description:
      'Your progress is monitored regularly through food logs, symptoms, cycle changes, energy levels, and report updates, so your plan can be adjusted as your body responds.',
    image: '/process-step-7.jpg',
  },
];

export const fertilityFaqItems = [
  {
    question: 'Is this only for women trying to conceive?',
    answer:
      'No. We support women across fertility preparation, PMOS/PCOS, Low AMH, Endometriosis, IVF/IUI preparation, natural pregnancy planning, pre-pregnancy health, and post-pregnancy recovery.',
  },
  {
    question: 'Can nutrition help in PMOS/PCOS?',
    answer:
      'Yes. Clinical nutrition and lifestyle correction can support weight balance, cravings, insulin resistance, cycle health, energy levels, and long-term hormone management.',
  },
  {
    question: 'Is this helpful for Low AMH?',
    answer:
      'Low AMH can feel stressful, but your plan should not start with panic. We help you focus on nutrition, lifestyle preparation, and overall reproductive health support.',
  },
  {
    question: 'Can this help before IVF or IUI?',
    answer:
      'Yes. Clinically focused nutrition treatment plan can help you prepare your body better before IVF/IUI. It does not guarantee outcomes, but it can support better nourishment, health management, and treatment readiness.',
  },
  {
    question: 'Do you support natural pregnancy planning?',
    answer:
      'Yes. Natural conception depends greatly on metabolic and foundational health, where nutrition plays a critical role. That is why we focus on preparing the body through personalized nutrition, cycle awareness, and lifestyle correction.',
  },
  {
    question: 'When will I see a positive result?',
    answer:
      "Every patient's journey is different. Generally, we recommend structured plans for 3, 6, or 12 months, depending on your health condition, reports, lifestyle, and fertility goal.",
  },
];

export const fertilityHealthGoals = [
  'Irregular Ovulation',
  'Low AMH / Egg Health Concerns',
  'Hormonal Imbalance',
  'IVF / IUI Preparation',
  'Pregnancy Loss / Repeated Miscarriage Support',
];

export const fertilityTrustItems = [
  '4,500+ Clients Served',
  'Clients Across 45+ Countries',
  'Personalized Plans Updated Regularly',
];
