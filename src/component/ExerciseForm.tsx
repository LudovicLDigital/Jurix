import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Exercise} from '../utils/api/getExercices.ts';
import {Controller, Path, SubmitHandler, useForm} from 'react-hook-form';
import ImagePicker from './ImagePicker.tsx';
import {COLORS} from '../utils/constants.ts';
import {useTranslation} from 'react-i18next';
import {uploadImage} from '../utils/api/getStorageAssets.ts';

interface FormInput {
  title: string;
  description: string;
  videoUrl: string;
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
  const {t} = useTranslation('createExerciseForm');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>({
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
    },
  });
  const [imageUri, setImageUri] = useState<string>();

  const _onSubmit: SubmitHandler<FormInput> = data => {
    const newExercice: Exercise = {
      title: data.title,
      description: data.description,
      execution: [],
      id: Math.floor(Math.random() * 10000),
      videoUrl: data.videoUrl,
      image: `${data.title.toLowerCase()}.jpg`,
      titleIdentifier: data.title.toLowerCase(),
    };
    if (imageUri) {
      uploadImage(imageUri, newExercice);
    }
    onSubmit(newExercice);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Input
          label={t('title')}
          control={control}
          formKey={'title'}
          required={true}
          haveError={!!errors.title}
        />
        <Input
          label={t('description')}
          control={control}
          formKey={'description'}
          required={true}
          haveError={!!errors.description}
        />
        <Input
          label={t('videoUrl')}
          formKey={'videoUrl'}
          control={control}
          haveError={!!errors.videoUrl}
        />
        <ImagePicker
          onChooseFile={path => setImageUri(path)}
          placeholder={t('chooseMainImage')}
        />
        <TouchableOpacity
          onPress={handleSubmit(_onSubmit)}
          style={styles.submit}>
          <Text style={{color: COLORS.MENUS}}>{t('submit')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  submit: {
    marginVertical: 20,
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
  },
});
