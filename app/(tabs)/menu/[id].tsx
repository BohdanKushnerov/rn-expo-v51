import { products } from "@/assets/data/products";
import Button from "@/components/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const defaultPizzaImage =
  "https://prajo.eu/8773-large_default/deska-do-pizzy-bambus-o35cm-kinghoff.jpg";

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetailsScreen() {
  const [selectedSize, setSelectedSize] = useState("M");
  const { id } = useLocalSearchParams();

  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCard = () => {
    console.warn("Adding to card, size: ", selectedSize);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              key={size}
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button onPress={addToCard} text="Add to card"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1, borderRadius: 50 },
  price: { fontSize: 18, fontWeight: "bold" },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: { fontSize: 20, fontWeight: "500" },
});
