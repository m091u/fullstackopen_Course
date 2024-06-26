import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdoteData = response.data;

  const updatedVotes = anecdoteData.votes + 1;

  const updatedAnecdote = { ...anecdoteData, votes: updatedVotes };

  const updateResponse = await axios.patch(`${baseUrl}/${id}`, updatedAnecdote);
  return updateResponse.data;
};

export default { getAll, createNew, voteAnecdote };
