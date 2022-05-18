import './SingleCard.css'
export default function SingleCard({card, handleChoice, flipped, disabled}) {
       
       const clickMade = () => {
          if(!disabled) {
            handleChoice(card)
          }
       }
       
       
       return (
         <div className= "card">
            <div className ={flipped? "flipped" : ""}>
              <img className = "front" src = {card.src} alt = "card Front" />
              <img className = "back" onClick = {clickMade} src = "/images/cover.jpg" alt = "card back"/>
            </div>
         </div> 
       )
}