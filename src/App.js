import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SpinningCube() {
  const meshRef = useRef(); // useRef should be imported from 'react'
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
        {/* Existing JSX for activities and jokes */}
      </div>

      <button onClick={() => setShow3DEffect(!show3DEffect)}
        className="text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-full transition duration-300">
        Toggle 3D Effect
      </button>
    </div>
  );
}

export default Activity;
