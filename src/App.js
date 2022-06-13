import logo from './logo.svg';
import './App.css';

import { useEffect, useState, useRef } from 'react';

function App() {

  const [search, setSearch] = useState('pizza');
  const [recipes, setRecipes] = useState([]);

  const searchRef = useRef();

  useEffect(() => {

    (async () =>{
      const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${search}`);
      const data = await response.json();

      const {recipes} = data;
      

      setRecipes(recipes)

    })()

    }, [search])


  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
  }


  return (
    <div className="App">
      <header className="App-header">
       <h1>Forkify Recipes</h1>
      </header>

      <div className='search'>
        <form>
            <input type='text' placeholder='Search' ref={searchRef}/>
            <button type='submit' onClick={searchHandler}>Search</button>
        </form>
      </div>
      <div className='recipe-container'>
          {
          recipes.length > 0 ? recipes.map((recipe, index) =>{
            const {title, image_url, publisher, source_url} = recipe;
            return (
              <div key={index} className='recipe'>
                
                <img src={image_url} alt={title}/>
                <div><p>{title}</p></div>
                <p>Publisher: {publisher}</p>
                <a href={source_url}>Source</a>
              </div>
            )
          }) : <p>Loading....</p>
          }
      </div>
     

    </div>
  );
}

export default App;
