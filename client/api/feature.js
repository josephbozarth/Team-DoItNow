import api from 'axios';
import {getToken} from './session';

const FEATURE_API = '/api/feature';

function config() {
  return { headers: { 'X-Agility-Token': getToken() } };
}

function getFeatures() {
  return api.get(`${FEATURE_API}`, config())
    .then(res => res.data);
}

function getFeature(id) {
  return api.get(`${FEATURE_API}/${id}`, config())
    .then(res => res.data);
}

function getFeatureStories(id) {
  return api.get(`${FEATURE_API}/${id}/story`, config())
    .then(res => res.data);
}

function createFeature(feature) {
  return api.post(`${FEATURE_API}`, feature, config())
    .then(res => res.data);
}

function updateFeature(feature) {
  return api.put(`${FEATURE_API}`, feature, config())
    .then(res => res.data);
}

function deleteFeature(id) {
  return api.delete(`${FEATURE_API}/${id}`, config())
    .then(res => res.data);
}

module.exports = {
    getFeatures, getFeature, getFeatureStories, createFeature, updateFeature, deleteFeature
};
