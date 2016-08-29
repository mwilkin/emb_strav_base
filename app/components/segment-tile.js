import Ember from 'ember';

export default Ember.Component.extend({
  raceBucket: Ember.inject.service(),
  actions: {
    addToRace(item) {
      this.get('raceBucket').add(item);
      console.log(this.get('raceBucket').get('segments'))
    }
  }
});
