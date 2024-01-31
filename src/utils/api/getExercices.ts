import firestore from '@react-native-firebase/firestore';

type Execution = {
  description: string;
  image: string;
};

export type Exercise = {
  title: string;
  description: string;
  execution: Execution[];
  id: number;
  videoUrl: string;
};

export const getExercices = async (): Promise<Exercise[]> => {
  const exercices = await firestore().collection('exercises').get();
  return exercices.docs.map(doc => doc.data()) as Exercise[];
};
