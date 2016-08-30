import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeFromRace(item) {
      this.get('raceBucket').delete(item);
    },

    createRace(){
      this.sendAction('createRace');
    }
  }
});
