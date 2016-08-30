import Ember from 'ember';

export default Ember.Component.extend({
  actions:  {
    enterRace(race){
      this.sendAction('enterRace', race); 
    }
  }
});
