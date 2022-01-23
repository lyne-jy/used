import http from "./httpService";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_API_URL + "/account/"

export function login(email, password) {
    return http.post(url + "login", {email, password});
}

export function register(name, email, password) {
    return http.post(url + "register", {name, email, password})
}

export function getEmail(id) {
    return http.get(url + id);
}

export function getUser() {
    const jwt = localStorage.getItem("token");
    if (!jwt) return null;
    try {
        const user = jwtDecode(jwt);
        user.name = localStorage.getItem("username");
        return user;
    }
    catch (e) {
        toast.error("An error occurred when decoding jwt.")
    }
}