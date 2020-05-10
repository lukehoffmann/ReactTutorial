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
  renderSquare (i) {
    return <Square
      move={this.props.moves[i]}
      onClick={() => this.props.handleClick(i)}
    />
  }

  render () {
    return (
      <div>
        <div className='status'>{this.props.status}</div>
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
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        moves: Array(9).fill(null),
        nextMove: 'X',
        winner: null
      }]
    }
  }

  handleClick (i) {
    const [current] = this.state.history.slice(-1)
    // is the game already over?
    if (current.winner) return

    let nextMove = current.nextMove
    const moves = current.moves.slice()

    // is the square already occupied?
    if (moves[i]) return

    // otherwise make the move and add the game state to history
    moves[i] = nextMove
    this.setState({history: this.state.history.concat([
      {
        moves: moves,
        nextMove: nextMove === 'X' ? 'O' : 'X',
        winner: this.calculateWinner(moves)
      }
    ])})
  }

  render () {
    const [current] = this.state.history.slice(-1)
    const status =
      (current.winner)
        ? `Winner: ${current.winner}`
        : `Next player: ${current.nextMove}`

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            moves={current.moves}
            status={status}
            handleClick={(i) => this.handleClick(i)} />
        </div>
        <div className='game-info'>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }

  calculateWinner (moves) {
    // we can just check all of the known winning combos
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
