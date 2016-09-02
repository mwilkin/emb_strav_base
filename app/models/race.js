import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  start: DS.attr(),
  end: DS.attr(),
  creatorId: DS.attr(),
  creatorName: DS.attr(),
  segments: DS.hasMany('segment', {async: true}),
  users: DS.hasMany('user', {async: true})
});
