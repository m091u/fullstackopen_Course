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