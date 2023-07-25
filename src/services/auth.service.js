import axios from "axios";
const API_URL = "https://fancy-to-do-backend-production.up.railway.app/auth/";

export async function signUp(body) {
    try {
        const response = await axios.post(`${API_URL}/signup`, body)
        return response.data;
    } catch (error) {
        throw new Error(`Failed to sign up user: ${error}`)
    }
}

export async function signIn(body){
    try{
        const response = await axios.post(`${API_URL}/signin`,body)
        return response.data;
    } catch(error){
        throw new Error(`Failed to sign in user: ${error}`)
    }
} 

export function logout(){
    localStorage.clear()
}
