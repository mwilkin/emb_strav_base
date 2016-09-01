import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('starred');
  this.route('home');
  this.route('logout');
  this.route('races');
  this.route('segment', {path: '/races/:race_id/segment/'});
  this.route('myraces');
  this.route('racedetail', {path: '/racedetail/:race_id'});
});

export default Router;
