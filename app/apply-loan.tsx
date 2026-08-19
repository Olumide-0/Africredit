import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useLoan } from "../contexts/LoanContext";

const applicationDetails = [
  { label: "Amount", value: "N250,000" },
  { label: "Purpose", value: "Inventory & stock" },
  { label: "Duration", value: "1 month" },
  { label: "Interest rate", value: "3.5% / month" },
  { label: "Total repayment", value: "N258,750" },
  { label: "Monthly repayment", value: "N258,750 / month" },
  { label: "Disbursed to", value: "GTBank *****1234" },
];

export default function ApplyLoan() {
  const { setStatus } = useLoan();

  const handleTerminate = () => {
    Alert.alert(
      "Terminate application?",
      "This will cancel your loan request. This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Terminate",
          style: "destructive",
          onPress: () => {
            setStatus("eligible");
            router.replace("/(tabs)/home");
          },
        },
      ]
    );
  };

  // Demo-only trigger to preview the approval flow, since there's no backend
  // making a real approval decision yet. Remove once approvals are wired to
  // a real API/webhook.
  const handleSimulateApproval = () => {
    setStatus("activeLoan");
    router.push("/loan-approved");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#111827" />
        </Pressable>
        <View style={styles.reviewBadge}>
          <Text style={styles.reviewBadgeText}>Under Review</Text>
        </View>
      </View>

      <Text style={styles.title}>Review your application</Text>

      <View style={styles.detailsCard}>
        {applicationDetails.map((item, i) => (
          <View
            key={item.label}
            style={[
              styles.detailRow,
              i === applicationDetails.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <Pressable style={styles.demoButton} onPress={handleSimulateApproval}>
        <Text style={styles.demoButtonText}>
          Demo: Simulate approval
        </Text>
      </Pressable>

      <Pressable style={styles.terminateButton} onPress={handleTerminate}>
        <Text style={styles.terminateText}>Terminate application</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewBadge: {
    backgroundColor: "#FEF3E2",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  reviewBadgeText: {
    color: "#D97706",
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0EAE0",
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
  },
  detailLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  demoButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  demoButtonText: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  terminateButton: {
    backgroundColor: "#E7514F",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  terminateText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});