/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWraper from './AppWraper';
import UserExist from './src/screens/UserExist';

AppRegistry.registerComponent(appName, () => AppWraper);
