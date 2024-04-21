import React, { useState } from 'react';


function Activity() {
  const [soloActivityDetails, setSoloActivityDetails] = useState({});
  const [groupActivityDetails, setGroupActivityDetails] = useState({});
  const [joke, setJoke] = useState('Click the button to hear a joke!');

  const fetchActivity = (setActivityFunction, participants) => {
    fetch(`https://www.boredapi.com/api/activity?participants=${participants}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActivityFunction({
          activity: data.activity,
          type: data.type,
          participants: data.participants,
          price: data.price,
          link: data.link,
          accessibility: data.accessibility
        });
      })
      .catch(err => {
        console.error('Error fetching activity data: ', err);
        setActivityFunction({
          activity: 'Failed to fetch new activity. Please try again!'
        });
      });
  };

  const fetchJoke = () => {
    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error fetching joke');
        }
        return response.json();
      })
      .then(data => setJoke(data.value))
      .catch(err => {
        console.error('Error fetching joke: ', err);
        setJoke('Failed to fetch a joke. Please try again!');
      });
  };

  const ActivityInfo = ({ details }) => (
    <div>
      <p><strong>Activity:</strong> {details.activity}</p>
      <p><strong>Type:</strong> {details.type}</p>
      <p><strong>Participants:</strong> {details.participants}</p>
     
      {details.link && (
        <p><strong>Learn More:</strong> <a href={details.link} target="_blank" rel="noopener noreferrer" className="underline">Click Here</a></p>
      )}
    </div>
  );
  return (
    <div className='app bg-gray-100 min-h-screen flex flex-col justify-center items-center'>
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-5xl font-bold text-center text-green-800 mb-8">
          Wish to Cure Some Boredom?
        </h1>
        <div className="bg-green-800 text-white rounded-lg shadow-xl p-5">
          <h2 className="text-3xl font-bold mb-4">Solo Activity</h2>
          <ActivityInfo details={soloActivityDetails} />
          <button onClick={() => fetchActivity(setSoloActivityDetails, 1)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mt-4">
            Generate Solo Activity
          </button>
        </div>
        
        <div className="bg-green-800 text-white rounded-lg shadow-xl p-5">
          <h2 className="text-3xl font-bold mb-4">Group Activity</h2>
          <ActivityInfo details={groupActivityDetails} />
          <button onClick={() => fetchActivity(setGroupActivityDetails, 2)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded mt-4">
            Generate Group Activity
          </button>
        </div>

        <h1 className="text-5xl font-bold text-center text-blue-800 my-8">
          Or Perhaps You'd Like to Hear a Joke?
        </h1>
        <div className="bg-blue-800 text-white rounded-lg shadow-xl p-5">
          <h2 className="text-3xl font-bold mb-4">Chuck Norris Joke</h2>
          <p>{joke}</p>
          <button onClick={fetchJoke} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-4">
            Tell Me a Joke
          </button>
        </div>
      </div>
    </div>
  );
}

export default Activity;