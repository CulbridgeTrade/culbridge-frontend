import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireRole, handleAuthError } from "@/lib/auth";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/farm-plots
 * EXPORTER only — list farm plots for the authenticated exporter.
 */
export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);
    requireRole(user, ["EXPORTER"]);

    const result = await pool.query(
      `SELECT id, plot_uuid, farm_name, area_ha, capture_method,
              vertex_count, deforestation_verified, combined_risk_score,
              combined_risk_level, status, created_at,
              ST_AsGeoJSON(geom) as geojson
       FROM farm_plots
       WHERE exporter_id = $1
       ORDER BY created_at DESC`,
      [user.userId]
    );

    const plots = result.rows.map((row: any) => ({
      ...row,
      geojson: row.geojson ? JSON.parse(row.geojson) : null,
    }));

    return NextResponse.json({ plots });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/farm-plots
 * EXPORTER only — create a new farm plot from GeoJSON polygon.
 */
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    requireRole(user, ["EXPORTER"]);

    const body = await req.json();
    const { farmName, geojson, captureMethod, vertexCount, accuracyMeters } = body;

    if (!geojson || !geojson.coordinates) {
      return NextResponse.json({ error: "Missing geojson" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO farm_plots
        (exporter_id, farm_name, geom, capture_method, vertex_count, accuracy_meters)
       VALUES ($1, $2, ST_GeomFromGeoJSON($3), $4, $5, $6)
       RETURNING id, plot_uuid, farm_name, area_ha, ST_AsGeoJSON(geom) as geojson, created_at`,
      [user.userId, farmName || null, JSON.stringify(geojson), captureMethod || "manual", vertexCount || geojson.coordinates[0].length - 1, accuracyMeters || null]
    );

    const plot = result.rows[0];
    plot.geojson = JSON.parse(plot.geojson);

    return NextResponse.json({ plot }, { status: 201 });
  } catch (error) {
    return handleAuthError(error);
  }
}
