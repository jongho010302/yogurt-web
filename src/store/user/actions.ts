import { ActionTree } from 'vuex';
import axios from 'axios';

import { UserState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<UserState, any> = {
  async loadUserList({ rootState }) {
    try {
      const response = await axios.get(`${VUE_APP_MY_BACK_URL}/admin/user`, {
        headers: {
          Authorization: rootState.auth.jwtToken
        }
      });
      const payload: UserState = response && response.data;
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
};

export default actions;
