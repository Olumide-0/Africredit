import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OTP() {
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    if (seconds === 0) {
      return;
    }
    const timer = setInterval(() => {
      setSeconds((previous) => previous - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = () => {
    if (seconds > 0) {
      return;
    }

    // For now, simulate sending a new code
    alert("A new verification code has been sent.");

    // Restart the countdown
    setSeconds(30);

    // Clear the old OTP
    setOtp(["", "", "", "", "", ""]);

    // Focus the first box
    inputRefs.current[0]?.focus();
  };

  const { phone } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Allow numbers only
    const number = text.replace(/[^0-9]/g, "");

    const newOtp = [...otp];
    newOtp[index] = number.slice(-1);
    setOtp(newOtp);

    // Move to the next box
    if (number && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    // Move backwards when deleting
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("Please enter the 6-digit code");

      setOtp(["", "", "", "", "", ""]);

      // Focus the first box
      inputRefs.current[0]?.focus();
      return;
    }
    if (code !== "123456") {
      alert("Invalid verification code.Please try again.");

      // Clear the OTP
      setOtp(["", "", "", "", "", ""]);

      // Focus the first box
      inputRefs.current[0]?.focus();
      return;
    }

    alert("Code verified successfully!");
    router.push({
      pathname: "/create-account",
      params: {
        phone: phone,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Step indicator */}
      <View style={styles.stepRow}>
        <Text style={styles.createAccount}>Create Your Account</Text>

        <Text style={styles.dot}>•</Text>

        <Text style={styles.step}>Step 2 of 3</Text>
      </View>

      {/* Heading */}
      <Text style={styles.title}>Enter the 6-digit code</Text>

      {/* Phone number */}
      <View style={styles.phoneRow}>
        <Text style={styles.sentText}>Sent to</Text>

        <Text style={styles.phoneNumber}>+234{phone}</Text>

        <Text style={styles.dot}>•</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.changeNumber}>Change number</Text>
        </TouchableOpacity>
      </View>

      {/* OTP boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={styles.otpBox}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      {/* Resend */}
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn't get it? </Text>

        {seconds > 0 ? (
          <Text style={styles.resendText}>
            Resend code in{" "}
            <Text style={styles.timer}>
              00:{seconds.toString().padStart(2, "0")}
            </Text>
          </Text>
        ) : (
          <Text style={styles.resendLink} onPress={handleResend}>
            Resend code
          </Text>
        )}
      </View>

      {/* Verify button */}
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF3",
    paddingHorizontal: 24,
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

  createAccount: {
    fontSize: 22,
    fontWeight: "600",
    color: "#28A982",
  },

  dot: {
    fontSize: 22,
    color: "#28A982",
    marginHorizontal: 8,
  },

  step: {
    fontSize: 20,
    color: "#70BCA8",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 36,
  },

  sentText: {
    fontSize: 18,
    color: "#777",
  },

  phoneNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginLeft: 5,
  },

  changeNumber: {
    fontSize: 16,
    color: "#28A982",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  otpBox: {
    width: 48,
    height: 64,
    borderWidth: 2,
    borderColor: "#D8D8D8",
    borderRadius: 14,
    backgroundColor: "#FFF",
    fontSize: 24,
    color: "#111",
  },

  resendRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  resendLink: {
    color: "#28A982",
    fontWeight: "600",
  },

  resendText: {
    fontSize: 18,
    color: "#777",
  },

  timer: {
    fontSize: 18,
    color: "#28A982",
    fontWeight: "600",
  },

  button: {
    position: "absolute",
    bottom: 30,
    left: 36,
    right: 36,
    height: 82,
    borderRadius: 18,
    backgroundColor: "#28A982",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
});
