// Header.tsx
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Images from '../assets/images';
import {COLORS} from '../utils/constants.ts';
import FastImage from 'react-native-fast-image';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        source={Images.logo}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.MENUS,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 10,
  },
});

export default Header;
