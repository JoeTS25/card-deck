import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const base_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    // states of deck, drawn card, shuffled deck (initially false)
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeck() {
        async function getData() {
            const newDeck = await axios.get(`${base_URL}/new/shuffle`);
            // change the setDeck to include the deck that was just called
            setDeck(newDeck.data);
        }
        getData();
    }, []);

    // Draw a new card
    async function drawCard() {
        try {
            // use API's draw function to get card data
            const res = await axios.get(`${base_URL}/${deck.deck_id}/draw/`);
            // alert to an empty deck
            if (res.data.remaining === 0) throw new Error("Deck empty");
            const card = res.data.cards[0];
            // add the drawn card to the drawnCard state
            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image,
                },
            ]);
        } catch (err) {
            alert(err);
        }
    }

    // Shuffle function
    async function shuffleClick() {
        // change isShuffling to true
        setIsShuffling(true);
        try {
            await axios.get(`${base_URL}/${deck.deck_id}/shuffle/`);
            // change setDrawn to empty after shuffle
            setDrawn([]);
        } catch (err) {
            alert(err);
        } finally {
            // turn shuffling back off after finished
            setIsShuffling(false);
        }
    }

    // function for card draw button
    function drawButton() {
        if (!deck) return null;
        // button has drawCard function and happens when shuffling is disabled
        return (
            <button
                className='Deck-class'
                onClick={drawCard}
                disabled={isShuffling}>
                DRAW
            </button>
        );
    }

    // function for shuffle button
    function shuffleButton() {
        if (!deck) return null;
        return (
            <button className='Deck-class'
                    onClick={shuffleClick}
                    disabled={isShuffling}>
                SHUFFLE DECK
            </button>
        );
    }

    return (
        <main className='Deck'>
            {drawButton()}
            {shuffleButton()}

            <div className='card-drawn'>
                {drawn.map(c => (<Card key={c.id} name={c.name} image={c.image}/>))}
            </div>
        </main>
    )
}

export default Deck;