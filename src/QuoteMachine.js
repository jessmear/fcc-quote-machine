
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
    tweetText: "Willie found some dynamite, / Didn't understand it quite. / Curiosity seldom pays / It rained Willie seven days. - author uknown"
  }
  const [state, setState] = useState(initialState);

  // == mixed content errors ==
  // const getPoetry = () => {
  //   const poemAPI = "http://poetrydb.org/linecount/4:abs";
  //   const request = new XMLHttpRequest();
  //   request.open('GET', poemAPI, true);

  //   request.onload = function() {
  //     var data = JSON.parse(this.response);
  //     if (this.status >= 200 && this.status < 400) {
  //       if(console.status && console.reason) {
  //         console.log("Something went wrong. Please refresh the page and try again.")
  //         console.log(data.status)
  //         console.log(data.reason)
  //       } else { // everything went right
  //         const num = Math.floor(Math.random()*data.length);
  //         makePoem(data[num]);
  //       }
  //     } else {
  //       // We reached our target server, but it returned an error
  //       console.log("Something went wrong. Please refresh the page and try again.")
  //       console.log(data.status)
  //       console.log(data.reason)
  //     }
  //   };
  //   request.onerror = function() {
  //     // There was a connection error of some sort
  //     console.log("Connection problem found, please refresh the page and try again.");
  //   };
  //   request.send();
  // }

  const getPoetry = () => {
    fetch("https://thundercomb-poetry-db-v1.p.rapidapi.com/title/winter", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "thundercomb-poetry-db-v1.p.rapidapi.com",
        "x-rapidapi-key": "6fa11adb00msh86e232adfc5b5dcp1f6130jsn093bd945603c"
      }
    })
    .then(response => {
      console.log("response");
      console.log(response.body);
    })
    .catch(err => {
      console.log("err");
      console.log(err);
    });
  }

  // const getPoetry = () => {
  //   var data = null;

  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", function () {
  //     if (this.readyState === this.DONE) {
  //       console.log(this.responseText);
  //     }
  //   });

  //   xhr.open("GET", "https://thundercomb-poetry-db-v1.p.rapidapi.com/linecount/4");
  //   xhr.setRequestHeader("x-rapidapi-host", "thundercomb-poetry-db-v1.p.rapidapi.com");
  //   xhr.setRequestHeader("x-rapidapi-key", "6fa11adb00msh86e232adfc5b5dcp1f6130jsn093bd945603c");

  //   xhr.send(data);
  // }

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
        <div id="text">{state.lines}</div>
        
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
