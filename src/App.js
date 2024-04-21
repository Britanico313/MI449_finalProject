import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
function SpinningCube() {
  const meshRef = useRef();
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

function Activity() {
  const [soloActivityDetails, setSoloActivityDetails] = useState({});
  const [groupActivityDetails, setGroupActivityDetails] = useState({});
  const [joke, setJoke] = useState('Click the button to hear a joke!');
  const [show3DEffect, setShow3DEffect] = useState(false);

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
  const [showCube, setShowCube] = useState(false);
  return (
    <div className="app bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 min-h-screen flex flex-col items-center pt-10 pb-20 px-4">
      <h1 className="text-6xl font-extrabold text-center text-white mb-10">
        Cure Your Boredom!
      </h1>
      
      {show3DEffect && (
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpinningCube />
        </Canvas>
      )}
      
      <div className="space-y-10 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Solo Activity</h2>
          <ActivityInfo details={soloActivityDetails} />
          <button onClick={() => fetchActivity(setSoloActivityDetails, 1)}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            Generate Solo Activity
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Group Activity</h2>
          <ActivityInfo details={groupActivityDetails} />
          <button onClick={() => fetchActivity(setGroupActivityDetails, 2)}
            className="mt-4 w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            Generate Group Activity
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Chuck Norris Joke</h2>
          <p>{joke}</p>
          <button onClick={fetchJoke}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            Tell Me a Joke
          </button>
        </div>
        
        <button onClick={() => setShow3DEffect(!show3DEffect)}
          className="text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-full transition duration-300">
          Toggle 3D Effect
        </button>
      </div>
    </div>
  );
}

export default Activity;