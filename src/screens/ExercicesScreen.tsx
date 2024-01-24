import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackgroundContainer from '../component/backgroundContainer.tsx';

const ExercicesScreen = () => {
  return (
    <BackgroundContainer>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>ExercicesScreen</Text>
      </View>
    </BackgroundContainer>
  );
};

export default ExercicesScreen;

const styles = StyleSheet.create({});
