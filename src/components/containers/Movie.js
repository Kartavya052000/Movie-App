import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getDetails } from '../../services/api'; // Import the necessary function
import { Center } from '@gluestack-ui/themed';

export default function MoreScreen({ navigation, route }) {
  const { id, type } = route.params; // Get the ID and type from the route params
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getDetails(id, type); // Fetch details based on type
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]); // Add type to the dependency array

  // Set the navigation title to the details title when fetched
  useEffect(() => {
    if (details) {
      const title = type === 'movie' ? details.title : details.name; // Use name for TV shows
      navigation.setOptions({ title }); // Update the screen title
    }
  }, [details, navigation, type]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Details not found.</Text>
      </View>
    );
  }

  const { poster_path, overview, release_date, popularity } = details;

  return (
    <Center px={10}>
      <Text style={styles.title}>{type === 'movie' ? details.title : details.name}</Text>

      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }} // Display poster
      />
      <Text style={styles.overview}>{overview}</Text>

      <Text style={styles.text}>
        Popularity: {popularity} | Release Date: {release_date}
      </Text>
    </Center>
  );
}

// Styles for the movie/tv show details screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  poster: {
    width: '80%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    width: '80%',
    marginTop: 10,
  },
  overview: {
    fontSize: 14,
    color: '#555',
    marginTop: 18,
    width: '80%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
