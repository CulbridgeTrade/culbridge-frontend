import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Created CSF:', data);
    // TODO: save to DB
    return NextResponse.json({ success: true, id: 'csf-' + Date.now() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create CSF' }, { status: 400 });
  }
}
