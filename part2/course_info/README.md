# Solution to exercises: 
- 2.1: Course information step6
- 2.2: Course information step7
- 2.3*: Course information step8

The `Course` component is responsible for rendering information about a course. It takes a `course` object as a prop and displays its details, including the course name and its parts. The component is structured into different parts:

- **Header Component:** Displays the course name.
- **Content Component:** Renders the details of each part of the course.
```

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total of {total} exercises</p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;

```
