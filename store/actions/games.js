import Game from "../../models/game";

export const DELETE_GAME = "DELETE_GAME";
export const CREATE_GAME = "CREATE_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const SET_OWNED_GAMES = "SET_OWNED_GAMES";
export const SET_PLAYER_GAMES = "SET_PLAYER_GAMES";

export const fetchOwnedGames = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://advenofy.firebaseio.com/gamesDetails.json?orderby="ownerId"?equalTo="${userId}"`
      );

      if (!response.ok) {
        throw new Error("Something is wrong!");
      }

      const resData = await response.json();


      const loadedGames = [];

      for (const key in resData) {
        loadedGames.push(
          new Game(
            key,
            resData[key].ownerId,
            resData[key].name,
            resData[key].description,
            resData[key].gameoverMessage,
            resData[key].isOpen
          )
        );
      }
      dispatch({
        type: SET_OWNED_GAMES,
        ownedGames: loadedGames,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteGame = (gameId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://advenofy.firebaseio.com/gamesDetails/${gameId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Sth went wrong!");
    }

    dispatch({ type: DELETE_GAME, gameId: gameId });
  };
};

export const createGame = (name, description, gameoverMessage) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const isOpen = false
    const response = await fetch(
      `https://advenofy.firebaseio.com/gamesDetails.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          gameoverMessage: gameoverMessage,
          isOpen: isOpen,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_GAME,
      gameData: {
        pid: resData.name,
        name,
        description,
        gameoverMessage,
        isOpen: isOpen,
        ownerId: userId,
      },
    });
  };
};

export const updateGame = (id, name, description, gameoverMessage, isOpen) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://advenofy.firebaseio.com/gamesDetails/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          gameoverMessage: gameoverMessage,
          isOpen: isOpen,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Sth went wrong!");
    }

    dispatch({
      type: UPDATE_GAME,
      gid: id,
      gameData: {
        title,
        description,
        gameoverMessage,
        isOpen
      },
    });
  };
};
