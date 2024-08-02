type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number | string => {
  // if (op === 'multiply'){
  //   return a* b
  // } else if (op === 'add'){
  //   return a + b
  // } else if (op === 'divide'){
  //   if (b === 0) return 'Error: Division by zero'
  //   return a / b
  // }
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Error: Division by zero");
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
// console.log(multiplicator(6, 4, 'divide'));
