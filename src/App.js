import React from "react";
import "./App.css";

const numbersDict = {};

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

const createApiResponse = number => {
  if (numbersDict[number]) {
    numbersDict[number].last_datetime = numbersDict[number].datetime;
    numbersDict[number].datetime = new Date();
    numbersDict[number].occurrences++;
    return JSON.stringify(numbersDict[number]);
  }

  const response = {
    datetime: new Date(),
    value: squareOfSum(number) - sumOfSquares(number),
    number,
    occurrences: 1,
    last_datetime: null
  };

  numbersDict[number] = response;
  return JSON.stringify(response);
};

const mockApi = number =>
  new Promise(resolve => {
    return setTimeout(() => resolve(createApiResponse(number)), 1000); // Mocking some amount of latency.
  });

function App() {
  const [value, setValue] = React.useState("");
  const [submittedValue, setSubmittedValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState([]);

  React.useEffect(() => {
    if (!submittedValue) return; // Guarding against my falsy default
    let didCancel = false;

    const mockServerCalculation = async () => {
      !didCancel && setLoading(true);
      const apiResponse = await mockApi(submittedValue);
      !didCancel &&
        setResponse(prevResponse => [...prevResponse, JSON.parse(apiResponse)]);
      !didCancel && setLoading(false);
      setSubmittedValue("");
    };

    mockServerCalculation();

    return () => {
      didCancel = true;
    };
  }, [submittedValue]);

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
    setSubmittedValue(Number(value));
    setValue("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
