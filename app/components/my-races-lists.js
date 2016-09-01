import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    leave(race) {
      if(confirm('Are you sure want to leave this race?')) {
        this.sendAction('leave', race);
      }
    }
  }
});
