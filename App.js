import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Routes from './src/navigations/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <Provider store={store}>
          <Routes />
        </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
