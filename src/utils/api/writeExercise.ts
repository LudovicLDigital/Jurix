import firestore from '@react-native-firebase/firestore';
import {Exercise} from './getExercices.ts';

export const writeExercise = (exercice: Exercise) => {
  firestore()
    .collection('exercises')
    .add(exercice)
    .then(() => {
      console.log('Exercise Added!');
    });
};
