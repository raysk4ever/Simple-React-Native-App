import {useNavigation} from '@react-navigation/native';
import React, {lazy, useCallback, useReducer} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useToast from '../hooks/useToast';
import {delay} from '../utils';
import {MOCK_PASSWORD, MOCK_USERNAME} from '../constants';

const LoginHint = lazy(() => import('../components/LoginHint'));

const initState = {
  username: '',
  password: '',
  showHint: false,
  loading: false,
};

type Action =
  | {type: 'SET_USERNAME'; payload: string}
  | {type: 'SET_PASSWORD'; payload: string}
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'TOGGLE_HINT'}
  | {type: 'LOGIN'}
  | {type: 'LOGOUT'};

const reducer = (state: typeof initState, action: Action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {...state, username: action.payload};
    case 'SET_PASSWORD':
      return {...state, password: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'TOGGLE_HINT':
      return {...state, showHint: !state.showHint};
    default:
      return state;
  }
};

function LoginScreen() {
  const [state, dispatch] = useReducer(reducer, initState);
  const {username, password} = state;
  const {reset} = useNavigation();
  const {show, error} = useToast();

  const handleOnChange = useCallback((text: string, key: any) => {
    dispatch({type: key, payload: text});
  }, []);

  const setLoading = useCallback(
    (loading: boolean) => dispatch({type: 'SET_LOADING', payload: loading}),
    [],
  );

  const handleLogin = useCallback(async () => {
    setLoading(true);
    if (username !== MOCK_USERNAME || password !== MOCK_PASSWORD) {
      setLoading(false);
      error({title: 'Invalid Username or Password', desc: 'Find Hint! 👀'});
      return;
    }
    await delay(2000);
    show({title: 'Hello Admin!', desc: '😎'});
    setLoading(false);
    reset({
      index: 0,
      routes: [{name: 'Home'} as any],
    });
  }, [setLoading, username, password, show, reset, error]);

  return (
    <>
      <ImageBackground
        source={require('../assets/wave.png')}
        style={styles.view}>
        <View style={styles.brandLogo}>
          <Text style={styles.loginText}>⚡️</Text>
        </View>
        <TextInput
          style={styles.input}
          // autoFocus
          value={username}
          placeholder="Username"
          onChangeText={t => handleOnChange(t, 'SET_USERNAME')}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={t => handleOnChange(t, 'SET_PASSWORD')}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
      <LoginHint />
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  brandLogo: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 2,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  loginText: {
    fontSize: 30,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  button: {
    backgroundColor: '#5c8065',
    padding: 10,
    width: '80%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
