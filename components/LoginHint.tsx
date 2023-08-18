import React, {useMemo} from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View, Keyboard} from 'react-native';
import {MOCK_PASSWORD, MOCK_USERNAME} from '../constants';

export default function LoginHint() {
  const [showHint, setShowHint] = useState(false);
  const [keyboardOn, setKeyboardOff] = useState(false);
  const toggleHint = useCallback(() => setShowHint(crr => !crr), []);
  const animatedHeight = useMemo(() => new Animated.Value(0), []);

  const attachKeyboardListners = useCallback(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOff(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOff(false));
  }, []);

  // Attaching Keyboard Listners
  useEffect(() => {
    attachKeyboardListners();
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [attachKeyboardListners]);

  // handling Fade Animations
  useEffect(() => {
    if (showHint) {
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => toggleHint());
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [animatedHeight, showHint, toggleHint]);

  const containerStyle = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ['black', '#eee'],
  });

  // Not Rending if keyboard is On
  if (keyboardOn) {
    return null;
  }

  return (
    <View style={styles.hintView}>
      <Text style={styles.hintButton} disabled={showHint} onPress={toggleHint}>
        Hint {showHint ? '🤫' : '💣'}
      </Text>

      <Animated.View
        style={[styles.hintContent, {backgroundColor: containerStyle}]}>
        <Text>Username: {MOCK_USERNAME}</Text>
        <Text>Password: {MOCK_PASSWORD}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  hintView: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    alignSelf: 'center',
    color: 'gray',
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },
  hintContent: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  hintButton: {
    fontSize: 20,
  },
});
