// Funciones para manejar tokens JWT
// Estas funciones deberían ser generadas y validadas en el servidor para ser devueltas y almacenadas en el cliente. 
// Excepcionalmente, en este proyecto se simulan en el cliente para facilitar el desarrollo.

// import jwt from 'jsonwebtoken';

// const expTime = 3600; // 1 hora
// const JWT_KEY = "esta_es_la_clave_secreta";

// export async function nuevoToken(correo, nombre){
//     return jwt.sign({
//                 exp: Math.floor(Date.now() / 1000) + expTime,
//                 email: usuario,
//                 name: nombre
//             }, 
//             JWT_KEY
//             );
// };

// export async function verificarToken(token){
//     try{
//         const verif = jwt.verify(token, JWT_KEY);
//         return verif;
//     } catch {
//         return null;
//     }   
// };