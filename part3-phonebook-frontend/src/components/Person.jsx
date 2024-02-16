const Person = ({ person , handleDelete}) => {
  return (
    <>
      {person.name} {person.number}  
      <button onClick={handleDelete} style={{marginLeft: '15px'}}>Delete</button>
    </>
  );
}

export default Person;
