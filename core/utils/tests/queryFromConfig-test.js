const queryFromConfig = require('./queryFromConfig')
const test = require('tape');

test('queryFromConfig', function (t) {
  t.test('simple query', function (t) {
    t.plan(1);
      let subject = queryFromConfig('users')
      t.deepEqual(
        subject.toQuery(),
        'SELECT * FROM users'
      );
  });

  t.test('query with where', function (t) {
      t.plan(1);
      let subject = queryFromConfig('users', { where: { name: "Frank", age: 12 }})
      t.deepEqual(
        subject.toQuery(),
        "SELECT * FROM users WHERE users.name = 'Frank' AND users.age = 12"
      );
  });

  t.test('query with simple order', function (t) {
      t.plan(1);
      let subject = queryFromConfig('users', { order: "fname" })
      t.deepEqual(
        subject.toQuery(),
        "SELECT * FROM users ORDER BY users.fname ASC"
      );
  });

  t.test('query with simple complex order', function (t) {
      t.plan(1);
      const config = { order: { fname: "desc" } }
      let subject = queryFromConfig('users', config)
      t.deepEqual(
        subject.toQuery(),
        "SELECT * FROM users ORDER BY users.fname DESC"
      );
  });

  t.test('query with multiple order', function (t) {
      t.plan(1);
      const config = { order: [ "createdAt", { fname: "desc" } ] }
      let subject = queryFromConfig('users', config)
      t.deepEqual(
        subject.toQuery(),
        "SELECT * FROM users ORDER BY users.createdAt ASC, users.fname DESC"
      );
  });

  t.test('query with joins', function (t) {
      t.plan(1);
      const config = { with: "tweets" }
      let subject = queryFromConfig('users', config)
      t.deepEqual(
        subject.toQuery(),
        "SELECT * FROM users JOIN tweets ON tweets.usersId = users.id"
      );
  });

  t.test('query with joins with config', function (t) {
    t.plan(1);
    const config = { with: { "tweets": { order: "title" } } }
    let subject = queryFromConfig('users', config)
    t.deepEqual(
      subject.toQuery(),
      "SELECT * FROM users JOIN (SELECT * FROM tweets ORDER BY tweets.title ASC) AS tweets ON tweets.usersId = users.id"
    );
  });

  t.test('query with nested joins', function (t) {
    t.plan(1);
    const config = { with: { "tweets": { with: "comments" } } }
    let subject = queryFromConfig('users', config)
    t.deepEqual(
      subject.toQuery(),
      "SELECT * FROM users JOIN (SELECT * FROM tweets JOIN comments ON comments.tweetsId = tweets.id) AS tweets ON tweets.usersId = users.id"
    );
  });
});
