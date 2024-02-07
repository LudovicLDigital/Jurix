import storage from '@react-native-firebase/storage';
import {Exercise} from './getExercices.ts';

export const sendAnExercisesImg = async (exercise: Exercise, path: string) => {
  const reference = storage().ref(`/exercises/${exercise.id}/${path}`);
  await reference.putFile(path);
};
