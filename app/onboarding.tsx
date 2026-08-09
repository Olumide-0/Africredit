import { useRef, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";

// Existing images
import secureImg from "../assets/images/image 3 (1).png";
import businessImg from "../assets/images/image 4.png";

// TODO: add these image files to assets/images/ — filenames below are placeholders
import fundingImg from "../assets/images/image 2.png";
import fastApprovalImg from "../assets/images/20945973 1.png";
import startJourneyImg from "../assets/images/image 5.png";

const slides = [
  {
    image: fundingImg,
    label: "BUSINESS FUNDING MADE SIMPLE",
    title: "Get up to $500 with your financial activity, not a valuable asset.",
    description: "",
  },
  {
    image: fastApprovalImg,
    label: "FAST APPROVALS",
    title: "Apply in under 5 minutes and receive a decision with 24 hours.",
    description: "",
  },
  {
    image: secureImg,
    label: "SAFE & SECURE",
    title: "Your information is encrypted and protected every step of the way.",
    description: "",
  },
  {
    image: businessImg,
    label: "BUILT FOR YOUR BUSINESS",
    title: "Inventory, equipment, emergencies, or growth. We're here to support your next move.",
    description: "",
  },
  {
    image: startJourneyImg,
    label: "START YOUR JOURNEY",
    title: "Create your account and discover how much your business could qualify for.",
    description: "",
  },
];

export default function Onboarding() {
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();
  const [page, setPage] = useState(0);
  const isFirst = page === 0;
  const isLast = page === slides.length - 1;

  const goNext = () => {
    if (!isLast) {
      pagerRef.current?.setPage(page + 1);
    }
  };

  const goBack = () => {
    if (isFirst) {
      router.push({ pathname: "/africredit", params: { manual: "1" } });
    } else {
      pagerRef.current?.setPage(page - 1);
    }
  };

  const handleGetStarted = () => {
    router.push("/welcome-auth");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#16294D" }}>
      {/* Skip */}
      <Pressable
        onPress={handleGetStarted}
        style={{ alignSelf: "flex-start" }}
      >
        <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "500", paddingTop: 36, paddingBottom: 36, paddingLeft: 20 }}>
          Skip
        </Text>
      </Pressable>

      {/* Swipeable pages */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {slides.map((slide, i) => (
          <View key={i} style={styles.page}>
            <Image source={slide.image} style={styles.image} />
            {slide.label ? <Text style={styles.label}>{slide.label}</Text> : null}
            <Text style={styles.title}>{slide.title}</Text>
            {slide.description ? (
              <Text style={styles.description}>{slide.description}</Text>
            ) : null}
          </View>
        ))}
      </PagerView>

      {/* Bottom controls */}
      {isLast ? (
        <View style={styles.lastControls}>
          <Pressable style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.controls}>
          <Pressable
            onPress={goBack}
            style={[styles.circleButton, { backgroundColor: "#22A67A" }]}
          >
            <Text style={[styles.arrowText, { color: "#ffffff80" }]}>‹</Text>
          </Pressable>

          {/* Dots */}
          <View style={{ flexDirection: "row", gap: 6 }}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === page ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === page ? "#22A67A" : "#ffffff80",
                }}
              />
            ))}
          </View>

          <Pressable
            onPress={goNext}
            style={[styles.circleButton, { backgroundColor: "#22A67A" }]}
          >
            <Text style={[styles.arrowText, { color: "#ffffff80" }]}>›</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 353,
    height: 500,
    resizeMode: "cover",
    borderRadius: 12,
  },
  label: {
    color: "#22A67A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    paddingTop: 25,
    textTransform: "uppercase",
    textAlign: "left",
    alignSelf: "stretch",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 8,
  },
  description: {
    color: "#9ca3af",
    fontSize: 15,
    textAlign: "left",
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
  lastControls: {
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
    color: "#ffffff80",
    fontSize: 28,
  },
  getStartedButton: {
    backgroundColor: "#22A67A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  getStartedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});