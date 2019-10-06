import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const createLocalTimeStamp = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  return dateLocal
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, "/")
    .replace("T", " ");
};

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

const memoizedApiResponse = () => {
  const cache = {};

  return number => {
    if (cache[number]) {
      cache[number].last_datetime = cache[number].datetime;
      cache[number].datetime = createLocalTimeStamp();
      cache[number].occurrences++;
      return JSON.stringify(cache[number]);
    } else {
      const response = {
        datetime: createLocalTimeStamp(),
        value: squareOfSum(number) - sumOfSquares(number),
        number,
        occurrences: 1,
        last_datetime: null
      };
      cache[number] = response;
      return JSON.stringify(response);
    }
  };
};

const createApiResponse = memoizedApiResponse();

const mockApi = number =>
  new Promise(resolve => {
    return setTimeout(() => resolve(createApiResponse(number)), 1000); // Mocking some amount of latency.
  });

function App() {
  const [value, setValue] = React.useState("");
  const [submittedValue, setSubmittedValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [responses, setResponses] = React.useState([]);

  React.useEffect(() => {
    if (!submittedValue) return; // Guarding against my falsy default
    let didCancel = false;

    const mockServerCalculation = async () => {
      !didCancel && setLoading(true);
      const apiResponse = await mockApi(submittedValue);
      !didCancel &&
        setResponses(prevResponses =>
          [...prevResponses, JSON.parse(apiResponse)].reverse()
        ); // Ensure most recent requests show first.
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
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
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
      {!!responses.length && <h2>Previous API Responses</h2>}
      {responses.map((response, index) => (
        <div key={index}>
          <h3>
            Request for {response.number} at {response.datetime}
          </h3>
          <ul>
            <li>Datetime: {response.datetime}</li>
            <li>Number: {response.number}</li>
            <li>Value: {response.value}</li>
            <li>Occurrences: {response.occurrences}</li>
            <li>Last Requested: {response.last_datetime || "never"}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
