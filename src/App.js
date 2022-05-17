import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

//reference to cards 
const cardsImages = [
  { "src" : "/images/2_of_clubs.png", matched: false  },
  { "src" : "/images/2_of_diamonds.png", matched: false  },
  { "src" : "/images/2_of_hearts.png", matched: false  },
  { "src" : "/images/2_of_spades.png", matched: false  },
  { "src" : "/images/3_of_clubs.png", matched: false  },
  { "src" : "/images/3_of_diamonds.png", matched: false  },
  { "src" : "/images/3_of_hearts.png", matched: false  },
  { "src" : "/images/3_of_spades.png", matched: false  },
  { "src" : "/images/4_of_clubs.png", matched: false  },
  { "src" : "/images/4_of_diamonds.png", matched: false  },
  { "src" : "/images/4_of_hearts.png", matched: false  },
  { "src" : "/images/4_of_spades.png", matched: false  },
  { "src" : "/images/4_of_clubs.png", matched: false  },
  { "src" : "/images/4_of_diamonds.png", matched: false  },
  { "src" : "/images/4_of_hearts.png", matched: false  },
  { "src" : "/images/4_of_spades.png", matched: false  },
  { "src" : "/images/5_of_clubs.png", matched: false  },
  { "src" : "/images/5_of_diamonds.png", matched: false  },
  { "src" : "/images/5_of_hearts.png", matched: false  },
  { "src" : "/images/5_of_spades.png", matched: false  },
  { "src" : "/images/6_of_clubs.png", matched: false  },
  { "src" : "/images/6_of_diamonds.png", matched: false  },
  { "src" : "/images/6_of_hearts.png", matched: false  },
  { "src" : "/images/6_of_spades.png", matched: false  },
  { "src" : "/images/7_of_clubs.png", matched: false  },
  { "src" : "/images/7_of_diamonds.png", matched: false  },
  { "src" : "/images/7_of_hearts.png", matched: false  },
  { "src" : "/images/7_of_spades.png", matched: false  },
  { "src" : "/images/8_of_clubs.png", matched: false  },
  { "src" : "/images/8_of_diamonds.png", matched: false  },
  { "src" : "/images/8_of_hearts.png", matched: false  },
  { "src" : "/images/8_of_spades.png", matched: false  },
  { "src" : "/images/9_of_clubs.png", matched: false  },
  { "src" : "/images/9_of_diamonds.png", matched: false  },
  { "src" : "/images/9_of_hearts.png", matched: false  },
  { "src" : "/images/9_of_spades.png", matched: false  },
  { "src" : "/images/10_of_clubs.png", matched: false  },
  { "src" : "/images/10_of_diamonds.png", matched: false  },
  { "src" : "/images/10_of_hearts.png", matched: false  },
  { "src" : "/images/10_of_spades.png", matched: false  },
  { "src" : "/images/ace_of_clubs.png", matched: false  },
  { "src" : "/images/ace_of_diamonds.png", matched: false },
  { "src" : "/images/ace_of_hearts.png", matched: false  },
  { "src" : "/images/ace_of_spades2.png", matched: false  },
  { "src" : "/images/jack_of_clubs2.png", matched: false  },
  { "src" : "/images/jack_of_diamonds2.png", matched: false  },
  { "src" : "/images/jack_of_hearts2.png", matched: false  },
  { "src" : "/images/jack_of_spades2.png", matched: false  },
  { "src" : "/images/king_of_clubs2.png", matched: false  },
  { "src" : "/images/king_of_diamonds2.png", matched: false  },
  { "src" : "/images/king_of_hearts2.png", matched: false  },
  { "src" : "/images/king_of_spades2.png", matched: false  },
  { "src" : "/images/queen_of_clubs2.png", matched: false  },
  { "src" : "/images/queen_of_diamonds2.png", matched: false  },
  { "src" : "/images/queen_of_hearts2.png", matched: false  },
  { "src" : "/images/queen_of_spades2.png", matched: false  }
]

function App() {

  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [cards, cardSet] = useState([])
  const [turns, turnsSet] = useState(0)

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

    //sets the cards and maps to a key
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
  }

  //comparing the two choices
  useEffect(() => {
    //two choices have been made
    if(firstChoice != null && secondChoice != null) {
      if(firstChoice.src === secondChoice.src)
        {
          cardSet(prevCards => {
            return prevCards.map(card => {
              //cards match
              if(card.src === firstChoice.src) {
                //change match state to true
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

  console.log(cards)

  return (
    <div className="App">
      <h1>Card Game</h1>
      <button onClick={randomizeCards}>Start</button>
      <div className = "card-grid">
        {cards.map(card => (
          <SingleCard 
            key = {card.id} 
            card = {card}
            handleChoice = {handleChoice}
            flipped = {card === firstChoice || card === secondChoice || card.matched}
            />
        ))}
      </div>
    </div>
  );
}

export default App;