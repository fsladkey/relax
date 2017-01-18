// config object
// {
//   where: { col: "val" },
//   order: ["col", "col2"],
//   with: [ "associated objects", { associated_objects: { with: } } ],
//   page: { num, 1 perPage: 10 },
//   limit: 5
// }

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
