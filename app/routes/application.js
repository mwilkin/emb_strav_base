import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return $.get("/api/user").then(function(response){
      console.log(response.user);
      return {user: response.user};
    });
  }
});
