import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  model() {
    var userId = this.get('userService').get('user').id;
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
        return user.get('firstObject');
      })
    });
  },
  actions: {
    delete(race) {
      race.destroyRecord();
    },
    leave(race) {
      race.destroyRecord();
    }
  }
});
