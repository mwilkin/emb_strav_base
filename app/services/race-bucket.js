import Ember from 'ember';

export default Ember.Service.extend({
  segments: [],

  add(item){
    this.get('segments').pushObject(item);
  },

  delete(item){
    this.get('segments').removeObject(item);
  },

  reset(){
    this.set('segments', []);
  },

  count(){
    return this.get('segements').length;
  }

});
