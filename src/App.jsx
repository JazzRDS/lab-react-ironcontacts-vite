import { useState } from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

function getRandomContact(existingContacts) {
  const remainingContacts = contactsJSON.filter(
    // #iteration 3
    // the .some is used on the existing contacts array to see of the new contact is already displayed.
    // Checks if the value is true or false. As .some is a function used on arrays, and returns boolean value.
    // The latter half of the following line of code is filtering out contacts from contacts array
    (contact) => !existingContacts.some((existingContact) => existingContact.id === contact.id)
  );
  return remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
}

function sortByPopularity(contacts) {
  return [...contacts].sort((a, b) => b.popularity - a.popularity);
}

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0,5));
  console.log("contacts", contacts);
//also #iteration 3
  const handleClick = () => {
    if (contacts.length === contactsJSON.length) {
      return;
    }
    //also #iteration 3
    const randomContact = getRandomContact(contacts);
    // takes all the friends that are already there, and adds a new contact to that list
    setContacts((previousContacts) => [...previousContacts, randomContact]);
    // #iteration 3 - 5 lines below, the handle click line

    const handleClickSortByPopularity = () => {
      const sortedContacts = sortByPopularity(contacts);
      setContacts(sortedContacts);
    };
  
  };
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => handleClick()}>Add Random Contact</button>
      <button onClick={() => handleClick()}>Sort Alphabetically</button>
      <button onClick={() => handleClick()}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar 🏆</th>
            <th>Won Emmy 🏆</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
              <td>
                <img
                src={oneContact.pictureUrl}
                alt={oneContact.name}
                style={{ height: "200px" }}
                />
              </td>
              <td>
                <h3>
                  {oneContact.name}
                  </h3>
              </td>
              <td>
                <h3>
                  {oneContact.popularity}
                  </h3>
              </td>
              <td>
                <h3>
                  {oneContact.wonOscar}
                  {oneContact.wonOscar && " 🏆"}
                </h3>
              </td>
              <td>
                <h3>
                  {oneContact.wonEmmy}
                  {oneContact.wonEmmy && " 🏆"}
                </h3>
              </td>
              </tr>
            )}
            )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
