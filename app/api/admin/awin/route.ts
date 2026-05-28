// API route for Awin admin operations
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Awin admin route' });
}