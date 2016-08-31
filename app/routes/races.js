import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  model() {
    console.log(this.get('userService').get('user').id);
    return Ember.RSVP.hash({
      races: this.store.findAll('race'),
      users: this.store.findAll('user')
    });
  },
  actions:  {
    enterRace(race) {
      var params = {
        userid:  this.get('userService').get('user.id')
      };
      console.log(this.get('userService').get('user'));
      console.log(params.userid);
      var userExistenceSum = 0;
      var currentUser;
      this.get('currentModel.users').forEach(function(user){
        console.log(user);
        console.log('user.id: ' + user.get('userid') + "; params.userid: " + params.userid);
        if(user.get('userid') === params.userid) {
          userExistenceSum += 1;
          currentUser = user;
          console.log(currentUser.id)
        }
      });
      if (userExistenceSum === 0) {
        currentUser = this.store.createRecord('user', params);
      }
      console.log(this.store.query('user', {userid: 1645537}))
      race.get('users').addObject(currentUser);
      currentUser.save().then(function() {
        return race.save();
      });
    }
  }
});
