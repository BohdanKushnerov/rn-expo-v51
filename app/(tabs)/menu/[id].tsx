import { products } from "@/assets/data/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

const defaultPizzaImage =
  "https://prajo.eu/8773-large_default/deska-do-pizzy-bambus-o35cm-kinghoff.jpg";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: { width: "100%", aspectRatio: 1 },
  price: { fontSize: 18, fontWeight: "bold" },
});
