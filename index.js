import { Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const OS = Platform.OS.toUpperCase();
const isIos = Platform.OS === 'ios';

export default (onSuccess = () => null) => {
  const permission = PERMISSIONS[OS][isIos ? 'LOCATION_WHEN_IN_USE' : 'ACCESS_COARSE_LOCATION'];
  check(permission).then(result => {
    if (result === RESULTS.GRANTED) {
      onSuccess();
      return;
    }
    if (!isIos) {
      if (result === RESULTS.UNAVAILABLE || result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
          .then(data => {
            if (data === 'already-enabled' || data === 'enabled') {
              onSuccess();
            }
          });
      }
      return;
    }
    if (result === RESULTS.UNAVAILABLE) {
      Alert.alert('Sorry', 'You need to turn on Location Service', [
        { text: 'Cancel' },
        { text: 'Turn On Location', onPress: Linking.openSettings },
      ]);
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert('Sorry', 'You have blocked this action before this', [
        { text: 'Cancel' },
        { text: 'Allow Location Permission', onPress: Linking.openSettings },
      ]);
    } else if (result === RESULTS.DENIED) {
      request(permission).then(data => data === RESULTS.GRANTED && onSuccess());
    }
  });
};
