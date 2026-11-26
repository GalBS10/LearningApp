/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerNotificationEventHandlers } from './src/notifications/scheduler';

// Register background/foreground event handlers for notifications
registerNotificationEventHandlers();

AppRegistry.registerComponent(appName, () => App);
