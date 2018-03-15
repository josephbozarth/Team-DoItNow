import api from 'axios';

const SPRINT_API = '/api/sprint';

function config(token) {
  return { headers: { 'X-Agility-Token': token } };
}

function getSprints(token) {
  return api.get(`${SPRINT_API}`, config(token))
    .then(res => res.data);
}

function getSprint(token, id) {
  return api.get(`${SPRINT_API}/${id}`, config(token))
    .then(res => res.data);
}

function getSprintStories(token, id) {
  return api.get(`${SPRINT_API}/${id}/story`, config(token))
    .then(res => res.data);
}

module.exports = {
    getSprints, getSprint, getSprintStories
};
