import './styles.css'
import { useState, useRef } from 'react'

const Game = ({
  verifyLetter,
  word,
  category,
  letters,
  guesses,
  score,
  wrongLetters,
  guessedLetters
}) => {
  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    verifyLetter(letter)

    setLetter('')
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        A categoria selecionada foi: <span>{category}</span>
      </h3>
      <p>Você tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={e => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>

      <button onClick={verifyLetter}>Finalizar jogo!</button>
    </div>
  )
}

export default Game
