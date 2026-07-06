import { NextResponse } from 'next/server';
import { createShopCheckoutSession } from '@/lib/checkout';
import { getSiteUrl } from '@/lib/stripe';

export const runtime = 'nodejs';

type CheckoutBody = {
  slug?: string;
  format?: 'handmade' | 'digital';
  withFrame?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;

    if (!body.slug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }

    const session = await createShopCheckoutSession(
      {
        slug: body.slug,
        format: body.format,
        withFrame: body.withFrame,
      },
      getSiteUrl(),
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';

    if (message.includes('STRIPE_SECRET_KEY')) {
      return NextResponse.json({ error: 'Payments are not configured yet' }, { status: 503 });
    }

    const status = message.includes('not found') ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
