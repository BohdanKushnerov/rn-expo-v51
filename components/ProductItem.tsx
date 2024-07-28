import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Link, useSegments } from "expo-router";
import { defaultPizzaImage } from "@/assets/data/defaultPizzaImage";
import { Product } from "@/types/Product";
import RemoteImage from "./RemoteImage";

interface IProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: IProductItemProps) {
  const segments = useSegments();

  return (
    <Link href={`${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.title}>Price: ${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
