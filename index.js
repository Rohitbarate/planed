/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWraper from './AppWraper';

AppRegistry.registerComponent(appName, () => AppWraper);
