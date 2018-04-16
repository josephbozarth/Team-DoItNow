import api from 'axios';
import {getToken} from './session';

const SPRINT_API = '/api/sprint';

function config() {
  return { headers: { 'X-Agility-Token': getToken() } };
}

function getSprints() {
  return api.get(`${SPRINT_API}`, config())
    .then(res => res.data);
}

function getSprint(id) {
  return api.get(`${SPRINT_API}/${id}`, config())
    .then(res => res.data);
}

function getSprintStories(id) {
  return api.get(`${SPRINT_API}/${id}/story`, config())
    .then(res => res.data);
}

function createSprint(sprint) {
  return api.post(`${SPRINT_API}`, sprint, config())
    .then(res => res.data);
}

function updateSprint(sprint) {
  return api.put(`${SPRINT_API}`, sprint, config())
    .then(res => res.data);
}

function deleteSprint(id) {
  return api.delete(`${SPRINT_API}/${id}`, config())
    .then(res => res.data);
}

module.exports = {
    getSprints, getSprint, getSprintStories, createSprint, updateSprint, deleteSprint
};
