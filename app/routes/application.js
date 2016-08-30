import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var user = this.get('userService');
    return $.get("/api/user").then(function(response){
      return {user: response.user};
    });
  }
});
