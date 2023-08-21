// In App.js in a new project

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LoginPage from '../screens/authScreen/loginScreen';
import OtpScreen from '../screens/authScreen/otpScreen';
import SplashScreen from '../screens/splash';
import { useTranslation } from '../utills.js/translation-hook';

const AuthStack = createNativeStackNavigator();

function AuthStackNavigation() {
  const [load, setload] = React.useState(true);
  const { handleUpdateLanuage, handleDefaultLanguage, handleSelectedLanguage } = useTranslation()

  React.useEffect(() => {
    // Default language
    const load = async () => {
      const curLang = await handleDefaultLanguage()
      handleUpdateLanuage({ langCode: curLang.code })
      handleSelectedLanguage(curLang)

    }

    load()

    setTimeout(() => {
      setload(false);
    }, 1000);
  }, []);

  return (
    <AuthStack.Navigator>
      {load ? (
        <AuthStack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      ) : null}

      <AuthStack.Screen
        name="login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="otp"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigation;
