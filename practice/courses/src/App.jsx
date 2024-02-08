import { useState } from "react";

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <>
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
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>The app is used by pressing the buttons</p>
      </div>
    );
  }
  return (
    <div>
      <p>Button pressed history {props.allClicks.join(" ")}</p>
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const [counter, setCounter] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat("L"));
    const updateLeft = left + 1;
    setLeft(updateLeft);
    setTotal(updateLeft + right);
  };

  const handleRightClick = () => {
    setAllClicks(allClicks.concat("R"));
    const updateRight = right + 1;
    setRight(updateRight);
    setTotal(left + updateRight);
  };

  const handleIncrease = () => {
    setCounter(counter + 1);
  };
  const handleDecrease = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Part course={course} />
      <Total course={course} />
      <Display counter={counter} />
      <Button onClick={handleIncrease} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={handleDecrease} text="minus" />

      <hr></hr>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      {/* <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button> */}
      <Button onClick={handleRightClick} text="right" />
      {right}
      {/* <p>{allClicks.join(" ")}</p> */}
      <History allClicks={allClicks} />
      <p> Total clicks {total}</p>
    </div>
  );
};

export default App;
