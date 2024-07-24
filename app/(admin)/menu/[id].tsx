import { products } from "@/assets/data/products";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/assets/data/defaultPizzaImage";
import { pizzaSizes } from "@/constants/pizzaSizes";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types/PizzaSize";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

export default function ProductDetailsScreen() {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((product) => product.id.toString() === id);

  const addToCard = () => {
    if (!product) {
      return;
    }
    // console.warn("Adding to card, size: ", selectedSize);
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  contentContainer: {
    padding: 20,
  },
  image: { width: "100%", aspectRatio: 1, borderRadius: 50 },
  title: { fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 18, fontWeight: "bold" },
});
