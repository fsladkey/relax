const Model = require('../../core/utils/Model')

// Table "public.comments"
// Column   |            Type             |                       Modifiers
// ------------+-----------------------------+-------------------------------------------------------
// id         | integer                     | not null default nextval('comments_id_seq'::regclass)
// photo_id   | integer                     | not null
// author_id  | integer                     | not null
// body       | character varying           | not null
// created_at | timestamp without time zone | not null
// updated_at | timestamp without time zone | not null

module.exports = class Comment extends Model {
  static get describe() {
    return {
      photo_id: "integer",
      author_id: "integer",
      body: "text",
      created_at: "timestamp",
      updated_at: "timestamp",
    }
  }
}
