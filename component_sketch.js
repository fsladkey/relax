// db("users").get.all({ where: { name: "name" }, order: "name", with: ["posts"] })
// config object
// {
//   where: { col: "val" },
//   order: ["col", "col2"],
//   with: [ "associated objects", { associated_objects: { with: } } ],
//   page: { num, 1 perPage: 10 },
//   limit: 5
// }

// FRONT END RESOURCE API
// resources("posts").find(ownProps.params.id)
// resources("posts").find({ title: "that one good post" });
// resources("posts").all()
// resources("posts").all({ where: { authorId: this.props.currentUser.id }});
// resources("posts").read()


// REQUEST/BACK END RESOURCE API
// from("posts").get() // for singular item
// from("posts").get(1)
// from("posts").get({ session_token: "aosjn1234i120381y2"})
// from("posts").get.all()
// from("posts").get.all({ where: ["createdAt > ?", new Date()]})
// from("posts").post({ title: "title" });
// from("posts").patch({ id: 1, title: "title" });
// from("posts").patch(1, { title: "title" });
// from("posts").patch({ title: "old title"}, { title: "new title" });
// from("posts").delete(1);
// from("posts").delete();
// from("posts").delete({ title: "delatable" });

// FRONT END RESOURCE API
// resources("posts").find(ownProps.params.id)
// resources("posts").find({ title: "that one good post" });
// resources("posts").all()
// resources("posts").all({ where: { authorId: this.props.currentUser.id }});
// resources("posts").read()

import React, { Component } from 'react';
import { connect } from 'core'

class App Extends Component {

  static resources(from, props) {
    return { currentUser: from("session").get() }
  }

  componentDidMount() {
    this.props.from("session").get();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <main>
        <h1>Welcome { currentUser.username }</h1>
        <PostsIndex />
      </main>
    );
  }

}

class PostsIndex extends Component {

  static resources(from, props) {
    return { posts: from("posts").get.all() }
  }

  componentDidMount() {
    this.props.from("posts").get.all();
  }

  render() {
    const { currentUser } = this.props;
    const greeting = !!currentUser.id ?
      "Please sign in." :
      `Welcome, ${currentUser.username}!`
    return (
      <main>
        <h1>Welcome { this.props.currentUser.username }</h1>
        <ul>
          {
            this.props.posts.map(post => (
              <li>{ post.title }</li>
            ));
          }
        </ul>
      </main>
    );
  }

}

export default connect(App)
