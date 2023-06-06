import React, { useEffect, useState } from 'react';

export const ChoicesComponent = () => {
    const [choices, setChoices] = useState([]);
    const [gameModes, setGameModes] = useState([]);
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        // Fetch choices
        fetch('http://localhost:8088/choices')
            .then((response) => response.json())
            .then((data) => setChoices(data));

        // Fetch game modes
        fetch('http://localhost:8088/gameModes')
            .then((response) => response.json())
            .then((data) => setGameModes(data));

        // Fetch maps
        fetch('http://localhost:8088/maps')
            .then((response) => response.json())
            .then((data) => setMaps(data));

        // Optionally fetch habitats and exhibits
    }, []);

    return (
        <div>
            <h2>Choices:</h2>
            <ul>
                {choices.map((choice) => {
                    const gameMode = gameModes.find((mode) => mode.id === choice.gameModeId);
                    const map = maps.find((m) => m.id === choice.mapId);

                    return (
                        <li key={choice.id}>
                            Game Mode: {gameMode ? gameMode.name : 'Unknown'}
                            <br />
                            Map: {map ? map.name : 'Unknown'}
                            <br />
                            {/* Display habitats and exhibits if fetched */}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};