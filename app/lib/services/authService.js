import axios from "axios";


export const authService = {
    async signup(username, password, email, firstname, lastname) {
        const url = 'https://aistudentchapter.lk/auth/register';
        const data = {
            username: username,
            password: password,
            email: email,
            firstName: firstname,
            lastName: lastname
        };
        return await axios.post(url, data);
    }
}
