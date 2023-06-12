import { useEffect, useState } from 'react';
import { ChoicesComponent } from './ChoicesComponent';

export const ResultContainer = ({ user }) => {
    const [choices, setChoices] = useState([]);
    const [gameModes, setGameModes] = useState([]);
    const [maps, setMaps] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [exhibits, setExhibits] = useState([]);
    const [selectedChoice, setSelectedChoice] = useState([]);

    useEffect(() => {
        const fetchUserChoices = async () => {
            const response = await fetch(`http://localhost:8088/choices?userId=${user.id}`);
            const data = await response.json();
            setChoices(data);
        };

        fetchUserChoices();
    }, [user.id]);

    useEffect(() => {
        const fetchGameModes = async () => {
            const response = await fetch('http://localhost:8088/gameModes');
            const data = await response.json();
            setGameModes(data);
        };

        fetchGameModes();
    }, []);

    useEffect(() => {
        const fetchMaps = async () => {
            const response = await fetch('http://localhost:8088/maps');
            const data = await response.json();
            setMaps(data);
        };

        fetchMaps();
    }, []);

    useEffect(() => {
        if (choices) {
            const foundChoice = choices.find(choice => choice.userId === user.id);
            setSelectedChoice(foundChoice);
        }
    }, [choices, user.id]);

    return (
        <ChoicesComponent
            choices={choices}
            gameModes={gameModes}
            maps={maps}
            habitats={habitats}
            exhibits={exhibits}
        />
    );
};
