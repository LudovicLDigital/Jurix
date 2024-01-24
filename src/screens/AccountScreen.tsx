import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackgroundContainer from '../component/backgroundContainer.tsx';

const AccountScreen = () => {
  return (
    <BackgroundContainer>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>AccountScreen</Text>
      </View>
    </BackgroundContainer>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
