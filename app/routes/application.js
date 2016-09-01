import Ember from 'ember';

export default Ember.Route.extend({
  userService: Ember.inject.service(),
  model: function(){
    var user = this.get('userService');
    return Ember.$.get("/api/user").then(function(response){
      user.set('user', response.user);
      return {user: response.user};
    });
  }
});
