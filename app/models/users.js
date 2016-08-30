import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  suserid: DS.attr(),
  races: DS.hasMany('race', {async: true})
});
