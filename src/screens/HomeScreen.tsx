import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackgroundContainer from '../component/backgroundContainer.tsx';

const HomeScreen = () => {
  return (
    <BackgroundContainer>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      </View>
    </BackgroundContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
