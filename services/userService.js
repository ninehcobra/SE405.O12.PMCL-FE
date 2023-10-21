import axios from 'axios';


const getTest = async () => {
    fetch('https://example.com/api/data', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            // Other headers if needed
        }
    })
        .then(response => {
            return (response)
        })
        .catch(error => {
            return (error)
        });


};

export {
    getTest
};
