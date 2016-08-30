import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  userid: DS.attr(),
  races: DS.hasMany('race', {async: true})
});
