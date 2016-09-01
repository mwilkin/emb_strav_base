import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  model() {
    var userId = this.get('userService').get('user').id;
    console.log(this.get('userService').get('user').id);
    return Ember.RSVP.hash({
      races: this.store.findAll('race'),
      users: this.store.findAll('user'),
      racesByCurrentUser: this.store.query('race', {
        orderBy: 'creatorId',
        equalTo: userId
      }),
    });
  },
  actions:  {
    enterRace(race) {
      var params = {
        userid:  this.get('userService').get('user.id')
      };
      var userExistenceSum = 0;
      var currentUser;
      this.get('currentModel.users').forEach(function(user){
        if(user.get('userid') === params.userid) {
          userExistenceSum += 1;
          currentUser = user;
        }
      });
      if (userExistenceSum === 0) {
        currentUser = this.store.createRecord('user', params);
      }
      race.get('users').addObject(currentUser);
      currentUser.save().then(function() {
        return race.save();
      });
    }
  }
});
