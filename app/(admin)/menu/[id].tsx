import { products } from "@/assets/data/products";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/assets/data/defaultPizzaImage";
import { pizzaSizes } from "@/constants/pizzaSizes";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types/PizzaSize";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useProduct } from "@/api/products";

export default function ProductDetailsScreen() {
  const { id: idString } = useLocalSearchParams();

  if (!idString) {
    return <Text>Invalid product ID</Text>;
  }

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();
  const colorScheme = useColorScheme();

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen
        // name="[id]"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors[colorScheme ?? "light"].tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
