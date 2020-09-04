import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/main';
import Splash from './src/screens/splash';
import Channels from './src/screens/channels';
import VidPlay from './src/screens/vidPlay';
import Server from './src/screens/server';


const AppStackNavigator = createStackNavigator({
  Main: {screen: MainScreen},
  Channels: {screen: Channels},
  VideoPlay: {screen: VidPlay},
  Server: {screen: Server}
});

// We used createSwitchNavigator because we don't want our user to // navigate back to Splash screen by pressing back button. Hence
// Splash screen just get seen once by the user.
const AppSwitchNavigator = createSwitchNavigator(
  {
    Splash: { screen: Splash },
    Home: { screen: AppStackNavigator },
  },
  {
    initialRouteName: 'Splash',
  },
);
const App = createAppContainer(AppSwitchNavigator);
export default App;