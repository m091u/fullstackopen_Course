import Person from "./Person";

const PersonsList = ({filteredNames, handleDelete}) => {
  return (
   <>
   {filteredNames.map((person)=> (
    <p key={person.id}>
    <Person person={person} handleDelete={()=> handleDelete(person.id)}/>
    </p>

   ))}
   </>
  ) 
}

export default PersonsList;
