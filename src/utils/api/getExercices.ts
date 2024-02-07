import firestore from '@react-native-firebase/firestore';

export type Execution = {
  description: string;
  image: string;
};

export type Exercise = {
  title: string;
  description: string;
  execution: Execution[];
  image: string;
  id: number | string;
  videoUrl: string;
  titleIdentifier: string;
};

export const getExercices = async (): Promise<Exercise[]> => {
  const exercices = await firestore().collection('exercises').get();
  return exercices.docs.map(doc => doc.data()) as Exercise[];
};
