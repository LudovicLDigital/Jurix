import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import BackgroundContainer from '../component/backgroundContainer.tsx';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const {t} = useTranslation('homeScreen');
  return (
    <BackgroundContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pitch}>{t('pitch')}</Text>
      </ScrollView>
    </BackgroundContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pitch: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    padding: 10,
  },
});
