import axios from 'axios';

async function testSignin() {
    try {
        const response = await axios.post('http://localhost:8080/auth/signin', {
            email: "test@example.com",
            password: "password123"
        });
        console.log("Response:", response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.status, error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

testSignin();
