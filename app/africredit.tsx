import { useEffect } from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import logoImg from "../assets/images/Frame_286.png";

export default function Africredit() {
  const router = useRouter();
  const { manual } = useLocalSearchParams<{ manual?: string }>();

  useEffect(() => {
    if (manual === "1") return; // came here via back button — don't auto-advance

    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 1500);

    return () => clearTimeout(timer);
  }, [manual]);

  return (
    <Pressable
      style={styles.container}
      onPress={manual === "1" ? () => router.replace("/onboarding") : undefined}
    >
      <Image source={logoImg} style={styles.logo} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF2",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 191,
    height: 130,
    resizeMode: "contain",
  },
});