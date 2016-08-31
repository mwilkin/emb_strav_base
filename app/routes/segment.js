import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    var store = this.store;
    return store.query('segment', { orderBy: 'race', equalTo: params.race_id}).then(function(segments) {
      var results = [];
      var promises = [];
      for(var segment of segments.toArray()) {
        promises.push(Ember.$.getJSON("/api/user/segment/" + segment.get("ssegid")));
      }

      return Promise.all(promises).then(function(responses){
        responses.forEach(function(response){
          results.push(response);
        });
        return results;
      });

    });
  }
});
