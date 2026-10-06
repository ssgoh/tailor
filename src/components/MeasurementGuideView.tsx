import React, { useState } from 'react';
import { MEASUREMENT_GUIDE_POINTS, MeasurementGuidePoint } from '../utils/measurements';
import { AnatomicalMeasurementDiagram } from './AnatomicalMeasurementDiagram';
import { INITIAL_CLIENTS } from '../data/initialData';

export const MeasurementGuideView: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<MeasurementGuidePoint>(MEASUREMENT_GUIDE_POINTS[1]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredPoints = categoryFilter === 'all'
    ? MEASUREMENT_GUIDE_POINTS
    : MEASUREMENT_GUIDE_POINTS.filter(p => p.category === categoryFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Savile Row Cutting Standards
        </span>
        <h1 className="text-3xl font-serif-display font-medium text-stone-900 mt-0.5">
          Anatomical Measurement Codex
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl">
          Standard body anatomical landmarks, tape tension rules, and cutter ease allowances for bespoke drafting.
        </p>
      </div>

      {/* Interactive Mannequin Diagram */}
      <AnatomicalMeasurementDiagram
        measurements={INITIAL_CLIENTS[0].measurements}
        activeKey={selectedPoint.key}
        onSelectPoint={(pt) => setSelectedPoint(pt)}
      />

      {/* Reference Library Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-serif-display font-bold text-stone-900">
            Anatomical Landmark Directory ({filteredPoints.length})
          </h2>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Landmarks
            </button>
            <button
              onClick={() => setCategoryFilter('Upper Torso & Shoulders')}
              className={`px-3 py-1 rounded transition-colors ${
                categoryFilter === 'Upper Torso & Shoulders'
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Upper Torso
            </button>
            <button
              onClick={() => setCategoryFilter('Arms & Sleeves')}
              className={`px-3 py-1 rounded transition-colors ${
                categoryFilter === 'Arms & Sleeves'
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Sleeves & Arms
            </button>
            <button
              onClick={() => setCategoryFilter('Trousers & Lower Body')}
              className={`px-3 py-1 rounded transition-colors ${
                categoryFilter === 'Trousers & Lower Body'
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Trousers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoints.map((pt) => {
            const isSelected = selectedPoint.key === pt.key;
            return (
              <div
                key={pt.key}
                onClick={() => setSelectedPoint(pt)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-amber-900">{pt.category}</span>
                  <span className="font-mono text-[11px]">{pt.typicalRangeInches}</span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 mt-1">
                  {pt.label}
                </h3>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {pt.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-amber-950 bg-amber-50/50 p-2 rounded">
                  <span className="font-bold block">Cutter Note:</span>
                  <span className="italic">{pt.savileRowTip}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
