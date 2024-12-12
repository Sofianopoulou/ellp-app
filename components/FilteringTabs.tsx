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
      style={styles.srollView}
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
  srollView: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: colors.white,
    fontFamily: "Lexend-Light",
  },
  selectedTab: {
    transform: [{ scale: 1.1 }],
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.85,
    shadowRadius: 3.84,
  },
});

export default FilteringTabs;
