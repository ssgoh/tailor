import { Client, FabricItem, Order } from '../types/tailor';
import { INITIAL_CLIENTS, INITIAL_FABRICS, INITIAL_ORDERS } from '../data/initialData';

const CLIENTS_KEY = 'sartor_atelier_clients_v1';
const ORDERS_KEY = 'sartor_atelier_orders_v1';
const FABRICS_KEY = 'sartor_atelier_fabrics_v1';

export function loadClients(): Client[] {
  try {
    const raw = localStorage.getItem(CLIENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading clients from storage', e);
  }
  return INITIAL_CLIENTS;
}

export function saveClients(clients: Client[]): void {
  try {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  } catch (e) {
    console.error('Error saving clients', e);
  }
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading orders from storage', e);
  }
  return INITIAL_ORDERS;
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders', e);
  }
}

export function loadFabrics(): FabricItem[] {
  try {
    const raw = localStorage.getItem(FABRICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading fabrics from storage', e);
  }
  return INITIAL_FABRICS;
}

export function saveFabrics(fabrics: FabricItem[]): void {
  try {
    localStorage.setItem(FABRICS_KEY, JSON.stringify(fabrics));
  } catch (e) {
    console.error('Error saving fabrics', e);
  }
}

export function resetToDemoData(): { clients: Client[]; orders: Order[]; fabrics: FabricItem[] } {
  localStorage.removeItem(CLIENTS_KEY);
  localStorage.removeItem(ORDERS_KEY);
  localStorage.removeItem(FABRICS_KEY);
  return {
    clients: INITIAL_CLIENTS,
    orders: INITIAL_ORDERS,
    fabrics: INITIAL_FABRICS
  };
}
