import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {writeExercise} from '../utils/api/writeExercise.ts';
import ExerciseForm from '../component/ExerciseForm.tsx';
import {Exercise} from '../utils/api/getExercices.ts';
import {useAuthContext} from '../contexts/AuthContext.tsx';
import Login from '../component/Login.tsx';
import {COLORS} from '../utils/constants.ts';

const AccountScreen = () => {
  const {user} = useAuthContext('AccountScreen');
  const [hideForm, setHideForm] = useState(true);

  const pushExercise = async (exercise: Exercise) => {
    writeExercise(exercise);
    setHideForm(!hideForm);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {hideForm && <Login />}
      {user && (
        <>
          {hideForm ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setHideForm(!hideForm)}>
              <Text>{'Ajouter un exercice'}</Text>
            </TouchableOpacity>
          ) : (
            <ExerciseForm onSubmit={exercise => pushExercise(exercise)} />
          )}
        </>
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
});
