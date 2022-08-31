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
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  function pickWordAndCategory() {
    // pick random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }

  // start secret word game
  function startGame() {
    // pick word and category
    const { word, category } = pickWordAndCategory()

    // create array of letters
    let wordLetters = word.split('')
    //toLowerCase each letter
    wordLetters = wordLetters.map(l => l.toLowerCase())

    //set states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    console.log(wordLetters)
    //start game
    setGameStage(stages[1].name)
  }

  // processar letra digitada pelo usuario
  function verifyLetter() {
    setGameStage(stages[2].name)
  }

  // tela inicial
  function retryGame() {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {/* passou a função startGame via prop para o component */}
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          word={pickedWord}
          category={pickedCategory}
          letters={letters}
        />
      )}
      {gameStage === 'end' && <GameOver retryGame={retryGame} />}
    </div>
  )
}

export default App
