import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import * as gamesActions from "../../store/actions/games";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const JoinGameScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [inputValue, setInputValue] = useState("");
  const [inputIsValid, setInputIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("Error! ", error, [{ text: "ok" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!inputIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      await dispatch(gamesActions.joinGame(inputValue));
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, inputValue, inputIsValid]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (id, inputValue, inputValidity) => {
      setInputValue(inputValue);
      setInputIsValid(inputValidity);
    },
    [dispatch, setInputValue, setInputIsValid]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="id"
            label="Identyfikator gry"
            errorText="Proszę wprowadzić Identyfikator"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initialValid={false}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

JoinGameScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("gameId")
      ? "Edytuj grę"
      : "Dodaj grę",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Zapisz"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JoinGameScreen;
