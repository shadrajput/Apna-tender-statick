import { setToken, setUser } from "../slices/UserSlice";

function getSetLocalStorage({ key, value }) {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    return localStorage.getItem(key);
  }
}

export const setTokenInLocalStorage = (token) => {
  getSetLocalStorage({ key: "token", value: token });
};

export const authentication = (token, user) => {
  setTokenInLocalStorage(token);
  return async (dispatch) => {
    dispatch(setToken(token));
    dispatch(setUser(user));
  };
};

export const logout = () => {
  localStorage.clear(); 
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser({}));
  };
};
