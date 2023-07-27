import axios from 'axios';
const API_URL = "https://fancy-to-do-backend-production.up.railway.app/tasks"

export const getTasks = async (category) => {
    try {
        if (category === 'all') {
            const response = await axios.get(API_URL)
            return response.data
        }
        else {
            const response = await axios.get(`${API_URL}/category/${category}`)
            return response.data
        }
    }
    catch (err) {
        throw new Error(`Failed to get tasks: ${err}`)
    }
}

export const getTasksByUser = async (userId, category) => {
    try {
        if(category==="all"){
            const response = await axios.get(`${API_URL}/user/${userId}`)
            return response
        }
        const response = await axios.get(`${API_URL}/user/${userId}/category/${category}`)
        return response
    }
    catch (err) {
        throw new Error(`Failed to get tasks by ${userId}: ${err}`)
    }
}

// export const getUserTasksByCategory = async(userId, category) => {
//     try {
//         const response = await axios.get(`${API_URL}/user/${userId}/category/${category}`)
//         return response
//     }
//     catch (err) {
//         throw new Error(`Failed to get tasks by ${userId} with category ${category}: ${err}`)
//     }
// }


export const addNewTask = async (body) => {
    try {
        const response = await axios.post(API_URL, body)
        return response.data
    }
    catch (err) {
        throw new Error(`Failed to add new task: ${err}`)
    }
}

export const editTask = async (body, taskId) => {
    console.log("Body: ", body)
    console.log("Task Id: ", taskId)
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, body)
        return response.data
    }
    catch (err) {
        throw new Error(`Failed to edit task: ${err}`)
    }
}

export const toggleCompletedTask = async (taskId) => {
    try {
        const response = await axios.put(`${API_URL}/completed/${taskId}`, {})
        return response
    }
    catch (err) {
        throw new Error(`Failed to toggle complete task: ${err}`)
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`)
        return response
    }
    catch (err) {
        throw new Error(`Failed to delete task: ${err}`)
    }
}
