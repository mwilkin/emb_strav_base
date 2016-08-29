import Ember from 'ember';

export default Ember.Component.extend({
  raceBucket: Ember.inject.service(),
  actions: {
    addToRace(item) {
      if(!this.get('raceBucket').get('segments').includes(item)) {
        this.get('raceBucket').add(item);
        console.log(this.get('raceBucket').get('segments'))
      }
    }
  }
});
