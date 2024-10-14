import { Router } from "express";
import login from "./controler/login";
import materias from "./controler/materias";
import cadastroResumo from "./controler/resumos";
import validarToken from "./middleware/token";
import usuarios from "./controler/usuario";






const rota = Router();

rota.post('/usuarios', usuarios);
rota.post('/login', login);
rota.use(validarToken);
rota.get('/materias', validarToken, materias);
rota.get('/resumos', cadastroResumo);
rota.post('/resumos', validarToken, cadastroResumo);





export default rota;