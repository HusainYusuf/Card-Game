import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

//reference to cards 
const cardsImages = [
  // { "src" : "/images/2_of_clubs.png", matched: false  },
  // { "src" : "/images/2_of_diamonds.png", matched: false  },
  // { "src" : "/images/2_of_hearts.png", matched: false  },
  // { "src" : "/images/2_of_spades.png", matched: false  },
  // { "src" : "/images/3_of_clubs.png", matched: false  },
  // { "src" : "/images/3_of_diamonds.png", matched: false  },
  // { "src" : "/images/3_of_hearts.png", matched: false  },
  // { "src" : "/images/3_of_spades.png", matched: false  },
  // { "src" : "/images/4_of_clubs.png", matched: false  },
  // { "src" : "/images/4_of_diamonds.png", matched: false  },
  // { "src" : "/images/4_of_hearts.png", matched: false  },
  // { "src" : "/images/4_of_spades.png", matched: false  },
  // { "src" : "/images/4_of_clubs.png", matched: false  },
  // { "src" : "/images/4_of_diamonds.png", matched: false  },
  // { "src" : "/images/4_of_hearts.png", matched: false  },
  // { "src" : "/images/4_of_spades.png", matched: false  },
  // { "src" : "/images/5_of_clubs.png", matched: false  },
  // { "src" : "/images/5_of_diamonds.png", matched: false  },
  // { "src" : "/images/5_of_hearts.png", matched: false  },
  // { "src" : "/images/5_of_spades.png", matched: false  },
  // { "src" : "/images/6_of_clubs.png", matched: false  },
  // { "src" : "/images/6_of_diamonds.png", matched: false  },
  // { "src" : "/images/6_of_hearts.png", matched: false  },
  // { "src" : "/images/6_of_spades.png", matched: false  },
  // { "src" : "/images/7_of_clubs.png", matched: false  },
  // { "src" : "/images/7_of_diamonds.png", matched: false  },
  // { "src" : "/images/7_of_hearts.png", matched: false  },
  // { "src" : "/images/7_of_spades.png", matched: false  },
  // { "src" : "/images/8_of_clubs.png", matched: false  },
  // { "src" : "/images/8_of_diamonds.png", matched: false  },
  // { "src" : "/images/8_of_hearts.png", matched: false  },
  // { "src" : "/images/8_of_spades.png", matched: false  },
  { "src" : "/images/9_of_clubs.png", matched: false  },
  { "src" : "/images/9_of_diamonds.png", matched: false  },
//   { "src" : "/images/9_of_hearts.png", matched: false  },
//   { "src" : "/images/9_of_spades.png", matched: false  },
//   { "src" : "/images/10_of_clubs.png", matched: false  },
//   { "src" : "/images/10_of_diamonds.png", matched: false  },
//   { "src" : "/images/10_of_hearts.png", matched: false  },
//   { "src" : "/images/10_of_spades.png", matched: false  },
//   { "src" : "/images/ace_of_clubs.png", matched: false  },
//   { "src" : "/images/ace_of_diamonds.png", matched: false },
//   { "src" : "/images/ace_of_hearts.png", matched: false  },
//   { "src" : "/images/ace_of_spades2.png", matched: false  },
//   { "src" : "/images/jack_of_clubs2.png", matched: false  },
//   { "src" : "/images/jack_of_diamonds2.png", matched: false  },
//   { "src" : "/images/jack_of_hearts2.png", matched: false  },
//   { "src" : "/images/jack_of_spades2.png", matched: false  },
//   { "src" : "/images/king_of_clubs2.png", matched: false  },
//   { "src" : "/images/king_of_diamonds2.png", matched: false  },
//   { "src" : "/images/king_of_hearts2.png", matched: false  },
//   { "src" : "/images/king_of_spades2.png", matched: false  },
//   { "src" : "/images/queen_of_clubs2.png", matched: false  },
//   { "src" : "/images/queen_of_diamonds2.png", matched: false  },
//   { "src" : "/images/queen_of_hearts2.png", matched: false  },
//   { "src" : "/images/queen_of_spades2.png", matched: false  }
 ]

function App() {

  const [disabled, disabledSet] = useState(false)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [cards, cardSet] = useState([])
  const [turns, turnsSet] = useState(0)
  const [time, setTime] = useState(0)
  const [timerOn, setTimeOn] = useState(false)
  const [cardsFlipped, flippedCards] = useState(0)

  //shuffles cards
  const randomizeCards = () => {
    let currentIndex = cardsImages.length, randomIndex
    while(currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [cardsImages[currentIndex], cardsImages[randomIndex]] = [cardsImages[randomIndex], cardsImages[currentIndex]]
    }

    //creates two sets of the same cards to match
    const shuffledCards = [...cardsImages, ...cardsImages].map((card) => ({...card, id: Math.random()}))

    setTimeOn(true)
    setTime(0)
    setFirstChoice(null)
    setSecondChoice(null)
    cardSet(shuffledCards)
    turnsSet(0)
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    turnsSet(prevTurns => prevTurns + 1)
    flippedCards(prevFlipped => prevFlipped + 1)
    disabledSet(false)
  }

  useEffect(() => {
    let interval = null
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 10)
    }, 10)
  }, [timerOn])


  //comparing the two choices
  useEffect(() => {
    //two choices have been made
    if(firstChoice != null && secondChoice != null) {
      disabledSet(true)
      if(firstChoice.src === secondChoice.src)
        {
          cardSet(prevCards => {
            return prevCards.map(card => {
              //cards match
              if(card.src === firstChoice.src) {
                //change match state to true
                if(flippedCards == 2)
                {
                  setTimeOn(false)
                }

                return {... card, matched: true}
              }
              else {
                return card
              }
            })
          })
          resetTurn()
        }
      //cards dont match
      else {
        //wait one second before they flip back
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [firstChoice, secondChoice])

  useEffect(() => {
    randomizeCards()
  }, [])

  return (
    <div className="App">
      <h1>Card Game</h1>
      <button onClick={randomizeCards}>New Game</button>
      <div className = "turns">Turns: {turns} </div>
      <div className = "stop-watch">
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className = "card-grid">
        {cards.map(card => (
          <SingleCard 
            key = {card.id} 
            card = {card}
            handleChoice = {handleChoice}
            flipped = {card === firstChoice || card === secondChoice || card.matched}
            disabled = {disabled}
            />
        ))}
      </div>
    </div>
  );
}

export default App;