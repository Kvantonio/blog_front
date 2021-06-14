import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useParams, Link } from 'react-router-dom'


export class Posts extends React.Component{
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
            <div className="posts">
                { this.state.posts.map(post =>
                    <ElementPost post={post}/>
                    )}
            </div>
        )
      }
    
}

export function ElementPost(props) {

    const [user, setUser] = useState([]);
    const [categories, setCategories] = useState([]);
    const [likes, setLikes] = useState([]);



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/`+  props.post.author_id ).then(response => (setUser(response.data)));
        axios.get(`http://127.0.0.1:8000/api/posts/`+  props.post.id + `/categories` ).then(response => (setCategories(response.data)));
        axios.get(`http://127.0.0.1:8000/api/posts/`+  props.post.id + `/like` ).then(response => (setLikes(response.data)));
    }, []);

    return (
        <div>

           <Link to={'/posts/'+props.post.id}><h2>{props.post.title}</h2></Link>
           <p>{props.post.content}</p>
           <p>Author: <i>{user.name}</i></p>
        
        <p>Categories:</p>
        { categories.map(category =>
                    <li>{category.title}</li>
                    )}
        <p>Likes: {likes}</p>
        <hr />
        </div>
    )
}




export function SinglePost() {
    const { post_id } = useParams();

    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [categories, setCategories] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/`+  post_id ).then(response => setPost(response.data));
        axios.get(`http://127.0.0.1:8000/api/posts/`+  post_id + `/categories` ).then(response => (setCategories(response.data)));
        axios.get(`http://127.0.0.1:8000/api/posts/`+  post_id + `/like` ).then(response => (setLikes(response.data)));
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/`+  post.author_id ).then(response => (setUser(response.data)));
    }, [post]);

    return (
        <div>
           <h2>{post.title}</h2>
           <p>{post.content}</p>
           <p>Author: <i>{user.name}</i></p>
        
        <p>Categories:</p>
        { categories.map(category =>
                    <li>{category.title}</li>
                    )}

        <p>Likes: {likes}</p>
        <hr />
        <p>Comments:</p>
        <PostComments post_id={post_id}/>
        </div>
      )
  
}



export function PostComments(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/`+ props.post_id +'/comments').then(response => setComments(response.data));
    }, []);

    return (
        <div className="commnts">
           { comments.map(comment => <SingleComment comment={comment}/>)}
        </div>
      )
  
}



export function SingleComment(props) {
    const [likes, setLikes] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/comments/`+ props.comment.id  +`/like` ).then(response => (setLikes(response.data)));
        axios.get(`http://127.0.0.1:8000/api/users/`+  props.comment.author_id ).then(response => (setUser(response.data)));
    }, []);

    return (
        <div className="comment">
            <p>Author: <i>{user.name}</i></p>
           <p>{props.comment.content}</p>
           
        <p>Likes: {likes}</p>
        </div>
    )
  
}
