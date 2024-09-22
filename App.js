import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [response, setResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiEndpoint = 'https://main--ra2111004010155.netlify.app/bfhl';
    axios.post(apiEndpoint, { data: data })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (response && selectedOptions.length > 0) {
      const filteredResponse = {};
      selectedOptions.forEach((option) => {
        filteredResponse[option] = response[option];
      });
      return (
        <pre>
          {JSON.stringify(filteredResponse, null, 2)}
        </pre>
      );
    } else {
      return (
        <pre>
          {JSON.stringify(response, null, 2)}
        </pre>
      );
    }
  };

  return (
    <div>
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter data:
          <textarea value={data} onChange={(event) => setData(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Select options:</h2>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
          </select>
          <h2>Response:</h2>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;