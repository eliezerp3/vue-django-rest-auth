import auth from '../api/auth';
import session from '../api/session';
import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
  SET_PROFILE,
  UPDATE_PROFILE,
  PASSWORD_CHANGED
} from './types';

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';

const initialState = {
  authenticating: false,
  error: false,
  token: null,
  profile: {}, //pk, first_name, last_name, email, username
};

const getters = {
  isAuthenticated: state => !!state.token,
  // INFO
  profile: state => state.profile
};

const actions = {
  login({ commit }, { username, password }) {
    commit(LOGIN_BEGIN);
    return auth.login(username, password)
      .then(({ data }) => commit(SET_TOKEN, data.key))
      .then(() => commit(LOGIN_SUCCESS, username))
      .catch(() => commit(LOGIN_FAILURE));
  },
  logout({ commit }) {
    return auth.logout()
      .then(() => commit(LOGOUT))
      .finally(() => commit(REMOVE_TOKEN));
  },
  initialize({ commit }) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) {
      commit(SET_TOKEN, token);
      return auth.getAccountDetails().then(({data}) => commit(SET_PROFILE, data))
    } else {
      commit(REMOVE_TOKEN);
    }
  },
  updateProfile({ commit },  data ) {
    return auth.updateAccountDetails(data).then(({data}) => commit(UPDATE_PROFILE, data))
  },
  changePassword({ commit }, { password1, password2 }){
    return auth.changeAccountPassword(password1, password2).then(() => commit(PASSWORD_CHANGED))
  }
};

const mutations = {
  [LOGIN_BEGIN](state) {
    state.authenticating = true;
    state.error = false;
  },
  [LOGIN_FAILURE](state) {
    state.authenticating = false;
    state.error = true;
  },
  [LOGIN_SUCCESS](state) {
    state.authenticating = false;
    state.error = false;
  },
  [LOGOUT](state) {
    state.authenticating = false;
    state.error = false;
    state.profile = {};
  },
  [SET_TOKEN](state, token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    session.defaults.headers.Authorization = `Token ${token}`;
    state.token = token;
  },
  [REMOVE_TOKEN](state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    delete session.defaults.headers.Authorization;
    state.token = null;
  },
  [SET_PROFILE](state, data) {
    state.profile = data;
  },
  [UPDATE_PROFILE](state, data) {
    state.profile = data;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
