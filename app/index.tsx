import { Link } from "expo-router";
import { Text, View } from "react-native";
import "./global.css"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e",
        gap: 20,
      }}
    >
      <View style={{ gap: 10, alignItems: "center", padding: 20 , borderRadius: 10, backgroundColor: "#3b3f46", width: "80%"}}>
        <Text style={{ color: "#f9f9f9", fontSize: 36, fontWeight: "bold", textTransform: "uppercase" }}>go home</Text>
      <Text style={{ color: "#f9f9f9", fontSize: 18 }}>or</Text>
      <Text style={{ color: "#f9f9f9", fontSize: 18 }}>go to settings</Text>
      </View>
      <View style={{ gap: 10, alignItems: "center", padding: 20 , borderRadius: 10, backgroundColor: "#3b3f46",}}>
        <Link href="/about" ><Text style={{ color: "#000000", fontSize: 18, textDecorationLine: "underline", borderRadius: 5 }}>go to about</Text>
      </Link>
      </View>
    </View>
  );
}
