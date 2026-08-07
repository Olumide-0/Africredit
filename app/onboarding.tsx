import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import secureImg from "../assets/images/image 3 (1).png";
import businessImg from "../assets/images/image 4.png";

const slides = [
//   {
//     image: secureImg,
//     label: "SAFE & SECURE",
//     title: "Your information is encrypted",
//     description:
//       "Your information is encrypted and protected every step of the way.",
//   },
//   {
//     image: businessImg,
//     label: "BUILT FOR YOUR BUSINESS",
//     title: "We support your next move",
//     description:
//       "Inventory, equipment, emergencies, or growth. We're here to support your next move.",
//   },
  {
    image: secureImg,
    label: "SAFE & SECURE",
    title: "Your information is encrypted",
    description:
      "Your information is encrypted and protected every step of the way.",
  },
  {
    image: businessImg,
    label: "BUILT FOR YOUR BUSINESS",
    title: "We support your next move",
    description:
      "Inventory, equipment, emergencies, or growth. We're here to support your next move.",
  },
];

export default function Onboarding() {
  return (
    <View style={{ flex: 1, backgroundColor: "#16294D" }}>
      {/* Skip: static, left-aligned for now */}
      <Pressable
        style={{
          alignSelf: "flex-start",
          padding: 20,
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "medium" }}>Skip</Text>
      </Pressable>

      {/* Swipeable pages */}
      <PagerView style={{ flex: 1 }} initialPage={0}>
        {slides.map((slide, i) => (
          <View key={i} style={styles.page}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.label}>{slide.label}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </PagerView>

      {/* Bottom controls */}
      <View style={styles.controls}>
        <Pressable
          disabled
          style={[styles.circleButton, { backgroundColor: "#2d3340" }]}
        >
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>

        {/* Dots: static, first slide active */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === 0 ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === 0 ? "#22c55e" : "#4b5563",
              }}
            />
          ))}
        </View>

        <Pressable
          style={[styles.circleButton, { backgroundColor: "#22c55e" }]}
        >
          <Text style={[styles.arrowText, { color: "#fff" }]}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    // width: "100%",
    height: 500,
    resizeMode: "contain",
    // marginTop: 20,
  },
  label: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 24,
    textTransform: "uppercase",
  },
  title: {
    color: "#f9f9f9",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  description: {
    color: "#9ca3af",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    color: "#f9f9f9",
    fontSize: 18,
  },
});