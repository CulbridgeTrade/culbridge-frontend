import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireRole, handleAuthError } from "@/lib/auth";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/shipments
 * ADMIN ONLY — returns all shipments with exporter details.
 */
export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);
    requireRole(user, ["ADMIN"]);

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    let query = `
      SELECT s.*, u.email as exporter_email, u.company_name as exporter_name
      FROM shipments s
      LEFT JOIN users u ON s.user_id = u.id
    `;
    const params: any[] = [];

    if (statusFilter) {
      query += ` WHERE s.compliance_status = $1`;
      params.push(statusFilter);
    }

    query += ` ORDER BY s.created_at DESC`;

    const result = await pool.query(query, params);

    return NextResponse.json(
      { shipments: result.rows, count: result.rows.length },
      { status: 200 }
    );
  } catch (error) {
    return handleAuthError(error);
  }
}
