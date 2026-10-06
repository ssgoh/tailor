export type GarmentType = 
  | '2-Piece Suit'
  | '3-Piece Suit'
  | 'Bespoke Tuxedo'
  | 'Tailored Blazer'
  | 'Bespoke Trousers'
  | 'Custom Dress Shirt'
  | 'Cashmere Overcoat'
  | 'Evening Tailored Gown';

export type OrderStatus =
  | 'Consultation & Design'
  | 'Fabric Reserved & Cut'
  | 'Basted Canvas Fitting'
  | 'Forward Stitching'
  | 'Final Pressing & Quality'
  | 'Ready for Fitting / Pickup'
  | 'Delivered & Complete';

export type LapelStyle = 'Notch Lapel' | 'Peak Lapel' | 'Shawl Collar' | 'Neapolitan Wide Notch';
export type FitStyle = 'Classic Savile Row' | 'Modern Slim' | 'Neapolitan Soft Shoulder';
export type ButtonStyle = 'Single-Breasted 1-Button' | 'Single-Breasted 2-Button' | 'Double-Breasted 6x2' | 'Single-Breasted 3-Roll-2';
export type VentStyle = 'Double Side Vents' | 'Center Vent' | 'Unvented';
export type PocketStyle = 'Flap Pockets' | 'Patch Pockets' | 'Slanted Jetted Pockets' | 'Jetted with Ticket Pocket';
export type LiningStyle = 'Full Bemberg Cupro' | 'Half-Lined Buggy' | 'Unlined Bespoke Hand-Rolled';
export type TrouserPleat = 'Flat Front' | 'Single Forward Pleat' | 'Double Reverse Pleat';
export type WaistbandStyle = 'Side Adjusters (Solid Brass)' | 'Standard Belt Loops' | 'Extended Gurkha Waistband';
export type TrouserCuff = 'Plain Clean Hem' | '1.75" Classic Turn-Up' | '2.0" Bold Turn-Up';
export type ButtonMaterial = 'Genuine Water Buffalo Horn' | 'White Mother-of-Pearl' | 'Smoked Corozo Nut' | 'Antique Brass Shank';

export interface StyleConfig {
  lapel: LapelStyle;
  fit: FitStyle;
  buttons: ButtonStyle;
  vents: VentStyle;
  pockets: PocketStyle;
  lining: LiningStyle;
  trouserPleat: TrouserPleat;
  waistbandStyle: WaistbandStyle;
  trouserCuff: TrouserCuff;
  buttonMaterial: ButtonMaterial;
  monogramText?: string;
  monogramLocation?: 'Inside Pocket Facing' | 'Left Sleeve Cuff' | 'Under Collar Melange';
  monogramColor?: string;
  specialStyleNotes?: string;
}

export interface Measurements {
  unit: 'in' | 'cm';
  // Upper body
  neck: number;
  fullChest: number;
  jacketWaist: number;
  shoulderWidth: number;
  sleeveRight: number;
  sleeveLeft: number;
  bicep: number;
  wrist: number;
  jacketLength: number;
  halfBack: number;
  frontChest: number;
  
  // Lower body
  trouserWaist: number;
  hips: number;
  outseam: number;
  inseam: number;
  thigh: number;
  knee: number;
  cuffWidth: number;
  rise: number;
  forkCrotch: number;

  // Posture & Anatomical notes
  postureType: 'Regular Balance' | 'Erect Stance' | 'Stooped Stance' | 'Head Forward';
  shoulderSlope: 'Normal Slope' | 'Right Low Shoulder (-0.5")' | 'Left Low Shoulder (-0.5")' | 'Square High Shoulders';
  chestProminence: 'Standard Prominence' | 'Athletic Barrel Chest' | 'Flat Chest';
  notes: string;
  lastUpdated: string;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  tier: 'VIP Patron' | 'Regular Bespoke' | 'New Client';
  measurements: Measurements;
  totalOrdersCount: number;
  totalSpend: number;
  notes: string;
  createdAt: string;
}

export interface FabricItem {
  id: string;
  name: string;
  code: string;
  composition: string;
  weightGsm: number;
  mill: string;
  origin: string;
  colorName: string;
  hexColor: string;
  pattern: 'Plain Twill' | 'Herringbone' | 'Pinstripe' | 'Birdseye' | 'Slub Weave' | 'Velvet Plush' | 'Royal Oxford';
  imagePath: string;
  pricePerMeter: number;
  season: 'All-Year 4-Season' | 'Autumn / Winter' | 'Spring / Summer';
  stockMeters: number;
  description: string;
}

export interface FittingMilestone {
  stage: OrderStatus;
  scheduledDate: string;
  completedDate?: string;
  tailorNotes?: string;
  fittingPassed?: boolean;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  garmentType: GarmentType;
  styleConfig: StyleConfig;
  fabric: FabricItem;
  status: OrderStatus;
  orderDate: string;
  targetDeliveryDate: string;
  totalAmount: number;
  depositPaid: number;
  milestones: FittingMilestone[];
  measurementsSnapshot: Measurements;
  tailorNotes: string;
  customerRemarks?: string;
  estimatedHours: number;
}
