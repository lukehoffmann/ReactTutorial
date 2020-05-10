import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/**
 * A square in the tic-tac-toe board. Displays X, O, or empty
 */
function Square (props) {
  return <button
    className='square'
    onClick={props.onClick}>
    {props.move}
  </button>
}

/**
 * The tic-tac-toe board
 */
class Board extends React.Component {
  renderSquare (i) {
    return <Square
      move={this.props.squares[i]}
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
        squares: Array(9).fill(null),
        move: null,
        winner: null
      }]
    }
  }

  handleClick (i) {
    const [previous] = this.state.history.slice(-1)

    // is the game already over?
    if (previous.winner) return

    // is the square already occupied?
    if (previous.squares[i]) return

    // prepare the a new move
    const squares = previous.squares.slice()
    const move = previous.move === 'X' ? 'O' : 'X'
    squares[i] = move
    const winner = this.calculateWinner(squares)

    // add this move to the game history
    this.setState({
      history: this.state.history.concat(
        [{ squares: squares, move: move, winner: winner }]
      )
    })
  }

  jumpTo (moveNumber) {
    // slice the history back to the requested move
    this.setState({
      history: this.state.history.slice(0, moveNumber + 1)
    })
  }

  render () {
    // current move is always the last one
    const [current] = this.state.history.slice(-1)

    const status =
      (current.winner)
        ? `Winner: ${current.winner}`
        : `Next player: ${current.move === 'X' ? 'O' : 'X'}`

    return <div className='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          status={status}
          handleClick={(i) => this.handleClick(i)} />
      </div>
      <div className='game-info'>
        <div>History</div>
        <ul>
          <dt>Return to:</dt>
          {this.state.history.map((move, moveNumber) => {
            return <li key={moveNumber}>
              <button onClick={() => this.jumpTo(moveNumber)}>
                {(moveNumber === 0)
                  ? `Game Start`
                  : (move.winner)
                    ? `Game Over (Winner: ${move.winner})`
                    : `Move ${moveNumber} (${move.move})`}
              </button>
            </li>
          })}
        </ul>
      </div>
    </div>
  }

  calculateWinner (squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
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
