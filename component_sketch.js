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
    const { currentUser } = this.props
    return (
      <main>
        <h1>Welcome { currentUser.username }</h1>
        <PostsIndex />
      </main>
    );
  }

}

export default connect(App)

class PostsIndex extends Component {

  static resources(from, ownProps) {
    return { posts: from("posts").get.all() }
  }

  componentDidMount() {
    this.props.from("posts").get.all();
  }

  render() {
    const { currentUser } = this.props
    const loggedIn = !!currentUser.id
    const greeting = loggedIn ?
      "Please sign in." :
      `Welcome, ${currentUser.username}!`
    return (
      <main>
        <h1>App Name</h1>
        <h4>{ greeting }</h4>
        <ul>
          {
            this.props.posts.map(post =>
              <li>{ post.title }</li>
            )
          }
        </ul>
      </main>
    )
  }

}

export default connect(PostsIndex)
