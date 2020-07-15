import { ActionTree } from 'vuex';
import axios from 'axios';
import { LoginState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<LoginState, any> = {
  async handleLogin({ commit }, { username, password }) {
    try {
      const response = await axios.post(`${VUE_APP_MY_BACK_URL}/auth/log-in`, {
        username, password,
      });
      const payload = response && response.data;
      commit('handleLogin', payload);
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
  async handleLogout({ rootState, commit }) {
    try {
      const response = await axios.post(`${VUE_APP_MY_BACK_URL}/user/log-out`, {}, {
        headers: {
          Authorization: rootState.auth.jwtToken
        }
      });
      const payload = response && response.data;
      commit('handleLogout');
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
  async handleFindPassword({ rootState }, { username, email }) {
    try {
      const response = await axios.post(`${VUE_APP_MY_BACK_URL}/auth/find-password`, {
        username, email
      }, {
        headers: {
          Authorization: rootState.auth.jwtToken
        }
      });
      const payload = response && response.data;
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
  async handleFindUsername({ rootState }, { email }) {
    try {
      const response = await axios.post(`${VUE_APP_MY_BACK_URL}/auth/find-username`, {
        email
      }, {
        headers: {
          Authorization: rootState.auth.jwtToken
        }
      });
      const payload = response && response.data;
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
};

export default actions;
