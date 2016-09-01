import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    delete(race) {
      if(confirm('Are you sure you want to delete this rental?')) {
        this.sendAction('delete', race);

      }
    }
  }
});
