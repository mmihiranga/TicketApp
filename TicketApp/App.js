import  React,{useEffect} from 'react';

import ScreenNavigator from './src/ScreenNavigator';
import SplashScreen from 'react-native-splash-screen';

function App() {
   
  useEffect(() => {
     SplashScreen.hide();
  }, [])

  return (
    <ScreenNavigator/> 
  );
}

export default App;