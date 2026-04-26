import { NextRequest, NextResponse } from "next/server";
import { requireAuth, handleAuthError } from "@/lib/auth";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/auth/me
 * Protected route — returns current authenticated user.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = requireAuth(req);

    const result = await pool.query(
      "SELECT id, email, role, company_name, tin FROM users WHERE id = $1",
      [authUser.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyName: user.company_name,
        tin: user.tin,
      },
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
