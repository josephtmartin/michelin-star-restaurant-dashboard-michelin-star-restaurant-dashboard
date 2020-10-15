import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllStaff = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/staff.json`)
    .then((response) => {
      const allStaff = response.data;
      const staff = [];
      if (allStaff) {
        Object.keys(allStaff).forEach((staffId) => {
          staff.push(allStaff[staffId]);
        });
      }
      resolve(staff);
    })
    .catch((error) => reject(error));
});

const addStaffMember = (data) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/staff.json`, data)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/staff/${response.data.name}.json`, update);
      console.warn(response.statusText);
      resolve(response.statusText);
    })
    .catch((error) => reject(error));
});

const deleteStaffMember = (Uid) => axios.delete(`${baseUrl}/staff/${Uid}.json`);

const getStaffByRole = (role) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json?orderBy="role"&equalTo="${role}"`).then((response) => {
    const filteredStaff = response.data;
    console.warn(response);
    const fileteredArray = [];
    if (filteredStaff) {
      Object.keys(filteredStaff).forEach((item) => {
        fileteredArray.push(filteredStaff[item]);
      });
    }
    resolve(fileteredArray);
  }).catch((error) => reject(error));
});

export default {
  addStaffMember,
  getAllStaff,
  deleteStaffMember,
  getStaffByRole,
};
