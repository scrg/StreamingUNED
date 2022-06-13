import http from "../common/http-API";
const getAll = () => {
  return http.get("/Municipios");
};
const get = (id) => {
  return http.get(`/Municipios/${id}`);
};
const create = (data) => {
  return http.post("/Municipios", data);
};
const update = (id, data) => {
  return http.put(`/Municipios/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Municipios/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/Municipios?search=${search}`);
};
const MunicipioService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default MunicipioService;