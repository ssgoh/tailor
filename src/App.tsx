import React, { useState, useEffect } from 'react';
import { Client, FabricItem, Order, OrderStatus } from './types/tailor';
import { loadClients, saveClients, loadOrders, saveOrders, loadFabrics, saveFabrics, resetToDemoData } from './utils/storage';
import { Navigation, ActiveTab } from './components/Navigation';
import { OrdersPipeline } from './components/OrdersPipeline';
import { ClientDirectory } from './components/ClientDirectory';
import { FabricArchive } from './components/FabricArchive';
import { MeasurementGuideView } from './components/MeasurementGuideView';
import { CustomerStyleStudio } from './components/CustomerStyleStudio';
import { CustomerOrderTracker } from './components/CustomerOrderTracker';
import { OrderSpecSheetModal } from './components/OrderSpecSheetModal';
import { ClientCardPrintModal } from './components/ClientCardPrintModal';
import { NewOrderModal } from './components/NewOrderModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pipeline');
  const [clients, setClients] = useState<Client[]>(() => loadClients());
  const [orders, setOrders] = useState<Order[]>(() => loadOrders());
  const [fabrics, setFabrics] = useState<FabricItem[]>(() => loadFabrics());

  // Modal states
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);
  const [printingClientCard, setPrintingClientCard] = useState<Client | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [preselectedClientForOrder, setPreselectedClientForOrder] = useState<Client | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    saveFabrics(fabrics);
  }, [fabrics]);

  // Order status update
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const updatedMilestones = [...o.milestones];
      const existingIdx = updatedMilestones.findIndex(m => m.stage === newStatus);
      if (existingIdx !== -1) {
        updatedMilestones[existingIdx] = {
          ...updatedMilestones[existingIdx],
          completedDate: new Date().toISOString().split('T')[0],
          fittingPassed: true
        };
      } else {
        updatedMilestones.push({
          stage: newStatus,
          scheduledDate: new Date().toISOString().split('T')[0],
          completedDate: new Date().toISOString().split('T')[0],
          fittingPassed: true
        });
      }

      return {
        ...o,
        status: newStatus,
        milestones: updatedMilestones
      };
    }));

    if (inspectingOrder && inspectingOrder.id === orderId) {
      setInspectingOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Tailor notes update
  const handleUpdateTailorNotes = (orderId: string, notes: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tailorNotes: notes } : o));
    if (inspectingOrder && inspectingOrder.id === orderId) {
      setInspectingOrder(prev => prev ? { ...prev, tailorNotes: notes } : null);
    }
  };

  // Client save/update
  const handleSaveClient = (updatedClient: Client) => {
    setClients(prev => {
      const idx = prev.findIndex(c => c.id === updatedClient.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = updatedClient;
        return next;
      }
      return [updatedClient, ...prev];
    });
  };

  // Fabric save/update
  const handleSaveFabric = (updatedFabric: FabricItem) => {
    setFabrics(prev => {
      const idx = prev.findIndex(f => f.id === updatedFabric.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = updatedFabric;
        return next;
      }
      return [updatedFabric, ...prev];
    });
  };

  // New Commission submitted
  const handleCreateOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);

    // Update client count or create client record if needed
    setClients(prev => prev.map(c => {
      if (c.id === newOrder.clientId) {
        return {
          ...c,
          totalOrdersCount: c.totalOrdersCount + 1,
          totalSpend: c.totalSpend + newOrder.totalAmount
        };
      }
      return c;
    }));
  };

  // Quick order creation for existing client
  const handleStartOrderForClient = (client: Client) => {
    setPreselectedClientForOrder(client);
    setIsNewOrderModalOpen(true);
  };

  // Reset demo data
  const handleResetDemo = () => {
    if (window.confirm('Reset all clients, fabrics, and orders to bespoke atelier demo records?')) {
      const demo = resetToDemoData();
      setClients(demo.clients);
      setOrders(demo.orders);
      setFabrics(demo.fabrics);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans-body">
      {/* Top Bar Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenNewOrderModal={() => {
          setPreselectedClientForOrder(null);
          setIsNewOrderModalOpen(true);
        }}
        ordersCount={orders.length}
        clientsCount={clients.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'pipeline' && (
          <OrdersPipeline
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onOpenOrderDetails={(order) => setInspectingOrder(order)}
            onOpenNewOrderModal={() => {
              setPreselectedClientForOrder(null);
              setIsNewOrderModalOpen(true);
            }}
            onPrintSpecSheet={(order) => setInspectingOrder(order)}
          />
        )}

        {activeTab === 'clients' && (
          <ClientDirectory
            clients={clients}
            onSaveClient={handleSaveClient}
            onSelectClientForOrder={handleStartOrderForClient}
            onPrintClientCard={(client) => setPrintingClientCard(client)}
          />
        )}

        {activeTab === 'fabrics' && (
          <FabricArchive
            fabrics={fabrics}
            onSaveFabric={handleSaveFabric}
            onSelectFabricForCustomizer={() => setActiveTab('customer_studio')}
          />
        )}

        {activeTab === 'guide' && (
          <MeasurementGuideView />
        )}

        {activeTab === 'customer_studio' && (
          <CustomerStyleStudio
            fabrics={fabrics}
            clients={clients}
            onCommissionSubmit={(newOrder) => {
              handleCreateOrder(newOrder);
            }}
          />
        )}

        {activeTab === 'customer_tracker' && (
          <CustomerOrderTracker orders={orders} />
        )}
      </main>

      {/* Modals */}
      <OrderSpecSheetModal
        order={inspectingOrder}
        onClose={() => setInspectingOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
        onUpdateTailorNotes={handleUpdateTailorNotes}
      />

      <ClientCardPrintModal
        client={printingClientCard}
        onClose={() => setPrintingClientCard(null)}
      />

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        clients={clients}
        fabrics={fabrics}
        onCreateOrder={handleCreateOrder}
        initialClient={preselectedClientForOrder}
      />

      {/* Quiet Atelier Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6 text-xs text-stone-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-semibold text-stone-800 tracking-wider">
              SARTOR ATELIER
            </span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Tailoring & Anatomical Measurement Management</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('customer_studio')}
              className="hover:text-stone-900 transition-colors"
            >
              Open Customer Style Room
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('customer_tracker')}
              className="hover:text-stone-900 transition-colors"
            >
              Order Tracking
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleResetDemo}
              className="hover:text-red-700 transition-colors"
              title="Reset data to initial atelier state"
            >
              Reset Demo Records
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
