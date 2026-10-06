import React, { useState } from 'react';
import { FabricItem, GarmentType, StyleConfig, Order, Client } from '../types/tailor';
import { GarmentPreviewSvg } from './GarmentPreviewSvg';

interface CustomerStyleStudioProps {
  fabrics: FabricItem[];
  clients: Client[];
  onCommissionSubmit: (newOrder: Order) => void;
  onSelectFabricModal?: (fabric: FabricItem) => void;
}

const GARMENT_TYPES: { type: GarmentType; basePrice: number; description: string }[] = [
  { type: '2-Piece Suit', basePrice: 2400, description: 'Hand-canvassed bespoke lounge suit (Jacket & Trousers)' },
  { type: '3-Piece Suit', basePrice: 3100, description: 'Full suit with tailored vest/waistcoat' },
  { type: 'Bespoke Tuxedo', basePrice: 3400, description: 'Formal black tie dinner jacket & grosgrain galloned trousers' },
  { type: 'Tailored Blazer', basePrice: 1800, description: 'Stand-alone sports coat or structured blazer' },
  { type: 'Cashmere Overcoat', basePrice: 3600, description: 'Full-length or car coat in heavyweight winter cloth' },
  { type: 'Bespoke Trousers', basePrice: 750, description: 'High-waisted trousers with side tabs & hand finishing' },
  { type: 'Custom Dress Shirt', basePrice: 320, description: 'Single-needle stitched shirt with mother-of-pearl buttons' },
  { type: 'Evening Tailored Gown', basePrice: 2800, description: 'Architectural tailored evening silhouette' }
];

export const CustomerStyleStudio: React.FC<CustomerStyleStudioProps> = ({
  fabrics,
  clients,
  onCommissionSubmit
}) => {
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>('2-Piece Suit');
  const [selectedFabric, setSelectedFabric] = useState<FabricItem>(fabrics[0]);
  
  // Style config state
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    lapel: 'Notch Lapel',
    fit: 'Classic Savile Row',
    buttons: 'Single-Breasted 2-Button',
    vents: 'Double Side Vents',
    pockets: 'Flap Pockets',
    lining: 'Full Bemberg Cupro',
    trouserPleat: 'Single Forward Pleat',
    waistbandStyle: 'Side Adjusters (Solid Brass)',
    trouserCuff: '1.75" Classic Turn-Up',
    buttonMaterial: 'Genuine Water Buffalo Horn',
    monogramText: '',
    monogramLocation: 'Inside Pocket Facing',
    monogramColor: 'Burnished Gold Silk',
    specialStyleNotes: ''
  });

  // Client link or guest customer booking
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [preferredFittingDate, setPreferredFittingDate] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState<string | null>(null);

  // Active step
  const [activeStep, setActiveStep] = useState<'style' | 'fabric' | 'review'>('style');

  // Compute pricing
  const baseGarment = GARMENT_TYPES.find(g => g.type === selectedGarment) || GARMENT_TYPES[0];
  const clothSurcharge = Math.max(0, (selectedFabric.pricePerMeter - 120) * 3.5);
  const estimatedPrice = Math.round(baseGarment.basePrice + clothSurcharge);

  const handleSubmitCommission = (e: React.FormEvent) => {
    e.preventDefault();

    let client: Client | undefined;
    if (isExistingClient) {
      client = clients.find(c => c.id === selectedClientId);
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      clientId: client ? client.id : `guest-${Date.now()}`,
      clientName: client ? client.fullName : (customerName || 'Bespoke Client'),
      clientEmail: client ? client.email : (customerEmail || 'client@example.com'),
      clientPhone: client ? client.phone : (customerPhone || '+1 (555) 000-0000'),
      garmentType: selectedGarment,
      styleConfig: styleConfig,
      fabric: selectedFabric,
      status: 'Consultation & Design',
      orderDate: new Date().toISOString().split('T')[0],
      targetDeliveryDate: preferredFittingDate || new Date(Date.now() + 35 * 86400000).toISOString().split('T')[0],
      totalAmount: estimatedPrice,
      depositPaid: Math.round(estimatedPrice * 0.5),
      estimatedHours: selectedGarment.includes('Suit') ? 48 : 36,
      tailorNotes: `Commission initiated through Style Studio. Cloth: ${selectedFabric.name} (${selectedFabric.code}).`,
      customerRemarks: customerNotes,
      measurementsSnapshot: client ? client.measurements : clients[0].measurements,
      milestones: [
        {
          stage: 'Consultation & Design',
          scheduledDate: new Date().toISOString().split('T')[0],
          completedDate: new Date().toISOString().split('T')[0],
          fittingPassed: true,
          tailorNotes: 'Garment style configuration & luxury cloth verified.'
        },
        {
          stage: 'Fabric Reserved & Cut',
          scheduledDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
        },
        {
          stage: 'Basted Canvas Fitting',
          scheduledDate: preferredFittingDate || new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0]
        }
      ]
    };

    onCommissionSubmit(newOrder);
    setSubmittedSuccess(orderId);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
          Client Style & Fitting Room
        </span>
        <h1 className="text-3xl font-serif-display font-medium text-stone-900 mt-1">
          Bespoke Garment & Material Customizer
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl">
          Select your garment architecture, refine sartorial lapels, buttons and pockets, and explore our curated archive of British and Italian luxury wools, linens, and velvets.
        </p>
      </div>

      {submittedSuccess ? (
        <div className="bg-stone-900 text-stone-100 p-8 rounded-xl shadow-md text-center max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-serif text-xl font-bold">
            ✓
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
            Commission Registered
          </span>
          <h2 className="text-2xl font-serif-display">
            Bespoke Order {submittedSuccess} Confirmed
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed max-w-lg mx-auto">
            Your custom {selectedGarment} crafted in {selectedFabric.name} has been added directly to the atelier workshop queue. Your master cutter has been notified.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setSubmittedSuccess(null)}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-amber-300 text-stone-900 hover:bg-amber-200 rounded transition-colors"
            >
              Customize Another Piece
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Visual Silhouette & Spec Summary (5 Cols) */}
          <div className="lg:col-span-5 sticky top-20 space-y-4">
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                    Live Blueprint
                  </span>
                  <h3 className="text-lg font-serif-display font-medium text-stone-900">
                    {selectedGarment}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-600 block">Est. Atelier Value</span>
                  <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
                    ${estimatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Illustration */}
              <GarmentPreviewSvg
                styleConfig={styleConfig}
                fabric={selectedFabric}
                garmentType={selectedGarment}
              />

              {/* Selected Material Card Snippet */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-3">
                <img
                  src={selectedFabric.imagePath}
                  alt={selectedFabric.name}
                  className="w-14 h-14 object-cover rounded border border-stone-300 shadow-2xs shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-600 block truncate">
                    {selectedFabric.mill} · {selectedFabric.origin}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {selectedFabric.name}
                  </h4>
                  <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                    {selectedFabric.weightGsm}g/m² · {selectedFabric.composition}
                  </p>
                </div>
              </div>

              {/* Specifications Quick Breakdown */}
              <div className="text-xs space-y-1.5 pt-2 border-t border-stone-100 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-600">Lapel Construction:</span>
                  <span className="font-medium text-stone-900">{styleConfig.lapel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Button Stance:</span>
                  <span className="font-medium text-stone-900">{styleConfig.buttons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Silhouette Fit:</span>
                  <span className="font-medium text-stone-900">{styleConfig.fit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Pocket Design:</span>
                  <span className="font-medium text-stone-900">{styleConfig.pockets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Waistband Closure:</span>
                  <span className="font-medium text-stone-900">{styleConfig.waistbandStyle}</span>
                </div>
                {styleConfig.monogramText && (
                  <div className="flex justify-between text-amber-900 font-medium">
                    <span>Hand Monogram:</span>
                    <span>"{styleConfig.monogramText}" ({styleConfig.monogramLocation})</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-8">
            {/* Step Navigation Tabs */}
            <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveStep('style')}
                className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                  activeStep === 'style'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                1. Garment & Cut
              </button>
              <button
                type="button"
                onClick={() => setActiveStep('fabric')}
                className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                  activeStep === 'fabric'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                2. Luxury Cloth ({fabrics.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveStep('review')}
                className={`flex-1 py-2 text-xs font-semibold rounded transition-colors ${
                  activeStep === 'review'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                3. Book Commission
              </button>
            </div>

            {/* STEP 1: GARMENT TYPE & SARTORIAL CUT */}
            {activeStep === 'style' && (
              <div className="space-y-6">
                {/* Garment Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                    A. Garment Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {GARMENT_TYPES.map(g => (
                      <button
                        key={g.type}
                        type="button"
                        onClick={() => setSelectedGarment(g.type)}
                        className={`p-3 text-left border rounded-lg transition-all ${
                          selectedGarment === g.type
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200 hover:border-stone-400 bg-white text-stone-800'
                        }`}
                      >
                        <span className="text-xs font-bold block">{g.type}</span>
                        <span className={`text-[11px] font-mono mt-1 block ${selectedGarment === g.type ? 'text-amber-200' : 'text-stone-500'}`}>
                          from ${g.basePrice}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lapel Construction */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                    B. Lapel Construction
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { key: 'Notch Lapel', desc: 'Timeless boardroom standard' },
                      { key: 'Peak Lapel', desc: 'Authoritative, sharp upward stance' },
                      { key: 'Shawl Collar', desc: 'Continuous curve, black tie formal' },
                      { key: 'Neapolitan Wide Notch', desc: 'Spacious high gorge, relaxed' }
                    ].map(item => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setStyleConfig({ ...styleConfig, lapel: item.key as StyleConfig['lapel'] })}
                        className={`p-2.5 text-left border rounded-lg transition-all ${
                          styleConfig.lapel === item.key
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span className="font-semibold block text-stone-900">{item.key}</span>
                        <span className="text-[10px] text-stone-500 block mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button & Closure Stance */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                    C. Button Closure & Stance
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { key: 'Single-Breasted 2-Button', desc: 'The golden ratio of suiting' },
                      { key: 'Double-Breasted 6x2', desc: 'Classic British military swagger' },
                      { key: 'Single-Breasted 1-Button', desc: 'Deep V-plunge, tuxedo standard' },
                      { key: 'Single-Breasted 3-Roll-2', desc: 'Neapolitan soft roll top button' }
                    ].map(item => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setStyleConfig({ ...styleConfig, buttons: item.key as StyleConfig['buttons'] })}
                        className={`p-2.5 text-left border rounded-lg transition-all ${
                          styleConfig.buttons === item.key
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span className="font-semibold block text-stone-900">{item.key}</span>
                        <span className="text-[10px] text-stone-500 block mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pockets */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                    D. Pockets Configuration
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { key: 'Flap Pockets', desc: 'Versatile with tuck-in flap' },
                      { key: 'Slanted Jetted Pockets', desc: 'Clean, elegant minimalist line' },
                      { key: 'Patch Pockets', desc: 'Casual, rounded artisanal look' },
                      { key: 'Jetted with Ticket Pocket', desc: 'Traditional British equestrian detail' }
                    ].map(item => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setStyleConfig({ ...styleConfig, pockets: item.key as StyleConfig['pockets'] })}
                        className={`p-2.5 text-left border rounded-lg transition-all ${
                          styleConfig.pockets === item.key
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span className="font-semibold block text-stone-900">{item.key}</span>
                        <span className="text-[10px] text-stone-500 block mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trouser Sartorial Details */}
                <div className="pt-4 border-t border-stone-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    E. Trouser Architecture & Hem
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Pleats</label>
                      <select
                        value={styleConfig.trouserPleat}
                        onChange={(e) => setStyleConfig({ ...styleConfig, trouserPleat: e.target.value as StyleConfig['trouserPleat'] })}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800 bg-white"
                      >
                        <option value="Flat Front">Flat Front (Clean & Modern)</option>
                        <option value="Single Forward Pleat">Single Forward Pleat (Savile Row)</option>
                        <option value="Double Reverse Pleat">Double Reverse Pleat (Classic Full)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Waistband</label>
                      <select
                        value={styleConfig.waistbandStyle}
                        onChange={(e) => setStyleConfig({ ...styleConfig, waistbandStyle: e.target.value as StyleConfig['waistbandStyle'] })}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800 bg-white"
                      >
                        <option value="Side Adjusters (Solid Brass)">Side Adjusters (Solid Brass)</option>
                        <option value="Standard Belt Loops">Standard Belt Loops</option>
                        <option value="Extended Gurkha Waistband">Extended Gurkha Waistband</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Hem Finish</label>
                      <select
                        value={styleConfig.trouserCuff}
                        onChange={(e) => setStyleConfig({ ...styleConfig, trouserCuff: e.target.value as StyleConfig['trouserCuff'] })}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800 bg-white"
                      >
                        <option value="Plain Clean Hem">Plain Clean Hem (No Cuff)</option>
                        <option value="1.75&quot; Classic Turn-Up">1.75" Classic Turn-Up</option>
                        <option value="2.0&quot; Bold Turn-Up">2.0" Bold Turn-Up</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Personal Monogram */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    F. Monogram Personalization
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Initials / Text</label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="e.g. J.V."
                        value={styleConfig.monogramText || ''}
                        onChange={(e) => setStyleConfig({ ...styleConfig, monogramText: e.target.value })}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Placement</label>
                      <select
                        value={styleConfig.monogramLocation}
                        onChange={(e) => setStyleConfig({ ...styleConfig, monogramLocation: e.target.value as StyleConfig['monogramLocation'] })}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800 bg-white"
                      >
                        <option value="Inside Pocket Facing">Inside Pocket Facing (Discreet)</option>
                        <option value="Left Sleeve Cuff">Left Sleeve Cuff</option>
                        <option value="Under Collar Melange">Under Collar Melange</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">Thread Color</label>
                      <select
                        value={styleConfig.monogramColor}
                        onChange={(e) => setStyleConfig({ ...styleConfig, monogramColor: e.target.value })}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800 bg-white"
                      >
                        <option value="Burnished Gold Silk">Burnished Gold Silk</option>
                        <option value="Silver Silk">Silver Silk</option>
                        <option value="Tonal Charcoal">Tonal Charcoal</option>
                        <option value="Crimson Silk">Crimson Silk</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveStep('fabric')}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded transition-colors"
                  >
                    Proceed to Fabric Selection →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: LUXURY FABRICS & CLOTH SELECTION */}
            {activeStep === 'fabric' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Select Your Cloth Swatch
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Direct from certified European heritage mills. Click a swatch to apply it to your garment preview.
                  </p>
                </div>

                {/* Fabric Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fabrics.map((fabric) => {
                    const isSelected = selectedFabric.id === fabric.id;
                    return (
                      <div
                        key={fabric.id}
                        onClick={() => setSelectedFabric(fabric)}
                        className={`p-3.5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-900 bg-stone-50/70 shadow-xs'
                            : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div>
                          {/* Image Swatch */}
                          <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                            <img
                              src={fabric.imagePath}
                              alt={fabric.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[10px] font-mono text-white rounded">
                              {fabric.weightGsm} g/m²
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-stone-900 rounded">
                              ${fabric.pricePerMeter}/m
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[11px] text-stone-500">
                              <span>{fabric.mill}</span>
                              <span>{fabric.origin.split(',')[1] || fabric.origin}</span>
                            </div>
                            <h4 className="text-sm font-bold text-stone-900 mt-0.5 leading-snug">
                              {fabric.name}
                            </h4>
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2">
                              {fabric.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-[11px] font-mono text-stone-500">
                            Bolt: {fabric.code}
                          </span>
                          <span className={`text-[11px] font-semibold ${isSelected ? 'text-amber-900' : 'text-stone-700'}`}>
                            {isSelected ? '✓ Selected Cloth' : 'Click to Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep('style')}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 bg-stone-100 rounded transition-colors"
                  >
                    ← Back to Style
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep('review')}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded transition-colors"
                  >
                    Review & Book Commission →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & BOOK COMMISSION */}
            {activeStep === 'review' && (
              <form onSubmit={handleSubmitCommission} className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Commission Summary & Booking
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Book your initial basted fitting appointment or link to an existing client portfolio.
                  </p>
                </div>

                {/* Client Link Switcher */}
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-800">
                    Are you already registered with Sartor Atelier?
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsExistingClient(false)}
                      className={`px-3 py-1 text-xs rounded transition-colors ${
                        !isExistingClient ? 'bg-stone-900 text-white font-medium' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      New Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsExistingClient(true)}
                      className={`px-3 py-1 text-xs rounded transition-colors ${
                        isExistingClient ? 'bg-stone-900 text-white font-medium' : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      Existing Patron
                    </button>
                  </div>
                </div>

                {isExistingClient ? (
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Select Your Patron Account
                    </label>
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      className="w-full p-2 text-xs border border-stone-200 rounded bg-white text-stone-800"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.fullName} ({c.email}) — {c.tier}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Your existing anatomical measurements will automatically be linked to this commission.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-medium text-stone-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sebastian Sterling"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-stone-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sebastian@atelier.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-stone-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 234-5678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-stone-700 block mb-1">Preferred Basted Fitting Date</label>
                      <input
                        type="date"
                        value={preferredFittingDate}
                        onChange={(e) => setPreferredFittingDate(e.target.value)}
                        className="w-full p-2 border border-stone-200 rounded text-stone-800"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Special Remarks or Event Deadline
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Attending autumn gala on Nov 15th, prefer slightly extra room around armholes..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full p-2 text-xs border border-stone-200 rounded text-stone-800"
                  />
                </div>

                {/* Final Cost Breakdown Card */}
                <div className="p-4 bg-stone-100 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between text-stone-700">
                    <span>Base Garment Drafting ({selectedGarment})</span>
                    <span className="font-mono">${baseGarment.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Selected Luxury Cloth ({selectedFabric.name.split(' ')[0]})</span>
                    <span className="font-mono">+${clothSurcharge.toFixed(0)}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-300 flex justify-between font-bold text-sm text-stone-900">
                    <span>Total Bespoke Investment</span>
                    <span className="font-mono">${estimatedPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>50% Atelier Deposit due upon canvas basted fitting</span>
                    <span className="font-mono">${Math.round(estimatedPrice * 0.5).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep('fabric')}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 bg-stone-100 rounded transition-colors"
                  >
                    ← Back to Fabrics
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-amber-400 text-stone-950 hover:bg-amber-300 rounded shadow-xs transition-colors"
                  >
                    Confirm & Submit Bespoke Commission
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
