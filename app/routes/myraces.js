import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  model() {
    var userId = this.get('userService').get('user').id;
    var userFromService = this.get('userService');
    console.log(userId);
    return Ember.RSVP.hash({
      races: this.store.findAll('race'),
      users: this.store.findAll('user'),
      racesByCurrentUser: this.store.query('race', {
        orderBy: 'creatorId',
        equalTo: userId
      }),
      currentUser: this.store.query('user', {
        orderBy: 'userid',
        equalTo: userId,
      }).then(function(user) {
        userFromService.set('userFirebase', user.get('firstObject'));
        return user.get('firstObject');
      })
    });
  },
  actions: {
    delete(race) {
      race.get('users').forEach(function(user) {
        user.get('races').removeObject(race).then(function() {
          user.save().then(function(){
            race.destroyRecord();
          });
        });
      });
    },
    leave(race) {
      var currentUser = this.get('userService').get('userFirebase');
      currentUser.get('races').removeObject(race).then(function() {
        currentUser.save();
      });
      race.get('users').removeObject(currentUser).then(function() {
        race.save();
      });
    }
  }
});
