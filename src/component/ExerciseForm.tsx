import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Exercise} from '../utils/api/getExercices.ts';

type ExerciseFormProps = {
  onSubmit: (exercise: Exercise) => void;
};
const ExerciseForm = ({onSubmit}: ExerciseFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [executionDescription, setExecutionDescription] = useState('');
  const [executionImage, setExecutionImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [exercice, setExercice] = useState<Exercise | null>(null);

  const handleSubmit = () => {
    const newExercice: Exercise = {
      title: title,
      description: description,
      execution: [{description: executionDescription, image: executionImage}],
      id: Math.floor(Math.random() * 10000),
      videoUrl: videoUrl,
      titleIdentifier: title.toLowerCase(),
    };
    setExercice(newExercice);
    onSubmit(newExercice);
  };
  return (
    <View style={styles.container}>
      <Text>Titre de l'exercice</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text>Description de l'exercice</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Text>Description de l'étape 1 d'exécution</Text>
      <TextInput
        value={executionDescription}
        onChangeText={setExecutionDescription}
        style={styles.input}
      />
      <Text>URL de l'image de l'étape 1 d'exécution</Text>
      <TextInput
        value={executionImage}
        onChangeText={setExecutionImage}
        style={styles.input}
      />
      <Text>URL de la vidéo</Text>
      <TextInput
        value={videoUrl}
        onChangeText={setVideoUrl}
        style={styles.input}
      />
      <Button title="Soumettre" onPress={handleSubmit} />
      {exercice && (
        <Text>Exercice soumis ! Vérifiez la console pour les détails.</Text>
      )}
    </View>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
