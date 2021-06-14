import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import  {Posts, SinglePost}  from './components/posts'


export default function App() {
  return (
      <>
        <BrowserRouter>

            <Switch>
                
                <Route exact path='/posts' component={ Posts } />
                <Route path='/posts/:post_id' component={ SinglePost } />
            </Switch>

        </BrowserRouter>
        </>
  );
}

