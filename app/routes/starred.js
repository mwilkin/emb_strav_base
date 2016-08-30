import Ember from 'ember';

export default Ember.Route.extend({
  raceBucket: Ember.inject.service(),
  model: function(){
    return $.get("/api/user/starred").then(function(response){
      console.log(response);
      return {starred: response};
    });
  },
  actions: {
    createRace(){
      var segs = this.get('raceBucket');

    }
  }
});
