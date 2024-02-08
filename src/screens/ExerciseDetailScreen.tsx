import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

const ExerciseDetailScreen = ({route}: {route: any}) => {
  const {exercise} = route.params;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}>
      <Text>{exercise.title}</Text>
    </ScrollView>
  );
};

export default ExerciseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
