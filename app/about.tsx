import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#f9f9f9", fontSize: 24, fontWeight: "bold" }}>About screen</Text>
    </View>
  );
}