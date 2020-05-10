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
        nextMove: 'X',
        winner: null
      }],
      stepNumber: 0
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]

    // is the game already over?
    if (current.winner) return

    let nextMove = current.nextMove
    const squares = current.squares.slice()

    // is the square already occupied?
    if (squares[i]) return

    // otherwise make the move and add the game state to history
    squares[i] = nextMove
    this.setState({
      history: history.concat([
        {
          squares: squares,
          nextMove: nextMove === 'X' ? 'O' : 'X',
          winner: this.calculateWinner(squares)
        }]),
      stepNumber: history.length
    })
  }

  jumpTo (stepNumber) {
    this.setState({ stepNumber: stepNumber })
  }

  render () {
    const current = this.state.history[this.state.stepNumber]

    const status =
      (current.winner)
        ? `Winner: ${current.winner}`
        : `Next player: ${current.nextMove}`

    return <div className='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          status={status}
          handleClick={(i) => this.handleClick(i)} />
      </div>
      <div className='game-info'>
        <ol>
          {this.state.history.map((move, stepNumber) => {
            return <li key={stepNumber}>
              <button onClick={() => this.jumpTo(stepNumber)}>
                {(stepNumber)
                  ? `Go to move #${stepNumber}`
                  : `Go to game start`}
              </button>
            </li>
          })}
        </ol>
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
