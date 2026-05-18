import Stripe from 'stripe';
import config from '.';

export const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2026-04-22.dahlia',
});