import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, total, sum, positive }) => {
  const average = () => (total === 0 ? 0 : sum / total);

  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <StatisticLine text="Count of good" value={good} />
      <StatisticLine text="Count of neutral" value={neutral} />
      <StatisticLine text="Count of bad" value={bad} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="Average" value={average()} />
      <StatisticLine text="Positive" value={`${positive}%`} />
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // Unicafe exercises
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const clickedGood = good + 1;
    setGood(clickedGood);
    setTotal(clickedGood + bad + neutral);
    setSum(clickedGood * 1 + neutral * 0 + bad * -1);
    setPositive((clickedGood / (clickedGood + bad + neutral)) * 100);
  };

  const handleNeutral = () => {
    const clickedNeutral = neutral + 1;
    setNeutral(clickedNeutral);
    setTotal(good + bad + clickedNeutral);
    setSum(good * 1 + clickedNeutral * 0 + bad * -1);
    setPositive((good / (good + bad + clickedNeutral)) * 100);
  };

  const handleBad = () => {
    const clickedBad = bad + 1;
    setBad(clickedBad);
    setTotal(good + clickedBad + neutral);
    setSum(good * 1 + neutral * 0 + clickedBad * -1);
    setPositive((good / (good + clickedBad + neutral)) * 100);
  };

  // Anecdotes exercises

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    const anecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(anecdoteIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes));

  return (
    <>
      <h1>Give feedback</h1>

      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        sum={sum}
        positive={positive}
      />

      <hr></hr>
      <div>
        <h2>Part 2: Anecdotes</h2>

        <h3>Anecdote of the day</h3>
        <p>{anecdotes[selected]}</p>
        <p>Anecdote has {votes[selected]} votes</p>
        <Button onClick={nextAnecdote} text="next anecdote" />
        <Button onClick={handleVote} text="vote" />
        
        <h3>Anecdote with most votes</h3>
        <p>{anecdotes[indexOfMaxVotes]}</p>
        <p>Anecdote has {votes[indexOfMaxVotes]} votes</p>
      </div>
    </>
  );
};

export default App;
