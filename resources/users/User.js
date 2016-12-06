const Model = require('../../core/utils/Model')

// id                  | integer                     | not null default nextval('users_id_seq'::regclass)
// username            | character varying           | not null
// password_digest     | character varying           | not null
// session_token       | character varying           | not null
// created_at          | timestamp without time zone | not null
// updated_at          | timestamp without time zone | not null
// avatar_file_name    | character varying           |
// avatar_content_type | character varying           |
// avatar_file_size    | integer                     |
// avatar_updated_at   | timestamp without time zone |
// bio                 | text                        |


module.exports = class User extends Model {
  static get describe() {
    return {
      username: "varchar",
      password_digest: "varchar",
      session_token: "varchar",
      created_at: "timestamp",
      updated_at: "timestamp",
      avatar_file_name: "varchar",
      avatar_content_type: "varchar",
      avatar_file_size: "integer",
      avatar_updated_at: "timestamp",
      bio: "text"
    }
  }
}
