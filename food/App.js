import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import SearchScreen from './src/screen/SearchScreen';
import ResultsShow from "./src/components/ResultsShow";

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    ResultsShow: ResultsShow
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'Business Search'
    }
  }
);
export default createAppContainer(navigator)