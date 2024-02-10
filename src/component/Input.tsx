import {Controller, Path} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

type InputProps = {
  label: string;
  required?: boolean;
  formKey: Path<any>;
  control: any;
  haveError?: boolean;
};

export const Input = ({
  label,
  required,
  control,
  formKey,
  haveError,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{`${label} ${required ? '*' : ''}`}</Text>
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
      {required && haveError && (
        <Text style={styles.inputRequired}>{'Requis'}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
