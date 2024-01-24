// Header.tsx
import React from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import Images from '../assets/images';
import {COLORS} from '../utils/constants.ts';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Header;
