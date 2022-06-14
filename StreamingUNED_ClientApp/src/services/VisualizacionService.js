import http from "../common/http-API";
const getAll = () => {
  return http.get("/Visualizaciones");
};
const get = (id) => {
  return http.get(`/Visualizaciones/${id}`);
};
const create = (data) => {
  return http.post("/Visualizaciones", data);
};
const update = (id, data) => {
  return http.put(`/Visualizaciones/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Visualizaciones/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/Visualizaciones?search=${search}`);
};
const VisualizacionService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default VisualizacionService;