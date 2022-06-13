import logo from './logo.svg';
import './App.css';

import { useEffect, useState, useRef } from 'react';

function App() {

  // set state for search input
  const [search, setSearch] = useState('pizza');

  // set state for recipes array. this is where we will store the recipes
  const [recipes, setRecipes] = useState([]);

  // make a ref for the search input. this is the value that will be used to search for recipes
  const searchRef = useRef();

  // useEffect is a hook that runs after the component is rendered. and after every time the search input changes
  useEffect(() => {

    // anonymous function that runs after the component is rendered. and after every time the search input changes
    
    
    /*
    this is the same as doing:

    function foo(){
      ....
    }

    foo();

    (async () =>{})(); this is a nameless fucntion that is immediately invoked.

    */
    (async () =>{

      // get the recipes from the API. this is a promise. hence the await keyword
      const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${search}`);

      // get the data from the response. this is a promise. hence the await keyword
      const data = await response.json();

      // set the recipes array to the data array. destructure the data array
      const {recipes} = data;
      
      // set the recipes array to the data array. i.e setState
      setRecipes(recipes)

    })()

    }, [search]) // this is the array of dependencies. if the search input changes, the effect will run again


  // search input event handler
  const searchHandler = (e) => {
    // prevent the default behavior of the event. i.e don't submit the form or reload the page
    e.preventDefault();

    // set the search input to the value of the ref. i.e the value of the search input
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
            // map through the recipes array and return a recipe component for each recipe
          recipes.length > 0 ? recipes.map((recipe, index) =>{
            // destructure the recipe object. this only works if the variable name is the same as the object key
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
