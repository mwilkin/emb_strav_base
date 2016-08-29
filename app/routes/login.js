import Ember from 'ember';

export default Ember.Route.extend({

  redirect: function() {
    var url = "/api/auth/strava/send";
    window.location.replace(url);
  }

});
