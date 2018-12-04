import React, { Component } from "react"

import "./App.css"
import Post from "./Post/Post"
import Header from "./Header/Header"
import Search from "./Header/Search/Search"
import Compose from "./Compose/Compose"
import axios from "axios"

class App extends Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      searchInput: ""
    }

    this.updatePost = this.updatePost.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.createPost = this.createPost.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(res => {
      this.setState({ posts: res.data })
    })
  }

  updatePost(id, text) {
    //updating id and text of post using Axios.put where ID matches the post.id, returning the state
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(res => {
        this.setState({ posts: res.data })
      })
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => {
        this.setState({ posts: res.data })
        console.log(res.data)
      })
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(res => {
        this.setState({ posts: res.data })
      })
  }
  filterSearch(e) {
    axios
      .get(
        `https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(
          this.state.searchInput
        )}`
      )
      .then(res => this.setState({ posts: res.data }))
    // .catch()
  }
  handleChange(e) {
    // console.log(e.target.value)
    this.setState({ searchInput: e.target.value })
  }

  render() {
    const { posts } = this.state
    console.log(posts)
    return (
      <div className="App__parent">
        <Header
          filterSearchFn={this.filterSearch}
          handleChange={this.handleChange}
        />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              date={post.date}
              key={post.id}
              text={post.text}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    )
  }
}

export default App
