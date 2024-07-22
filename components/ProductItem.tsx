import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Product } from "@/interfaces/Product";

const defaultPizzaImage =
  "https://prajo.eu/8773-large_default/deska-do-pizzy-bambus-o35cm-kinghoff.jpg";

interface IProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: IProductItemProps) {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.title}>Price: ${product.price}</Text>
        {/* <Link href={"/product"}>Go to product details</Link> */}
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
