import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/main';
import Splash from './src/screens/splash';
import Channels from './src/screens/channels';
import VidPlay from './src/screens/vidPlay';
import Server from './src/screens/server';
import ImgBrowser from './src/screens/imgBrowser';
import PassScreen from './src/screens/passScreen';

const AppStackNavigator = createStackNavigator({
  Main: {screen: MainScreen},
  Channels: {screen: Channels},
  VideoPlay: {screen: VidPlay},
  Server: {screen: Server},
  ImgBrowser: {screen: ImgBrowser},
  PassScreen: {screen: PassScreen}
});

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