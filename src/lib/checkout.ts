import type Stripe from 'stripe';
import { getProductShopGroups } from '@/data/shop-catalog';
import {
  isVisceralPoemProduct,
  visceralPoemPrice,
  VISCERAL_POEM_SIZE,
  VISCERAL_POEMS_PRICING,
  type VisceralPoemFormat,
} from '@/data/visceral-poems-pricing';
import { getProduct } from '@/data/products';
import { getStripe } from '@/lib/stripe';

const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'GB',
    'CH',
    'NO',
    'IS',
    'US',
    'CA',
    'MX',
    'AR',
    'BR',
    'CL',
    'CO',
    'AU',
    'NZ',
    'JP',
  ];

const SHIPPING_OPTIONS: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1200, currency: 'eur' },
      display_name: 'Standard shipping (EU)',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 12 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 2800, currency: 'eur' },
      display_name: 'International shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 7 },
        maximum: { unit: 'business_day', value: 21 },
      },
    },
  },
];

export type CheckoutRequest = {
  slug: string;
  format?: VisceralPoemFormat;
  withFrame?: boolean;
};

function resolveVisceralPoemCheckout(product: NonNullable<ReturnType<typeof getProduct>>, input: CheckoutRequest) {
  const groups = getProductShopGroups(product);
  const format = input.format ?? (groups.includes('handmade') ? 'handmade' : 'digital');

  if (!groups.includes(format)) {
    throw new Error('Selected format is not available for this piece');
  }

  const withFrame = Boolean(input.withFrame);
  const amount = visceralPoemPrice(format, withFrame);
  const formatLabel = VISCERAL_POEMS_PRICING[format].label;

  return {
    amount,
    description: `${formatLabel} · ${VISCERAL_POEM_SIZE}${withFrame ? ' · white frame, no passepartout' : ' · without frame'}`,
    metadata: {
      slug: product.slug,
      category: product.category,
      format,
      withFrame: String(withFrame),
    },
  };
}

function resolvePaintingCheckout(product: NonNullable<ReturnType<typeof getProduct>>) {
  return {
    amount: product.price,
    description: product.edition ?? product.shortDescription,
    metadata: {
      slug: product.slug,
      category: product.category,
      format: '',
      withFrame: 'false',
    },
  };
}

export async function createShopCheckoutSession(input: CheckoutRequest, siteUrl: string) {
  const product = getProduct(input.slug);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.category === 'urees') {
    throw new Error('UREES pieces are sold at urees.shop');
  }

  if (product.availability === 'sold') {
    throw new Error('This piece has already been collected');
  }

  if (product.availability === 'coming-soon') {
    throw new Error('This piece is not available for checkout yet');
  }

  const checkout = isVisceralPoemProduct(product.category)
    ? resolveVisceralPoemCheckout(product, input)
    : resolvePaintingCheckout(product);

  const stripe = getStripe();
  const image = product.images[0];

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: checkout.amount * 100,
          product_data: {
            name: product.title,
            description: checkout.description,
            images: image ? [image] : undefined,
            metadata: checkout.metadata,
          },
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: SHIPPING_COUNTRIES,
    },
    shipping_options: SHIPPING_OPTIONS,
    phone_number_collection: { enabled: true },
    metadata: checkout.metadata,
    customer_creation: 'always',
    success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/shop/${product.slug}`,
  });

  if (!session.url) {
    throw new Error('Could not create checkout session');
  }

  return session;
}
