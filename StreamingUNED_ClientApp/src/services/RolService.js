import http from "../common/http-API";
const getAll = () => {
  return http.get("/Roles");
};
const get = (id) => {
  return http.get(`/Roles/${id}`);
};
const create = (data) => {
  return http.post("/Roles", data);
};
const update = (id, data) => {
  return http.put(`/Roles/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Roles/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/Roles?search=${search}`);
};
const RolService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default RolService;