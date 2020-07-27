import axios from "axios"

export const axiosInstance = axios.create({
    headers: {
    }
});


export const logout = () => {
    axiosInstance.defaults.headers.common['Authorization'] = ''
    localStorage.clear()
    window.location.reload();
}