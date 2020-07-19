import { ActionTree } from 'vuex';
import axios from 'axios';
import { StaffState } from './types';

const { VUE_APP_MY_BACK_URL } = process.env;

const actions: ActionTree<StaffState, any> = {
  async loadStaffs({ rootState }) {
    try {
      const response = await axios.get(`${VUE_APP_MY_BACK_URL}/admin/staff`, {
        headers: {
          Authorization: rootState.auth.jwtToken
        }
      });
      const payload: StaffState = response && response.data;
      return payload;
    } catch (err) {
      console.error(err);
      return err.response.data;
    }
  },
  async saveStaff(none, { staffType, name, phone, introduce, isMonHoliday, monWorkingStartTime, monWorkingEndTime, isTueHoliday, tueWorkingStartTime, tueWorkingEndTime, isWedHoliday, wedWorkingStartTime, wedWorkingEndTime, isThuHoliday, thuWorkingStartTime, thuWorkingEndTime, isFriHoliday, friWorkingStartTime, friWorkingEndTime, isSatHoliday, satWorkingStartTime, satWorkingEndTime, isSunHoliday, sunWorkingStartTime, sunWorkingEndTime }) {
    try {
      await axios.post(`${VUE_APP_MY_BACK_URL}/admin/staff`, {
        staffType, name, phone, introduce, isMonHoliday, monWorkingStartTime, monWorkingEndTime, isTueHoliday, tueWorkingStartTime, tueWorkingEndTime, isWedHoliday, wedWorkingStartTime, wedWorkingEndTime, isThuHoliday, thuWorkingStartTime, thuWorkingEndTime, isFriHoliday, friWorkingStartTime, friWorkingEndTime, isSatHoliday, satWorkingStartTime, satWorkingEndTime, isSunHoliday, sunWorkingStartTime, sunWorkingEndTime,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
