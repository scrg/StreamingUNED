import http from "../common/http-API";
const getAll = () => {
  return http.get("/Ccaas");
};
const get = (id) => {
  return http.get(`/Ccaas/${id}`);
};
const create = (data) => {
  return http.post("/Ccaas", data);
};
const update = (id, data) => {
  return http.put(`/Ccaas/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Ccaas/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/Ccaas?search=${search}`);
};
const CcaaService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default CcaaService;