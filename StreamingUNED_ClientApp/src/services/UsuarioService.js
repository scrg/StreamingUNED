import http from "../common/http-API";
const getAll = () => {
  return http.get("/usuarios");
};
const get = (id) => {
  return http.get(`/usuarios/${id}`);
};
const create = (data) => {
  return http.post("/usuarios", data);
};
const update = (id, data) => {
  return http.put(`/usuarios/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/usuarios/${id}`);
}; 
const cambiarEstado = (id, idEstado) => {
  return http.put(`/usuarios/CambiarEstado/${id}/${idEstado}`);
}; 
const findByAll = (search, idRol, idEstado) => {
  return http.get(`/usuarios?search=${search}&idRol=${idRol}&idEstado=${idEstado}`);
};
const UsuarioService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll, 
  cambiarEstado,
};
export default UsuarioService;