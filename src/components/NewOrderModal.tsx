import React, { useState } from 'react';
import { Client, FabricItem, GarmentType, Order, OrderStatus, StyleConfig } from '../types/tailor';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  fabrics: FabricItem[];
  onCreateOrder: (newOrder: Order) => void;
  initialClient?: Client | null;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  clients,
  fabrics,
  onCreateOrder,
  initialClient
}) => {
  if (!isOpen) return null;

  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialClient ? initialClient.id : clients[0]?.id || ''
  );
  const [isNewClient, setIsNewClient] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [garmentType, setGarmentType] = useState<GarmentType>('2-Piece Suit');
  const [selectedFabricId, setSelectedFabricId] = useState<string>(fabrics[0]?.id || '');
  const [totalAmount, setTotalAmount] = useState<number>(2600);
  const [depositPaid, setDepositPaid] = useState<number>(1300);
  const [targetDeliveryDate, setTargetDeliveryDate] = useState<string>(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );
  const [tailorNotes, setTailorNotes] = useState('');

  // Style details
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
    monogramColor: 'Burnished Gold Silk'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let client: Client | undefined;
    if (!isNewClient) {
      client = clients.find(c => c.id === selectedClientId);
    }

    const fabric = fabrics.find(f => f.id === selectedFabricId) || fabrics[0];
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      clientId: client ? client.id : `cli-${Date.now()}`,
      clientName: client ? client.fullName : (clientName || 'Bespoke Client'),
      clientEmail: client ? client.email : (clientEmail || 'client@atelier.com'),
      clientPhone: client ? client.phone : (clientPhone || '+1 (555) 000-0000'),
      garmentType,
      styleConfig,
      fabric,
      status: 'Consultation & Design' as OrderStatus,
      orderDate: new Date().toISOString().split('T')[0],
      targetDeliveryDate,
      totalAmount: Number(totalAmount),
      depositPaid: Number(depositPaid),
      estimatedHours: garmentType.includes('Suit') ? 48 : 36,
      tailorNotes: tailorNotes || `Commission entered at workshop desk. Cloth: ${fabric.name}.`,
      measurementsSnapshot: client ? client.measurements : clients[0]?.measurements,
      milestones: [
        {
          stage: 'Consultation & Design',
          scheduledDate: new Date().toISOString().split('T')[0],
          completedDate: new Date().toISOString().split('T')[0],
          fittingPassed: true,
          tailorNotes: 'Order specs finalized.'
        },
        {
          stage: 'Fabric Reserved & Cut',
          scheduledDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
        },
        {
          stage: 'Basted Canvas Fitting',
          scheduledDate: new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0]
        }
      ]
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-stone-900 border border-stone-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900">
              New Atelier Commission
            </span>
            <h2 className="text-xl font-serif-display font-bold">
              Draft Workshop Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-lg"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Client Selection */}
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-800">Client Profile</span>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setIsNewClient(false)}
                  className={`px-2 py-0.5 rounded ${!isNewClient ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}
                >
                  Existing Client
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewClient(true)}
                  className={`px-2 py-0.5 rounded ${isNewClient ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}
                >
                  + New Client
                </button>
              </div>
            </div>

            {!isNewClient ? (
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full p-2 bg-white border border-stone-300 rounded text-stone-800 font-medium"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.fullName} — {c.tier} ({c.email})
                  </option>
                ))}
              </select>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="p-2 bg-white border border-stone-200 rounded text-stone-800"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="p-2 bg-white border border-stone-200 rounded text-stone-800"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="p-2 bg-white border border-stone-200 rounded text-stone-800"
                />
              </div>
            )}
          </div>

          {/* Garment & Cloth Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Garment Type</label>
              <select
                value={garmentType}
                onChange={(e) => setGarmentType(e.target.value as GarmentType)}
                className="w-full p-2 bg-white border border-stone-200 rounded text-stone-800"
              >
                <option value="2-Piece Suit">2-Piece Suit</option>
                <option value="3-Piece Suit">3-Piece Suit</option>
                <option value="Bespoke Tuxedo">Bespoke Tuxedo</option>
                <option value="Tailored Blazer">Tailored Blazer</option>
                <option value="Cashmere Overcoat">Cashmere Overcoat</option>
                <option value="Bespoke Trousers">Bespoke Trousers</option>
                <option value="Custom Dress Shirt">Custom Dress Shirt</option>
                <option value="Evening Tailored Gown">Evening Tailored Gown</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Cloth Swatch Bolt</label>
              <select
                value={selectedFabricId}
                onChange={(e) => setSelectedFabricId(e.target.value)}
                className="w-full p-2 bg-white border border-stone-200 rounded text-stone-800"
              >
                {fabrics.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} (${f.pricePerMeter}/m)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Style Configuration Quick Picks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div>
              <label className="text-[11px] text-stone-600 block mb-0.5">Lapel</label>
              <select
                value={styleConfig.lapel}
                onChange={(e) => setStyleConfig({ ...styleConfig, lapel: e.target.value as StyleConfig['lapel'] })}
                className="w-full p-1.5 border border-stone-200 rounded text-stone-800 bg-white"
              >
                <option value="Notch Lapel">Notch</option>
                <option value="Peak Lapel">Peak</option>
                <option value="Shawl Collar">Shawl</option>
                <option value="Neapolitan Wide Notch">Neapolitan</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-0.5">Buttons</label>
              <select
                value={styleConfig.buttons}
                onChange={(e) => setStyleConfig({ ...styleConfig, buttons: e.target.value as StyleConfig['buttons'] })}
                className="w-full p-1.5 border border-stone-200 rounded text-stone-800 bg-white"
              >
                <option value="Single-Breasted 2-Button">SB 2-Button</option>
                <option value="Single-Breasted 1-Button">SB 1-Button</option>
                <option value="Double-Breasted 6x2">DB 6x2</option>
                <option value="Single-Breasted 3-Roll-2">SB 3-Roll-2</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-0.5">Pockets</label>
              <select
                value={styleConfig.pockets}
                onChange={(e) => setStyleConfig({ ...styleConfig, pockets: e.target.value as StyleConfig['pockets'] })}
                className="w-full p-1.5 border border-stone-200 rounded text-stone-800 bg-white"
              >
                <option value="Flap Pockets">Flap</option>
                <option value="Patch Pockets">Patch</option>
                <option value="Slanted Jetted Pockets">Jetted</option>
                <option value="Jetted with Ticket Pocket">Ticket Pockets</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-0.5">Vents</label>
              <select
                value={styleConfig.vents}
                onChange={(e) => setStyleConfig({ ...styleConfig, vents: e.target.value as StyleConfig['vents'] })}
                className="w-full p-1.5 border border-stone-200 rounded text-stone-800 bg-white"
              >
                <option value="Double Side Vents">Double Side</option>
                <option value="Center Vent">Center</option>
                <option value="Unvented">Unvented</option>
              </select>
            </div>
          </div>

          {/* Pricing & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Total Fee ($)</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-stone-200 rounded text-stone-800 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Deposit Paid ($)</label>
              <input
                type="number"
                value={depositPaid}
                onChange={(e) => setDepositPaid(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-stone-200 rounded text-stone-800 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Target Delivery</label>
              <input
                type="date"
                value={targetDeliveryDate}
                onChange={(e) => setTargetDeliveryDate(e.target.value)}
                className="w-full p-2 border border-stone-200 rounded text-stone-800"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Cutter Bench Notes</label>
            <textarea
              rows={2}
              value={tailorNotes}
              onChange={(e) => setTailorNotes(e.target.value)}
              placeholder="e.g. Schedule basted canvas fitting for next Friday. Cut 3.6m of Super 150s navy."
              className="w-full p-2 border border-stone-200 rounded text-stone-800"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 bg-stone-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded uppercase tracking-wider text-xs"
            >
              Add Commission to Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
