import { Alert } from "react-native";
import { supabase } from "./supabase";
import { FunctionsHttpError } from "@supabase/supabase-js";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });

  console.log("error", error);

  if (data) {
    return data;
  }

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    console.log("Function returned an error", errorMessage);
  }

  Alert.alert("Error fetching payment sheet params");
  return {};
};

export const initializePaymentSheet = async (amount: number) => {
  console.log("initializePaymentSheet for", amount);
  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );

  if (!paymentIntent || !publishableKey) return;

  await initPaymentSheet({
    merchantDisplayName: "pizzaApp",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "Jane Doe",
    },
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();
  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};
