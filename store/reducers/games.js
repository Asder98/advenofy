import {
  DELETE_GAME,
  CREATE_GAME,
  UPDATE_GAME,
  SET_OWNED_GAMES,
  SET_PLAYER_GAMES,
} from "../actions/games";
import Game from "../../models/game";

const initialState = {
  ownedGames: [],
  userGames: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OWNED_GAMES:
      return {
        ownedGames: action.ownedGames,
      };
    case CREATE_GAME:
      const newGame = new Game(
        action.pid,
        action.ownerId,
        action.name,
        action.description,
        action.gameoverMessage,
        action.isOpen
      );
      return {
        ...state,
        ownedGames: state.ownedGames.concat(newGame)
      };
    case UPDATE_GAME:
      const gameIndex = state.ownedGames.findIndex(
        (game) => game.id === action.gid
      );
      const updatedGame = new Game(
        action.gid,
        state.ownedGames[gameIndex].ownerId,
        action.gameData.title,
        action.gameData.description,
        action.gameData.gameoverMessage,
        action.gameData.isOpen
      );
      const updatedOwnedGames = [...state.ownedGames];
      updatedOwnedGames[gameIndex] = updatedGame;
      const userGameIndex = state.userGames.findIndex(
        (game) => game.id === action.gid
      );
      const updatedUserGames = [...state.userGames];
      updatedUserGames[userGameIndex] = updatedGame;
      return {
        ...state,
        ownedGames: updatedOwnedGames,
        userGames: updatedUserGames,
      };
    case DELETE_GAME:
      return {
        ...state,
        ownedGames: state.ownedGames.filter(
          (game) => game.id !== action.gameId
        ),
        userGames: state.userGames.filter(
          (game) => game.id !== action.gameId
        ),
      };
  }
  return state;
};
