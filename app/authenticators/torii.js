import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import raw from 'ic-ajax';
import config from '../config/environment';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({
  torii: service('torii'),
  authenticate() {
    return new RSVP.Promise((resolve, reject) => {
      this._super(...arguments).then((data) => {
        raw({
          url:      `${config.apiHost}/api/tokens/oauth/grant`,
          type:     'POST',
          dataType: 'json',
          data:     { 'grant_type': 'facebook_auth_code', 'auth_code': data.authorizationCode }
        }).then((response) => {
          resolve({
            access_token: response.accessToken,
            provider: data.provider,
            user_id: response.userId
          });
        }, reject);
      }, reject);
    });
  }
});
