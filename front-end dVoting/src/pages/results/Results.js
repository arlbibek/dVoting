import React from "react";
import './results.css'

const Results = () => {

  const result = require('../../Data/resultsData.json')
  const candidate = require('../../Data/candidates.json')
  
  function calcTotalVotes(array) {
    // Calculating the total number of votes casted
    var totalVotes = 0,
        i;
    for (i = 0; i < array.length; i++) {
      totalVotes += result[i].votes;
    }
    return totalVotes;
  }
  function calcWinner(array) {
    // Returns array having the max vote count
    var winner = [], 
        maxVote = 0,
        i;
    for (i = 0; i < array.length; i++) {
      if (array[i].votes > maxVote) {
        maxVote = array[i].votes
        winner = array[i];
      }
    }
    return winner;
  }
  // Winner info
  var winner = calcWinner(result);

  const renderResults = (reslut) => {
    return (
      <tr>
        <td className='candidates'>{reslut.header}</td>
        <td className='votes'>{reslut.votes}</td>
      </tr>
    )
  }
  return (
    <>
    <h1>This is Results Page</h1>

    <div className='winner-container'>
      <div className='winner-info'>
      <p className='winner-tag'>Winner!</p>
      <h2>{winner.header}</h2>
      <p className='winner-slogan'>{winner.slogan}</p>
      </div>
      <div className='winner-votes'>
        <div className='votes-tag'>Votes: </div>
        <div className='vote-count'>{winner.votes}</div>
      </div>
    </div>

    <div className='results-container'>
      <p>Total Votes casted: {calcTotalVotes(result)}</p>
      <table>
        <thead>
          <tr>
            <th>Candidates</th>
            <th>Total Votes</th>
          </tr>
        </thead>
        <tbody>
          {result.map(renderResults)}
        </tbody>
    </table>
    </div>
    <br />
    <br />
    </>
  )
}

export default Results;
