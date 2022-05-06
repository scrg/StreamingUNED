import http from "../common/http-API";
const getAll = () => {
  return http.get("/ContenidoTematicas");
};
const get = (id) => {
  return http.get(`/ContenidoTematicas/${id}`);
};
const create = (data) => {
  return http.post("/ContenidoTematicas", data);
};
const update = (id, data) => {
  return http.put(`/ContenidoTematicas/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/ContenidoTematicas/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/ContenidoTematicas?search=${search}`);
};
const ContenidoTematicaService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default ContenidoTematicaService;