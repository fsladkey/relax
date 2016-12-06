const buildFromConfig = require('../utils/buildFromConfig')
const test = require('tape');

const user1 = { id: 1, name: "a" };
const user2 = { id: 2, name: "c" };
const user3 = { id: 3, name: "b" };

const sampleState = {
  users: {
    1: user1,
    2: user2,
    3: user3
  },

  tweets: {
    1: { id: 1, usersId: 1 },
    2: { id: 2, usersId: 1 },
    3: { id: 3, usersId: 1 },
    4: { id: 4, usersId: 2 },
    5: { id: 5, usersId: 2 },
    6: { id: 6, usersId: 3 },
    7: { id: 7, usersId: 3 }
  },

  comments: {
    1: { id: 1, tweetsId: 1 },
    2: { id: 2, tweetsId: 1 },
    3: { id: 3, tweetsId: 2 },
    4: { id: 4, tweetsId: 3 }
  }
}
test('buildFromConfig', function (t) {
  t.test('simple build', function (t) {
      t.plan(1);
      let subject = buildFromConfig(sampleState, 'users')
      t.deepEqual(subject, [user1, user2, user3]);
  });

  t.test('build with order', function (t) {
    t.plan(1);
    let subject = buildFromConfig(sampleState, 'users', { order: "name" })
    t.deepEqual(subject, [user1, user3, user2]);
  });

  t.test('build with order desc', function (t) {
    t.plan(1);
    let subject = buildFromConfig(sampleState, 'users', { order: { name : "DESC" } }
  )
    t.deepEqual(subject, [user2, user3, user1]);
  });

  t.test('build with where', function (t) {
    t.plan(1);
    let subject = buildFromConfig(sampleState, 'users', { where: { name : "a" } }
  )
    t.deepEqual(subject, [user1]);
  });

  t.test('build with where', function (t) {
    const newUser = Object.assign({}, user1, { tweets: [
      { id: 1, usersId: 1 },
      { id: 2, usersId: 1 },
      { id: 3, usersId: 1 },
    ]})
    t.plan(1);
    const config = { where: { name : "a" }, with: "tweets" }
    let subject = buildFromConfig(sampleState, 'users', config)
    t.deepEqual(subject, [newUser]);
  });

  t.test('build with where and nested config', function (t) {
    t.plan(1);
    const newUser = Object.assign({}, user1, { tweets: [
      { id: 3, usersId: 1 },
      { id: 2, usersId: 1 },
      { id: 1, usersId: 1 },
    ]})
    const config = { where: { name : "a" }, with: { tweets: { order: { id: "desc"} } } }
    let subject = buildFromConfig(sampleState, 'users', config)
    t.deepEqual(subject, [newUser]);
  });

  t.test('build with limit', function (t) {
    t.plan(1);
    const config = { limit: 2 }
    let subject = buildFromConfig(sampleState, 'users', config)
    t.deepEqual(subject, [user1, user2]);
  });
});
