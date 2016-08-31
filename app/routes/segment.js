import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    var results = [];
    var store = this.store;
    var race = store.findRecord('race', params.race_id);
    race.then(function(){
      var segments = race.get('segments');
      segments.forEach(function(segment){
        var tempSeg = store.findRecord('segment', segment.id);
        tempSeg.then(function(segmentResult){
          Ember.$.get("/api/user/segment/" + segmentResult.get("ssegid")).then(function(response){
            results.push(response);
          });
        });

      });
    }).then(function(){
      return results;
    });

  }
});
