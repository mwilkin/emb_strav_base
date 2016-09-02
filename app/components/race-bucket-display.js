import Ember from 'ember';

export default Ember.Component.extend({
  raceBucket: Ember.inject.service(),
  userService: Ember.inject.service(),
  actions: {
    removeFromRace(item) {
      this.get('raceBucket').delete(item);
    },

    createRace(){
      var params  = {
        name: this.get('name'),
        start: Date.parse(this.get('start')),
        end: Date.parse(this.get('end')),
        users: [],
        segments: [],
        creatorId: this.get('userService.user.id'),
        creatorName: this.get('userService.user.displayName'),
      };
      console.log(this.get('userService.user.displayName'))
      this.sendAction('createRace', params);
    }
  }
});
