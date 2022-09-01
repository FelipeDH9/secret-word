import './App.css'

// React
import { useCallback, useState, useEffect } from 'react'

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

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  // Game states
  const [score, setScore] = useState(0)
  const [guesses, setGuesses] = useState(guessesQty)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  const pickWordAndCategory = useCallback(() => {
    // pick random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])

  // start game
  const startGame = useCallback(() => {
    // reset letters states
    clearLettersStates()

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

    // console.log(wordLetters)
    //start game
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // processar letra digitada pelo usuario
  function verifyLetter(letter) {
    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been used
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters(actualGuessedLetters => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters(actualWrongLetters => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses(actualGuesses => actualGuesses - 1)
    }
  }

  // tela final e vai para a inicial
  function retryGame() {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  function clearLettersStates() {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLettersStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore(actualScore => (actualScore += 100))

      // restart game with new word
      startGame()
    }
  }, [guessedLetters, letters, startGame])

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
          guesses={guesses}
          score={score}
          wrongLetters={wrongLetters}
          guessedLetters={guessedLetters}
        />
      )}
      {gameStage === 'end' && <GameOver retryGame={retryGame} score={score} />}
    </div>
  )
}

export default App
