import React, { useEffect, useState } from 'react';
import Option from './components/button/index';
import './App.css'

const OBSWebSocket = require('obs-websocket-js')

interface Scene {
  name: String
}

function App() {
  const obs = new OBSWebSocket()
  const [scenes, setScenes] = useState<Scene[]>([])
  const ip = "#ADD_YOUR_NETWORD_IP_HERE"
  useEffect(() => {
    obs.connect({ address: `${ip}:4444` }).then(() => {
      obs.send('GetSceneList').then((response: { scenes: Scene[]; }) => {
        setScenes(response.scenes)
        console.log(response.scenes)
      }).then(() => {
        obs.disconnect()
      })
    })
    // eslint-disable-next-line
  }, [])

  function handleScene(scene: String) {
    obs.connect({ address: `${ip}:4444` }).then(() => {
      obs.send('SetCurrentScene', {
        'scene-name': scene
      }).then(() => {
        obs.disconnect()
      })
    })
  }

  return (
    <div className="container">
      {
        scenes.map(scene => <Option key={Math.random()} title={scene.name} click={() => handleScene(scene.name)} />)
      }
    </div>
  );
}

export default App;
