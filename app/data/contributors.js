const contributors = [
    {
        name: 'John Doe',
        email: 'johndoe@email.com',
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
].map(({name, email, image}) => ({label: name, value: email, image: image}));

export default contributors;