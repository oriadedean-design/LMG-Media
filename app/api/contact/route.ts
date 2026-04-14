import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create document in Sanity
    const result = await client.create({
      _type: 'formSubmission',
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      serviceInterest: data.serviceInterest,
      projectBudget: data.projectBudget,
      projectTimeline: data.projectTimeline,
      message: data.message,
      source: data.source || 'contact_form',
      submittedAt: new Date().toISOString(),
      status: 'new',
    }, {
      token: process.env.SANITY_API_TOKEN, // Requires a token with write access
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
