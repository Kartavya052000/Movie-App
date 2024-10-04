import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';

const CustomBottomDrawer = ({ isActive, onClose, categories, selectedCategory, onSelectCategory }) => {
  const [panelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: false, // Set to false to hide the close button
    onClose: onClose,
  });

  return (
    <SwipeablePanel {...panelProps} isActive={isActive} style={styles.panel}>
      <View style={styles.panelContent}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.button,
              selectedCategory === category && styles.selectedButton,
            ]}
            onPress={() => {
              onSelectCategory(category);
              onClose();
            }}
          >
            <Text style={[
              styles.buttonText,
              selectedCategory === category && styles.selectedButtonText,
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalizes the first letter */}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SwipeablePanel>
  );
};

// Styles
const styles = StyleSheet.create({
  panel: {
    maxHeight: "40%", // Set maximum height to 200
    // height: 200, // Fixed height to 200
  },
  panelContent: {
    padding: 20,
  },
  button: {
    paddingVertical: 15,
    alignItems: 'flex-start', // Align text to the left
    marginBottom: 10,
    backgroundColor: 'transparent', // Default background color
    borderRadius: 5, // Add some rounding to the buttons
    paddingHorizontal:10
  },
  selectedButton: {
    backgroundColor: '#0e786d', // Green background for selected category
  },
  buttonText: {
    fontSize: 16,
    color: 'black', // Default text color
  },
  selectedButtonText: {
    color: 'white', // Text color for selected button
  },
});

export default CustomBottomDrawer;