import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import  Posts  from './components/posts'


export default function App() {
  return (
      <>
        <BrowserRouter>
            <Posts />
            {/* <Switch>
                
                <Route exact path='/posts' component={ allPosts } />
    
            </Switch> */}

        </BrowserRouter>
        </>
  );
}

