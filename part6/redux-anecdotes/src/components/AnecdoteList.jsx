import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteForm;
