import * as types from "./../types";
import { ipcRenderer } from "electron";

import { logDonated, logAbout } from "./../utils/tracking";
import { startSearch } from "./index";

export const setLanguage = language => (dispatch, getState) => {
  const { search } = getState();

  dispatch({
    type: types.SET_LANGUAGE,
    payload: {
      language,
    },
  });

  // Store current language in settings
  ipcRenderer.send("setStore", "language", language);

  // If there are any results and user switches language, search again using new language
  if (search.results.length > 0 || search.files.length > 0) {
    dispatch(startSearch());
  }
};

export const showNotification = message => dispatch => {
  dispatch({
    type: types.SHOW_NOTIFICATION,
  });

  ipcRenderer.send("notification", message);
};

export const logDonatedButtonClicked = () => dispatch => {
  dispatch({
    type: types.LOG_DONATED,
  });

  logDonated();
};

export const logAboutWindowOpend = () => dispatch => {
  dispatch({
    type: types.LOG_ABOUT,
  });

  logAbout();
};
