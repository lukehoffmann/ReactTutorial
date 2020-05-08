import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/**
 * A square in the tic-tac-toe board. Displays X, O, or empty
 */
function Square (props) {
  return <button className='square' onClick={props.onClick}>
    {props.move}
  </button>
}

/**
 * The tic-tac-toe board
 */
class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      moves: Array(9).fill(null),
      nextMove: 'X',
      winner: null
    }
  }

  renderSquare (i) {
    return <Square
      move={this.state.moves[i]}
      onClick={() => this.handleClick(i)}
    />
  }

  handleClick (i) {
    // is the game already over?
    if (this.state.winner) return

    let nextMove = this.state.nextMove
    const moves = this.state.moves.slice()

    // is the square already occupied?
    if (moves[i]) return

    // otherwise make the move and update the game state
    moves[i] = nextMove
    this.setState({moves: moves})
    this.setState({nextMove: nextMove === 'X' ? 'O' : 'X'})
    this.setState({winner: this.calculateWinner(moves)})
  }

  render () {
    const status =
      (this.state.winner)
        ? `Winner: ${this.state.winner}`
        : `Next player: ${this.state.nextMove}`

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

  calculateWinner (moves) {
    const winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (const [a, b, c] of winStates) {
      if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
        return moves[a]
      }
    }
    return null
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
