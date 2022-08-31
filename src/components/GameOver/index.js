import './styles.css'

const GameOver = ({ retryGame }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retryGame}>Resetar Jogo!</button>
    </div>
  )
}

export default GameOver
