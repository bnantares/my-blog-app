import React, { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsWithImportedScroller from './components/Posts/PostsWithImportedScroller';
import AddPostForm from './components/Forms/AddPostForm'
import './App.css';

const App: FC = () => {
  return (
    <Router>
    <div className="App">
    <header className="App-header">
      <Routes>
        <Route path="/posts" element={<PostsWithImportedScroller />} />
        <Route path="/addpost" element={<AddPostForm />}/>
      </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
