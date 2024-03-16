import React, { useState, useContext } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import './swipe.css';
import intro1 from './AboutMeText/Intro1.txt';
import intro2 from './AboutMeText/Intro2.txt';

const colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
const randomColor = current => {
  while (true) {
    const index = Math.floor(Math.random() * colors.length);
    if (current != colors[index]) {
      return colors[index];
    } 
  }
}
const randomAlter = currentText => {
    const alters = [
        "Meet Hannah",
        "Meet Austin",
        "Meet Nelle",
        "Meet Amy"
    ];

    while (true) {
        const index = Math.floor(Math.random() * alters.length);
        if (currentText != alters[index])
            return alters[index];
    }
}

const fetchData = cards => {

    fetch(intro1)
        .then(r => r.text())
        .then(r => cards[1].text = r);

    fetch(intro2)
      .then(r => r.text())
      .then(r => cards[0].text = r);

}
const Card = ({ card, style, onDirectionLock, onDragStart, onDragEnd, animate }) => (    
  <motion.div
    className="card"
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragElastic={{ top:0, bottom: 0, left: 1, right: 1 }}
    dragDirectionLock
    onDirectionLock={onDirectionLock}
    onDragEnd={onDragEnd}
    animate={animate}
    style={{ ...style, background: card.background }}
    transition={{ ease: [.6, .05, -.01, .9] }}
    whileTap={{ scale: .85 }}
  >
    <p>{card.text}</p>
  </motion.div>
)



export default function PartSelector() {

    

    let notLoaded = 'Not loaded yet';

    const [cards, setCards] = useState([
        { text: notLoaded, background: colors[0] }, 
        { text: notLoaded, background: colors[1] }, 
        { text: "Swipe Me", background: colors[2] }
      ]);

    const [fetched, setFetched] = useState(false);
      
    if (!fetched) {

        fetchData(cards);
        console.log('Data Fetched');
        setFetched(true);
    }

      const [dragStart, setDragStart] = useState({
        axis: null,
        animation: { x: 0, y: 0 }
      });

      const x = useMotionValue(0);
      const y = useMotionValue(0);
      const scale = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [1, .5, 1]);
      const shadowBlur = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [0, 25, 0]);
      const shadowOpacity = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [0, .2, 0]);
      const boxShadow = useMotionTemplate`0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`;
      const onDirectionLock = axis => setDragStart({ ...dragStart, axis: axis });
      const animateCardSwipe = animation => {
        setDragStart({ ...dragStart, animation });
          
        setTimeout(() => {
          setDragStart({ axis: null, animation: { x: 0, y: 0 } });
          x.set(0);
          y.set(0);
          setCards([{ 
              text: randomAlter(cards[2].text), 
              background: randomColor(cards[0].background) 
            }, ...cards.slice(0, cards.length - 1)]);
        }, 200);
      }
      const onDragEnd = info => {
        if (dragStart.axis === 'x') {
          if (info.offset.x >= 100) 
            animateCardSwipe({ x: 175, y: 0 });
          else if (info.offset.x <= -100)
            animateCardSwipe({ x: -175, y: 0 }); 
        }
      }
      const renderCards = () => {
        return cards.map((card, index) => {
          if (index === cards.length - 1) {
            return (
              <Card 
                card={card}
                key={index}
                style={{ x, y, zIndex: index }}
                onDirectionLock={axis => onDirectionLock(axis)}
                onDragEnd={(e, info) => onDragEnd(info)}
                animate={dragStart.animation}
              />
            )
          } else return (
            <Card 
              card={card}
              key={index}
              style={{
                scale, 
                boxShadow,
                zIndex: index
              }}
            />
          )
        })
      }
      return (
        <div className="infinite-cards">
          {renderCards()}
        </div>
      )
    }