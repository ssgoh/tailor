import React, { useState } from 'react';
import { Order } from '../types/tailor';
import { GarmentPreviewSvg } from './GarmentPreviewSvg';

interface CustomerOrderTrackerProps {
  orders: Order[];
}

const STAGE_STEPS = [
  { stage: 'Consultation & Design', label: 'Consultation', desc: 'Design & cloth selected' },
  { stage: 'Fabric Reserved & Cut', label: 'Pattern & Cut', desc: 'Hand-basted canvas assembled' },
  { stage: 'Basted Canvas Fitting', label: 'Basted Fitting', desc: 'Fitted on client in canvas form' },
  { stage: 'Forward Stitching', label: 'Hand Stitching', desc: 'Sleeves, lapels & collar constructed' },
  { stage: 'Final Pressing & Quality', label: 'Final Pressing', desc: 'Hand pressed & quality certified' },
  { stage: 'Ready for Fitting / Pickup', label: 'Ready for Fitting', desc: 'Ready for collection at atelier' },
  { stage: 'Delivered & Complete', label: 'Delivered', desc: 'Bespoke journey complete' }
];

export const CustomerOrderTracker: React.FC<CustomerOrderTrackerProps> = ({ orders }) => {
  const [searchId, setSearchId] = useState('ORD-1042');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    const found = orders.find(o => o.id.toUpperCase() === cleanId || o.id.replace('ORD-', '') === cleanId);
    if (found) {
      setSelectedOrder(found);
    }
  };

  const handleQuickSelect = (order: Order) => {
    setSelectedOrder(order);
    setSearchId(order.id);
  };

  const currentStageIndex = selectedOrder
    ? STAGE_STEPS.findIndex(s => s.stage === selectedOrder.status)
    : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 border-b border-stone-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
          Client Fitting Concierge
        </span>
        <h1 className="text-3xl font-serif-display font-medium text-stone-900">
          Track Your Bespoke Commission
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto">
          Enter your bespoke order reference to view your hand-tailored garment's crafting stages, next scheduled fitting, and artisan notes.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center gap-2 pt-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter Order Reference (e.g. ORD-1042)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-800"
          />
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap"
          >
            Track Status
          </button>
        </form>

        {/* Quick sample orders */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-stone-600">
          <span>Sample Orders:</span>
          {orders.slice(0, 4).map(o => (
            <button
              key={o.id}
              onClick={() => handleQuickSelect(o)}
              className={`px-2.5 py-1 rounded border text-xs font-mono transition-colors ${
                selectedOrder?.id === o.id
                  ? 'border-stone-900 bg-stone-900 text-white font-bold'
                  : 'border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              {o.id} ({o.clientName.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {selectedOrder ? (
        <div className="space-y-8">
          {/* Main Status Hero Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {selectedOrder.id}
                  </span>
                  <span className="text-xs text-stone-600">
                    Commissioned on {selectedOrder.orderDate}
                  </span>
                </div>
                <h2 className="text-2xl font-serif-display font-bold text-stone-900 mt-2">
                  {selectedOrder.garmentType} for {selectedOrder.clientName}
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Crafted in {selectedOrder.fabric.name} ({selectedOrder.fabric.mill})
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-stone-200 sm:pl-6">
                <span className="text-xs text-stone-600 block">Current Milestone</span>
                <span className="font-serif-display text-xl font-bold text-stone-900">
                  {selectedOrder.status}
                </span>
                <span className="text-xs text-stone-600 block mt-1 font-mono">
                  Delivery Target: {selectedOrder.targetDeliveryDate}
                </span>
              </div>
            </div>

            {/* Stepped Timeline */}
            <div className="pt-8 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-6">
                Artisanal Production Timeline
              </h3>

              <div className="relative">
                {/* Horizontal Progress Bar Track */}
                <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-stone-200 z-0" />
                <div
                  className="hidden md:block absolute top-4 left-6 h-0.5 bg-amber-800 z-0 transition-all duration-500"
                  style={{
                    width: `${Math.max(0, (currentStageIndex / (STAGE_STEPS.length - 1)) * 92)}%`
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative z-10">
                  {STAGE_STEPS.map((step, idx) => {
                    const isCompleted = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    const isPending = idx > currentStageIndex;

                    return (
                      <div
                        key={step.stage}
                        className={`flex md:flex-col items-center md:items-center text-left md:text-center gap-3 md:gap-2 p-2 rounded-lg transition-colors ${
                          isCurrent ? 'bg-amber-50/80 border border-amber-200' : ''
                        }`}
                      >
                        {/* Step Circle Indicator */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-amber-900 text-white'
                              : isCurrent
                              ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-100 font-extrabold'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        <div>
                          <h4 className={`text-xs font-semibold ${isCurrent ? 'text-amber-950 font-bold' : isCompleted ? 'text-stone-900' : 'text-stone-500'}`}>
                            {step.label}
                          </h4>
                          <p className="text-[11px] text-stone-600 hidden md:block mt-0.5 leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tailor's Workshop Notes to Client */}
            <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 block">
                  Latest Cutter & Tailor Update
                </span>
                <p className="text-xs text-stone-800 italic">
                  "{selectedOrder.tailorNotes || 'Garment proceeding through hand assembly on the tailor bench.'}"
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] text-stone-600 block">Account Balance</span>
                <span className="font-mono text-sm font-bold text-stone-900">
                  {selectedOrder.totalAmount - selectedOrder.depositPaid <= 0
                    ? 'Paid in Full'
                    : `$${selectedOrder.totalAmount - selectedOrder.depositPaid} due at collection`}
                </span>
              </div>
            </div>
          </div>

          {/* Garment Blueprint & Care Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual Garment Representation */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 pb-2 border-b border-stone-100">
                Garment Blueprint & Style Architecture
              </h3>

              <GarmentPreviewSvg
                styleConfig={selectedOrder.styleConfig}
                fabric={selectedOrder.fabric}
                garmentType={selectedOrder.garmentType}
              />

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 pt-2">
                <div>
                  <span className="text-stone-600 block text-[11px]">Lapel</span>
                  <span className="font-semibold">{selectedOrder.styleConfig.lapel}</span>
                </div>
                <div>
                  <span className="text-stone-600 block text-[11px]">Closure</span>
                  <span className="font-semibold">{selectedOrder.styleConfig.buttons}</span>
                </div>
                <div>
                  <span className="text-stone-600 block text-[11px]">Pockets</span>
                  <span className="font-semibold">{selectedOrder.styleConfig.pockets}</span>
                </div>
                <div>
                  <span className="text-stone-600 block text-[11px]">Trousers</span>
                  <span className="font-semibold">{selectedOrder.styleConfig.trouserPleat} · {selectedOrder.styleConfig.waistbandStyle.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Bespoke Garment Care Guide */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 pb-2 border-b border-stone-100">
                Atelier Cloth & Garment Care Protocol
              </h3>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-3 bg-stone-50 rounded border border-stone-100">
                  <h4 className="font-semibold text-stone-900">1. Natural Fiber Resting</h4>
                  <p className="text-stone-600 mt-1 leading-relaxed">
                    Always allow your suit to rest 24 to 48 hours between wearings. The natural crimp of Merino wool fibers naturally releases wrinkles when hung in a humid atmosphere.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-100">
                  <h4 className="font-semibold text-stone-900">2. Boar Bristle Brushing</h4>
                  <p className="text-stone-600 mt-1 leading-relaxed">
                    Brush your garment downward after wear using a natural bristle brush to eliminate dust particles before they embed in the weave.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-100">
                  <h4 className="font-semibold text-stone-900">3. Dry Cleaning Restraint</h4>
                  <p className="text-stone-600 mt-1 leading-relaxed">
                    Dry clean at most 1–2 times per year. Harsh chemical solvents strip the natural lanolin oils from luxury wools and flatten the hand-padded canvas chest piece.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-stone-200 rounded-xl text-stone-500">
          No order found with reference "{searchId}". Please check your order ticket or select from the sample orders above.
        </div>
      )}
    </div>
  );
};
