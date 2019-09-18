
import React, { useState } from 'react';

const littleWillie = (<ul>
                        <li>Willie found some dynamite,</li>
                        <li>Didn't understand it quite.</li>
                        <li>Curiosity seldom pays,</li>
                        <li>It rained Willie seven days.</li>
                      </ul>);

function QuoteMachine() {
  const initialState = {
    author: 'unknown',
    title: 'Little Willies',
    lines: littleWillie,
    tweetText: ''
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
        } else { // everything went right
          const num = Math.floor(Math.random()*data.length);
          makePoem(data[num]);
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

  const makePoem = poem => {
    const lines = buildLines(poem.lines);
    const tweetText = poem.title + ' by ' + poem.author + ' ' + poem.lines.join(" / ");
    setState({
      author: poem.author,
      title: poem.title,
      lines,
      tweetText
    })
  }

  const buildLines = (lines) => {
    const verse = lines.map(line => {
      return <li>{line}</li>
    })
    return(
      <ul>
        {verse}
      </ul>
    )
  }

  return (
    <div id="quote-machine">
      <div id="quote-box" augmented-ui="r-rect bl-rect exe">
        <p id="title">{state.title}</p>
        <p id="author">by {state.author}</p>
        <p id="text">{state.lines}</p>
        
        <div className="btn" augmented-ui="tl-clip br-clip exe" onClick={getPoetry}>
          <span id="new-quote">poem again</span>
        </div>
        <div className="btn" augmented-ui="tl-clip br-clip exe">
          <a href={`http://twitter.com/intent/tweet?text=${state.tweetText}`}
            target="_blank" 
            id="tweet-quote">
              tweet poem
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuoteMachine;
