import React from 'react'
import { View, Text } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const GamesOverviewScreen = () => {
    return (
        <View>
            <Text>GamesOverviewScreen</Text>
        </View>
    )
}

GamesOverviewScreen.navigationOptions = (navData) => {
    return {
      headerTitle: "Wybeirz grę",
      headerLeft: () =>  (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName="ios-list" onPress={() => {
            navData.navigation.toggleDrawer()
          }} />
        </HeaderButtons>
      ),
    };
  };

export default GamesOverviewScreen
