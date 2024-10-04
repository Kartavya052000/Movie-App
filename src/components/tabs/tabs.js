import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Movies from '../containers/Movies';
import Search from '../containers/Search';
import TvShows from '../containers/TvShows';

const CustomTabView = (props) => {
  // Define the tabs with components as content
const {navigation} =props

  const tabs = [
    { label: 'Movies', content: <Movies navigation={navigation} /> },
    { label: 'Search', content: <Search navigation={navigation} /> },
    { label: 'TV Shows', content: <TvShows navigation={navigation} /> },
  ];
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={styles.tabHeader}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[
              styles.tabButton,
              activeTab === tab.label && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.label)}
          >
            <Text style={styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </View>
    </View>
  );
};

// Example Tab Content Components
const TabContent1 = () => <Text>Component Content 1</Text>;
const TabContent2 = () => <Text>Component Content 2</Text>;
const TabContent3 = () => <Text>Component Content 3</Text>;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  tabHeader: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#ccc' },
  tabButton: { padding: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#007BFF' },
  tabText: { fontSize: 16 },
  tabContent: { marginTop: 20 },
});

export default CustomTabView;
