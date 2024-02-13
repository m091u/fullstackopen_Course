import React from "react";

const Header = ({ course }) => <h2>{course.name}</h2>;

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
  return <h4>Total of {total} exercises</h4>;
};

const Course = ({ courses }) => {
    return (
      <>
      
        {courses.map((course) => (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        ))}
      </>
    );
  };
  

export default Course;
