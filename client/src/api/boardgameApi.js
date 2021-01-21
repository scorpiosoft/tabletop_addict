import axios from "axios";

const getAge = (data) =>
{
  return axios.get("http://localhost:3001/api/boardgame/age", data);
}
const setAge = (data) =>
{
  return axios.post("http://localhost:3001/api/boardgame/age", data);
}
const boardgameApi = { getAge, setAge };
export default boardgameApi;