'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
// import type { ShipmentData } from '@/lib/api';
import { createShipment, createCSF } from '@/lib/api';

const shipmentSchema = z.object({
  commodity: z.enum(['cocoa', 'sesame', 'ginger', 'cashew', 'beans']).default('cocoa'),
  destination: z.enum(['NL', 'DE']).default('NL'),
  weight: z.coerce.number().min(1, 'Weight must be at least 1kg').max(1000000),
});

type FormData = z.infer<typeof shipmentSchema>;

interface ShipmentFormProps {
  exporterId?: string;
  onSuccess: () => void;
  trigger?: React.ReactNode;
  title?: string;
}

export function ShipmentForm({ exporterId, onSuccess, trigger, title = 'Create Shipment' }: ShipmentFormProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<FormData>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      commodity: 'cocoa',
      destination: 'NL',
      weight: 100,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      if (exporterId) {
        await createShipment({ exporterId, ...data });
      } else {
        await createCSF(data);
      }
      onSuccess();
      form.reset();
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
{trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Create new shipment record</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Commodity</label>
            <select {...form.register('commodity')} className="w-full border rounded-md px-3 py-2 bg-white">
              <option value="cocoa">Cocoa</option>
              <option value="sesame">Sesame</option>
              <option value="ginger">Ginger</option>
              <option value="cashew">Cashew</option>
              <option value="beans">Beans</option>
            </select>
            {form.formState.errors.commodity && <p className="text-sm text-red-600">{form.formState.errors.commodity.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <select {...form.register('destination')} className="w-full border rounded-md px-3 py-2 bg-white">
              <option value="NL">Netherlands</option>
              <option value="DE">Germany</option>
            </select>
            {form.formState.errors.destination && <p className="text-sm text-red-600">{form.formState.errors.destination.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Weight (kg)</label>
            <input 
              type="number" 
              {...form.register('weight', { valueAsNumber: true })} 
              className="w-full border rounded-md px-3 py-2"
            />
            {form.formState.errors.weight && <p className="text-sm text-red-600">{form.formState.errors.weight.message}</p>}
          </div>
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">{error}</div>}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : exporterId ? 'Create Shipment' : 'Submit CSF'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

