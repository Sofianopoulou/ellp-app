import { View, FlatList, Animated } from "react-native";
import { useState, useRef, useEffect } from "react";

import slides from "@/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import SmallButtonComponent from "../SmallButtonComponent";
import SkipButton from "./SkipButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLogoPage, setShowLogoPage] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoPage(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const viewableItemChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNextPress = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
      } catch (err) {
        console.log("Error @setItem: ", err);
      }
    }

    console.log("currentIndex: ", currentIndex);
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemChanged}
        scrollEventThrottle={32}
        ref={slidesRef}
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
      />
      <Paginator data={slides} scrollX={scrollX} />
      <View className="items-center" style={{ height: 64 }}>
        <SmallButtonComponent title="Next" onPress={handleNextPress} />
      </View>
      {currentIndex < slides.length - 1 && (
        <View className="items-center">
          <Link href="/">
            <SkipButton
              title="Skip"
              onPress={async () =>
                await AsyncStorage.setItem("@viewedOnboarding", "true")
              }
            />
          </Link>
        </View>
      )}
    </View>
  );
};

export default Onboarding;
