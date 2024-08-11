import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MapboxSearch from './components/MapboxSearch';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, marginTop: 50}}>
      <MapboxSearch country="ug"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
