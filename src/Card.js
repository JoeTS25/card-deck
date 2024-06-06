import React, { useState } from "react";

// adds attributes to individual drawn cards
function Card({ name, image }) {
    const [{ angle, xPos, yPos }] = useState({
        // generate random angle
        angle: Math.random() * 90 - 45,
        // generate random x and y positions within a limit
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20,
    });

    const editCard = `translate(${xPos}px, ${yPos}px) rotate${angle}deg)`;

    return <img className="Card"
                alt={name}
                src={image}
                style={{ editCard }}/>;
}

export default Card;