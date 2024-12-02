import colors from "@/assets/colors/colors";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

type FilteringTabsProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  { name: "All", color: colors.all_tab },
  { name: "Food", color: colors.food_tab },
  { name: "Entertainment", color: colors.enertainment_tab },
  { name: "Fitness", color: colors.fitness_tab },
  { name: "Adventure", color: colors.adventure_tab },
  { name: "Accommodation", color: colors.accommodation_tab },
  { name: "Travel", color: colors.travel_tab },
];

const FilteringTabs: React.FC<FilteringTabsProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 30, marginBottom: 10, marginHorizontal: 20 }}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.name}
          style={[
            styles.tab,
            {
              backgroundColor: category.color,
              ...(selectedCategory === category.name && styles.selectedTab),
            },
          ]}
          onPress={() => onCategoryChange(category.name)} // Call the callback here
        >
          <Text style={styles.tabText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6
  },
  tabText: {
    color: colors.white,
    fontFamily: "Lexend-Light",
  },
  selectedTab: {
    elevation: 4, // Elevation for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.85,
    shadowRadius: 3.84,
  },
});

export default FilteringTabs;
