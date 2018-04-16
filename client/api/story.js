import api from 'axios';
import {getToken} from './session';

const STORY_API = '/api/story';

function config() {
  return { headers: { 'X-Agility-Token': getToken() } };
}

function getStories() {
  return api.get(`${STORY_API}`, config())
    .then(res => res.data);
}

function getStory(id) {
  return api.get(`${STORY_API}/${id}`, config())
    .then(res => res.data);
}

function getStoryStatuses() {
  return api.get(`${STORY_API}Status`, config())
    .then(res => res.data);
}

function createStory(story) {
  let result = story;
  result.featureId = !result.featureId ? null : parseInt(result.featureId);
  result.sprintId = !result.sprintId ? null : parseInt(result.sprintId);
  return api.post(`${STORY_API}`, result, config())
    .then(res => res.data);
}

function updateStory(story) {
  return api.put(`${STORY_API}`, story, config())
    .then(res => res.data);
}

function deleteStory(id) {
  return api.delete(`${STORY_API}/${id}`, config())
    .then(res => res.data);
}

module.exports = {
    getStories, getStory, createStory, updateStory, deleteStory, getStoryStatuses
};
