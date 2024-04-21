import React, { useState } from 'react';

function Activity() {
  const [activity, setActivity] = useState({
    activity: 'Click the button to get a random activity!',
    type: '',
    participants: '',
    price: '',
    link: '',
    accessibility: ''
  });

  const fetchActivity = (participants = 1) => {
    fetch(`https://www.boredapi.com/api/activity?participants=${participants}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActivity({
          activity: data.activity,
          type: data.type,
          participants: data.participants,
          price: data.price,
          link: data.link,
          accessibility: data.accessibility
        });
      })
      .catch(err => {
        console.error('Error fetching data: ', err);
        setActivity(prevState => ({
          ...prevState,
          activity: 'Failed to fetch new activity. Please try again!'
        }));
      });
  };

  return (
    <div className="p-10 max-w-2xl mx-auto bg-green-800 text-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Random Activity Generator</h1>
      <div className="mb-8">
        <p><strong>Activity:</strong> {activity.activity}</p>
        <p><strong>Type:</strong> {activity.type}</p>
        <p><strong>Participants:</strong> {activity.participants}</p>
        <p><strong>Price:</strong> {activity.price}</p>
        <p><strong>Accessibility:</strong> {activity.accessibility}</p>
        {activity.link && <p><strong>Learn More:</strong> <a href={activity.link} target="_blank" rel="noopener noreferrer" className="underline">Click Here</a></p>}
      </div>
      <button onClick={() => fetchActivity(1)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mt-2">
        Generate Solo Activity
      </button>
      <button onClick={() => fetchActivity(2)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded mt-4">
        Generate Group Activity
      </button>
    </div>
  );
}

export default Activity;
