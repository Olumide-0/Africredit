import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateAccount() {
  const router = useRouter();

  const { phone } = useLocalSearchParams();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const getPasswordStrength = () => {
    if (password.length === 0) {
      return "";
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const score = [
      password.length >= 8,
      hasUppercase,
      hasLowercase,
      hasNumber,
    ].filter(Boolean).length;

    if (score <= 1) {
      return "Weak password";
    }

    if (score <= 3) {
      return "Medium password";
    }

    return "Strong password";
  };

  const handleCreateAccount = () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    router.push("./account-created");
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Step indicator */}
      <View style={styles.stepRow}>
        <Text style={styles.stepTitle}>Create Your Account</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.stepNumber}>Step 3 of 3</Text>
      </View>

      {/* Heading */}
      <Text style={styles.title}>Create account</Text>

      <Text style={styles.subtitle}>
        Create account with Phone number and password
      </Text>

      {/* Phone number */}
      <Text style={styles.label}>Phone number</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.phoneText}>{phone || "Phone number"}</Text>
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter a password"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.eye}>{showPassword ? "◉" : "◉"}</Text>
        </TouchableOpacity>
      </View>

      {/* Password strength */}
      {password.length > 0 && (
        <Text style={styles.passwordStrength}>{getPasswordStrength()}</Text>
      )}

      {/* Create account button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateAccount}
      >
        <Text style={styles.createButtonText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF3",
    paddingHorizontal: 36,
    paddingTop: 30,
  },

  backButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  backArrow: {
    fontSize: 32,
    color: "#111",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },

  stepTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#28A982",
  },

  dot: {
    fontSize: 22,
    color: "#28A982",
    marginHorizontal: 10,
  },

  stepNumber: {
    fontSize: 22,
    color: "#75BCA5",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 21,
    color: "#777",
    marginBottom: 36,
  },

  label: {
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
  },

  inputContainer: {
    height: 70,
    borderWidth: 2,
    borderColor: "#D8D8D8",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 28,
  },

  phoneText: {
    fontSize: 21,
    color: "#333",
  },

  passwordContainer: {
    height: 70,
    borderWidth: 2,
    borderColor: "#D8D8D8",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  passwordInput: {
    flex: 1,
    fontSize: 20,
    color: "#333",
  },

  eye: {
    fontSize: 26,
    color: "#111",
  },

  passwordStrength: {
    fontSize: 20,
    color: "#28A982",
    fontWeight: "600",
    marginTop: 10,
  },

  createButton: {
    position: "absolute",
    left: 36,
    right: 36,
    bottom: 32,
    height: 82,
    borderRadius: 20,
    backgroundColor: "#28A982",
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
