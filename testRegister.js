import axios from 'axios';

async function testRegister() {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', {
            username: "testuser",
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

testRegister();
