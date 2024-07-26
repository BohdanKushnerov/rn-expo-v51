import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { defaultPizzaImage } from "@/assets/data/defaultPizzaImage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";

export default function CreateProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { id: idString = "" } = useLocalSearchParams();
  const isUpdating = !!idString;
  const router = useRouter();

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { mutate: insertProduct, isPending: isInserting } = useInsertProduct();
  const { mutate: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    setErrors("");

    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess() {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess() {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create product" }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>

      {!isUpdating && (
        <Button
          onPress={onSubmit}
          text={isInserting ? "Creating" : "Create"}
          disabled={isInserting}
        />
      )}
      {isUpdating && (
        <Button
          onPress={onSubmit}
          text={isUpdatingProduct ? "Updating" : "Update"}
          disabled={isUpdatingProduct}
        />
      )}
      {isUpdating && (
        <Text
          style={styles.textButton}
          onPress={confirmDelete}
          disabled={isDeletingProduct}
        >
          {isDeletingProduct ? "Deleting" : "Delete"}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    borderRadius: 150,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});
