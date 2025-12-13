// app/api/dashboard/route.ts
import { fetchDashboardData } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchDashboardData();
  return NextResponse.json(data);
}
