import { Client, FabricItem, Order } from '../types/tailor';

export const INITIAL_FABRICS: FabricItem[] = [
  {
    id: 'fab-01',
    name: 'Super 150s Midnight Navy Worsted Wool',
    code: 'DOR-7821-NV',
    composition: '100% Merino Wool Super 150s',
    weightGsm: 260,
    mill: 'Dormeuil Luxury Cloth',
    origin: 'Huddersfield, England',
    colorName: 'Midnight Navy',
    hexColor: '#1A2338',
    pattern: 'Plain Twill',
    imagePath: '/src/assets/images/fabric_midnight_navy_wool_1791257259669.jpg',
    pricePerMeter: 185,
    season: 'All-Year 4-Season',
    stockMeters: 42.5,
    description: 'Silky drape with high crease recovery and subtle luster. The quintessential Savile Row boardroom suit cloth.'
  },
  {
    id: 'fab-02',
    name: 'Charcoal Herringbone Donegall Tweed',
    code: 'VBC-9904-CH',
    composition: '100% Shetland Wool',
    weightGsm: 390,
    mill: 'Vitale Barberis Canonico',
    origin: 'Biella, Italy',
    colorName: 'Deep Charcoal & Slate',
    hexColor: '#2D3137',
    pattern: 'Herringbone',
    imagePath: '/src/assets/images/fabric_charcoal_herringbone_tweed_1791257274367.jpg',
    pricePerMeter: 145,
    season: 'Autumn / Winter',
    stockMeters: 28.0,
    description: 'Substantial structural drape with distinct micro-herringbone chevron texture. Ideal for country coats and robust tailored blazers.'
  },
  {
    id: 'fab-03',
    name: 'Artisanal Cream Irish Linen',
    code: 'SOL-4102-IV',
    composition: '100% Wet-Spun Irish Flax',
    weightGsm: 275,
    mill: 'Spence Bryson & Solbiati',
    origin: 'Ulster, Northern Ireland',
    colorName: 'Unbleached Oatmeal Cream',
    hexColor: '#E6DCC8',
    pattern: 'Slub Weave',
    imagePath: '/src/assets/images/fabric_cream_irish_linen_1791257285734.jpg',
    pricePerMeter: 120,
    season: 'Spring / Summer',
    stockMeters: 34.0,
    description: 'Crisp hand with organic slub texture that softens gracefully with each wear. Perfect for Riviera weddings and warm weather suiting.'
  },
  {
    id: 'fab-04',
    name: 'Pure Cashmere & Camel Hair Flannel',
    code: 'LP-0082-CM',
    composition: '65% Mongolian Cashmere, 35% Baby Camel Hair',
    weightGsm: 340,
    mill: 'Loro Piana',
    origin: 'Quarona, Italy',
    colorName: 'Warm Camel Tan',
    hexColor: '#C49A6C',
    pattern: 'Plain Twill',
    imagePath: '/src/assets/images/fabric_camel_cashmere_flannel_1791257295712.jpg',
    pricePerMeter: 320,
    season: 'Autumn / Winter',
    stockMeters: 18.5,
    description: 'Incomparable tactile softness and thermal warmth with velvety milled nap. The ultimate choice for overcoats and luxury blazers.'
  },
  {
    id: 'fab-05',
    name: 'Black Tie Silk Velvet & Satin Back',
    code: 'SC-5520-BK',
    composition: '80% Rayon Velvet, 20% Mulberry Silk',
    weightGsm: 310,
    mill: 'Scabal Fine Suiting',
    origin: 'Brussels, Belgium',
    colorName: 'Midnight Onyx Black',
    hexColor: '#121214',
    pattern: 'Velvet Plush',
    imagePath: '/src/assets/images/fabric_midnight_navy_wool_1791257259669.jpg',
    pricePerMeter: 240,
    season: 'All-Year 4-Season',
    stockMeters: 14.0,
    description: 'Deep light-absorbing pile with sumptuous hand feel. Specially engineered for black tie dinner jackets and formal opera attire.'
  },
  {
    id: 'fab-06',
    name: 'Royal Oxford Giza 87 Egyptian Cotton',
    code: 'ALB-3101-BL',
    composition: '100% Two-Ply Giza 87 Long-Staple Cotton',
    weightGsm: 140,
    mill: 'Albini Group',
    origin: 'Albino, Italy',
    colorName: 'Sky Cerulean Blue',
    hexColor: '#7CA0C7',
    pattern: 'Royal Oxford',
    imagePath: '/src/assets/images/fabric_cream_irish_linen_1791257285734.jpg',
    pricePerMeter: 95,
    season: 'All-Year 4-Season',
    stockMeters: 55.0,
    description: 'Luminous basketweave texture with exceptional breathability and crisp ironed collar retention.'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-01',
    fullName: 'Lord Julian Vance',
    email: 'j.vance@belgraveholdings.co.uk',
    phone: '+44 20 7946 0912',
    city: 'Mayfair, London',
    tier: 'VIP Patron',
    totalOrdersCount: 8,
    totalSpend: 19400,
    notes: 'Prefers deep lapels and high armholes. Right shoulder drops approximately 0.5 inches. Keep cuff monogram hidden on interior pocket facing.',
    createdAt: '2024-03-14',
    measurements: {
      unit: 'in',
      neck: 16.5,
      fullChest: 41.5,
      jacketWaist: 36.0,
      shoulderWidth: 18.25,
      sleeveRight: 25.5,
      sleeveLeft: 25.0,
      bicep: 14.5,
      wrist: 7.25,
      jacketLength: 30.5,
      halfBack: 8.75,
      frontChest: 15.5,
      trouserWaist: 34.5,
      hips: 41.0,
      outseam: 42.0,
      inseam: 32.0,
      thigh: 24.5,
      knee: 18.5,
      cuffWidth: 8.0,
      rise: 11.25,
      forkCrotch: 27.5,
      postureType: 'Regular Balance',
      shoulderSlope: 'Right Low Shoulder (-0.5")',
      chestProminence: 'Standard Prominence',
      notes: 'Customer prefers side tabs without belt loops. Slight trouser break on shoe.',
      lastUpdated: '2026-09-12'
    }
  },
  {
    id: 'cli-02',
    fullName: 'Clara Sterling',
    email: 'clara@sterling-design.studio',
    phone: '+1 (415) 890-3412',
    city: 'San Francisco, CA',
    tier: 'VIP Patron',
    totalOrdersCount: 5,
    totalSpend: 11200,
    notes: 'Architectural silhouette. Favors double-breasted soft-shoulder cuts and wide-leg cuffed trousers in heavy drape fabrics.',
    createdAt: '2024-08-20',
    measurements: {
      unit: 'in',
      neck: 14.25,
      fullChest: 38.0,
      jacketWaist: 30.5,
      shoulderWidth: 16.75,
      sleeveRight: 24.0,
      sleeveLeft: 24.0,
      bicep: 12.5,
      wrist: 6.5,
      jacketLength: 29.0,
      halfBack: 7.75,
      frontChest: 14.0,
      trouserWaist: 29.0,
      hips: 39.5,
      outseam: 41.5,
      inseam: 31.5,
      thigh: 23.0,
      knee: 19.5,
      cuffWidth: 9.5,
      rise: 12.0,
      forkCrotch: 26.5,
      postureType: 'Erect Stance',
      shoulderSlope: 'Square High Shoulders',
      chestProminence: 'Standard Prominence',
      notes: 'Extended high-rise trouser waistband with 2.0" turn-up cuffs. Clean drape.',
      lastUpdated: '2026-08-04'
    }
  },
  {
    id: 'cli-03',
    fullName: 'Mateo Rossi',
    email: 'mateo.rossi@rossiarch.it',
    phone: '+39 02 8734 991',
    city: 'Milan / New York',
    tier: 'Regular Bespoke',
    totalOrdersCount: 3,
    totalSpend: 6800,
    notes: 'Passionate about unconstructed Neapolitan tailoring with shirt-sleeve spalla camicia and patch pockets.',
    createdAt: '2025-01-18',
    measurements: {
      unit: 'in',
      neck: 15.75,
      fullChest: 40.0,
      jacketWaist: 34.0,
      shoulderWidth: 17.75,
      sleeveRight: 25.0,
      sleeveLeft: 25.0,
      bicep: 13.5,
      wrist: 7.0,
      jacketLength: 29.75,
      halfBack: 8.25,
      frontChest: 15.0,
      trouserWaist: 33.0,
      hips: 39.0,
      outseam: 40.5,
      inseam: 30.5,
      thigh: 23.5,
      knee: 17.5,
      cuffWidth: 7.75,
      rise: 10.75,
      forkCrotch: 26.0,
      postureType: 'Regular Balance',
      shoulderSlope: 'Normal Slope',
      chestProminence: 'Standard Prominence',
      notes: 'No shoulder pads. Quarter lined. Horn buttons.',
      lastUpdated: '2026-07-29'
    }
  },
  {
    id: 'cli-04',
    fullName: 'Elena Rostova',
    email: 'elena@rostova-concerts.com',
    phone: '+41 22 764 1209',
    city: 'Geneva, Switzerland',
    tier: 'Regular Bespoke',
    totalOrdersCount: 2,
    totalSpend: 5400,
    notes: 'Concert pianist. Requires enhanced mobility at the scye and upper back pleat for unhindered arm movement at the keyboard.',
    createdAt: '2025-05-10',
    measurements: {
      unit: 'in',
      neck: 14.5,
      fullChest: 36.5,
      jacketWaist: 28.5,
      shoulderWidth: 16.5,
      sleeveRight: 23.75,
      sleeveLeft: 23.75,
      bicep: 12.0,
      wrist: 6.25,
      jacketLength: 28.5,
      halfBack: 7.5,
      frontChest: 13.5,
      trouserWaist: 27.5,
      hips: 38.0,
      outseam: 40.0,
      inseam: 30.0,
      thigh: 22.0,
      knee: 17.0,
      cuffWidth: 8.0,
      rise: 11.0,
      forkCrotch: 25.5,
      postureType: 'Erect Stance',
      shoulderSlope: 'Normal Slope',
      chestProminence: 'Standard Prominence',
      notes: 'Extra comfort ease at back armscye (+0.75"). Velvet tuxedo collar.',
      lastUpdated: '2026-09-02'
    }
  },
  {
    id: 'cli-05',
    fullName: 'David K. Sterling',
    email: 'david.sterling@fintechcapital.com',
    phone: '+1 (212) 555-0184',
    city: 'New York, NY',
    tier: 'New Client',
    totalOrdersCount: 1,
    totalSpend: 2850,
    notes: 'First bespoke suit commission. Former athlete with athletic chest and narrower waist.',
    createdAt: '2026-09-28',
    measurements: {
      unit: 'in',
      neck: 17.0,
      fullChest: 44.0,
      jacketWaist: 35.0,
      shoulderWidth: 19.5,
      sleeveRight: 26.0,
      sleeveLeft: 26.0,
      bicep: 16.0,
      wrist: 7.75,
      jacketLength: 31.0,
      halfBack: 9.25,
      frontChest: 16.5,
      trouserWaist: 34.0,
      hips: 42.5,
      outseam: 43.0,
      inseam: 32.5,
      thigh: 26.0,
      knee: 19.0,
      cuffWidth: 8.25,
      rise: 11.5,
      forkCrotch: 28.5,
      postureType: 'Regular Balance',
      shoulderSlope: 'Square High Shoulders',
      chestProminence: 'Athletic Barrel Chest',
      notes: 'Requires athletic drop (9 inch drop from chest to waist). Suppress waist carefully without pulling.',
      lastUpdated: '2026-09-28'
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-1042',
    clientId: 'cli-01',
    clientName: 'Lord Julian Vance',
    clientEmail: 'j.vance@belgraveholdings.co.uk',
    clientPhone: '+44 20 7946 0912',
    garmentType: '3-Piece Suit',
    styleConfig: {
      lapel: 'Peak Lapel',
      fit: 'Classic Savile Row',
      buttons: 'Single-Breasted 2-Button',
      vents: 'Double Side Vents',
      pockets: 'Jetted with Ticket Pocket',
      lining: 'Full Bemberg Cupro',
      trouserPleat: 'Single Forward Pleat',
      waistbandStyle: 'Side Adjusters (Solid Brass)',
      trouserCuff: '1.75" Classic Turn-Up',
      buttonMaterial: 'Genuine Water Buffalo Horn',
      monogramText: 'J.V.',
      monogramLocation: 'Inside Pocket Facing',
      monogramColor: 'Burnished Gold Silk',
      specialStyleNotes: 'Horsehair canvas chest piece, double-breasted vest with shawl collar.'
    },
    fabric: INITIAL_FABRICS[0], // Super 150s Midnight Navy
    status: 'Basted Canvas Fitting',
    orderDate: '2026-09-15',
    targetDeliveryDate: '2026-10-24',
    totalAmount: 3450,
    depositPaid: 2000,
    estimatedHours: 48,
    tailorNotes: 'Basted canvas fitting completed yesterday. Adjusting left chest canvas by 3mm. Collar sits cleanly against the shirt neckband.',
    customerRemarks: 'Requested deep midnight navy silk thread for buttonholes.',
    measurementsSnapshot: INITIAL_CLIENTS[0].measurements,
    milestones: [
      {
        stage: 'Consultation & Design',
        scheduledDate: '2026-09-15',
        completedDate: '2026-09-15',
        fittingPassed: true,
        tailorNotes: 'Fabric selected and full styling agreed.'
      },
      {
        stage: 'Fabric Reserved & Cut',
        scheduledDate: '2026-09-22',
        completedDate: '2026-09-23',
        fittingPassed: true,
        tailorNotes: '3.8 meters cut from bolt DOR-7821-NV. Hand basting assembled.'
      },
      {
        stage: 'Basted Canvas Fitting',
        scheduledDate: '2026-10-04',
        completedDate: '2026-10-04',
        fittingPassed: true,
        tailorNotes: 'Pinned shoulder balance and marked button stance.'
      },
      {
        stage: 'Forward Stitching',
        scheduledDate: '2026-10-12',
        tailorNotes: 'Proceed with hand-padded canvas, collar attachment and sleeves.'
      },
      {
        stage: 'Final Pressing & Quality',
        scheduledDate: '2026-10-20'
      },
      {
        stage: 'Ready for Fitting / Pickup',
        scheduledDate: '2026-10-24'
      }
    ]
  },
  {
    id: 'ORD-1043',
    clientId: 'cli-02',
    clientName: 'Clara Sterling',
    clientEmail: 'clara@sterling-design.studio',
    clientPhone: '+1 (415) 890-3412',
    garmentType: 'Tailored Blazer',
    styleConfig: {
      lapel: 'Peak Lapel',
      fit: 'Modern Slim',
      buttons: 'Double-Breasted 6x2',
      vents: 'Double Side Vents',
      pockets: 'Patch Pockets',
      lining: 'Half-Lined Buggy',
      trouserPleat: 'Double Reverse Pleat',
      waistbandStyle: 'Extended Gurkha Waistband',
      trouserCuff: '2.0" Bold Turn-Up',
      buttonMaterial: 'Smoked Corozo Nut',
      monogramText: 'C.S.',
      monogramLocation: 'Inside Pocket Facing',
      monogramColor: 'Tonal Charcoal',
      specialStyleNotes: 'Dramatic sharp peak lapels (4.25" width) with roped shoulder crown.'
    },
    fabric: INITIAL_FABRICS[1], // Charcoal Herringbone Tweed
    status: 'Forward Stitching',
    orderDate: '2026-09-10',
    targetDeliveryDate: '2026-10-18',
    totalAmount: 2150,
    depositPaid: 2150,
    estimatedHours: 36,
    tailorNotes: 'Sleeves hand-attached with 2mm roping. AMF hand pick-stitching along lapel edges.',
    customerRemarks: 'Paid in full on initial fitting.',
    measurementsSnapshot: INITIAL_CLIENTS[1].measurements,
    milestones: [
      {
        stage: 'Consultation & Design',
        scheduledDate: '2026-09-10',
        completedDate: '2026-09-10',
        fittingPassed: true
      },
      {
        stage: 'Fabric Reserved & Cut',
        scheduledDate: '2026-09-16',
        completedDate: '2026-09-16',
        fittingPassed: true
      },
      {
        stage: 'Basted Canvas Fitting',
        scheduledDate: '2026-09-28',
        completedDate: '2026-09-29',
        fittingPassed: true
      },
      {
        stage: 'Forward Stitching',
        scheduledDate: '2026-10-06'
      },
      {
        stage: 'Ready for Fitting / Pickup',
        scheduledDate: '2026-10-18'
      }
    ]
  },
  {
    id: 'ORD-1044',
    clientId: 'cli-03',
    clientName: 'Mateo Rossi',
    clientEmail: 'mateo.rossi@rossiarch.it',
    clientPhone: '+39 02 8734 991',
    garmentType: '2-Piece Suit',
    styleConfig: {
      lapel: 'Neapolitan Wide Notch',
      fit: 'Neapolitan Soft Shoulder',
      buttons: 'Single-Breasted 3-Roll-2',
      vents: 'Double Side Vents',
      pockets: 'Patch Pockets',
      lining: 'Unlined Bespoke Hand-Rolled',
      trouserPleat: 'Single Forward Pleat',
      waistbandStyle: 'Side Adjusters (Solid Brass)',
      trouserCuff: '1.75" Classic Turn-Up',
      buttonMaterial: 'Genuine Water Buffalo Horn',
      specialStyleNotes: 'Spalla camicia gathered shoulder, curved barchetta breast pocket.'
    },
    fabric: INITIAL_FABRICS[2], // Cream Irish Linen
    status: 'Ready for Fitting / Pickup',
    orderDate: '2026-08-25',
    targetDeliveryDate: '2026-10-08',
    totalAmount: 2600,
    depositPaid: 1500,
    estimatedHours: 42,
    tailorNotes: 'Garment pressed on wooden pressing buck. Ready on tailor hanger with garment bag for final fitting on Thursday.',
    customerRemarks: 'Client travelling from Milan; appointment booked for 2:30 PM.',
    measurementsSnapshot: INITIAL_CLIENTS[2].measurements,
    milestones: [
      {
        stage: 'Consultation & Design',
        scheduledDate: '2026-08-25',
        completedDate: '2026-08-25',
        fittingPassed: true
      },
      {
        stage: 'Fabric Reserved & Cut',
        scheduledDate: '2026-09-02',
        completedDate: '2026-09-03',
        fittingPassed: true
      },
      {
        stage: 'Basted Canvas Fitting',
        scheduledDate: '2026-09-14',
        completedDate: '2026-09-15',
        fittingPassed: true
      },
      {
        stage: 'Forward Stitching',
        scheduledDate: '2026-09-25',
        completedDate: '2026-09-26',
        fittingPassed: true
      },
      {
        stage: 'Final Pressing & Quality',
        scheduledDate: '2026-10-03',
        completedDate: '2026-10-04',
        fittingPassed: true
      },
      {
        stage: 'Ready for Fitting / Pickup',
        scheduledDate: '2026-10-08'
      }
    ]
  },
  {
    id: 'ORD-1045',
    clientId: 'cli-04',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@rostova-concerts.com',
    clientPhone: '+41 22 764 1209',
    garmentType: 'Bespoke Tuxedo',
    styleConfig: {
      lapel: 'Shawl Collar',
      fit: 'Modern Slim',
      buttons: 'Single-Breasted 1-Button',
      vents: 'Unvented',
      pockets: 'Slanted Jetted Pockets',
      lining: 'Full Bemberg Cupro',
      trouserPleat: 'Flat Front',
      waistbandStyle: 'Side Adjusters (Solid Brass)',
      trouserCuff: 'Plain Clean Hem',
      buttonMaterial: 'Genuine Water Buffalo Horn',
      monogramText: 'E.R.',
      monogramLocation: 'Inside Pocket Facing',
      monogramColor: 'Silver Silk',
      specialStyleNotes: 'Pure silk grosgrain shawl collar and trouser gallon side braid.'
    },
    fabric: INITIAL_FABRICS[4], // Black Tie Silk Velvet
    status: 'Fabric Reserved & Cut',
    orderDate: '2026-10-01',
    targetDeliveryDate: '2026-11-15',
    totalAmount: 3800,
    depositPaid: 2000,
    estimatedHours: 52,
    tailorNotes: 'Pattern drafted with 1.5cm chest rotation for seated posture. Velvet sheared with care.',
    customerRemarks: 'Needs for winter symphony gala in Zurich on Nov 22.',
    measurementsSnapshot: INITIAL_CLIENTS[3].measurements,
    milestones: [
      {
        stage: 'Consultation & Design',
        scheduledDate: '2026-10-01',
        completedDate: '2026-10-01',
        fittingPassed: true
      },
      {
        stage: 'Fabric Reserved & Cut',
        scheduledDate: '2026-10-05',
        completedDate: '2026-10-05',
        fittingPassed: true
      },
      {
        stage: 'Basted Canvas Fitting',
        scheduledDate: '2026-10-18'
      }
    ]
  },
  {
    id: 'ORD-1046',
    clientId: 'cli-05',
    clientName: 'David K. Sterling',
    clientEmail: 'david.sterling@fintechcapital.com',
    clientPhone: '+1 (212) 555-0184',
    garmentType: 'Cashmere Overcoat',
    styleConfig: {
      lapel: 'Peak Lapel',
      fit: 'Classic Savile Row',
      buttons: 'Double-Breasted 6x2',
      vents: 'Center Vent',
      pockets: 'Flap Pockets',
      lining: 'Full Bemberg Cupro',
      trouserPleat: 'Flat Front',
      waistbandStyle: 'Standard Belt Loops',
      trouserCuff: 'Plain Clean Hem',
      buttonMaterial: 'Genuine Water Buffalo Horn',
      specialStyleNotes: 'Ulster style back belt (martingale) and deep storm collar.'
    },
    fabric: INITIAL_FABRICS[3], // Camel Cashmere & Flannel
    status: 'Consultation & Design',
    orderDate: '2026-10-04',
    targetDeliveryDate: '2026-11-28',
    totalAmount: 4200,
    depositPaid: 2100,
    estimatedHours: 54,
    tailorNotes: 'Initial measurements taken. Drafting baseline paper patterns for muscular shoulder posture.',
    customerRemarks: 'Client requested extra room in armholes to comfortably wear over a bespoke suit jacket.',
    measurementsSnapshot: INITIAL_CLIENTS[4].measurements,
    milestones: [
      {
        stage: 'Consultation & Design',
        scheduledDate: '2026-10-04',
        completedDate: '2026-10-04',
        fittingPassed: true
      },
      {
        stage: 'Fabric Reserved & Cut',
        scheduledDate: '2026-10-14'
      },
      {
        stage: 'Basted Canvas Fitting',
        scheduledDate: '2026-10-28'
      }
    ]
  }
];
