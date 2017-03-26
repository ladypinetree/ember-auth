import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

//domain and browser specific storage
//gets cleared when close browser and not when you reload the page
// NO MORE SIGN OUT/ SIGN IN TO TEST

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),

  signUp (credentials) {
    return this.get('ajax').post('/sign-up', {
      data: {
        credentials: {
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.passwordConfirmation,
        },
      },
    });
  },

  signIn (credentials) {
    return this.get('ajax').post('/sign-in', {
      data: {
        credentials: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    })

    // this should have been
    // signIn (credentials) {
    //   return this.get('ajax').post('/sign-in', {
    //     data: { credentials },
    //   })
    //   but the handlebars template defined passwordConfirmation
    // and not password_confirmation so the credentials have to be defined

    .then((result) => {
      this.get('credentials').set('id', result.user.id);
      this.get('credentials').set('email', result.user.email);
      this.get('credentials').set('token', result.user.token);
    });
  },

  changePassword (passwords) {
    return this.get('ajax').patch(`/change-password/${this.get('credentials.id')}`, {
      data: {
        passwords: {
          old: passwords.previous,
          new: passwords.next,
        },
      },
    });
  },

  signOut () {
    return this.get('ajax').del(`/sign-out/${this.get('credentials.id')}`)
    .finally(() => this.get('credentials').reset());
  },
});
