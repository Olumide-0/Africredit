import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TakeSelfie() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Selfie frame */}
      <View style={styles.selfieFrame} />

      {/* Take selfie button */}
      <TouchableOpacity
        style={styles.takeSelfieButton}
        onPress={() => router.push("/verify-selfie")}
      >
        <Text style={styles.takeSelfieText}>Take selfie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF2",
  },

  backButton: {
    position: "absolute",
    top: 98,
    left: 34,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  backText: {
    fontSize: 32,
    color: "#222222",
    marginTop: -3,
  },

  selfieFrame: {
    position: "absolute",
    top: 182,
    left: "17%",
    width: "66%",
    height: 465,
    borderWidth: 2,
    borderColor: "#54B99D",
    borderStyle: "dashed",
    borderRadius: 150,
    display: "none",
  },

  takeSelfieButton: {
    position: "absolute",
    left: 36,
    right: 36,
    bottom: 105,
    height: 82,
    borderRadius: 16,
    backgroundColor: "#2CAF8A",
    alignItems: "center",
    justifyContent: "center",
  },

  takeSelfieText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
});
