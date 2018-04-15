import api from 'axios';
import {getToken} from './session';

const USER_API = '/api/user';

function config() {
  return { headers: { 'X-Agility-Token': getToken() } };
}

function login(email, password) {
  return api.post(`${USER_API}/session`, { email, password })
    .then(res => res.data);
}

function getCurrentUser(token) {
  return api.get(`${USER_API}/current`, config())
    .then(res => res.data);
}

function getUser(token, user) {
  return api.get(`${USER_API}/${user}`, config())
    .then(res => res.data);
}

function getUsers(user) {
  return api.get(`${USER_API}`, config())
    .then(res => res.data);
}

module.exports = {
    login, getCurrentUser, getUser, getUsers
};
