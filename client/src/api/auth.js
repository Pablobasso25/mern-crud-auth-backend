import axios from "axios";

const API = "http://localhost:4005/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user);

/* 
export: Permite que puedas usar esta función en otros archivos (como en tu RegisterPage.jsx).

const registerRequest: Es el nombre de la función. Se suele usar el sufijo Request para saber que es una petición al servidor.

user => ...: Es una "arrow function" (función de flecha). Recibe un parámetro llamado user, que es el objeto con la información que el usuario escribió en el formulario (username, email, password).

axios.post(...): Axios le dice al navegador: "Envía una petición de tipo POST". El método POST se usa generalmente para enviar o crear información nueva en una base de datos.

"${API}/register": Es la dirección a donde se envía la info. Al final, se traduce como: http://localhost:4003/api/register.

, user: Es el cuerpo (body) de la petición. Son los datos reales que viajan por internet hasta tu backend. */
