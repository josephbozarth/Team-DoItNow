import api from 'axios';

const USER_API = '/api/user';

function config(token) {
  return { headers: { 'X-Agility-Token': token } };
}

function login(email, password) {
  return api.post(`${USER_API}/session`, { email, password })
    .then(res => res.data.token);
}

function getCurrentUser(token) {
  return api.get(`${USER_API}/current`, config(token))
    .then(res => res.data);
}

function getUser(token, user) {
  return api.get(`${USER_API}/${user}`, config(token))
    .then(res => res.data);
}

module.exports = {
    login, getCurrentUser, getUser
};
