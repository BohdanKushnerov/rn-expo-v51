import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        onPress={async () => await supabase.auth.signOut()}
        text="Sign out"
      />
    </View>
  );
}
