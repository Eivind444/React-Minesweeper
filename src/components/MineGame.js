import React from 'react'
import MSCell from './MSCell'
import MSGrid from './MSGrid'

function MineGame() {
  return (
    <div className="gameContainer">
      <div>
        {/* <button onClick={() => console.log()}>Pause</button>
        <button onClick={() => console.log()}>Start new game</button> */}
      </div>

      <MSGrid />
    </div>
  )
}

export default MineGame
