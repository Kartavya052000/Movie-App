import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { Center } from '@gluestack-ui/themed';
import MoviesList from '../lists/MoviesList';
import { getMovies } from '../../services/api'; // Adjust the import path as necessary
import CustomBottomDrawer from '../Drawer/CustomBottomDrawer';

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('now_playing'); // Default query is 'now_playing'
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for opening and closing the drawer
const {navigation} =props
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // Set loading to true when fetching
      setError(null); // Reset error state
      try {
        const response = await getMovies(query); // Fetch movies based on the query
        setMovies(response.data.results); // Update the movies state
        // console.log(response.data.results[0])
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies.'); // Set error state
      } finally {
        // setLoading(false); // Set loading to false when done
      }
    };

    fetchMovies();
  }, [query]); // Run when query changes

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery); // Update the query when a different category is selected
  };

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator
  // }

  if (error) {
    return (
      <Center>
        <Text style={styles.errorText}>{error}</Text> 
      </Center>
    );
  }

  return (
    <Center px={2}>
         <Button 
        title="Open Drawer" 
        onPress={() => setDrawerOpen(true)} 
        style={styles.openDrawerButton} 
      />
    <CustomBottomDrawer 
  isActive={isDrawerOpen} 
  onClose={() => setDrawerOpen(false)} 
  categories={['now_playing', 'popular', 'top_rated', 'upcoming']} 
  selectedCategory={query} 
  onSelectCategory={handleQueryChange} 
/>

      <MoviesList content={movies} navigation={navigation} />

      
   
    </Center>
  );
}

// Styles
const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  openDrawerButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    color: '#fff',
  },
});
