import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// export const createAnecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     data: asObject(content),
//   };
// }

// export const voteAnecdote=(id)=> {
//   return {
//     type: "VOTE",
//     data: {id:id}
//   }
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "NEW_ANECDOTE":
//       return [...state, action.data];
//     case "VOTE": {
//       const id = action.data.id;
//       const anecdoteToChange = state.find((a) => a.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       return state.map((a) => (a.id !== id ? a : changedAnecdote));
//     }
//     default:
//       return state;
//   }
// };

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   const id = action.payload.id;
    //   const anecdoteToChange = state.find((a) => a.id === id);
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1,
    //   };

    //   return state.map((a) => (a.id !== id ? a : changedAnecdote));
    // },
    
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
 
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes, voteAnecdote} = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};


export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id);
    dispatch(voteAnecdote(votedAnecdote));
  };
}
export default anecdotesSlice.reducer;
