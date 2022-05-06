import http from "../common/http-API";
const getAll = () => {
  return http.get("/ContenidoTipos");
};
const get = (id) => {
  return http.get(`/ContenidoTipos/${id}`);
};
const create = (data) => {
  return http.post("/ContenidoTipos", data);
};
const update = (id, data) => {
  return http.put(`/ContenidoTipos/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/ContenidoTipos/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/ContenidoTipos?search=${search}`);
};
const ContenidoTipoService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default ContenidoTipoService;