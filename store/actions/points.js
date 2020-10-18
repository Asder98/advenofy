import Point from "../../models/point";

export const DELETE_POINT = "DELETE_POINT";
export const CREATE_POINT = "CREATE_POINT";
export const UPDATE_POINT = "UPDATE_POINT";
export const SET_POINTS = "SET_POINTS";

export const fetchPoints = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const activeGame = getState().games.activeGame;
    try {
      const response = await fetch(
        `https://advenofy.firebaseio.com/gamePoints/${activeGame}.json`
      );

      if (!response.ok) {
        throw new Error("Something is wrong!");
      }

      const resData = await response.json();

      const loadedPoints = [];

      for (const key in resData) {
        if (resData[key] !== null) {
          loadedPoints.push(
            new Point(
              key,
              resData[key].name,
              resData[key].description,
              resData[key].code,
              resData[key].location
            )
          );
        }
      }

      dispatch({
        type: SET_POINTS,
        points: loadedPoints,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const delatePoint = (pointId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const gameId = getState().games.activeGame;
    const response = await fetch(
      `https://advenofy.firebaseio.com/gamePoints/${activeGame}/${pointId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Sth went wrong!");
    }

    dispatch({ type: DELETE_POINT, pointId: pointId });
  };
};

export const createPoint = (name, description, code, location) => {
  return async (dispatch, getState) => {
    const gameId = getState().games.activeGame;
    const token = getState().auth.token;
    const response = await fetch(
      `https://advenofy.firebaseio.com/gamePoints/${gameId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          code: code,
          location: location,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_POINT,
      pointData: {
        pid: resData.name,
        name,
        description,
        code,
        location,
      },
    });
  };
};

export const updatePoint = (id, name, description, code, location) => {
  return async (dispatch, getState) => {
    const gameId = getState().games.activeGame;
    const token = getState().auth.token;
    const response = await fetch(
      `https://advenofy.firebaseio.com/gamePoints/${gameId}/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          code: code,
          location: location,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Sth went wrong!");
    }

    dispatch({
      type: UPDATE_POINT,
      pid: id,
      pointData: {
        name,
        description,
        code,
        location,
      },
    });
  };
};
