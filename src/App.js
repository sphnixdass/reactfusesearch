import React, { useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';

import characters from './characters.json';




const fuse = new Fuse(characters, {
  keys: [
    'name',
    'company',
    'species'
  ],
  includeScore: true
});



function App() {
  const [query, updateQuery] = useState('');
  const results = fuse.search(query);
  const characterResults = results.map(character => character.item);

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  

  return (
    <>

      <header className="App-header">
        <div className="container">
          <h1>Project Space Search</h1>
        </div>
      </header>

      <main className="container">
        <ul className="characters">
          {characterResults.map(character => {
            const { name, company, species, thumb } = character;
            return (
              <li key={name} className="character">
                <span className="character-thumb" style={{
                  backgroundImage: `url(${thumb})`
                }} />
                <ul className="character-meta">
                  <li>
                    <strong>Name:</strong> { name }
                  </li>
                  <li>
                    <strong>Company:</strong> { company }
                  </li>
                  <li>
                    <strong>Species:</strong> { species }
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
        <aside>
          <form className="search">
            {console.log(fuse.search('bender'))}
            <label>Search</label>
            <input type="text" value={query} onChange={onSearch}/>
          </form>
        </aside>
      </main>

      <footer>
        <div className="container">
          <p>
            Search POC by Dass S.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;