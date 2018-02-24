import api from 'axios';

const STORY_API = '/api/story';

function config(token) {
  return { headers: { 'X-Agility-Token': token } };
}

function getStories(token) {
  return api.get(`${STORY_API}`, config(token))
    .then(res => res.data);
}

function getStory(token, id) {
  return api.get(`${STORY_API}/${id}`, config(token))
    .then(res => res.data);
}

module.exports = {
    getStories, getStory
};
