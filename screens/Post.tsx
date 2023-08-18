import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TPost} from '../types';

export default function Post() {
  const {params} = useRoute();
  const {title, body} = params as TPost;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    padding: 10,
    gap: 10,
  },
});
