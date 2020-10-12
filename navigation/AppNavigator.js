import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import GameScreen from "../screens/player/GameScreen";
import PointDetailsScreen from "../screens/player/PointDetailsScreen";
import GameScreen from "../screens/player/GameScreen";
import GamesOverviewScreen from "../screens/player/GamesOverviewScreen";
import JoinGameScreen from "../screens/player/JoinGameScreen";
import AdminGamesScreen from "../screens/admin/AdminGamesScreen";
import AdminPointDetailsScreen from "../screens/admin/AdminPointDetailsScreen";
import CreateGameScreen from "../screens/admin/CreateGameScreen";
import GameDetailsScreen from "../screens/admin/GameDetailsScreen";
import GamePointsScreen from '../screens/admin/GamePointsScreen'
import PlayersRankingScreen from "../screens/admin/PlayersRankingScreen";
import PointDetailsEditScreen from "../screens/admin/PointDetailsEditScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const PlayerGamesNavigator = createStackNavigator(
  {
    GamesOverview: {
      screen: GamesOverviewScreen,
    },
    JoinGame: {
      screen: JoinGameScreen,
    },
    Game: {
      screen: GameScreen,
    },
    PointDetails: {
      screen: PointDetailsScreen,
    },
    GameOver: {
      screen: GameScreen,
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultNavOptions,
  }
);

const GamePointsNavigator = createStackNavigator(
  {
    GamePoints: {
      screen: GamePointsScreen,
    },
    AdminPointDetails: {
      screen: AdminPointDetailsScreen,
    },
    PointEdit: {
      screen: PointDetailsEditScreen,
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultNavOptions,
  }
);

const GameAdminTabConfig = {
    Points: {
      screen: GamePointsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-compass" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.primary,
      },
    },
    Ranking: {
      screen: PlayersRankingScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-filing" size={25} color={tabInfo.tintColor} />;
        },
        tabBarColor: Colors.accent,
      },
    },
    GameDetails: {
        screen: GameDetailsScreen,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-settings" size={25} color={tabInfo.tintColor} />;
          },
          tabBarColor: Colors.accent,
        },
      },
  };
  
  const GameAdminTabNavigator = createBottomTabNavigator(GameAdminTabConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accent,
    },
  });
