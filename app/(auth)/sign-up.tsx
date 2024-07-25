import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";

export default function signUn() {
  const [errors, setErrors] = useState();
  const router = useRouter();

  const onSubmit = () => {};
  //

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        // value={name}
        // onChangeText={setName}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        // value={price}
        // onChangeText={setPrice}
        secureTextEntry={true}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>

      <Button onPress={onSubmit} text="Create account" />

      <Text onPress={() => router.push("/sign-in")} style={styles.textButton}>
        Sign In
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 10 },
  label: { color: "gray", fontSize: 16 },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
