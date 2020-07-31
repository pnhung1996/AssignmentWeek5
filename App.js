import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ArticleScreen from './screens/ArticleScreen';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ArticleScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop : 20
  },
});
