import './SingleCard.css'
export default function SingleCard({card, handleChoice}) {
       
       const clickMade = () => {
              handleChoice(card)
       }
       
       
       return (
         <div className= "card">
            <div>
              <img className = "front" src = {card.src} alt = "card Front" />
              <img className = "back" onClick = {clickMade} src = "/images/cover.jpg" alt = "card back"/>
            </div>
         </div> 
       )
}