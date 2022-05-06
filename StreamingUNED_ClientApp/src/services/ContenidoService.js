import http from "../common/http-API";
const getAll = () => {
  return http.get("/contenidos");
};
const get = (id) => {
  return http.get(`/contenidos/${id}`);
};
const create = (data) => {
  return http.post("/contenidos", data);
};
const update = (id, data) => {
  return http.put(`/contenidos/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/contenidos/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/contenidos?search=${search}`);
};
const findByTipoTematica = (tipo, tematica) => {
  return http.get(`/contenidos/${tipo}/${tematica}`);
};
const ContenidoService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
  findByTipoTematica
};
export default ContenidoService;