/**
 * Centralized API client.
 * All API calls to backend go through this module.
 */

import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
});

export default apiClient;
