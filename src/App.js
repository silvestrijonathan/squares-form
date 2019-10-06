import React from "react";
import "./App.css";

const sumOfSquares = number => {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    sum += i ** 2;
  }

  return sum;
};

const squareOfSum = number => {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    sum += i;
  }

  return sum ** 2;
};

const mockApi = number =>
  new Promise(resolve => {
    setTimeout(() => resolve(squareOfSum(number) - sumOfSquares(number)), 1000); // Mocking some amount of latency.
  });

function App() {
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!Boolean(Number(value))) {
      setError("You must enter a valid number between 0 and 100.");
      return null;
    }

    if (value <= 0 || value > 100) {
      setError(
        "Your number must be greater than 0 and less than or equal to 100."
      );
      return null;
    }

    setError("");
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label htmlFor="number">
        Input a number:{" "}
        <input
          name="number"
          id="number"
          value={value}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
