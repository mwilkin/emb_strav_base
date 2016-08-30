import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  start: DS.attr(),
  end: DS.attr(),
  user: DS.belongsTo('user', {async: true}),
  segments: DS.hasMany('segment', {async: true}),
});
