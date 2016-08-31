import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.$.get("/api/user").then(function(response){
      return {user: response.user};
    });
  }
});
