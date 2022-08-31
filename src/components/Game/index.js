import './styles.css'
import { useState } from 'react'

const Game = ({ verifyLetter, word, letters, category }) => {
  const [usedLetters] = useState([])

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        A categoria selecionada foi: <span>{category}</span>
      </h3>
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="blankSquare"></span>
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras utilizadas:</p>
        <span>a,</span>
        <span>b,</span>
      </div>
      {letters.map(letter => (
        <input value={letter} style={{ width: '5rem' }}></input>
      ))}
      <button onClick={verifyLetter}>Finalizar jogo!</button>
    </div>
  )
}

export default Game
