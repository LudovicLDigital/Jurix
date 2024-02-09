import React from 'react';
import {StyleSheet, View} from 'react-native';
import Images from '../assets/images';
import FastImage from 'react-native-fast-image';

const BackgroundContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={Images.background}
        style={styles.background}
        resizeMode={FastImage.resizeMode.stretch}
      />
      {children}
    </View>
  );
};

export default BackgroundContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '120%',
    width: '100%',
    position: 'absolute',
  },
});
