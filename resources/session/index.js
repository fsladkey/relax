const resources = require('core/resources')
const session = require('core/session')
const extract = require('core/util').extract

const { resource, singular } = resources

module.exports = singular(resource("session", {

  actions: (from) => {

    show(req) {
      from('users').get.one({ session_token: session(req).get("sessionToken") });
    },

    create(req) {
      const { user } = req.params
      user = { username: user.username, passwordDigest: BCrypt.new(user.password) };

      return from('users').patch(
        user.id,
        { session_token: util.randomToken() }
      ).then(user => {
        session(req).set("sessionToken", user.sessionToken());
        return user;
      });
    },

    destroy(req) {
      const { params: { id } } = req
      return from.users.patch(
        id,
        { session_token: session(req).get("sessionToken") }
      );
    }
  }

}));
