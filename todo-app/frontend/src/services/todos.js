import axios from 'axios'
const baseUrl = 'http://localhost:8081'

const getTodos = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/todos`)
    return response.data
  } catch (err) {
    throw err
  }
}

const createTodo = async (todo) => {
  try {
    const response = await axios.post(`${baseUrl}/api/todos`, todo)
    return response.data
  } catch (err) {
    throw response
  }
}

export default {
  getTodos,
  createTodo
}