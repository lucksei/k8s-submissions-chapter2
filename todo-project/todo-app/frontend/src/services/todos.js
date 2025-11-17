import axios from 'axios'
import config from '../utils/config'

const getTodos = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}/api/todos`)
    return response.data
  } catch (err) {
    throw err
  }
}

const createTodo = async (todo) => {
  try {
    const response = await axios.post(`${config.baseUrl}/api/todos`, todo)
    return response.data
  } catch (err) {
    throw response
  }
}

export default {
  getTodos,
  createTodo
}