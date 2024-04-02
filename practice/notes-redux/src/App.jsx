import { useEffect } from "react";

import NewNote from "./components/newNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes()) 
  }, []) 

  return (
    <div>
      <h1>Redux Note App</h1>
      <NewNote />

      <VisibilityFilter />

      <Notes />
    </div>
  );
};

export default App;
