import DS from 'ember-data';

export default DS.Model.extend({
  ssegid: DS.attr('number'),
  segmentName: DS.attr(),
  race: DS.belongsTo('race', {async: true}),
});
