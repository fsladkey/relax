const Model = require('../../core/utils/Model')

// id                 | integer                     | not null default nextval('photos_id_seq'::regclass)
// user_id            | integer                     | not null
// created_at         | timestamp without time zone | not null
// updated_at         | timestamp without time zone | not null
// image_file_name    | character varying           |
// image_content_type | character varying           |
// image_file_size    | integer                     |
// image_updated_at   | timestamp without time zone |
// caption            | text                        |

module.exports = class Photo extends Model {
  static get describe() {
    return {
      user_id: "integer",
      created_at: "timestamp",
      updated_at: "timestamp",
      image_file_name: "varchar",
      image_content_type: "varchar",
      image_file_size: "integer",
      image_updated_at: "timestamp",
      caption: "text"
    }
  }
  static associations() {
    return {
      user: {
        type: "belongsTo",
        foreignKey: "userId",
        resourceType: "users",
      }
    }
  }
}
