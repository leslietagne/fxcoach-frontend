import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const PREMIUM_PRICE_ID = process.env.REACT_APP_STRIPE_PRICE_ID;

