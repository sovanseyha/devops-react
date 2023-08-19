import api from "../Config/api";

const getAllData = async (page = 1, size = 10, asc = false, desc = true, access_token) => {
  return await api.get(`/categories/users?page=${page}&size=${size}&asc=${asc}&desc=${desc}`,{
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const saveData = async (data, access_token) => {
  return await api.post("/categories", data, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const updateData = async (id, data, access_token) => {
  return await api.put(`/categories/${id}/users`, data, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const deleteData = async (id, access_token) => {
  return await api.delete(`/categories/${id}/users`, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const getAllCategoryForFilter = async (access_token) => {
  return await api.get("/categories/all", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

const CategoryService = { getAllData, saveData, deleteData, updateData, getAllCategoryForFilter };
export default CategoryService;