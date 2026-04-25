export interface ShipmentData {
  exporterId?: string;
  commodity: string;
  destination: string;
  weight: number;
}

export async function createShipment(data: ShipmentData): Promise<void> {
  const res = await fetch(`/api/shipments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to create shipment');
  }
}

export async function createCSF(data: Omit<ShipmentData, 'exporterId'>): Promise<void> {
  const res = await fetch(`/api/csf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to create CSF');
  }
}

export async function getShipments(filters?: Record<string, string>) {
  const params = filters ? new URLSearchParams(filters).toString() : '';
  const res = await fetch(`/api/shipments${params ? `?${params}` : ''}`);
  if (!res.ok) throw new Error('Failed to load shipments');
  return res.json();
}

export async function getShipmentSummary() {
  const res = await fetch(`/api/shipments/summary`);
  if (!res.ok) throw new Error('Failed to load summary');
  return res.json();
}
