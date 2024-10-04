import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Center } from '@gluestack-ui/themed'; 
// import Movi from '../lists/TVShowsList'; // Adjust the import path as necessary
import { getTVShows } from '../../services/api'; // Import the function to get TV shows
import MoviesList from '../lists/MoviesList';
import CustomBottomDrawer from '../Drawer/CustomBottomDrawer';
import { Ionicons } from '@expo/vector-icons';

export default function TvShows(props) {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('airing_today'); // Default query can be 'popular' or any other category
 const {navigation} = props;
 const [isDrawerOpen, setDrawerOpen] = useState(false); // State for opening and closing the drawer

const categories = {
  "airing today": "airing_today",
  "on the air": "on_the_air",
  "popular": "popular",
  "top rated": "top_rated"
};
const handleQueryChange = (newQuery) => {
  setQuery(categories[newQuery]); // Use correct category format
};
  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true); // Set loading to true when fetching
      setError(null); // Reset error state
      try {
        const response = await getTVShows(query); // Fetch TV shows based on the query
        console.log(response.data.results[0])
        setTVShows(response.data.results); // Update the TV shows state
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('Failed to load TV shows.'); // Set error state
      } finally {
        // setLoading(false); // Set loading to false when done
      }
    };

    fetchTVShows();
  }, [query]); // Run when query changes


  if (error) {
    return (
      <Center>
        <Text>{error}</Text> 
      </Center>
    );
  }

  return (
    <Center px={2}>
      <Box borderWidth={1} borderColor="#06b6d4" borderRadius={8} padding={4} width="35%">

      <TouchableOpacity onPress={() => setDrawerOpen(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.text}>
          {query}
        </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#06b6d4"
            style={styles.icon}
          />
      </TouchableOpacity>
      </Box>
      <CustomBottomDrawer
        isActive={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
     categories={Object.keys(categories)} // Display category keys
        selectedCategory={query.replace('_', ' ')}
        onSelectCategory={handleQueryChange}
      />
      {tvShows.length > 0 ? (
        <MoviesList content={tvShows} navigation={navigation} type="tv"/> // Use the TVShowsList component to display the shows
      ) : (
        <Text>No TV shows available.</Text> // Message when no TV shows are found
      )}
    </Center>
  );
}

// Styles
const styles = StyleSheet.create({
  // Add any styles you need here
});
