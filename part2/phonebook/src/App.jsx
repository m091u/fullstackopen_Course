import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Form from "./components/Form";
import PersonsList from "./components/PersonsList";
import personServices from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [char, setChar] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredNames(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );

    if (existingPerson) {
      const confirmNrUpdate = window.confirm(
        `${personObject.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmNrUpdate) {
        personServices
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
            setFilteredNames(updatedPersons);
            setNotification({
              message: `Phone number for ${updatedPerson.name} was updated`,
              isError: false,
            });
            setTimeout(() => {
              setNotification(null);
            }, 4000);
          })
          .catch((error) => {
            console.error("Error updating person: ", error);
            setNotification({
              message: `Information of ${existingPerson.name}  has already been removed from phonebook`,
              isError: true,
            });
            setTimeout(() => {
              setNotification(null);
            }, 4000);
          });
      }
    } else {
      personServices
        .create(personObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setFilteredNames(filteredNames.concat(createdPerson));
          setNotification({
            message: `${createdPerson.name} was added to phonebook`,
            isError: false,
          });
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch((error) => console.error("Error updating person: ", error));
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

  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);
    if (confirmDelete) {
      personServices.deletePerson(id).then((returnedList) => {
        const updatedList = persons.filter((person) => person.id !== id);
        setPersons(updatedList);
        setFilteredNames(updatedList);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification?.message}
        isError={notification?.isError}
      />
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

      <PersonsList filteredNames={filteredNames} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
