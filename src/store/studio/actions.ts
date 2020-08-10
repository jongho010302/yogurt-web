import { ActionTree } from 'vuex';
import { StudioState } from './types';
import {makeRequest} from "@/util";
import {RootState} from "@/store/types";

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StudioState, any> = {
  async saveStudio({ commit, rootState }, { username, password }) {
    try {
      const response = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/log-in`, {
        username, password,
      });

      const payload = response && response.data;
      commit('logIn', payload);
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
  async logOut({ rootState, commit }) {
    try {
      const response = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/user/log-out`, {}, {
        headers: {
          Authorization: rootState.auth.jwtToken
        }
      });
      const payload = response && response.data;
      commit('logOut');
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
  async findPassword({ rootState }, { username, email }) {
    try {
      const response = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/find-password`, {
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
  async findUsername({ rootState }, { email }) {
    try {
      const response = await makeRequest('post', `${VUE_APP_MY_BACK_URL}/auth/find-username`, {
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
