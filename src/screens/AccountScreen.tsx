import React from 'react';
import {StyleSheet, View} from 'react-native';
import {writeExercise} from '../utils/api/writeExercise.ts';
import ExerciseForm from '../component/ExerciseForm.tsx';
import {Exercise} from '../utils/api/getExercices.ts';

const AccountScreen = () => {
  const pushExercise = async (exercise: Exercise) => {
    writeExercise(exercise);
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ExerciseForm onSubmit={exercise => pushExercise(exercise)} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
