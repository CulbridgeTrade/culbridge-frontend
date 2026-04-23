# ShipmentForm UI Refactor Progress

Approved plan implementation.

## Checklist

- [x] 1. Created `src/lib/api.ts` with createShipment and createCSF functions (with error handling, SSR-safe)

## Pending

- [ ] 2. Install react-hook-form (`cd culbridge-frontend && npm i react-hook-form zod @hookform/resolvers/zod`)
- [ ] 3. Read ui/input.tsx, label.tsx, select.tsx if exist
- [ ] 4. Refactor ShipmentForm.tsx:
  ```diff
  + import { Button } from '../ui/button'
  + import { Dialog, DialogContent, ... } from '../ui/dialog' 
  + import { createShipment, createCSF } from '../../src/lib/api'
  + import { useForm } from 'react-hook-form'
  ```
  - Use Dialog for CSF modal properly
  - Form validation
  - ui components for buttons/inputs/labels
  - Try/catch for API calls, error toast/state
- [ ] 5. Test: `cd culbridge-frontend && npm run dev`, open shipment form, test submit

Next: Step 2

