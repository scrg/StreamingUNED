import http from "../common/http-API";
const getAll = () => {
  return http.get("/interpretes");
};
const get = (id) => {
  return http.get(`/interpretes/${id}`);
};
const create = (data) => {
  return http.post("/interpretes", data);
};
const update = (id, data) => {
  return http.put(`/interpretes/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/interpretes/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/interpretes?search=${search}`);
};
const InterpreteService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default InterpreteService;