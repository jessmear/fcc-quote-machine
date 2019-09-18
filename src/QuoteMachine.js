
import React, { useState, useEffect } from 'react';

function QuoteMachine() {
  const initialState = {
    author: 'unknown',
    title: 'unknown',
    lines: []
  }
  const [state, setState] = useState(initialState);

  const getPoetry = () => {
    const poemAPI = "http://poetrydb.org/linecount/4:abs";
    const request = new XMLHttpRequest();
    request.open('GET', poemAPI, true);

    request.onload = function() {
      var data = JSON.parse(this.response);
      if (this.status >= 200 && this.status < 400) {
        if(console.status && console.reason) {
          console.log("Something went wrong. Please refresh the page and try again.")
          console.log(data.status)
          console.log(data.reason)
        } else {
          makePoem(data);
        }
      } else {
        // We reached our target server, but it returned an error
        console.log("Something went wrong. Please refresh the page and try again.")
        console.log(data.status)
        console.log(data.reason)
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log("Connection problem found, please refresh the page and try again.");
    };

    request.send();
  
  }

  const makePoem = data => {
    console.log(data[0])
  }

  const poemAgain = () => {
    getPoetry();
  }

  const tweetPoem = () => {
	
  }

  return (
    <div id="quote-machine">
      <div id="quote-box" augmented-ui="r-rect bl-rect exe">
        <p id="title">random title</p>
        <p id="text">random poem</p>
        <p id="author">author name</p>
        
        <div className="btn" augmented-ui="tl-clip br-clip exe" onClick={poemAgain}>
          <span id="new-quote">poem again</span>
        </div>
        <div className="btn" augmented-ui="tl-clip br-clip exe" onClick={tweetPoem}>
          <span id="tweet-quote" >tweet</span>
        </div>
      </div>
    </div>
  );
}

export default QuoteMachine;
