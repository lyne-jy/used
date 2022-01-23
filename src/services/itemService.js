import http from "./httpService"
import { getUser } from "./accountService";

const url = process.env.REACT_APP_API_URL + "/items/"

export function getItems() {
    const response = http.get(url);
    return response;
}

export function getItemsByUser() {
    const token = localStorage.getItem("token");
    if (token == null) return [];
    const response = http.get(url + "seller", {headers: {Authorization: "Bearer " + token}});
    return response;
}

export function postItem(name, price, category, description, picUrl, location, condition) {
    const token = localStorage.getItem("token");
    const response = http.post(url, {name, price, category, description, picUrl, location, condition}, {headers: {Authorization: "Bearer " + token}});
    return response;
}

export function putItem(id, name, price, category, description, picUrl, location, condition) {
    const token = localStorage.getItem("token");
    const response =  http.put(url + id, {name, price, category, description, picUrl, location, condition}, {headers: {Authorization: "Bearer " + token}});
    return response;
}

export function deleteItem(id) {
    const token = localStorage.getItem("token");
    const response = http.delete(url + id, {headers: {Authorization: "Bearer " + token}});
    return response;
}