import http from "../common/http-API";
const getAll = () => {
  return http.get("/directores");
};
const get = (id) => {
  return http.get(`/directores/${id}`);
};
const create = (data) => {
  return http.post("/directores", data);
};
const update = (id, data) => {
  return http.put(`/directores/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/directores/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/directores?search=${search}`);
};
const DirectorService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default DirectorService;