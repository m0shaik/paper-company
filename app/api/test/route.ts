import { NextResponse } from 'next/server';

export async function GET() {
    console.log('Test API route called at:', new Date().toISOString());

    return NextResponse.json({
        message: 'API is working!',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
    });
}
