import http from "../common/http-API";
const getAll = () => {
  return http.get("/contenidos");
};
const get = (id) => {
  return http.get(`/contenidos/${id}`);
};
const getTopVisualizaciones = () => {
  return http.get("/contenidos/GetTopVisualizaciones");
};
const getTopValoraciones = () => {
  return http.get("/contenidos/GetTopValoraciones");
};
const getTopRecientes = () => {
  return http.get("/contenidos/GetTopRecientes");
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
  findByTipoTematica,
  getTopVisualizaciones,
  getTopValoraciones,
  getTopRecientes
};
export default ContenidoService;