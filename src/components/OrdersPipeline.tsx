import React, { useState } from 'react';
import { Order, OrderStatus, GarmentType } from '../types/tailor';

interface OrdersPipelineProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onOpenOrderDetails: (order: Order) => void;
  onOpenNewOrderModal: () => void;
  onPrintSpecSheet: (order: Order) => void;
}

const STAGES: { key: OrderStatus; label: string; stepNumber: string; description: string }[] = [
  { key: 'Consultation & Design', label: 'Consultation', stepNumber: '01', description: 'Style & Cloth selected' },
  { key: 'Fabric Reserved & Cut', label: 'Cut & Pattern', stepNumber: '02', description: 'Bolt cut & hand-basted' },
  { key: 'Basted Canvas Fitting', label: 'Basted Fitting', stepNumber: '03', description: 'Floating canvas on client' },
  { key: 'Forward Stitching', label: 'Forward Stitching', stepNumber: '04', description: 'Collar & sleeves set' },
  { key: 'Final Pressing & Quality', label: 'Final Press', stepNumber: '05', description: 'Hand pressed & inspected' },
  { key: 'Ready for Fitting / Pickup', label: 'Ready for Client', stepNumber: '06', description: 'Awaiting pickup/fitting' },
  { key: 'Delivered & Complete', label: 'Delivered', stepNumber: '07', description: 'Commission handed over' }
];

export const OrdersPipeline: React.FC<OrdersPipelineProps> = ({
  orders,
  onUpdateOrderStatus,
  onOpenOrderDetails,
  onOpenNewOrderModal,
  onPrintSpecSheet
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGarmentFilter, setSelectedGarmentFilter] = useState<string>('all');
  const [quickStatusFilter, setQuickStatusFilter] = useState<string>('active');

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.fabric.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGarment =
      selectedGarmentFilter === 'all' || order.garmentType === selectedGarmentFilter;

    const matchesStatus =
      quickStatusFilter === 'all' ? true :
      quickStatusFilter === 'active' ? order.status !== 'Delivered & Complete' :
      order.status === quickStatusFilter;

    return matchesSearch && matchesGarment && matchesStatus;
  });

  // Financial summary
  const totalValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalDeposits = orders.reduce((sum, o) => sum + o.depositPaid, 0);
  const totalBalanceDue = totalValue - totalDeposits;
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered & Complete').length;

  return (
    <div className="space-y-6">
      {/* Editorial Header & Atelier Summary Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Savile Row Workshop Pipeline
          </span>
          <h1 className="text-3xl font-serif-display font-medium text-stone-900 mt-0.5">
            Commissions & Order Status
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Tracking {activeOrdersCount} active bespoke garments through canvas drafting, fittings, and finishing.
          </p>
        </div>

        {/* Clean Financial Metrics (No cards-within-cards, tabular numbers) */}
        <div className="flex items-center gap-6 text-sm">
          <div className="border-l border-stone-200 pl-4">
            <span className="text-xs text-stone-600 block">Active Commissions</span>
            <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
              {activeOrdersCount}
            </span>
          </div>
          <div className="border-l border-stone-200 pl-4">
            <span className="text-xs text-stone-600 block">Total Pipeline Value</span>
            <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
              ${totalValue.toLocaleString()}
            </span>
          </div>
          <div className="border-l border-stone-200 pl-4">
            <span className="text-xs text-stone-600 block">Balance Pending</span>
            <span className="font-mono text-xl font-bold text-amber-700 tabular-nums">
              ${totalBalanceDue.toLocaleString()}
            </span>
          </div>
          <button
            onClick={onOpenNewOrderModal}
            className="ml-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            + Create Order
          </button>
        </div>
      </div>

      {/* Filter and View Mode Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search & Garment Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative min-w-[220px] max-w-xs">
            <input
              type="text"
              placeholder="Search by Order #, Client, Cloth..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-stone-400 hover:text-stone-700 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Garment Type Dropdown */}
          <select
            value={selectedGarmentFilter}
            onChange={(e) => setSelectedGarmentFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-800"
          >
            <option value="all">All Garment Types</option>
            <option value="2-Piece Suit">2-Piece Suits</option>
            <option value="3-Piece Suit">3-Piece Suits</option>
            <option value="Bespoke Tuxedo">Tuxedos</option>
            <option value="Tailored Blazer">Blazers</option>
            <option value="Cashmere Overcoat">Overcoats</option>
            <option value="Bespoke Trousers">Trousers</option>
          </select>

          {/* Status Quick Filter */}
          <select
            value={quickStatusFilter}
            onChange={(e) => setQuickStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-800"
          >
            <option value="active">Active (In Production)</option>
            <option value="all">All Statuses</option>
            {STAGES.map(s => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* View Switcher: Segmented Control Button */}
        <div className="flex items-center gap-1 p-0.5 bg-stone-200/70 rounded-md self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              viewMode === 'kanban'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1240px]">
            {STAGES.map((stage) => {
              const stageOrders = filteredOrders.filter(o => o.status === stage.key);

              return (
                <div
                  key={stage.key}
                  className="w-80 flex-shrink-0 flex flex-col bg-stone-100/80 rounded-xl border border-stone-200/90"
                >
                  {/* Column Header */}
                  <div className="p-3.5 border-b border-stone-200/90 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-stone-600 font-semibold">
                          {stage.stepNumber}.
                        </span>
                        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                          {stage.label}
                        </h3>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {stage.description}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded">
                      {stageOrders.length}
                    </span>
                  </div>

                  {/* Orders Stack */}
                  <div className="p-2.5 space-y-3 flex-1 min-h-[320px] max-h-[700px] overflow-y-auto">
                    {stageOrders.length === 0 ? (
                      <div className="h-28 flex items-center justify-center text-xs text-stone-600 italic border border-dashed border-stone-200 rounded-lg">
                        No orders in this stage
                      </div>
                    ) : (
                      stageOrders.map((order) => {
                        const balance = order.totalAmount - order.depositPaid;
                        const isFullyPaid = balance <= 0;

                        return (
                          <div
                            key={order.id}
                            className="bg-white border border-stone-200 rounded-lg p-3.5 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5 text-stone-800"
                          >
                            {/* Card Top: Order ID & Garment Type */}
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="font-mono text-xs font-bold text-amber-900">
                                  {order.id}
                                </span>
                                <h4 className="text-sm font-semibold text-stone-900 mt-0.5">
                                  {order.clientName}
                                </h4>
                              </div>
                              <span className="text-[11px] font-medium text-stone-600">
                                {order.garmentType}
                              </span>
                            </div>

                            {/* Fabric detail */}
                            <div className="text-xs text-stone-600 flex items-center gap-1.5 pt-1 border-t border-stone-100">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                                style={{ backgroundColor: order.fabric.hexColor }}
                              />
                              <span className="truncate">{order.fabric.name}</span>
                            </div>

                            {/* Style Highlights */}
                            <div className="text-[11px] text-stone-600 flex flex-wrap gap-x-2 gap-y-0.5">
                              <span>{order.styleConfig.lapel}</span>
                              <span aria-hidden="true">·</span>
                              <span>{order.styleConfig.buttons.split(' ')[0]}</span>
                              <span aria-hidden="true">·</span>
                              <span>{order.styleConfig.fit.split(' ')[0]}</span>
                            </div>

                            {/* Tailor Latest Note if available */}
                            {order.tailorNotes && (
                              <p className="text-[11px] text-stone-600 line-clamp-2 italic bg-stone-50 p-1.5 rounded border border-stone-100">
                                "{order.tailorNotes}"
                              </p>
                            )}

                            {/* Target Date & Price */}
                            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100 font-mono">
                              <div className="text-stone-600 text-[11px]">
                                Target: <span className="font-medium text-stone-700">{order.targetDeliveryDate}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-stone-900">${order.totalAmount}</span>
                                {!isFullyPaid && (
                                  <span className="text-[10px] text-amber-800 block">Bal: ${balance}</span>
                                )}
                              </div>
                            </div>

                            {/* Action Bar */}
                            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => onOpenOrderDetails(order)}
                                  className="px-2 py-1 text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                                  title="Inspect Commission Details"
                                >
                                  Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onPrintSpecSheet(order)}
                                  className="px-2 py-1 text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                                  title="Print Workshop Spec Sheet"
                                >
                                  Spec Slip
                                </button>
                              </div>

                              {/* Advance Stage Control */}
                              <select
                                value={order.status}
                                onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                className="text-[10px] bg-stone-50 border border-stone-200 rounded px-1.5 py-1 text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-800 cursor-pointer"
                              >
                                {STAGES.map(s => (
                                  <option key={s.key} value={s.key}>
                                    Move: {s.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPACT DATA LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-600 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Garment</th>
                  <th className="py-3 px-4">Selected Cloth</th>
                  <th className="py-3 px-4">Production Stage</th>
                  <th className="py-3 px-4">Target Date</th>
                  <th className="py-3 px-4 text-right">Value / Deposit</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-stone-500 italic">
                      No matching commissions found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => {
                    const balance = order.totalAmount - order.depositPaid;
                    return (
                      <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-900">
                          {order.id}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-stone-900">
                          {order.clientName}
                          <span className="block text-[11px] text-stone-500">{order.clientPhone}</span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 font-medium">
                          {order.garmentType}
                          <span className="block text-[11px] text-stone-500">{order.styleConfig.lapel}</span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          <div className="flex items-center gap-1.5 max-w-[200px]">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: order.fabric.hexColor }}
                            />
                            <span className="truncate">{order.fabric.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="text-xs bg-stone-100 border border-stone-200 rounded px-2 py-1 font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800"
                          >
                            {STAGES.map(s => (
                              <option key={s.key} value={s.key}>{s.stepNumber}. {s.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-700 tabular-nums">
                          {order.targetDeliveryDate}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                          <span className="font-semibold text-stone-900">${order.totalAmount}</span>
                          {balance > 0 ? (
                            <span className="block text-[10px] text-amber-800">Due: ${balance}</span>
                          ) : (
                            <span className="block text-[10px] text-emerald-800">Paid Full</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => onOpenOrderDetails(order)}
                            className="px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => onPrintSpecSheet(order)}
                            className="px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                          >
                            Spec
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
