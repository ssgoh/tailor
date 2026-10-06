import React, { useState } from 'react';
import { FabricItem } from '../types/tailor';

interface FabricArchiveProps {
  fabrics: FabricItem[];
  onSaveFabric: (fabric: FabricItem) => void;
  onSelectFabricForCustomizer?: (fabric: FabricItem) => void;
}

export const FabricArchive: React.FC<FabricArchiveProps> = ({
  fabrics,
  onSaveFabric,
  onSelectFabricForCustomizer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<FabricItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New fabric form state
  const [newFabric, setNewFabric] = useState<Partial<FabricItem>>({
    name: '',
    code: '',
    composition: '100% Wool',
    weightGsm: 280,
    mill: '',
    origin: 'England / Italy',
    colorName: '',
    hexColor: '#1A2338',
    pattern: 'Plain Twill',
    imagePath: fabrics[0]?.imagePath || '',
    pricePerMeter: 150,
    season: 'All-Year 4-Season',
    stockMeters: 25,
    description: ''
  });

  const filteredFabrics = fabrics.filter(f => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.mill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.composition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason = seasonFilter === 'all' || f.season === seasonFilter;
    return matchesSearch && matchesSeason;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFabric.name || !newFabric.code) return;

    const fabricToSave: FabricItem = {
      id: `fab-${Date.now()}`,
      name: newFabric.name,
      code: newFabric.code,
      composition: newFabric.composition || '100% Merino Wool',
      weightGsm: Number(newFabric.weightGsm) || 280,
      mill: newFabric.mill || 'Savile Row Cloth Merchant',
      origin: newFabric.origin || 'United Kingdom',
      colorName: newFabric.colorName || 'Bespoke Blue',
      hexColor: newFabric.hexColor || '#1A2338',
      pattern: (newFabric.pattern as FabricItem['pattern']) || 'Plain Twill',
      imagePath: newFabric.imagePath || fabrics[0]?.imagePath || '',
      pricePerMeter: Number(newFabric.pricePerMeter) || 160,
      season: (newFabric.season as FabricItem['season']) || 'All-Year 4-Season',
      stockMeters: Number(newFabric.stockMeters) || 30,
      description: newFabric.description || 'Exclusive bespoke mill selection.'
    };

    onSaveFabric(fabricToSave);
    setIsAddingNew(false);
  };

  const handleAdjustStock = (fabric: FabricItem, deltaMeters: number) => {
    const updated = {
      ...fabric,
      stockMeters: Math.max(0, Number((fabric.stockMeters + deltaMeters).toFixed(1)))
    };
    onSaveFabric(updated);
    if (selectedFabric && selectedFabric.id === fabric.id) {
      setSelectedFabric(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Material Library & Swatch Archives
          </span>
          <h1 className="text-3xl font-serif-display font-medium text-stone-900 mt-0.5">
            Bespoke Cloth Bolt Archive
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Certified heritage mill bolts, composition specifications, and inventory tracking.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap"
        >
          + Add New Cloth Bolt
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by mill, fabric code, composition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">Season:</span>
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            className="p-1.5 bg-white border border-stone-200 rounded text-stone-700"
          >
            <option value="all">All Seasons ({fabrics.length})</option>
            <option value="All-Year 4-Season">All-Year 4-Season</option>
            <option value="Autumn / Winter">Autumn / Winter</option>
            <option value="Spring / Summer">Spring / Summer</option>
          </select>
        </div>
      </div>

      {/* Fabric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFabrics.map(fabric => {
          const isLowStock = fabric.stockMeters < 15;
          return (
            <div
              key={fabric.id}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Visual Swatch Image */}
                <div className="relative aspect-4/3 w-full bg-stone-100 border-b border-stone-200">
                  <img
                    src={fabric.imagePath}
                    alt={fabric.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[10px] font-mono text-white rounded">
                    {fabric.code}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-xs font-bold text-stone-900 rounded shadow-2xs font-mono tabular-nums">
                    ${fabric.pricePerMeter}/meter
                  </div>
                </div>

                {/* Fabric Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-amber-900">{fabric.mill}</span>
                    <span>{fabric.origin}</span>
                  </div>

                  <h3 className="text-base font-serif-display font-bold text-stone-900 leading-snug">
                    {fabric.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {fabric.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs text-stone-700">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Weight</span>
                      <span className="font-mono font-medium">{fabric.weightGsm} gsm</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Season</span>
                      <span className="truncate">{fabric.season}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Composition</span>
                      <span className="truncate block font-medium">{fabric.composition}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Bolt Stock</span>
                      <span className={`font-mono font-bold ${isLowStock ? 'text-amber-800' : 'text-stone-900'}`}>
                        {fabric.stockMeters} m {isLowStock && '(Low)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-3 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAdjustStock(fabric, -3.5)}
                    className="px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded text-[11px] font-mono text-stone-800"
                    title="Deduct standard suit cut (3.5 meters)"
                  >
                    -3.5m Cut
                  </button>
                  <button
                    onClick={() => handleAdjustStock(fabric, 10)}
                    className="px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded text-[11px] font-mono text-stone-800"
                    title="Add bolt restock (+10 meters)"
                  >
                    +10m Bolt
                  </button>
                </div>

                {onSelectFabricForCustomizer && (
                  <button
                    onClick={() => onSelectFabricForCustomizer(fabric)}
                    className="px-2.5 py-1 text-xs font-semibold text-amber-950 bg-amber-200/80 hover:bg-amber-300 rounded transition-colors"
                  >
                    Use in Customizer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Cloth Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h2 className="text-xl font-serif-display font-bold text-stone-900">
                Register New Cloth Bolt
              </h2>
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Cloth Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Super 160s Charcoal Glen Check Wool"
                  value={newFabric.name}
                  onChange={(e) => setNewFabric({ ...newFabric, name: e.target.value })}
                  className="w-full p-2 border border-stone-200 rounded text-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Bolt Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LORO-3091-CH"
                    value={newFabric.code}
                    onChange={(e) => setNewFabric({ ...newFabric, code: e.target.value })}
                    className="w-full p-2 border border-stone-200 rounded text-stone-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Mill Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Loro Piana"
                    value={newFabric.mill}
                    onChange={(e) => setNewFabric({ ...newFabric, mill: e.target.value })}
                    className="w-full p-2 border border-stone-200 rounded text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Biella, Italy"
                    value={newFabric.origin}
                    onChange={(e) => setNewFabric({ ...newFabric, origin: e.target.value })}
                    className="w-full p-2 border border-stone-200 rounded text-stone-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Weight (GSM)</label>
                  <input
                    type="number"
                    value={newFabric.weightGsm}
                    onChange={(e) => setNewFabric({ ...newFabric, weightGsm: parseInt(e.target.value) || 280 })}
                    className="w-full p-2 border border-stone-200 rounded text-stone-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Price / Meter ($)</label>
                  <input
                    type="number"
                    value={newFabric.pricePerMeter}
                    onChange={(e) => setNewFabric({ ...newFabric, pricePerMeter: parseFloat(e.target.value) || 100 })}
                    className="w-full p-2 border border-stone-200 rounded text-stone-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Initial Stock (Meters)</label>
                  <input
                    type="number"
                    value={newFabric.stockMeters}
                    onChange={(e) => setNewFabric({ ...newFabric, stockMeters: parseFloat(e.target.value) || 20 })}
                    className="w-full p-2 border border-stone-200 rounded text-stone-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Composition</label>
                <input
                  type="text"
                  placeholder="e.g. 90% Wool Super 150s, 10% Mongolian Silk"
                  value={newFabric.composition}
                  onChange={(e) => setNewFabric({ ...newFabric, composition: e.target.value })}
                  className="w-full p-2 border border-stone-200 rounded text-stone-800"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description & Hand Feel</label>
                <textarea
                  rows={2}
                  placeholder="Crisp high drape, light dry hand, ideal for tailored suits..."
                  value={newFabric.description}
                  onChange={(e) => setNewFabric({ ...newFabric, description: e.target.value })}
                  className="w-full p-2 border border-stone-200 rounded text-stone-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 bg-stone-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded uppercase tracking-wider text-xs"
                >
                  Save Bolt to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
