import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
  return <button className='square' onClick={props.onClick}>
    {props.move}
  </button>
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      nextMove: 'X',
      winner: null
    }
  }

  handleClick (i) {
    // is the game already over?
    if (this.state.winner) return

    let nextMove = this.state.nextMove
    const squares = this.state.squares.slice()

    // is the square already occupied?
    if (squares[i]) return

    // make the move and update the game state
    squares[i] = nextMove
    nextMove = nextMove === 'X' ? 'O' : 'X'
    this.setState({squares: squares, nextMove: nextMove})
  }

  renderSquare (i) {
    return <Square
      move={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  }

  render () {
    this.state.winner = calculateWinner(this.state.squares)
    let status
    if (this.state.winner) {
      status = `Winner: ${this.state.winner}`
    } else {
      status = `Next player: ${this.state.nextMove}`
    }

    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render () {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
