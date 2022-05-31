import http from "../common/http-API";
const getAll = () => {
  return http.get("/ContenidoEstados");
};
const get = (id) => {
  return http.get(`/ContenidoEstados/${id}`);
};
const create = (data) => {
  return http.post("/ContenidoEstados", data);
};
const update = (id, data) => {
  return http.put(`/ContenidoEstados/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/ContenidoEstados/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/ContenidoEstados?search=${search}`);
};
const ContenidoEstadoService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default ContenidoEstadoService;