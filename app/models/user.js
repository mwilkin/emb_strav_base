import DS from 'ember-data';

export default DS.Model.extend({
  userid: DS.attr(),
  races: DS.hasMany('race', {async: true}),
  userName: DS.attr(),
});
