import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Images from '../assets/images';

const BackgroundContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <ImageBackground
      source={Images.background}
      style={{
        height: '120%',
        width: '100%',
        position: 'absolute',
        top: '-10%',
      }}>
      {children}
    </ImageBackground>
  );
};

export default BackgroundContainer;

const styles = StyleSheet.create({});
