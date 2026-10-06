import React from 'react';

export type ActiveTab = 'pipeline' | 'clients' | 'fabrics' | 'guide' | 'customer_studio' | 'customer_tracker';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNewOrderModal: () => void;
  ordersCount: number;
  clientsCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewOrderModal,
  ordersCount,
  clientsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => onSelectTab('pipeline')}
          className="text-left font-serif-display text-2xl tracking-wider text-stone-100 hover:text-amber-200 transition-colors cursor-pointer"
        >
          SARTOR ATELIER
        </button>

        {/* Zone 2: Clean Text Navigation Links (4-5 single-line items) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onSelectTab('pipeline')}
            className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'text-amber-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Orders & Pipeline <span className="text-xs text-stone-400 font-mono">({ordersCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('clients')}
            className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'clients'
                ? 'text-amber-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Clients & Measurements <span className="text-xs text-stone-400 font-mono">({clientsCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('fabrics')}
            className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'fabrics'
                ? 'text-amber-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Fabric Archive
          </button>

          <button
            onClick={() => onSelectTab('guide')}
            className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'text-amber-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Measurement Guide
          </button>

          <button
            onClick={() => onSelectTab('customer_studio')}
            className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'customer_studio'
                ? 'text-amber-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>Customer Style Studio</span>
          </button>

          <button
            onClick={() => onSelectTab('customer_tracker')}
            className={`transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
              activeTab === 'customer_tracker'
                ? 'text-amber-300 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Order Tracker
          </button>
        </nav>

        {/* Zone 3: Primary Actions (1-2 single-line buttons) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewOrderModal}
            className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-amber-300 hover:bg-amber-200 rounded-md shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            + New Commission
          </button>
        </div>
      </div>

      {/* Mobile Secondary Bar for small screens */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-stone-950 border-t border-stone-800 text-xs gap-4 text-stone-300 scrollbar-none">
        <button
          onClick={() => onSelectTab('pipeline')}
          className={`whitespace-nowrap py-1 ${activeTab === 'pipeline' ? 'text-amber-300 font-medium' : ''}`}
        >
          Pipeline
        </button>
        <button
          onClick={() => onSelectTab('clients')}
          className={`whitespace-nowrap py-1 ${activeTab === 'clients' ? 'text-amber-300 font-medium' : ''}`}
        >
          Clients
        </button>
        <button
          onClick={() => onSelectTab('fabrics')}
          className={`whitespace-nowrap py-1 ${activeTab === 'fabrics' ? 'text-amber-300 font-medium' : ''}`}
        >
          Fabrics
        </button>
        <button
          onClick={() => onSelectTab('customer_studio')}
          className={`whitespace-nowrap py-1 ${activeTab === 'customer_studio' ? 'text-amber-300 font-medium' : ''}`}
        >
          Customer Studio
        </button>
        <button
          onClick={() => onSelectTab('customer_tracker')}
          className={`whitespace-nowrap py-1 ${activeTab === 'customer_tracker' ? 'text-amber-300 font-medium' : ''}`}
        >
          Tracker
        </button>
      </div>
    </header>
  );
};
