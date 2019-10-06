import React from "react";
import "./App.css";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
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
