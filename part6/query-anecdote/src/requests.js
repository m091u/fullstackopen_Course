import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateVotes = (updatedVotes) =>
  axios
    .put(`${baseUrl}/${updatedVotes.id}`, updatedVotes)
    .then((res) => res.data);

 
    
