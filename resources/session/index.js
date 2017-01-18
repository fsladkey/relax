//TODO Implement session object
const resource = require('../../core/resourceCreators').resource
const singular = require('../../core/resourceCreators').singular

function session(req, res) {
  return { get: (key) => {}, set: (key, val) => {}, }
}
const only = require('../../core/utils/utils').only

module.exports = singular(resource("session", {

  actions: (from) => ({

    show(req) {
      from('users').get.one({ session_token: session(req, res).get("sessionToken") });
    },

    create(req) {
      const { user } = req.params
      user = { username: user.username, passwordDigest: BCrypt.new(user.password) };

      return from('users').patch(
        user.id,
        { session_token: util.randomToken() }
      ).then(user => {
        session(req, res).set("sessionToken", user.sessionToken());
        return user;
      });
    },

    destroy(req) {
      const { params: { id } } = req
      return from.users.patch(
        id,
        { session_token: session(req, res).get("sessionToken") }
      );
    }
  })

}));
