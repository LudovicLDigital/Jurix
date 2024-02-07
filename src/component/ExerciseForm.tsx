import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Execution, Exercise} from '../utils/api/getExercices.ts';
import {Controller, Path, SubmitHandler, useForm} from 'react-hook-form';

interface FormInput {
  title: string;
  description: string;
  videoUrl: string;
  execution: Execution[];
  imageUri: string;
}

type InputProps = {
  label: string;
  required?: boolean;
  formKey: Path<FormInput>;
  control: any;
  haveError?: boolean;
};

const Input = ({label, required, control, formKey, haveError}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <Controller
        control={control}
        name={formKey}
        rules={{required}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.input, haveError ? {borderColor: 'red'} : {}]}
          />
        )}
      />
      {required && <Text style={styles.inputRequired}>{'Requis'}</Text>}
    </View>
  );
};
type ExerciseFormProps = {
  onSubmit: (exercise: Exercise) => void;
};
const ExerciseForm = ({onSubmit}: ExerciseFormProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>({
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
      execution: [],
      imageUri: '',
    },
  });

  const _onSubmit: SubmitHandler<FormInput> = data => {
    const newExercice: Exercise = {
      title: data.title,
      description: data.description,
      execution: [],
      id: Math.floor(Math.random() * 10000),
      videoUrl: data.videoUrl,
      image: data.imageUri,
      titleIdentifier: data.title.toLowerCase(),
    };
    onSubmit(newExercice);
  };
  return (
    <View style={styles.container}>
      <Input
        label={"Titre de l'exercice"}
        control={control}
        formKey={'title'}
        required={true}
        haveError={!!errors.title}
      />
      <Input
        label={"Description de l'exercice"}
        control={control}
        formKey={'description'}
        required={true}
        haveError={!!errors.description}
      />
      <Input
        label={'URL de la vidéo'}
        formKey={'videoUrl'}
        control={control}
        haveError={!!errors.videoUrl}
      />
      <Button title="Enregistrer" onPress={handleSubmit(_onSubmit)} />
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
  inputRequired: {
    color: '#fd0000',
    fontSize: 8,
    textAlign: 'right',
    width: '100%',
    padding: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
