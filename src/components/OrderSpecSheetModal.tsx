import React, { useState } from 'react';
import { Order, OrderStatus } from '../types/tailor';

interface OrderSpecSheetModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateTailorNotes: (orderId: string, notes: string) => void;
}

const ALL_STAGES: OrderStatus[] = [
  'Consultation & Design',
  'Fabric Reserved & Cut',
  'Basted Canvas Fitting',
  'Forward Stitching',
  'Final Pressing & Quality',
  'Ready for Fitting / Pickup',
  'Delivered & Complete'
];

export const OrderSpecSheetModal: React.FC<OrderSpecSheetModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
  onUpdateTailorNotes
}) => {
  if (!order) return null;

  const [notes, setNotes] = useState(order.tailorNotes);
  const [isSavedNote, setIsSavedNote] = useState(false);

  const handleSaveNotes = () => {
    onUpdateTailorNotes(order.id, notes);
    setIsSavedNote(true);
    setTimeout(() => setIsSavedNote(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const balanceDue = order.totalAmount - order.depositPaid;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[92vh] overflow-y-auto text-stone-900 border border-stone-200">
        
        {/* Top Header & Workshop Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-300 no-print">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
              Workshop Cutting Slip & Client Specification
            </span>
            <div className="flex items-center gap-3 mt-0.5">
              <h2 className="text-2xl font-serif-display font-bold">
                Commission {order.id}
              </h2>
              <span className="font-mono text-xs px-2 py-0.5 bg-stone-100 border border-stone-300 rounded font-semibold text-stone-800">
                {order.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded transition-colors flex items-center gap-1.5"
            >
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* PRINTABLE WORKSHOP SPEC SHEET HEADER (Visible in print) */}
        <div className="hidden print-only text-center pb-4 border-b-2 border-stone-900">
          <h1 className="text-2xl font-serif font-bold tracking-wider">SARTOR ATELIER</h1>
          <p className="text-xs tracking-widest uppercase">Savile Row Bespoke Tailoring — Workshop Cutting Slip</p>
          <div className="flex justify-between text-xs mt-3 pt-2 border-t border-stone-400">
            <span>ORDER REF: <strong>{order.id}</strong></span>
            <span>DATE: <strong>{order.orderDate}</strong></span>
            <span>TARGET DELIVERY: <strong>{order.targetDeliveryDate}</strong></span>
          </div>
        </div>

        {/* Section 1: Client & Garment Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-stone-50/80 border border-stone-200 rounded-lg text-xs">
          <div>
            <span className="text-stone-500 uppercase tracking-wider text-[10px] block font-semibold">Client Details</span>
            <h4 className="text-sm font-bold text-stone-900 mt-0.5">{order.clientName}</h4>
            <p className="text-stone-600">{order.clientEmail}</p>
            <p className="text-stone-600">{order.clientPhone}</p>
          </div>

          <div>
            <span className="text-stone-500 uppercase tracking-wider text-[10px] block font-semibold">Commission Garment</span>
            <h4 className="text-sm font-bold text-stone-900 mt-0.5">{order.garmentType}</h4>
            <p className="text-stone-600">{order.styleConfig.fit}</p>
            <p className="text-stone-600 font-mono text-[11px]">Est. Bench Time: {order.estimatedHours} hrs</p>
          </div>

          <div>
            <span className="text-stone-500 uppercase tracking-wider text-[10px] block font-semibold">Selected Cloth Bolt</span>
            <h4 className="text-sm font-bold text-stone-900 mt-0.5 truncate">{order.fabric.name}</h4>
            <p className="text-stone-600">{order.fabric.mill} · {order.fabric.code}</p>
            <p className="text-stone-600 font-mono text-[11px]">{order.fabric.weightGsm} gsm · {order.fabric.composition}</p>
          </div>
        </div>

        {/* Section 2: Bespoke Style Architecture */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 border-b border-stone-200 pb-1">
            Sartorial Style & Structural Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Lapel Construction</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.lapel}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Button Stance</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.buttons}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Pocket Style</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.pockets}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Back Venting</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.vents}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Internal Lining</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.lining}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Trouser Pleating</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.trouserPleat}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Waistband Fastener</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.waistbandStyle}</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
              <span className="text-stone-500 text-[10px] block">Trouser Hem Cuff</span>
              <span className="font-semibold text-stone-900">{order.styleConfig.trouserCuff}</span>
            </div>
          </div>

          {order.styleConfig.monogramText && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-950">Hand Monogram: </span>
                <span className="font-serif font-bold text-stone-900 text-sm">"{order.styleConfig.monogramText}"</span>
              </div>
              <span className="text-amber-900 font-mono text-[11px]">
                {order.styleConfig.monogramColor} at {order.styleConfig.monogramLocation}
              </span>
            </div>
          )}
        </div>

        {/* Section 3: Client Anatomical Measurements Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Anatomical Measurements (Cutter's Reference)
            </h3>
            <span className="text-xs font-mono text-stone-500">
              Unit: {order.measurementsSnapshot?.unit || 'in'}
            </span>
          </div>

          {order.measurementsSnapshot && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Chest</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.fullChest}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Jacket Waist</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.jacketWaist}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Shoulder (Pt-Pt)</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.shoulderWidth}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Sleeve (R / L)</span>
                <span className="font-mono font-bold text-sm">
                  {order.measurementsSnapshot.sleeveRight} / {order.measurementsSnapshot.sleeveLeft}
                </span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Jacket Length</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.jacketLength}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Trouser Waist</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.trouserWaist}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Hips / Seat</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.hips}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Inseam</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.inseam}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Outseam</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.outseam}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Thigh</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.thigh}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Knee</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.knee}</span>
              </div>
              <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                <span className="text-[10px] text-stone-500 block">Cuff Opening</span>
                <span className="font-mono font-bold text-sm">{order.measurementsSnapshot.cuffWidth}</span>
              </div>
            </div>
          )}

          {order.measurementsSnapshot?.shoulderSlope && (
            <p className="text-xs text-amber-950 bg-amber-50/60 p-2 rounded border border-amber-200/50">
              <strong>Posture Adjustment:</strong> {order.measurementsSnapshot.postureType} · {order.measurementsSnapshot.shoulderSlope} · {order.measurementsSnapshot.chestProminence}
            </p>
          )}
        </div>

        {/* Section 4: Tailor Notes & Status Progression (Interactive) */}
        <div className="space-y-3 no-print">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 border-b border-stone-200 pb-1">
            Production Stage & Tailor Log
          </h3>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-600">Current Stage:</span>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                className="text-xs font-semibold p-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800"
              >
                {ALL_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-stone-500 font-mono">
              Target Finish: <strong>{order.targetDeliveryDate}</strong>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-700 block mb-1">
              Atelier Workshop Notes & Fitting Adjustments:
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800"
              placeholder="Record fitting chalk markings, shoulder pin changes, or basted canvas adjustments..."
            />
            <div className="flex justify-end gap-2 mt-1.5">
              {isSavedNote && (
                <span className="text-xs text-emerald-700 font-medium self-center">✓ Note saved</span>
              )}
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-3 py-1 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Financial Slip */}
        <div className="p-4 bg-stone-100 rounded-lg flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-stone-500 block text-[11px]">Bespoke Total</span>
            <span className="font-bold text-base text-stone-900">${order.totalAmount.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-stone-500 block text-[11px]">Deposit Paid</span>
            <span className="font-semibold text-emerald-800">${order.depositPaid.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-stone-500 block text-[11px]">Balance Remaining</span>
            <span className="font-bold text-amber-900">${balanceDue.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
