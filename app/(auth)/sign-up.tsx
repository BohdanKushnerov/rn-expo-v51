import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function signUn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button
        disabled={loading}
        onPress={onSubmit}
        text={loading ? "Creating account..." : "Create account"}
      />

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
