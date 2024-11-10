/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './store';
import AppNavigator from './routes';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
));
