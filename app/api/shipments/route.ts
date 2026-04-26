import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requireRole, handleAuthError } from '@/lib/auth';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/shipments
 * EXPORTER: sees only own shipments
 * ADMIN: sees all shipments
 */
export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status');

    // ADMIN sees all shipments
    if (user.role === 'ADMIN') {
      const result = await pool.query(
        `SELECT s.*, u.email as exporter_email, u.company_name as exporter_name
         FROM shipments s
         LEFT JOIN users u ON s.user_id = u.id
         ORDER BY s.created_at DESC`
      );
      return NextResponse.json({ shipments: result.rows }, { status: 200 });
    }

    // EXPORTER sees only own shipments
    const result = await pool.query(
      `SELECT s.*, u.email as exporter_email, u.company_name as exporter_name
       FROM shipments s
       LEFT JOIN users u ON s.user_id = u.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [user.userId]
    );

    let shipments = result.rows;
    if (statusFilter) {
      shipments = shipments.filter((s: any) => s.compliance_status === statusFilter);
    }

    return NextResponse.json({ shipments }, { status: 200 });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/shipments
 * EXPORTER only — creates shipment for authenticated user.
 */
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    requireRole(user, ['EXPORTER']);

    const body = await req.json();

    const result = await pool.query(
      `INSERT INTO shipments (user_id, product, destination, weight, hs_code, status)
       VALUES ($1, $2, $3, $4, $5, 'PENDING')
       RETURNING *`,
      [user.userId, body.product, body.destination, body.weight, body.hs_code]
    );

    return NextResponse.json({ shipment: result.rows[0] }, { status: 201 });
  } catch (error) {
    return handleAuthError(error);
  }
}
