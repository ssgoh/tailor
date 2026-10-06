import React, { useState } from 'react';
import { Client, Measurements } from '../types/tailor';
import { convertMeasurements } from '../utils/measurements';
import { AnatomicalMeasurementDiagram } from './AnatomicalMeasurementDiagram';

interface ClientDirectoryProps {
  clients: Client[];
  onSaveClient: (client: Client) => void;
  onSelectClientForOrder?: (client: Client) => void;
  onPrintClientCard: (client: Client) => void;
}

const EMPTY_MEASUREMENTS: Measurements = {
  unit: 'in',
  neck: 16.0,
  fullChest: 40.0,
  jacketWaist: 34.0,
  shoulderWidth: 18.0,
  sleeveRight: 25.0,
  sleeveLeft: 25.0,
  bicep: 13.5,
  wrist: 7.0,
  jacketLength: 30.0,
  halfBack: 8.5,
  frontChest: 15.0,
  trouserWaist: 34.0,
  hips: 40.0,
  outseam: 41.5,
  inseam: 31.5,
  thigh: 24.0,
  knee: 18.0,
  cuffWidth: 8.0,
  rise: 11.0,
  forkCrotch: 27.0,
  postureType: 'Regular Balance',
  shoulderSlope: 'Normal Slope',
  chestProminence: 'Standard Prominence',
  notes: '',
  lastUpdated: new Date().toISOString().split('T')[0]
};

export const ClientDirectory: React.FC<ClientDirectoryProps> = ({
  clients,
  onSaveClient,
  onSelectClientForOrder,
  onPrintClientCard
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showAnatomicalMap, setShowAnatomicalMap] = useState(true);

  // Form state
  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const [formData, setFormData] = useState<Client>(selectedClient);

  // When selection changes
  const handleSelectClient = (c: Client) => {
    setSelectedClientId(c.id);
    setFormData(c);
    setIsEditing(false);
    setIsCreatingNew(false);
  };

  const handleUnitToggle = () => {
    const nextUnit = formData.measurements.unit === 'in' ? 'cm' : 'in';
    const converted = convertMeasurements(formData.measurements, nextUnit);
    setFormData(prev => ({
      ...prev,
      measurements: converted
    }));
  };

  const handleMeasurementChange = (field: keyof Measurements, val: number | string) => {
    setFormData(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: val,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }));
  };

  const handleSave = () => {
    onSaveClient(formData);
    setIsEditing(false);
    setIsCreatingNew(false);
  };

  const handleStartCreateNew = () => {
    const newId = `cli-${String(clients.length + 1).padStart(2, '0')}`;
    const newClient: Client = {
      id: newId,
      fullName: '',
      email: '',
      phone: '',
      city: '',
      tier: 'New Client',
      measurements: { ...EMPTY_MEASUREMENTS, lastUpdated: new Date().toISOString().split('T')[0] },
      totalOrdersCount: 0,
      totalSpend: 0,
      notes: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setFormData(newClient);
    setIsCreatingNew(true);
    setIsEditing(true);
  };

  const filteredClients = clients.filter(c =>
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Client Atelier Ledger
          </span>
          <h1 className="text-3xl font-serif-display font-medium text-stone-900 mt-0.5">
            Client Directory & Anatomical Records
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Bespoke measurement archives, body balance adjustments, and posture diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartCreateNew}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            + Register New Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Client List (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Clients ({filteredClients.length})
            </h2>
            <span className="text-xs text-stone-500">Select to inspect</span>
          </div>

          <input
            type="text"
            placeholder="Search client by name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
          />

          <div className="divide-y divide-stone-100 max-h-[640px] overflow-y-auto">
            {filteredClients.map(c => {
              const isSelected = !isCreatingNew && c.id === selectedClientId;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectClient(c)}
                  className={`p-3 cursor-pointer rounded-lg transition-all ${
                    isSelected
                      ? 'bg-stone-900 text-white'
                      : 'hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm leading-tight">
                        {c.fullName}
                      </h4>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {c.city || 'No location set'}
                      </p>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-stone-800 text-amber-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {c.tier}
                    </span>
                  </div>

                  <div className={`mt-2 pt-2 border-t flex items-center justify-between text-xs ${
                    isSelected ? 'border-stone-800 text-stone-300' : 'border-stone-100 text-stone-500'
                  }`}>
                    <span>{c.totalOrdersCount} commissions</span>
                    <span className="font-mono tabular-nums">${c.totalSpend.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Client Record & Measurements (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-6">
          {/* Client Header & Action Controls */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Client Full Name (e.g. Lord Julian Vance)"
                    className="text-2xl font-serif-display font-medium text-stone-900 border-b border-stone-300 focus:outline-none focus:border-amber-800 w-full"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address"
                      className="text-xs px-2 py-1 border border-stone-200 rounded text-stone-800"
                    />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone Number"
                      className="text-xs px-2 py-1 border border-stone-200 rounded text-stone-800"
                    />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City / Region"
                      className="text-xs px-2 py-1 border border-stone-200 rounded text-stone-800"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-serif-display font-medium text-stone-900">
                      {formData.fullName}
                    </h2>
                    <span className="text-xs text-amber-900 font-medium">
                      {formData.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span>{formData.email}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formData.phone}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formData.city}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded transition-colors"
                  >
                    Save Records
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setIsCreatingNew(false);
                      setFormData(selectedClient);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                  >
                    Edit Measurements
                  </button>
                  <button
                    onClick={() => onPrintClientCard(formData)}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                  >
                    Print Card
                  </button>
                  {onSelectClientForOrder && (
                    <button
                      onClick={() => onSelectClientForOrder(formData)}
                      className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-amber-400 text-stone-900 hover:bg-amber-300 rounded transition-colors"
                    >
                      New Order for Client
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Unit Switcher & Diagram Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700">Measurement Units:</span>
              <div className="inline-flex rounded-md p-0.5 bg-stone-200 text-xs">
                <button
                  type="button"
                  onClick={handleUnitToggle}
                  className={`px-3 py-1 rounded font-mono font-medium transition-colors ${
                    formData.measurements.unit === 'in'
                      ? 'bg-white text-stone-900 shadow-2xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Inches (in)
                </button>
                <button
                  type="button"
                  onClick={handleUnitToggle}
                  className={`px-3 py-1 rounded font-mono font-medium transition-colors ${
                    formData.measurements.unit === 'cm'
                      ? 'bg-white text-stone-900 shadow-2xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
              <span className="text-[11px] text-stone-500 italic ml-2">
                Converts automatically with Savile Row tolerances
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowAnatomicalMap(!showAnatomicalMap)}
              className="text-xs text-amber-900 font-medium hover:underline"
            >
              {showAnatomicalMap ? 'Hide Anatomical Mannequin' : 'Show Anatomical Mannequin'}
            </button>
          </div>

          {/* Anatomical Visual Diagram if open */}
          {showAnatomicalMap && (
            <AnatomicalMeasurementDiagram
              measurements={formData.measurements}
              editable={isEditing}
              onUpdateValue={(key, val) => handleMeasurementChange(key, val)}
            />
          )}

          {/* Posture & Stance Adjustments */}
          <div className="p-4 bg-stone-50/70 border border-stone-200 rounded-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Posture & Anatomical Balance Profile
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Spine & Balance Stance
                </label>
                {isEditing ? (
                  <select
                    value={formData.measurements.postureType}
                    onChange={(e) => handleMeasurementChange('postureType', e.target.value)}
                    className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                  >
                    <option value="Regular Balance">Regular Balance</option>
                    <option value="Erect Stance">Erect Stance (High Chest)</option>
                    <option value="Stooped Stance">Stooped Stance (Rounded Back)</option>
                    <option value="Head Forward">Head Forward</option>
                  </select>
                ) : (
                  <span className="text-xs font-semibold text-stone-900 block">
                    {formData.measurements.postureType}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Shoulder Slope & Drop
                </label>
                {isEditing ? (
                  <select
                    value={formData.measurements.shoulderSlope}
                    onChange={(e) => handleMeasurementChange('shoulderSlope', e.target.value)}
                    className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                  >
                    <option value="Normal Slope">Normal Slope</option>
                    <option value="Right Low Shoulder (-0.5&quot;)">Right Low Shoulder (-0.5")</option>
                    <option value="Left Low Shoulder (-0.5&quot;)">Left Low Shoulder (-0.5")</option>
                    <option value="Square High Shoulders">Square High Shoulders</option>
                  </select>
                ) : (
                  <span className="text-xs font-semibold text-stone-900 block">
                    {formData.measurements.shoulderSlope}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  Chest Prominence
                </label>
                {isEditing ? (
                  <select
                    value={formData.measurements.chestProminence}
                    onChange={(e) => handleMeasurementChange('chestProminence', e.target.value)}
                    className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                  >
                    <option value="Standard Prominence">Standard Prominence</option>
                    <option value="Athletic Barrel Chest">Athletic Barrel Chest</option>
                    <option value="Flat Chest">Flat Chest</option>
                  </select>
                ) : (
                  <span className="text-xs font-semibold text-stone-900 block">
                    {formData.measurements.chestProminence}
                  </span>
                )}
              </div>
            </div>

            {/* Cutter Notes */}
            <div className="pt-2">
              <label className="text-xs font-medium text-stone-600 block mb-1">
                Atelier Cutter Notes & Personal Preferences
              </label>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Needs high armholes, favors 2-inch turn-up cuffs, slight break on shoe..."
                  className="w-full text-xs p-2 bg-white border border-stone-300 rounded"
                />
              ) : (
                <p className="text-xs text-stone-700 italic">
                  {formData.notes || 'No special posture notes recorded.'}
                </p>
              )}
            </div>
          </div>

          {/* Full Tabular Numerical Measurement Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Complete Measurement Ledger
              </h3>
              <span className="text-xs font-mono text-stone-500">
                Last verified: {formData.measurements.lastUpdated}
              </span>
            </div>

            {/* Upper Torso Grid */}
            <div>
              <h4 className="text-xs font-semibold text-stone-700 mb-2">
                Upper Body & Jacket Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { key: 'neck', label: 'Neck' },
                  { key: 'fullChest', label: 'Full Chest' },
                  { key: 'jacketWaist', label: 'Jacket Waist' },
                  { key: 'shoulderWidth', label: 'Shoulder (Pt-Pt)' },
                  { key: 'sleeveRight', label: 'Sleeve (Right)' },
                  { key: 'sleeveLeft', label: 'Sleeve (Left)' },
                  { key: 'bicep', label: 'Bicep / Scye' },
                  { key: 'wrist', label: 'Wrist' },
                  { key: 'jacketLength', label: 'Jacket Length' },
                  { key: 'halfBack', label: 'Half Back' },
                  { key: 'frontChest', label: 'Front Chest' }
                ].map(item => (
                  <div key={item.key} className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                    <span className="text-[11px] text-stone-500 block truncate">{item.label}</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.25"
                        value={(formData.measurements as unknown as Record<string, unknown>)[item.key] as number || ''}
                        onChange={(e) => handleMeasurementChange(item.key as keyof Measurements, parseFloat(e.target.value) || 0)}
                        className="w-full mt-1 p-1 font-mono text-sm font-bold bg-white border border-stone-300 rounded"
                      />
                    ) : (
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                          {(formData.measurements as unknown as Record<string, unknown>)[item.key] as number}
                        </span>
                        <span className="text-[11px] text-stone-500">{formData.measurements.unit}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Body Grid */}
            <div>
              <h4 className="text-xs font-semibold text-stone-700 mb-2">
                Lower Body & Trouser Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { key: 'trouserWaist', label: 'Trouser Waist' },
                  { key: 'hips', label: 'Hips / Seat' },
                  { key: 'outseam', label: 'Outseam (Outside)' },
                  { key: 'inseam', label: 'Inseam (Inside)' },
                  { key: 'thigh', label: 'Thigh' },
                  { key: 'knee', label: 'Knee Width' },
                  { key: 'cuffWidth', label: 'Cuff Opening' },
                  { key: 'rise', label: 'Trouser Rise' },
                  { key: 'forkCrotch', label: 'Fork / Crotch Total' }
                ].map(item => (
                  <div key={item.key} className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                    <span className="text-[11px] text-stone-500 block truncate">{item.label}</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.25"
                        value={(formData.measurements as unknown as Record<string, unknown>)[item.key] as number || ''}
                        onChange={(e) => handleMeasurementChange(item.key as keyof Measurements, parseFloat(e.target.value) || 0)}
                        className="w-full mt-1 p-1 font-mono text-sm font-bold bg-white border border-stone-300 rounded"
                      />
                    ) : (
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                          {(formData.measurements as unknown as Record<string, unknown>)[item.key] as number}
                        </span>
                        <span className="text-[11px] text-stone-500">{formData.measurements.unit}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
