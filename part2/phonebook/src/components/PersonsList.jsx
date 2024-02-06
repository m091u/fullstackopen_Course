import Person from "./Person";

const PersonsList = ({filteredNames}) => {
  return (
   <>
   {filteredNames.map((person)=> (
    <p key={person.id}>
    <Person person={person}/>
    </p>

   ))}
   </>
  ) 
}

export default PersonsList;
