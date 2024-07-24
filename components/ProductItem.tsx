import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Link, useSegments } from "expo-router";
import { IProduct } from "@/interfaces/IProduct";
import { defaultPizzaImage } from "@/assets/data/defaultPizzaImage";

interface IProductItemProps {
  product: IProduct;
}

export default function ProductItem({ product }: IProductItemProps) {
  const segments = useSegments();

  return (
    <Link href={`${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
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
