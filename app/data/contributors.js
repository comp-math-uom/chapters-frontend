const contributors = [
    {
        name: 'John Doe',
        email: 'johndoe@email.com',
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@email.com'
    },
    {
        name: 'John Smith',
        email: 'johnsmith@email.com'
    },
    {
        name: 'Jane Smith',
        email: 'janesmith@email.com'
    },
].map(({ name, email }) => ({ label: name, value: email }));

export default contributors;