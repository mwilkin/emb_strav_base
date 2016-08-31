import DS from 'ember-data';

export default DS.Model.extend({
  ssegid: DS.attr('number'),
  race: DS.belongsTo('race', {async: true}),
});
