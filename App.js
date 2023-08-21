import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import {LogBox, PermissionsAndroid} from 'react-native';
import {createNavigationContainerRef} from '@react-navigation/native';
import codePush from 'react-native-code-push';
import InitialNavigation from './src/navigaiton';
LogBox.ignoreLogs(['Warning: ...']);
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
export const navigationRef = createNavigationContainerRef();
function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <InitialNavigation />
    </Provider>
  );
}
export default codePush(App);
