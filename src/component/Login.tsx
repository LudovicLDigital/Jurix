import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuthContext} from '../contexts/AuthContext.tsx';
import {AUTH_ERRORS, COLORS} from '../utils/constants.ts';
import {Input} from './Input.tsx';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import Toast, {ToastShowParams} from 'react-native-toast-message';

interface FormInput {
  email: string;
  pass: string;
}

const Login = () => {
  const {t} = useTranslation('accountScreen');
  const {logout, user, login, create} = useAuthContext('Login');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>({
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const authenticate: SubmitHandler<FormInput> = data => {
    login(data.email, data.pass).then(response => {
      if (response.error) {
        let toastInfo: ToastShowParams = {
          type: 'error',
          text1: 'Erreur inconnue : ',
        };
        switch (response.error) {
          case AUTH_ERRORS.INVALID_CREDENTIAL:
            console.log('invalid credential');
            toastInfo.text1 = 'Mot de passe ou email invalide';
            break;
          case AUTH_ERRORS.USER_NOT_FOUND:
            console.log('user not found');
            toastInfo.text1 = 'Utilisateur non trouvé';
            break;
          case AUTH_ERRORS.WRONG_PASSWORD:
            console.log('wrong password');
            toastInfo.text1 = 'Mauvais mot de passe';
            break;
          case AUTH_ERRORS.INVALID_EMAIL:
            console.log('invalid email');
            toastInfo.text1 = 'Mauvais email';
            break;
          case AUTH_ERRORS.INVALID_PASSWORD:
            console.log('invalid password');
            toastInfo.text1 = 'Mot de passe invalide';
            break;
          default:
            console.log('unknown error');
            console.log(response.error);
            toastInfo.text2 = response.error;
            break;
        }
        Toast.show(toastInfo);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Connexion réussie',
          text2: 'Vous êtes maintenant connecté',
        });
      }
    });
  };
  const createUser: SubmitHandler<FormInput> = data => {
    create(data.email, data.pass).then(response => {
      if (response.error) {
        let toastInfo: ToastShowParams = {
          type: 'error',
          text1: 'Erreur inconnue : ',
        };
        switch (response.error) {
          case AUTH_ERRORS.EMAIL_ALREADY_IN_USE:
            console.log('email already in use');
            toastInfo.text1 = 'Email déjà utilisé';
            break;
          case AUTH_ERRORS.INVALID_EMAIL:
            console.log('invalid email');
            toastInfo.text1 = 'Email invalide';
            break;
          case AUTH_ERRORS.WEAK_PASSWORD:
            console.log('weak password');
            toastInfo.text1 = 'Mot de passe faible';
            break;
          case AUTH_ERRORS.INVALID_PASSWORD:
            console.log('invalid password');
            toastInfo.text1 = 'Mot de passe invalide';
            break;
          default:
            console.log('unknown error');
            console.log(response.error);
            toastInfo.text2 = response.error;
            break;
        }
        Toast.show(toastInfo);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Compte créé',
          text2: 'Vous êtes maintenant connecté',
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Input
              label={t('email')}
              control={control}
              formKey={'email'}
              required={true}
              haveError={!!errors.email}
            />
            <Input
              label={t('password')}
              control={control}
              formKey={'pass'}
              required={true}
              haveError={!!errors.pass}
            />
            <TouchableOpacity
              onPress={handleSubmit(authenticate)}
              style={[styles.formButton, {backgroundColor: COLORS.MENUS}]}>
              <Text style={{color: COLORS.PRIMARY}}>{t('login')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(createUser)}
              style={[styles.formButton, {backgroundColor: COLORS.PRIMARY}]}>
              <Text style={{color: COLORS.MENUS}}>{t('register')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View>
          <Text>{`Connecté en tant que ${user.email}`}</Text>
          <TouchableOpacity onPress={() => logout()} style={styles.formButton}>
            <Text>{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formButton: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
