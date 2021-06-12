import React from 'react'
import axios from 'axios'

export default class Posts extends React.Component{
    state = {
        posts: []
    }
    
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/posts`)
          .then(res => {
            const posts = res.data;
            this.setState({ posts });
          })
      }

      render(){
        return (
            <div>
                { this.state.posts.map(posts =>
                    <div><h3>{posts.title}</h3><p>{posts.content}</p> <hr /></div>
                    )}
            </div>
        )
      }
    
}
