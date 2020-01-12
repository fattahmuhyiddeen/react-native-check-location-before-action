# react-native-check-location-before-action
You might want to do something on React Native that require location permission, therefore this library helps you to handle all possible scenario (location off, location denied, location blocked, or location granted), you just to the library onSuccess callback. Easy right?

### Note
This library is not to get GPS location. If you want to get GPS, you need to handle it by yourself in the on success callback.

### Dependencies

This libraries requires these libraries. Please install them by yourself:
1. `react-native-permissions`
1. `react-native-android-location-enabler`

Make sure you install and configure according to their documentations respectively.

"react-native-permissions": "^2.0.8"
"react-native-android-location-enabler": "^1.2.0"
### Usage sample

```
import checkLocation from 'react-native-check-location-before-action';

checkLocation(() => alert('my action after get permission'));
```

