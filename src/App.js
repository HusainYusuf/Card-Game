import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

//reference to cards 
const cardsImages = [
  { "src" : "/images/2_of_clubs.png"  },
  { "src" : "/images/2_of_diamonds.png"  },
  { "src" : "/images/2_of_hearts.png"  },
  { "src" : "/images/2_of_spades.png"  },
  { "src" : "/images/3_of_clubs.png"  },
  { "src" : "/images/3_of_diamonds.png"  },
  { "src" : "/images/3_of_hearts.png"  },
  { "src" : "/images/3_of_spades.png"  },
  { "src" : "/images/4_of_clubs.png"  },
  { "src" : "/images/4_of_diamonds.png"  },
  { "src" : "/images/4_of_hearts.png"  },
  { "src" : "/images/4_of_spades.png"  },
  { "src" : "/images/4_of_clubs.png"  },
  { "src" : "/images/4_of_diamonds.png"  },
  { "src" : "/images/4_of_hearts.png"  },
  { "src" : "/images/4_of_spades.png"  },
  { "src" : "/images/5_of_clubs.png"  },
  { "src" : "/images/5_of_diamonds.png"  },
  { "src" : "/images/5_of_hearts.png"  },
  { "src" : "/images/5_of_spades.png"  },
  { "src" : "/images/6_of_clubs.png"  },
  { "src" : "/images/6_of_diamonds.png"  },
  { "src" : "/images/6_of_hearts.png"  },
  { "src" : "/images/6_of_spades.png"  },
  { "src" : "/images/7_of_clubs.png"  },
  { "src" : "/images/7_of_diamonds.png"  },
  { "src" : "/images/7_of_hearts.png"  },
  { "src" : "/images/7_of_spades.png"  },
  { "src" : "/images/8_of_clubs.png"  },
  { "src" : "/images/8_of_diamonds.png"  },
  { "src" : "/images/8_of_hearts.png"  },
  { "src" : "/images/8_of_spades.png"  },
  { "src" : "/images/9_of_clubs.png"  },
  { "src" : "/images/9_of_diamonds.png"  },
  { "src" : "/images/9_of_hearts.png"  },
  { "src" : "/images/9_of_spades.png"  },
  { "src" : "/images/10_of_clubs.png"  },
  { "src" : "/images/10_of_diamonds.png"  },
  { "src" : "/images/10_of_hearts.png"  },
  { "src" : "/images/10_of_spades.png"  },
  { "src" : "/images/ace_of_clubs.png"  },
  { "src" : "/images/ace_of_diamonds.png"  },
  { "src" : "/images/ace_of_hearts.png"  },
  { "src" : "/images/ace_of_spades2.png"  },
  { "src" : "/images/jack_of_clubs2.png"  },
  { "src" : "/images/jack_of_diamonds2.png"  },
  { "src" : "/images/jack_of_hearts2.png"  },
  { "src" : "/images/jack_of_spades2.png"  },
  { "src" : "/images/king_of_clubs2.png"  },
  { "src" : "/images/king_of_diamonds2.png"  },
  { "src" : "/images/king_of_hearts2.png"  },
  { "src" : "/images/king_of_spades2.png"  },
  { "src" : "/images/queen_of_clubs2.png"  },
  { "src" : "/images/queen_of_diamonds2.png"  },
  { "src" : "/images/queen_of_hearts2.png"  },
  { "src" : "/images/queen_of_spades2.png"  }
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

    //creates two sets of the same cards
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
          console.log('Matching pairs found')
          resetTurn()
        }
      else {
        console.log('Not a matching pair')
        resetTurn()
      }

    }

  }, [firstChoice, secondChoice])


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
            />
        ))}
      </div>
    </div>
  );
}

export default App;