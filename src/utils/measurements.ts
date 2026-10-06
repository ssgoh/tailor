import { Measurements } from '../types/tailor';

export function inToCm(val: number): number {
  return Number((val * 2.54).toFixed(1));
}

export function cmToIn(val: number): number {
  return Number((val / 2.54).toFixed(2));
}

export function convertMeasurements(measurements: Measurements, targetUnit: 'in' | 'cm'): Measurements {
  if (measurements.unit === targetUnit) return measurements;

  const conv = targetUnit === 'cm' ? inToCm : cmToIn;

  return {
    ...measurements,
    unit: targetUnit,
    neck: conv(measurements.neck),
    fullChest: conv(measurements.fullChest),
    jacketWaist: conv(measurements.jacketWaist),
    shoulderWidth: conv(measurements.shoulderWidth),
    sleeveRight: conv(measurements.sleeveRight),
    sleeveLeft: conv(measurements.sleeveLeft),
    bicep: conv(measurements.bicep),
    wrist: conv(measurements.wrist),
    jacketLength: conv(measurements.jacketLength),
    halfBack: conv(measurements.halfBack),
    frontChest: conv(measurements.frontChest),
    trouserWaist: conv(measurements.trouserWaist),
    hips: conv(measurements.hips),
    outseam: conv(measurements.outseam),
    inseam: conv(measurements.inseam),
    thigh: conv(measurements.thigh),
    knee: conv(measurements.knee),
    cuffWidth: conv(measurements.cuffWidth),
    rise: conv(measurements.rise),
    forkCrotch: conv(measurements.forkCrotch),
  };
}

export interface MeasurementGuidePoint {
  key: keyof Omit<Measurements, 'unit' | 'postureType' | 'shoulderSlope' | 'chestProminence' | 'notes' | 'lastUpdated'>;
  label: string;
  category: 'Upper Torso & Shoulders' | 'Arms & Sleeves' | 'Trousers & Lower Body';
  description: string;
  savileRowTip: string;
  typicalRangeInches: string;
}

export const MEASUREMENT_GUIDE_POINTS: MeasurementGuidePoint[] = [
  {
    key: 'neck',
    label: 'Neck Circumference',
    category: 'Upper Torso & Shoulders',
    description: 'Measured around the base of the neck where the collar sits comfortably, two fingers under the tape.',
    savileRowTip: 'Never choke the client; allow 0.5" comfort ease for silk tie knotting.',
    typicalRangeInches: '14.5" - 18.5"'
  },
  {
    key: 'fullChest',
    label: 'Full Chest (Prominence)',
    category: 'Upper Torso & Shoulders',
    description: 'Measured around the fullest point of the chest under the armpits, across the shoulder blades.',
    savileRowTip: 'Keep tape horizontal and taut without compressing pectoral muscle or breast tissue.',
    typicalRangeInches: '36.0" - 48.0"'
  },
  {
    key: 'shoulderWidth',
    label: 'Point-to-Point Shoulder Width',
    category: 'Upper Torso & Shoulders',
    description: 'Across the back from the edge of the left acromion bone to the right acromion bone.',
    savileRowTip: 'This dictates jacket drape balance; follow curvature of the upper back ridge.',
    typicalRangeInches: '16.0" - 20.5"'
  },
  {
    key: 'jacketWaist',
    label: 'Jacket Waist (Natural Suppression)',
    category: 'Upper Torso & Shoulders',
    description: 'Circumference at the narrowest point of the torso, typically 1 to 2 inches above the navel.',
    savileRowTip: 'This determines the silhouette hourglass suppression and button closure stance.',
    typicalRangeInches: '29.0" - 44.0"'
  },
  {
    key: 'jacketLength',
    label: 'Jacket Length',
    category: 'Upper Torso & Shoulders',
    description: 'From the prominent neck bone (C7 cervical vertebra) down the center back to where the jacket finishes.',
    savileRowTip: 'Classical rule: hem must cover the seat (buttocks) and bisect the thumb knuckle when arms hang naturally.',
    typicalRangeInches: '27.5" - 33.0"'
  },
  {
    key: 'halfBack',
    label: 'Half Back / Cross Back',
    category: 'Upper Torso & Shoulders',
    description: 'Halfway between neck and armpit, measured across the back from armhole crease to crease.',
    savileRowTip: 'Crucial for forward reach mobility; too tight causes tearing at back shoulder seams.',
    typicalRangeInches: '7.5" - 9.75"'
  },
  {
    key: 'sleeveRight',
    label: 'Sleeve Length (Right Arm)',
    category: 'Arms & Sleeves',
    description: 'From the shoulder bone down over slightly bent elbow to the wrist bone plus 0.5 inch.',
    savileRowTip: 'Should allow 1/4" to 1/2" of crisp dress shirt cuff to show past jacket sleeve hem.',
    typicalRangeInches: '23.5" - 27.5"'
  },
  {
    key: 'sleeveLeft',
    label: 'Sleeve Length (Left Arm)',
    category: 'Arms & Sleeves',
    description: 'Identical measurement taken on left arm to account for natural arm length asymmetry.',
    savileRowTip: '85% of clients have 0.25" to 0.5" variance between dominant and non-dominant arm.',
    typicalRangeInches: '23.5" - 27.5"'
  },
  {
    key: 'bicep',
    label: 'Upper Arm / Bicep',
    category: 'Arms & Sleeves',
    description: 'Circumference around the fullest part of the upper bicep with arm relaxed at the side.',
    savileRowTip: 'Allows bespoke cutters to determine armhole scye depth and sleeve crown fullness.',
    typicalRangeInches: '11.5" - 17.0"'
  },
  {
    key: 'wrist',
    label: 'Wrist Circumference',
    category: 'Arms & Sleeves',
    description: 'Around the wrist over the prominent ulna bone.',
    savileRowTip: 'Ensure room for wristwatch on the client\'s watch-bearing wrist.',
    typicalRangeInches: '6.0" - 8.5"'
  },
  {
    key: 'trouserWaist',
    label: 'Trouser Waistband',
    category: 'Trousers & Lower Body',
    description: 'Circumference where the client actually prefers to wear trouser waistband (high-rise vs natural).',
    savileRowTip: 'Bespoke high-waisted trousers sit higher on the ribs than commercial ready-to-wear jeans.',
    typicalRangeInches: '28.0" - 42.0"'
  },
  {
    key: 'hips',
    label: 'Hips & Seat Circumference',
    category: 'Trousers & Lower Body',
    description: 'Around the fullest point of the hips and buttocks.',
    savileRowTip: 'Ensure client empties pockets before measuring; tape must slide freely.',
    typicalRangeInches: '36.0" - 48.0"'
  },
  {
    key: 'inseam',
    label: 'Inseam (Inside Leg)',
    category: 'Trousers & Lower Body',
    description: 'From the high inner crotch seam down the inner leg to the shoe collar / sole edge.',
    savileRowTip: 'Have client wear fitting dress shoes with correct heel height.',
    typicalRangeInches: '29.0" - 35.0"'
  },
  {
    key: 'outseam',
    label: 'Outseam (Outside Leg)',
    category: 'Trousers & Lower Body',
    description: 'From the top edge of trouser waistband down the outer hip to the bottom hem.',
    savileRowTip: 'Gives the total vertical drape line of the side trouser seam.',
    typicalRangeInches: '38.0" - 45.0"'
  },
  {
    key: 'thigh',
    label: 'Thigh Circumference',
    category: 'Trousers & Lower Body',
    description: 'Around the uppermost thigh 1 inch below the crotch fork.',
    savileRowTip: 'Essential for pleat depth allocation and seated comfort.',
    typicalRangeInches: '21.0" - 28.0"'
  },
  {
    key: 'knee',
    label: 'Knee Width',
    category: 'Trousers & Lower Body',
    description: 'Circumference at the mid-knee cap with leg straight.',
    savileRowTip: 'Controls trouser taper profile from thigh down to cuff hem.',
    typicalRangeInches: '16.5" - 21.0"'
  },
  {
    key: 'cuffWidth',
    label: 'Trouser Bottom Hem / Cuff Width',
    category: 'Trousers & Lower Body',
    description: 'Flat width across the leg opening at the shoe (double for full circumference).',
    savileRowTip: 'Modern slim: 7.5"-8.0". Classic bespoke: 8.25"-8.75". Wide drape: 9.0"-10.0".',
    typicalRangeInches: '7.5" - 10.0"'
  },
  {
    key: 'rise',
    label: 'Trouser Rise',
    category: 'Trousers & Lower Body',
    description: 'From crotch seam upward to the front waistband top edge.',
    savileRowTip: 'Determines whether trousers sit at hips (low) or natural waist (high elegant bespoke).',
    typicalRangeInches: '10.0" - 13.5"'
  }
];
