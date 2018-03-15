import api from 'axios';

const FEATURE_API = '/api/feature';

function config(token) {
  return { headers: { 'X-Agility-Token': token } };
}

function getFeatures(token) {
  return api.get(`${FEATURE_API}`, config(token))
    .then(res => res.data);
}

function getFeature(token, id) {
  return api.get(`${FEATURE_API}/${id}`, config(token))
    .then(res => res.data);
}

function getFeatureStories(token, id) {
  return api.get(`${FEATURE_API}/${id}/story`, config(token))
    .then(res => res.data);
}

module.exports = {
    getFeatures, getFeature, getFeatureStories
};
