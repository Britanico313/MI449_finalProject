import React, { useState } from 'react';

function Activity() {
  const [activity, setActivity] = useState('Click the button to get a random activity!');

  const fetchActivity = () => {
    fetch('https://www.boredapi.com/api/activity')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setActivity(data.activity))
      .catch(err => {
        console.error('Error fetching data: ', err);
        setActivity('Failed to fetch new activity. Please try again!');
      });
  };

  return (
    <div className="p-10 max-w-xl mx-auto bg-green-800 text-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Random Activity Generator</h1>
      <p className="text-lg mb-6">{activity}</p>
      <button onClick={fetchActivity} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded">
        Generate New Activity
      </button>
    </div>
  );
}

export default Activity;
