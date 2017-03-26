import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],

  credentials: {},

  //this is what we refer to this info on api side
  //ember will provide shortcuts if you use the same name

  actions: {
    submit () {
      // on submit credentials value will be passed up the route in line 7
      this.sendAction('submit', this.get('credentials'));
    },

    //if credentials is set up properly this reset will clear credentials no matter what
    reset () {
      this.set('credentials', {});
    },
  },
});
