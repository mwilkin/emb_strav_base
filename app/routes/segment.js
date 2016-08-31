import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    // var results = [];
    var store = this.store;
    return store.query('segment', { orderBy: 'race', equalTo: params.race_id}).then(function(segments) {
      var results = [];
      for(var segment of segments.toArray()) {
        Ember.$.getJSON("/api/user/segment/" + segment.get("ssegid")).then(function(response){
          results.push(response);
        });
      }
      console.log(results);
      return results;
    });

    //       var results = [];
    //       var counter = 0;
    //       for(var s of segmentResult) {
    //         Ember.$.getJSON("/api/user/segment/" + segmentResult.get("ssegid")).then(function(response){
    //           results.push(response);
    //           counter++;
    //         });
    //       }
    //       while(counter !== segmentResult.length) {
    //       }
    //       return results;
    //     });
    //   }
    //   return results
    // });
      // console.log({segments: results});
      // return {segments: results};
  }
  // model(params){
  //   var results = [];
  //   var store = this.store;
  //   var race = store.findRecord('race', params.race_id);
  //   race.then(function(){
  //     var segments = race.get('segments');
  //     segments.forEach(function(segment){
  //       var tempSeg = store.findRecord('segment', segment.id);
  //       tempSeg.then(function(segmentResult){
  //         Ember.$.getJSON("/api/user/segment/" + segmentResult.get("ssegid")).then(function(response){
  //           results.push(response);
  //         });
  //       });
  //     });
  //     console.log({segments: results});
  //
  //     return {segments: results};
  //   });
  // }
});
