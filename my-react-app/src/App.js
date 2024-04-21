import React, { useState, useEffect } from 'react';

function Activity() {
  const [activity, setActivity] = useState('');

  useEffect(() => {
    fetch('http://www.boredapi.com/api/activity/')
      .then(response => response.json())
      .then(data => setActivity(data.activity))
      .catch(err => console.error('Error fetching data: ', err));
  }, []);

  return (
    <div>
      <h1>Random Activity Generator</h1>
      <p>{activity || 'Loading...'}</p>
    </div>
  );
}

export default Activity;
