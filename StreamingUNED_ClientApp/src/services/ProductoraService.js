import http from "../common/http-API";
const getAll = () => {
  return http.get("/productoras");
};
const get = (id) => {
  return http.get(`/productoras/${id}`);
};
const create = (data) => {
  return http.post("/productoras", data);
};
const update = (id, data) => {
  return http.put(`/productoras/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/productoras/${id}`);
}; 
const findByAll = (search) => {
  return http.get(`/productoras?search=${search}`);
};
const ProductoraService = {
  getAll,
  get,
  create,
  update,
  remove, 
  findByAll,
};
export default ProductoraService;