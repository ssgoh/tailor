import React, { useState } from 'react';
import { Measurements } from '../types/tailor';
import { MEASUREMENT_GUIDE_POINTS, MeasurementGuidePoint } from '../utils/measurements';

interface AnatomicalMeasurementDiagramProps {
  measurements: Measurements;
  activeKey?: string;
  onSelectPoint?: (point: MeasurementGuidePoint) => void;
  editable?: boolean;
  onUpdateValue?: (key: keyof Measurements, value: number) => void;
}

export const AnatomicalMeasurementDiagram: React.FC<AnatomicalMeasurementDiagramProps> = ({
  measurements,
  activeKey,
  onSelectPoint,
  editable = false,
  onUpdateValue
}) => {
  const [selectedPointKey, setSelectedPointKey] = useState<string>(activeKey || 'fullChest');

  const currentGuide = MEASUREMENT_GUIDE_POINTS.find(p => p.key === selectedPointKey) || MEASUREMENT_GUIDE_POINTS[1];

  const handlePointClick = (pointKey: string) => {
    setSelectedPointKey(pointKey);
    const pt = MEASUREMENT_GUIDE_POINTS.find(p => p.key === pointKey);
    if (pt && onSelectPoint) {
      onSelectPoint(pt);
    }
  };

  const currentValue = (measurements as unknown as Record<string, unknown>)[currentGuide.key] as number;

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-6">
      {/* Visual Silhouette with Tailor's Tape Lines */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center bg-stone-50/80 rounded-lg p-4 border border-stone-100">
        <svg
          viewBox="0 0 260 420"
          className="w-full max-h-[380px] drop-shadow-xs select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Anatomical Mannequin Body Silhouette */}
          <defs>
            <linearGradient id="mannequinShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2DDD5" />
              <stop offset="50%" stopColor="#EDE8E1" />
              <stop offset="100%" stopColor="#DFD9D0" />
            </linearGradient>
          </defs>

          {/* Head & Neck Base */}
          <ellipse cx="130" cy="38" rx="17" ry="22" fill="url(#mannequinShade)" stroke="#CBC3B7" strokeWidth="1" />
          <path d="M 122 58 L 122 74 L 138 74 L 138 58 Z" fill="url(#mannequinShade)" stroke="#CBC3B7" strokeWidth="1" />

          {/* Torso & Arms */}
          <path
            d="M 122 74 
               L 80 88 
               C 70 120 62 170 58 225 
               C 62 230 74 230 76 225 
               C 80 178 86 135 92 110 
               L 95 180 
               L 100 220 
               L 88 235 
               L 88 385 
               L 108 385 
               L 124 245 
               L 130 235 
               L 136 245 
               L 152 385 
               L 172 385 
               L 172 235 
               L 160 220 
               L 165 180 
               L 168 110 
               C 174 135 180 178 184 225 
               C 186 230 198 230 202 225 
               C 198 170 190 120 180 88 
               L 138 74 Z"
            fill="url(#mannequinShade)"
            stroke="#CBC3B7"
            strokeWidth="1.2"
          />

          {/* Interactive Measurement Tape Lines */}
          
          {/* 1. Neck */}
          <g
            onClick={() => handlePointClick('neck')}
            className="cursor-pointer group"
          >
            <ellipse
              cx="130" cy="72" rx="14" ry="4"
              fill={selectedPointKey === 'neck' ? '#B8860B' : 'transparent'}
              stroke={selectedPointKey === 'neck' ? '#92400E' : '#B45309'}
              strokeWidth={selectedPointKey === 'neck' ? 2.5 : 1.5}
              strokeDasharray={selectedPointKey === 'neck' ? 'none' : '3,2'}
            />
            <text x="130" y="69" textAnchor="middle" className="text-[9px] fill-amber-900 font-medium">Neck</text>
          </g>

          {/* 2. Shoulder Width */}
          <g
            onClick={() => handlePointClick('shoulderWidth')}
            className="cursor-pointer group"
          >
            <line
              x1="80" y1="88" x2="180" y2="88"
              stroke={selectedPointKey === 'shoulderWidth' ? '#B45309' : '#78716C'}
              strokeWidth={selectedPointKey === 'shoulderWidth' ? 3 : 1.5}
            />
            <circle cx="80" cy="88" r="3" fill="#B45309" />
            <circle cx="180" cy="88" r="3" fill="#B45309" />
            <text x="130" y="85" textAnchor="middle" className="text-[9px] fill-stone-700 font-medium">Shoulder Width</text>
          </g>

          {/* 3. Full Chest */}
          <g
            onClick={() => handlePointClick('fullChest')}
            className="cursor-pointer group"
          >
            <line
              x1="88" y1="126" x2="172" y2="126"
              stroke={selectedPointKey === 'fullChest' ? '#B45309' : '#0284C7'}
              strokeWidth={selectedPointKey === 'fullChest' ? 3.2 : 1.8}
            />
            <rect x="88" y="123" width="84" height="6" fill={selectedPointKey === 'fullChest' ? 'rgba(180, 83, 9, 0.2)' : 'transparent'} />
            <text x="130" y="123" textAnchor="middle" className="text-[9px] fill-sky-800 font-semibold">Chest / Bust</text>
          </g>

          {/* 4. Jacket Waist */}
          <g
            onClick={() => handlePointClick('jacketWaist')}
            className="cursor-pointer group"
          >
            <line
              x1="94" y1="165" x2="166" y2="165"
              stroke={selectedPointKey === 'jacketWaist' ? '#B45309' : '#059669'}
              strokeWidth={selectedPointKey === 'jacketWaist' ? 3.2 : 1.8}
            />
            <text x="130" y="162" textAnchor="middle" className="text-[9px] fill-emerald-800 font-medium">Torso Waist</text>
          </g>

          {/* 5. Sleeve Length */}
          <g
            onClick={() => handlePointClick('sleeveRight')}
            className="cursor-pointer group"
          >
            <line
              x1="180" y1="88" x2="198" y2="225"
              stroke={selectedPointKey === 'sleeveRight' ? '#B45309' : '#6366F1'}
              strokeWidth={selectedPointKey === 'sleeveRight' ? 3 : 1.5}
              strokeDasharray="4,2"
            />
            <text x="210" y="160" textAnchor="start" className="text-[9px] fill-indigo-700 font-medium">Sleeve</text>
          </g>

          {/* 6. Trouser Waist */}
          <g
            onClick={() => handlePointClick('trouserWaist')}
            className="cursor-pointer group"
          >
            <line
              x1="96" y1="195" x2="164" y2="195"
              stroke={selectedPointKey === 'trouserWaist' ? '#B45309' : '#D97706'}
              strokeWidth={selectedPointKey === 'trouserWaist' ? 3.2 : 1.8}
            />
            <text x="130" y="192" textAnchor="middle" className="text-[9px] fill-amber-700 font-medium">Trouser Waist</text>
          </g>

          {/* 7. Hips */}
          <g
            onClick={() => handlePointClick('hips')}
            className="cursor-pointer group"
          >
            <line
              x1="93" y1="222" x2="167" y2="222"
              stroke={selectedPointKey === 'hips' ? '#B45309' : '#8B5CF6'}
              strokeWidth={selectedPointKey === 'hips' ? 3.2 : 1.8}
            />
            <text x="130" y="219" textAnchor="middle" className="text-[9px] fill-purple-800 font-medium">Hips / Seat</text>
          </g>

          {/* 8. Inseam */}
          <g
            onClick={() => handlePointClick('inseam')}
            className="cursor-pointer group"
          >
            <line
              x1="130" y1="235" x2="152" y2="385"
              stroke={selectedPointKey === 'inseam' ? '#B45309' : '#DC2626'}
              strokeWidth={selectedPointKey === 'inseam' ? 3 : 1.5}
            />
            <text x="146" y="315" textAnchor="start" className="text-[9px] fill-red-700 font-medium">Inseam</text>
          </g>

          {/* 9. Outseam */}
          <g
            onClick={() => handlePointClick('outseam')}
            className="cursor-pointer group"
          >
            <line
              x1="88" y1="195" x2="88" y2="385"
              stroke={selectedPointKey === 'outseam' ? '#B45309' : '#0D9488'}
              strokeWidth={selectedPointKey === 'outseam' ? 3 : 1.5}
            />
            <text x="68" y="290" textAnchor="end" className="text-[9px] fill-teal-700 font-medium">Outseam</text>
          </g>

          {/* 10. Cuff Width */}
          <g
            onClick={() => handlePointClick('cuffWidth')}
            className="cursor-pointer group"
          >
            <line
              x1="152" y1="385" x2="172" y2="385"
              stroke={selectedPointKey === 'cuffWidth' ? '#B45309' : '#334155'}
              strokeWidth={selectedPointKey === 'cuffWidth' ? 3 : 1.8}
            />
            <text x="162" y="400" textAnchor="middle" className="text-[9px] fill-slate-800 font-medium">Cuff Hem</text>
          </g>
        </svg>

        <p className="text-[11px] text-stone-600 mt-2 text-center">
          Click any guideline on the mannequin to view Savile Row anatomical standards.
        </p>
      </div>

      {/* Guide Point Detail Inspector */}
      <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-600 font-medium">
                {currentGuide.category}
              </span>
              <h4 className="text-lg font-semibold text-stone-900 mt-0.5">
                {currentGuide.label}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-600">Standard Band:</span>
              <div className="font-mono text-xs font-semibold text-stone-700">
                {currentGuide.typicalRangeInches}
              </div>
            </div>
          </div>

          {/* Current Client Measurement Value Callout */}
          <div className="mt-4 p-4 rounded-lg bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-600 font-medium">Client Recorded Value</span>
              <span className="text-xs text-amber-900 font-mono">Unit: {measurements.unit}</span>
            </div>
            
            {editable && onUpdateValue ? (
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="number"
                  step="0.25"
                  value={currentValue ?? ''}
                  onChange={(e) => onUpdateValue(currentGuide.key as keyof Measurements, parseFloat(e.target.value) || 0)}
                  className="w-32 px-3 py-1.5 font-mono text-xl font-bold bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
                <span className="font-medium text-stone-600">{measurements.unit}</span>
              </div>
            ) : (
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-stone-900 tabular-nums">
                  {currentValue ? currentValue : '—'}
                </span>
                <span className="text-sm font-medium text-stone-600">{measurements.unit}</span>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <h5 className="text-xs font-semibold text-stone-700">How to Measure:</h5>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {currentGuide.description}
              </p>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-md">
              <div className="text-xs font-semibold text-amber-950 flex items-center gap-1.5">
                <span>Atelier Master Tip</span>
              </div>
              <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                {currentGuide.savileRowTip}
              </p>
            </div>
          </div>
        </div>

        {/* Quick selector chips for all points */}
        <div className="pt-3 border-t border-stone-200">
          <label className="text-[11px] font-medium text-stone-600 block mb-1.5">
            Quick Jump to Anatomical Point:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {MEASUREMENT_GUIDE_POINTS.map(pt => (
              <button
                key={pt.key}
                type="button"
                onClick={() => handlePointClick(pt.key)}
                className={`px-2 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                  selectedPointKey === pt.key
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {pt.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
