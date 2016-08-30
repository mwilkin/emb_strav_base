import Ember from 'ember';

export default Ember.Route.extend({

  redirect: function() {
    var url = '/api/auth/strava/logout';
    window.location.replace(url);
  }

});
