import {Toast} from 'react-native-toast-message/lib/src/Toast';
export default function useToast() {
  const show = (props = {}) => {
    Toast.show({
      type: props.type ?? 'success',
      text1: props.title ?? '',
      text2: props.desc ?? '',
    });
  };
  const error = (props: any = {}) => show({...props, type: 'error'});
  return {
    show,
    error,
  };
}
