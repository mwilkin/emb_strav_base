import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return $.get("/api/user/starred").then(function(response){
      console.log(response);
      return {starred: response};
    });
  }
});
