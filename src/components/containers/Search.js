import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Center, Text, View } from '@gluestack-ui/themed';
import Form from '../forms/Form'; // Check this path
import { search } from '../../services/api'; // Check this path
import MoviesList from '../lists/MoviesList'; // Check this path
import CustomBottomDrawer from '../Drawer/CustomBottomDrawer';
import { Ionicons } from '@expo/vector-icons';
import { Box } from '@gluestack-ui/themed';

export default function Search(props) {
  const [query, setQuery] = useState(''); // State to track the search input
  const [loading, setLoading] = useState(false); // Loading state while fetching data
  const [error, setError] = useState(null); // Error state
  const [movies, setMovies] = useState([]); // State for search results
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for opening and closing the drawer
  const [selectedCategory, setSelectedCategory] = useState('multi'); // State for the selected category
  const { navigation } = props;

  const handleInputChange = (text) => {
    setQuery(text); // Update the query based on input
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setMovies([]); // Clear results when query is empty
      return; // Prevent searching with an empty query
    }
    setLoading(true); // Start loading

    try {
      const response = await search(query, selectedCategory); // Call API to search movies
      console.log(response.data.results[0])
      setMovies(response.data.results); // Update state with search results
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to load search results.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Center px={2}>
      <Form 
        value={query} 
        onInputChange={handleInputChange} 
        onSubmit={handleSearch} // Ensure Form can handle this prop
      />
      <Text fontSize={16} color="#333" marginBottom={2}>
        Choose Search Type:
      </Text>
      <Box borderWidth={1} borderColor="#06b6d4" borderRadius={8} padding={4} width="25%">
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text fontSize={18} color="#333">
            {selectedCategory} {/* Display selected category */}
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color="#06b6d4"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </Box>
      <CustomBottomDrawer 
        isActive={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        categories={['multi', 'movie']} 
        selectedCategory={selectedCategory} 
        onSelectCategory={(category) => { 
          setSelectedCategory(category); // Update the selected category
          setQuery(''); // Optionally clear the search query
          // setMovies([]); /x/ Clear previous results when category changes
        }} 
      />
      
      {/* Display loading indicator and error message */}
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* Results */}
      {movies.length > 0 ? (
        <MoviesList content={movies} navigation={navigation} />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Please search for movies</Text>
        </View>
      )}
    </Center>
  );
}

// Styles
const styles = StyleSheet.create({
  noResultsContainer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    height: 500,
  },
  noResultsText: {
    fontSize: 16,
    color: '#555',
  },
});
