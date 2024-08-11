// MapboxSearch.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const MAPBOX_API_KEY = Constants.expoConfig?.extra?.mapboxApiKey || 
                       Constants.manifest?.extra?.mapboxApiKey || 
                       'YOUR_DEFAULT_MAPBOX_API_KEY';

const MapboxSearch = ({ country }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async () => {
    try {
      let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_API_KEY}&autocomplete=true`;
      
      // Add country filter if provided
      if (country) {
        url += `&country=${country}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const renderSuggestion = ({ item }) => (
    <Text style={styles.suggestion}>{item.place_name}</Text>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a place"
      />
      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default MapboxSearch;