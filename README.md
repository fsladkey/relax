# Relax

Relax is a working title for a full stack javascript framework built with the goal of abstracting the way we interact with data into a consistent format and reducing boilerplate.

The project is currently being developed and while certain features are complete, they are not integrated together.

Querying the database, frontend state, or making requests from the client to the server are all expressed with the same syntax. The `from` function takes a resource name and returns an object with methods named after commonly used RESTful HTTP methods. `get` is extended with `get.one` and `get.all` to allow fetching individual records or collections. For frontend state, these methods return objects or arrays. For database queries or fetching from the server they return promises.

To make more specific requests, `get.all` takes config options that are similar to SQL clauses (and when fetching from the database, sometimes map directly to the SQL counterpart). For example, the options `{ where: { status: "approved" }, with: "comments" }` will fetch records where the attribute `status` is 'approved' and will include associated comment records. Associated records can also take their own options. For example `{ with: { comments: { where: { published: true } } } }`.

## Examples

#### Fetching Records
```js
from('users').get.all().then(users => console.log(users))
// => [{ id: 1, name: "Arya"}, { id: 2, name: "Jon"}]
from('users').get.all({ where: { name: "Jon" }}).then(users =>
  console.log(users)
)
// => [{ id: 2, name: "Jon"}]
from('users').get.one(1).then(user =>
  console.log(user)
)
// => { id: 1, name: "Arya"}
```

#### Creating Records
```js
from('users').post({ name: "Ned" }).then(user => console.log(user))
// => { id: 3, name: "Ned"}
```

#### Updating Records
```js
from('users').patch({ id: 13 name: "Eddard" }).then(user => console.log(user))
// => { id: 3, name: "Eddard"}
```

#### Deleting Records
```js
from('users').delete({ name: "Jon" }).then(user => console.log(user))
from('users').delete({ name: "Jon" }).then(user => console.log(user))
// => { id: 2, name: "Jon"}
```
