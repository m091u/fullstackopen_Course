import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Form from "./components/Form";
import Person from "./components/Person";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [char, setChar] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfiled");
      setPersons(response.data);
      setFilteredNames(response.data);
    });
  }, []);

  console.log("render", persons.length, "notes");
  console.log(persons);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    };

    if (
      persons.find(
        (person) =>
          person.name.toLowerCase() === personObject.name.toLowerCase()
      )
    ) {
      alert(`${personObject.name} is already in the phonebook`);
    } else {
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          // setPersons((prevPersons) => [...prevPersons, personObject]);
          // setFilteredNames((prevFilteredNames) => [
          //   ...prevFilteredNames,
          //   personObject,
          // ]);
          setPersons(persons.concat(response.data))
          setFilteredNames(filteredNames.concat(response.data))
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const searchNamesList = (char) => {
    let filtered;

    if (char === "") {
      setFilteredNames(persons);
    } else {
      filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(char.toLowerCase())
      );
      setFilteredNames(filtered);
    }
  };

  const handleSearch = (event) => {
    setChar(event.target.value);
    searchNamesList(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} char={char} />
      <h3>Add a new person</h3>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <PersonsList filteredNames={filteredNames} />
    </div>
  );
};

export default App;
