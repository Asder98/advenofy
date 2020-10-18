import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CopyCard from "../../components/UI/CopyCard";

const GameDetailsScreen = () => {
  const gameId = useSelector((state) => state.games.activeGame);
  const game = useSelector((state) =>
    state.games.ownedGames.find((game) => game.id === gameId)
  );

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Nazwa gry</Text>
        <Text style={styles.title}>{game.name}</Text>
        <Text style={styles.label}>Opis</Text>
        <Text style={styles.description}>{game.description}</Text>
      </View>
      <View>
        <CopyCard copyText={game.id}>
            <Text style={styles.idTitle}>Identyfikator gry</Text>
          <Text style={styles.id}>{game.id}</Text>
        </CopyCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: "#aaa",
  },
  idTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GameDetailsScreen;
