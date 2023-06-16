// Import necessary dependencies and components
import { useEffect, useState } from 'react';
import { ChoicesComponent } from './ChoicesComponent';

// Define the ResultContainer functional component that takes a 'user' prop
export const ResultContainer = ({ user }) => {
    // Initialize necessary states
    const [choices, setChoices] = useState([]);
    const [gameModes, setGameModes] = useState([]);
    const [maps, setMaps] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [exhibits, setExhibits] = useState([]);
    const [selectedChoice, setSelectedChoice] = useState([]);

    // Fetch user choices when the 'user.id' changes
    useEffect(() => {
        const fetchUserChoices = async () => {
            const response = await fetch(`http://localhost:8088/choices?userId=${user.id}`);
            const data = await response.json();
            setChoices(data);
        };

        fetchUserChoices();
    }, [user.id]);

    // Fetch game modes on component mount
    useEffect(() => {
        const fetchGameModes = async () => {
            const response = await fetch('http://localhost:8088/gameModes');
            const data = await response.json();
            setGameModes(data);
        };

        fetchGameModes();
    }, []);

    // Fetch maps on component mount
    useEffect(() => {
        const fetchMaps = async () => {
            const response = await fetch('http://localhost:8088/maps');
            const data = await response.json();
            setMaps(data);
        };

        fetchMaps();
    }, []);

    // Set the selected choice when 'choices' or 'user.id' changes
    useEffect(() => {
        if (choices) {
            const foundChoice = choices.find(choice => choice.userId === user.id);
            setSelectedChoice(foundChoice);
        }
    }, [choices, user.id]);

    // Render the ChoicesComponent and pass necessary props
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
