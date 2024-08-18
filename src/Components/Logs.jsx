import React from 'react'

const Logs = ({turns}) => {
  return (
    <ol id='log'>
      {turns.map((turn,index)=> (
        <li key={index}>
          {turn.player} selected {turn.square.row} , {turn.square.col}
          </li>
      ))}
    </ol>
  )
}

export default Logs