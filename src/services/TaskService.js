import api from "../Config/api";

const getAllData = async (access_token) => {
  return await api.get("/tasks/users", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

const changeTaskStatus = async (id, taskStatus, access_token) => {
  return await api.put(`/tasks/status/${id}/user`, {status: taskStatus}, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const deleteTask = async (id, access_token) => {
  return await api.delete(`/tasks/${id}/users`, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const saveTask = async (data, access_token) => {
  return await api.post("/tasks/users", data, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const updateTask = async (id, data, access_token) => {
  return await api.put(`/tasks/${id}/users`, data, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
}

const getAllTaskByStatus = async (status, access_token) => {
  return await api.get(`/tasks/status/users?status=${status}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
}

const TaskService = { getAllData, changeTaskStatus, deleteTask, saveTask, updateTask, getAllTaskByStatus};
export default TaskService;
