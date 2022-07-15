import http from "../common/http-API";
const getAll = () => {
  return http.get("/UsuarioEstados");
};
const get = (id) => {
  return http.get(`/UsuarioEstados/${id}`);
};
const create = (data) => {
  return http.post("/UsuarioEstados", data);
};
const update = (id, data) => {
  return http.put(`/UsuarioEstados/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/UsuarioEstados/${id}`);
};  
const findByAll = (search) => {
  return http.get(`/UsuarioEstados?search=${search}`);
};
const UsuarioEstadoService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default UsuarioEstadoService;