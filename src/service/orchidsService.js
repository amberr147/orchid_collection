import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const orchidsData = {
  fetchAll: async () => {
    const response = await api.get("/fer");
    return response.data;
  },
  fetchOrchidById: async (id) => {
    const response = await api.get(`/fer/${id}`);
    return response.data;
  },
  create: async (payload) => {
    const response = await api.post("/fer", payload);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await api.put(`/fer/${id}`, payload);
    return response.data;
  },
  remove: async (id) => {
    await api.delete(`/fer/${id}`);
  },
};

export default orchidsData;
