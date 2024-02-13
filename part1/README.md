
# Solution to exercises for Part1

# Exercise 1.1: course information, step1

```
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (  <>
    <p>
      {props.part1} {props.exercises1}
    </p>
    <p>
      {props.part2} {props.exercises2}
    </p>
    <p>
      {props.part3} {props.exercises3}
    </p>
  </>
  )
};

const Total = (props)=> {
  return( <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>)
 
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  );
};

export default App;
```

# Exercise 1.2: course information, step2
```
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
  )
};

const Total = (props)=> {
  return( <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>)
 
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />

      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3}/>
      
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  );
};

export default App;
```

# 1.3: course information step3
```
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
  )
};

const Total = (props)=> {
  return( <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />

      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part1.exercises} />
      <Part part={part3.name} exercises={part1.exercises}/>

      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  );
};

export default App;
```

# 1.4: course information step4
```
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (  <>
    <p>
      {props.parts[0].name} {props.parts[0].exercises}
    </p>
    <p>
      {props.parts[1].name} {props.parts[1].exercises}
    </p>
    <p>
      {props.parts[2].name} {props.parts[2].exercises}
    </p>
  </>
  )
};

const Total = (props)=> {
  return( <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />

      <Part parts={parts} />

      <Total parts={parts} />
    </div>
  );
};

export default App;
```

# Exercise 1.5: course information step5
```
const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (  <>
    <p>
      {props.course.parts[0].name} {props.course.parts[0].exercises}
    </p>
    <p>
      {props.course.parts[1].name} {props.course.parts[1].exercises}
    </p>
    <p>
      {props.course.parts[2].name} {props.course.parts[2].exercises}
    </p>
  </>
  )
};

const Total = (props)=> {
  return( <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />

      <Part course={course} />
    
      <Total course={course} />
    </div>
  );
};

export default App;
```

# 1.6: unicafe step1
```
import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleGood = () => {
    const clickedGood = good + 1;
    setGood(clickedGood);
  };

  const handleNeutral = () => {
    const clickedNeutral = neutral + 1;
    setNeutral(clickedNeutral);
  };

  const handleBad = () => {
    const clickedBad = bad + 1;
    setBad(clickedBad);
  };

  return (
    <>
      <h1>Give feedback</h1>

      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <h1>Statistics</h1>
      <p> Count of good: {good}</p>
      <p> Count of neutral: {neutral}</p>
      <p> Count of bad: {bad}</p>
    </>
  );
};

export default App;
```

# 1.7: unicafe step2
```
import { useState } from "react";

const App = () => {
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

  const average = ()=> total === 0 ? 0 : (sum) / total;
  return (
    <>
      <h1>Give feedback</h1>

      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <h1>Statistics</h1>
      <p> Count of good: {good}</p>
      <p> Count of neutral: {neutral}</p>
      <p> Count of bad: {bad}</p>
      <p> All: {total}</p>
      <p> Average: {average()}</p>
      <p> Positive: {positive}%</p>
    </>
  );
};

export default App;
```

# 1.8: unicafe step3
```
import { useState } from "react";

const Statistics = ({good, neutral, bad, total, sum, positive}) => {
  const average = () => (total === 0 ? 0 : sum / total);
  return (
    <div>
      <p> Count of good: {good}</p>
      <p> Count of neutral: {neutral}</p>
      <p> Count of bad: {bad}</p>
      <p> All: {total}</p>
      <p> Average: {average()}</p>
      <p> Positive: {positive}%</p>
    </div>
  );
};

const App = () => {
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

  return (
    <>
      <h1>Give feedback</h1>

      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} sum={sum} positive={positive}/>
    </>
  );
};

export default App;

```

# 1.9: unicafe step4
```
import { useState } from "react";

const Statistics = ({good, neutral, bad, total, sum, positive}) => {
  const average = () => (total === 0 ? 0 : sum / total);

  if(total === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <p> Count of good: {good}</p>
      <p> Count of neutral: {neutral}</p>
      <p> Count of bad: {bad}</p>
      <p> All: {total}</p>
      <p> Average: {average()}</p>
      <p> Positive: {positive}%</p>
    </>
  );
};

const App = () => {
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

  return (
    <>
      <h1>Give feedback</h1>

      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} sum={sum} positive={positive}/>
    </>
  );
};

export default App;

```

# 1.10: unicafe step5
```
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
      <StatisticLine text="Positive" value={`${positive}%`}/>
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
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

  // const average = () => (total === 0 ? 0 : sum / total);
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
    </>
  );
};

export default App;

```

# 1.12*: anecdotes step1
```
import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
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

  const nextAnecdote = ()=>{
    const anecdoteIndex = Math.floor(Math.random()*anecdotes.length)
    console.log(anecdoteIndex);
    setSelected(anecdoteIndex)
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>{anecdotes[selected]}</p>
      <Button onClick={nextAnecdote} text="next anecdote" />
    </div>
  )
}

export default App

```

# 1.14*: anecdotes step3
```
import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
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
  const [votes, setVotes]= useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = ()=>{
    const anecdoteIndex = Math.floor(Math.random()*anecdotes.length)
    console.log(anecdoteIndex);
    setSelected(anecdoteIndex)
  }

  const handleVote = () => {
    const newVotes = [...votes]; 
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log(newVotes);
  };

  return (
    <div>
      {anecdotes[selected]}
      <p>{anecdotes[selected]}</p>
      <Button onClick={nextAnecdote} text="next anecdote" />
       <Button onClick={handleVote} text="vote" />
    </div>
  )
}

export default App

```

# 1.14*: anecdotes step3
```
import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
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
  const [votes, setVotes]= useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = ()=>{
    const anecdoteIndex = Math.floor(Math.random()*anecdotes.length)
    console.log(anecdoteIndex);
    setSelected(anecdoteIndex)
  }

  const handleVote = () => {
    const newVotes = [...votes]; 
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log(newVotes);
  };

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      {anecdotes[selected]}
      <p>{anecdotes[selected]}</p>
      <Button onClick={nextAnecdote} text="next anecdote" />
      <Button onClick={handleVote} text="vote" />
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[indexOfMaxVotes]}</p>
      <p>Anecdote has {votes[indexOfMaxVotes]} votes</p>
    </div>
  )
}

export default App
```
