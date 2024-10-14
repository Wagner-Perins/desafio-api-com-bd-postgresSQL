 
import jwt, { JwtPayload } from 'jsonwebtoken';
import pool from '../conexaoBd'; 
import { NextFunction, Request, Response, } from 'express';

interface RequestCustom extends Request {
  usuarioId?: number;
}

const validarToken = async (req: RequestCustom, res: Response, next:NextFunction) => {
  const authorization = req.headers['authorization'];
  console.log(authorization);

  if (!authorization){
    return res.status(401).json({ mensagem: 'Falha na autenticação' }); 
  };
    try {
      const token = authorization.split(' ')[1];
      console.log(token);
      
      const senhaJwt = process.env.JWT_SECRET as string;
       const verificarToken =  jwt.verify(token, senhaJwt) as JwtPayload;
       console.log(verificarToken);
       

      const usuarios = await pool.query('select * from usuarios where id = $1', [verificarToken.id]);
        if (!usuarios.rows.length){
          return res.status(401).json({ mensagem: 'Falha na autenticação' });
        }
        req.usuarioId = verificarToken.id
        next();
       
    } catch (error){ 
      return res.status(401).json({ mensagem: 'Falha na autenticação' });
    };
};

export default validarToken;