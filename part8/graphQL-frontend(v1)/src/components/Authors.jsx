import { useState } from 'react';
import { useMutation } from '@apollo/client'
import {EDIT_AUTHOR, ALL_AUTHORS} from '../queries'


const Authors = ({ show, authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!show) {
    return null;
  }

  const submit = (event)=> {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born) }
    })
    setName('');
    setBorn('');
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birth year</h2>
      <form onSubmit={submit}>
      <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born <input type="number" value={born} onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type='submit'>update authorr</button>
      </form>
    </div>
  );
};

export default Authors;
