import http from "../common/http-API";
const getAll = () => {
  return http.get("/Provincias");
};
const get = (id) => {
  return http.get(`/Provincias/${id}`);
};
const create = (data) => {
  return http.post("/Provincias", data);
};
const update = (id, data) => {
  return http.put(`/Provincias/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Provincias/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/Provincias?search=${search}`);
};
const ProvinciaService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default ProvinciaService;