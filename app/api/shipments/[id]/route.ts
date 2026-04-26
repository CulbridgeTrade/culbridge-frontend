import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleAuthError } from '@/lib/auth';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/shipments/:id
 * EXPORTER: can only access own shipment
 * ADMIN: can access any shipment
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = requireAuth(req);
    const { id } = params;

    let result;
    if (user.role === 'ADMIN') {
      result = await pool.query(
        `SELECT s.*, u.email as exporter_email, u.company_name as exporter_name
         FROM shipments s
         LEFT JOIN users u ON s.user_id = u.id
         WHERE s.id = $1`,
        [id]
      );
    } else {
      result = await pool.query(
        `SELECT s.*, u.email as exporter_email, u.company_name as exporter_name
         FROM shipments s
         LEFT JOIN users u ON s.user_id = u.id
         WHERE s.id = $1 AND s.user_id = $2`,
        [id, user.userId]
      );
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json({ shipment: result.rows[0] }, { status: 200 });
  } catch (error) {
    return handleAuthError(error);
  }
}
