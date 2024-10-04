import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Center } from '@gluestack-ui/themed'; 
// import Movi from '../lists/TVShowsList'; // Adjust the import path as necessary
import { getTVShows } from '../../services/api'; // Import the function to get TV shows
import MoviesList from '../lists/MoviesList';

export default function TvShows(props) {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('popular'); // Default query can be 'popular' or any other category
 const {navigation} = props;
  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true); // Set loading to true when fetching
      setError(null); // Reset error state
      try {
        const response = await getTVShows(query); // Fetch TV shows based on the query
        // console.log(response.data.results[0])
        setTVShows(response.data.results); // Update the TV shows state
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('Failed to load TV shows.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchTVShows();
  }, [query]); // Run when query changes

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator
  }

  if (error) {
    return (
      <Center>
        <Text>{error}</Text> // Display error message
      </Center>
    );
  }

  return (
    <Center px={2}>
      {tvShows.length > 0 ? (
        <MoviesList content={tvShows} navigation={navigation} /> // Use the TVShowsList component to display the shows
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
