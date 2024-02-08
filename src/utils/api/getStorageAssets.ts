import storage from '@react-native-firebase/storage';
import {Exercise} from './getExercices.ts';

export const getStorageAssets = async (path: string): Promise<string> => {
  return await storage().ref(`${path}`).getDownloadURL();
};

export const uploadImage = (path: string, exercise: Exercise) => {
  const reference = storage().ref(
    `/exercises/${exercise.id}/${exercise.image}`,
  );
  const task = reference.putFile(path);
  task.on('state_changed', taskSnapshot => {
    console.log(
      `For ${path} : ${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );
  });

  task.then(() => {
    console.log(`${exercise.image} uploaded to the bucket!`);
  });
};
