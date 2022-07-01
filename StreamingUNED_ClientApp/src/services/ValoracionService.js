import http from "../common/http-API";
const getAll = () => {
  return http.get("/Valoraciones");
}; 
const get = (id) => {
  return http.get(`/Valoraciones/${id}`);
};
const create = (data) => {
  return http.post("/Valoraciones", data);
};
const update = (id, data) => {
  return http.put(`/Valoraciones/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Valoraciones/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/Valoraciones?search=${search}`);
};
const VisualizacionService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll 
};
export default VisualizacionService;