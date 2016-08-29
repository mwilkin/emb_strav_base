import Ember from 'ember';

export default Ember.Component.extend({
  raceBucket: Ember.inject.service(),
  actions: {
    removeFromRace(item) {
      this.get('raceBucket').delete(item);
    }
  }
});
