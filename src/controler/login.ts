import bcrypt from "bcrypt";
import { Request, Response } from "express";
import pool from "../conexaoBd";
import  jwt, {JwtPayload}  from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    if (typeof email !== "string" || !email || typeof senha !== "string" || !senha) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    };
  
  try {
      const {rows} = await pool.query ("SELECT * FROM usuarios WHERE email = $1", [email])
       if (rows.length == 0 ) {
          return res.status(400).json({
              "mensagem": "E-mail ou senha inválidos"
            })
       }
      const compareKey = await bcrypt.compare(senha, rows[0].senha)
      if (!compareKey) {
          return res.status(400).json({
              "mensagem": "E-mail ou senha inválidos"
            });
      };
      const token = jwt.sign({id:rows[0].id}, process.env.SECRET_JWT as string,{ expiresIn: '20d'})
      return  res.status(200).json({
          "token": token
      });
  
      
    } catch (error) {
    const errologin = error as Error 
    return res.status(500).send(errologin.message)
    };
  
  };

  export default login;