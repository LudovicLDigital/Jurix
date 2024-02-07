import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {writeExercise} from '../utils/api/writeExercise.ts';
import ExerciseForm from '../component/ExerciseForm.tsx';
import {Exercise} from '../utils/api/getExercices.ts';

const AccountScreen = () => {
  const [hideForm, setHideForm] = useState(true);

  const pushExercise = async (exercise: Exercise) => {
    writeExercise(exercise);
    setHideForm(!hideForm);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {hideForm ? (
        <Button
          title={'Ajouter un exercice'}
          onPress={() => setHideForm(!hideForm)}
        />
      ) : (
        <ExerciseForm onSubmit={exercise => pushExercise(exercise)} />
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
