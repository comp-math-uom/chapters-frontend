const contributors = [
    {
        name: 'John Doe',
        email: 'johndoe@email.com', // TODO: email should be the user id fetched from the janith's api
        image: "https://bit.ly/kent-c-dodds"
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@email.com',
        image: "https://bit.ly/prosper-baba"
    },
    {
        name: 'John Smith',
        email: 'johnsmith@email.com',
        image: "https://bit.ly/ryan-florence"
    },
    {
        name: 'Jane Smith',
        email: 'janesmith@email.com',
        image: "https://bit.ly/sage-adebayo"
    },
    {
        name: "Hirusha Fernando",
        image: "https://bit.ly/code-beast",
        email: "heshanhfernando@gmail.com"
    }
].map(({name, email, image}) => ({label: name, value: email, image: image})); //TODO: value is the selected userid

export default contributors;