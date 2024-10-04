import React, { useState } from 'react';
import {StyleSheet } from 'react-native';
import { Center, Button, Text, View,  } from '@gluestack-ui/themed'; 
import Form from '../forms/Form'; // Check this path
import { searchMovies } from '../../services/api'; // Check this path
import MoviesList from '../lists/MoviesList'; // Check this path
import CustomBottomDrawer from '../Drawer/CustomBottomDrawer';

export default function Search(props) {
  const [query, setQuery] = useState('multi'); // State to track the search input
  const [loading, setLoading] = useState(false); // Loading state while fetching data
  const [error, setError] = useState(null); // Error state
  const [movies, setMovies] = useState([]); // State for search results
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for opening and closing the drawer
  const { navigation } = props;

  const handleInputChange = (text) => {
    setQuery(text); // Update the query based on input
  };

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent searching with an empty query
    setLoading(true); // Start loading

    try {
      console.log(query)
      const response = await searchMovies(query); // Call API to search movies
      // console.log(response.data.results,"LOGG")
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
      <Button 
        title="Open Drawer" 
        onPress={() => setDrawerOpen(true)} 
        style={{ marginTop: 20 }} 
      />
      <CustomBottomDrawer 
        isActive={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        categories={['multi','movie']} 
        selectedCategory={query} 
        onSelectCategory={(category) => { 
          setQuery(category); 
          handleSearch(); 
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
    // backgroundColor: '#f9f9f9',
    height:500,
    
  },
  noResultsText: {
    fontSize: 16,
    color: '#555',
  },
});
