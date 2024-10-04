import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getMovieDetails } from '../../services/api';

export default function MoreScreen({ navigation,route }) {
  const { id } = route.params;  // Get the movie id from the route
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details when the component mounts
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        // console.log(response.data); // This will contain all the movie details
  
        setMovieDetails(response.data); // Use response.data here
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    fetchMovieDetails();
  }, [id]);
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>Movie details not found.</Text>
      </View>
    );
  }

  const { title, poster_path, overview, release_date, vote_average, popularity } = movieDetails;

  return (
    <View style={styles.container}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }} // Display movie poster
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>Release Date: {release_date}</Text>
      <Text style={styles.text}>Popularity: {popularity}</Text>
      <Text style={styles.text}>Vote Average: {vote_average}</Text>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  );
}

// Styles for the movie details screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
