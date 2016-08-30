import Ember from 'ember';

export default Ember.Route.extend({
  raceBucket: Ember.inject.service(),
  userService: Ember.inject.service(),
  model: function(){
    return $.get("/api/user/starred").then(function(response){
      console.log(response);
      return {starred: response};
    });
  },
  actions: {
    createRace(params){
      var segmentList = this.get('raceBucket').get('segments');
      var store = this.store;
      console.log(params)
      var newRace = store.createRecord('race', params);
      newRace.save().then(function(savedRace) {
        console.log(savedRace);
        savedRace.get('id');
        segmentList.forEach(function(segment){
          var args = {
            ssegid: segment.id,
            race: savedRace
          }
          var newSeg = store.createRecord('segment', args);
          savedRace.get('segments').addObject(newSeg);
          savedRace.save().then(function(){
            return newSeg.save();
          })
        });
      });
      this.transitionTo('index');

    }
  }
});
