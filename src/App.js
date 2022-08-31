import './App.css'

// React
import { useState, useEffect } from 'react'

// data
import { wordsList } from './data/words'

// Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver/'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

function App() {
  const [gameStage, setGameState] = useState(stages[0].name)

  const [words] = useState(wordsList)
  console.log(words)
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <Game />}
      <GameOver />
    </div>
  )
}

export default App
