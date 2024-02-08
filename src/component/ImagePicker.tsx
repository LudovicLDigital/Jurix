import React, {useCallback, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';

const ImagePicker = ({
  placeholder,
  onChooseFile,
}: {
  onChooseFile: (path: string) => void;
  placeholder?: string;
}) => {
  const {t} = useTranslation('createExerciseForm');

  const [imageUri, setImageUri] = useState<string>();

  const processImage = useCallback(
    (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          setImageUri(response.assets[0].uri);
          onChooseFile(response.assets[0].uri);
        }
      }
    },
    [onChooseFile],
  );

  const chooseImageFromLib = useCallback(async () => {
    const response = await launchImageLibrary({mediaType: 'photo'});
    processImage(response);
  }, [processImage]);

  const chooseImageFromCam = useCallback(async () => {
    const response = await launchCamera({mediaType: 'photo'});
    processImage(response);
  }, [processImage]);

  const chooseImage = useCallback(() => {
    Alert.alert(placeholder ? placeholder : t('alertTitle'), '', [
      {
        text: t('fromCamera'),
        onPress: () => chooseImageFromCam(),
      },
      {
        text: t('fromGallery'),
        onPress: () => chooseImageFromLib(),
      },
    ]);
  }, [chooseImageFromCam, chooseImageFromLib, placeholder, t]);

  return (
    <>
      <Text>{placeholder ? placeholder : t('alertTitle')}</Text>
      <TouchableOpacity
        style={styles.imageBtnContainer}
        onPress={() => chooseImage()}>
        <Text style={styles.imageBtnText}>+</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 100, height: 100}} />
      )}
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageBtnContainer: {
    width: 200,
    height: 50,
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  imageBtnText: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
