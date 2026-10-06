import React from 'react';
import { Client } from '../types/tailor';

interface ClientCardPrintModalProps {
  client: Client | null;
  onClose: () => void;
}

export const ClientCardPrintModal: React.FC<ClientCardPrintModalProps> = ({
  client,
  onClose
}) => {
  if (!client) return null;

  const handlePrint = () => {
    window.print();
  };

  const m = client.measurements;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 shadow-2xl space-y-6 my-auto text-stone-900 border border-stone-200">
        
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 no-print">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900">
              Printable Atelier Record
            </span>
            <h2 className="text-xl font-serif-display font-bold">
              Client Measurement Card
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded transition-colors"
            >
              Print Card
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* PRINT CARD BODY */}
        <div className="border-2 border-stone-800 p-6 space-y-6 font-serif bg-stone-50/40">
          {/* Card Header */}
          <div className="text-center border-b border-stone-400 pb-4">
            <h1 className="text-xl tracking-widest uppercase font-bold text-stone-900">SARTOR ATELIER</h1>
            <p className="text-[10px] uppercase tracking-widest text-stone-600">Master Tailors & Cutters Record</p>
            <div className="mt-3 flex justify-between text-xs font-sans text-stone-800">
              <span>Client: <strong>{client.fullName}</strong></span>
              <span>Ref: <strong>{client.id}</strong></span>
              <span>Date: <strong>{client.measurements.lastUpdated}</strong></span>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-3 gap-2 text-xs font-sans pb-2 border-b border-stone-200">
            <div>
              <span className="text-[10px] text-stone-500 block uppercase">Phone</span>
              <span>{client.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block uppercase">Email</span>
              <span className="truncate block">{client.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block uppercase">Tier & Orders</span>
              <span>{client.tier} ({client.totalOrdersCount})</span>
            </div>
          </div>

          {/* Posture & Stance */}
          <div className="p-2.5 bg-stone-100/70 border border-stone-300 rounded text-xs font-sans space-y-1">
            <div className="flex justify-between">
              <span><strong>Balance / Stance:</strong> {m.postureType}</span>
              <span><strong>Shoulder Slope:</strong> {m.shoulderSlope}</span>
            </div>
            <div>
              <span><strong>Chest Prominence:</strong> {m.chestProminence}</span>
            </div>
            {m.notes && (
              <p className="text-stone-700 italic pt-1 border-t border-stone-200">
                Notes: {m.notes}
              </p>
            )}
          </div>

          {/* Upper Body Measurements */}
          <div className="font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 border-b border-stone-300 pb-1 mb-2">
              Upper Garment Specifications (Unit: {m.unit})
            </h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Neck</span>
                <span className="font-mono font-bold text-sm">{m.neck}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Full Chest</span>
                <span className="font-mono font-bold text-sm">{m.fullChest}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Jacket Waist</span>
                <span className="font-mono font-bold text-sm">{m.jacketWaist}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Shoulder Width</span>
                <span className="font-mono font-bold text-sm">{m.shoulderWidth}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Right Sleeve</span>
                <span className="font-mono font-bold text-sm">{m.sleeveRight}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Left Sleeve</span>
                <span className="font-mono font-bold text-sm">{m.sleeveLeft}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Bicep / Armscye</span>
                <span className="font-mono font-bold text-sm">{m.bicep}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Jacket Length</span>
                <span className="font-mono font-bold text-sm">{m.jacketLength}</span>
              </div>
            </div>
          </div>

          {/* Lower Body Measurements */}
          <div className="font-sans">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 border-b border-stone-300 pb-1 mb-2">
              Trouser Specifications (Unit: {m.unit})
            </h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Waistband</span>
                <span className="font-mono font-bold text-sm">{m.trouserWaist}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Hips / Seat</span>
                <span className="font-mono font-bold text-sm">{m.hips}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Inseam</span>
                <span className="font-mono font-bold text-sm">{m.inseam}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Outseam</span>
                <span className="font-mono font-bold text-sm">{m.outseam}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Thigh</span>
                <span className="font-mono font-bold text-sm">{m.thigh}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Knee</span>
                <span className="font-mono font-bold text-sm">{m.knee}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Cuff Opening</span>
                <span className="font-mono font-bold text-sm">{m.cuffWidth}</span>
              </div>
              <div className="p-1.5 border border-stone-200 bg-white">
                <span className="text-[10px] text-stone-500 block">Rise</span>
                <span className="font-mono font-bold text-sm">{m.rise}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-300 flex justify-between text-[11px] font-sans text-stone-500">
            <span>Pattern Cutter Signature: __________________</span>
            <span>Atelier Seal: [ SAVILE ROW RECORD ]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
