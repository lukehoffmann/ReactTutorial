import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/**
 * A square in the tic-tac-toe board. Displays X, O, or empty
 */
function Square (props) {
  return <button
    className={`square ${props.isCurrentMove ? ' square-last-move' : ''}`}
    onClick={props.onClick}>
    {props.symbol}
  </button>
}

/**
 * The tic-tac-toe board
 */
class Board extends React.Component {
  renderSquare (row, column) {
    const currentMove = this.props.move
    const isCurrentMove = currentMove &&
    currentMove.row === row &&
    currentMove.column === column

    return <Square
      key={`${row}, ${column}`}
      symbol={this.props.squares[row][column]}
      onClick={() => this.props.handleClick(row, column)}
      isCurrentMove={isCurrentMove}
    />
  }

  render () {
    let rows = [0, 1, 2]
    let columns = [0, 1, 2]

    return (
      <div>
        <div className='status'>
          {this.props.status}
        </div>

        {rows.map((r) => {
          return <div className='board-row' key={r}>
            {columns.map((c) => { return this.renderSquare(r, c) })}
          </div>
        })}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(3).fill(Array(3).fill(null)), // row, column
        move: { player: null, row: null, column: null },
        winner: null
      }]
    }
  }

  handleClick (row, column) {
    const [previous] = this.state.history.slice(-1)

    // is the game already over?
    if (previous.winner) return

    // is the square already occupied?
    if (previous.squares[row][column]) return

    // prepare the a new move
    let move = {
      row: row,
      column: column,
      player: previous.move.player === 'X' ? 'O' : 'X'
    }
    const squares = this.applyMoveToSquares(previous.squares, move)
    const winner = this.calculateWinner(squares)

    // add this move to the game history
    const newState = { squares: squares, move: move, winner: winner }
    this.setState({ history: this.state.history.concat([newState]) })
  }

  applyMoveToSquares (squares, move) {
    // make sure to copy the arrays we are modifying
    let copy = squares.slice()
    copy[move.row] = copy[move.row].slice()
    copy[move.row][move.column] = move.player
    return copy
  }

  render () {
    // current move is always the last one
    const [current] = this.state.history.slice(-1)

    const status =
      (current.winner)
        ? `Winner: ${current.winner}`
        : (this.state.history.length > 9)
          ? `Draw`
          : `Next player: ${current.player === 'X' ? 'O' : 'X'}`

    return <div className='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          move={current.move}
          status={status}
          handleClick={(row, column) => this.handleClick(row, column)} />
      </div>
      <div className='game-info'>
        <div>History</div>
        <ul>
          <dt>Return to:</dt>
          {this.state.history.map((move, moveNumber) => {
            return <li key={moveNumber}>{this.renderJumpButton(move, moveNumber)}</li>
          })}
        </ul>
      </div>
    </div>
  }

  renderJumpButton (move, moveNumber) {
    const label = (moveNumber === 0) ? `Game Start`
      : (move.winner) ? `Game Over (Winner: ${move.winner})`
        : (moveNumber === 9) ? `Game Over (Draw)`
          : `Move ${moveNumber} (${move.move.player})`

    return <button onClick={() => this.jumpTo(moveNumber)}>{label}</button>
  }

  jumpTo (moveNumber) {
    // slice the history back to the requested move
    this.setState({
      history: this.state.history.slice(0, moveNumber + 1)
    })
  }

  calculateWinner (squares) {
    // we can just check all of the known winning combos
    const rowsOfThree = [
      [[0, 0], [0, 1], [0, 2]], // top row
      [[1, 0], [1, 1], [1, 2]], // middle row
      [[2, 0], [2, 1], [2, 2]], // bottom row
      [[0, 0], [1, 0], [2, 0]], // left column
      [[0, 1], [1, 1], [2, 1]], // middle column
      [[0, 2], [1, 2], [2, 2]], // right column
      [[0, 0], [1, 1], [2, 2]], // diagonal
      [[0, 2], [1, 1], [2, 0]] // other diagonal
    ]
    for (const [[r1, c1], [r2, c2], [r3, c3]] of rowsOfThree) {
      if (squares[r1][c1] &&
        squares[r1][c1] === squares[r2][c2] &&
        squares[r1][c1] === squares[r3][c3]) {
        return squares[r1][c1]
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
