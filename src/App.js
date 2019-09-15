import React from 'react';
import MarkdownWriter from './components/MarkdownOutput'
import './styles/styles.css'
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
      <Navbar />
      <p>Welcome to Resumake, this is an app to help you on your developer journey. Within this editor you can use a mix of HTML,CSS & Markdown to help your resume presentation.</p>

      <MarkdownWriter />
    </div>
  );
}

export default App;
