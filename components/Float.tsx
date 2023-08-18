import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Float() {
  return (
    <>
      <View style={[styles.container, styles.s2]} />
      <View style={[styles.container, styles.s1]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#ddd',
    height: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
