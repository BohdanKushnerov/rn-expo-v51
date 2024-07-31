// esm.sh is used to compile stripe-node to be compatible with ES modules.
// import Stripe from "https://esm.sh/stripe@16.5.0?target=deno&deno-std=0.132.0&no-check";
import Stripe from "https://esm.sh/stripe@16.5.0";

export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
});
