import bcrypt from "bcrypt";
import { Request, Response } from "express";
import pool from "../conexaoBd";

const usuarios = async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    if (typeof nome !== "string" || !nome || typeof email !== "string" ||!email ||typeof senha !== "string" ||!senha){
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    };
  
    try {
      const {rows} = await pool.query ("SELECT * FROM usuarios WHERE email = $1", [email])
       if ( rows.length > 0 ) {
          return res.status(400).json({
              "mensagem": "E-mail já cadastrado"
            });
       };
  
       const hashSenha  = await bcrypt.hash(senha, 10);
       const newUser = { 
          nome, 
          email,
          senha: hashSenha
       };
  
       type TCriar  = {   
          nome: string,
          email: string,
          senha: string
       };
  
       const inserir = async (propriedade:TCriar) => {
          const result = await pool.query(
              'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING id, nome, email',
              [propriedade.nome, propriedade.email, propriedade.senha]
          );
          return result.rows[0];
       } 
       const usuarioCriado = await inserir(newUser);
       
       return res.status(201).json(usuarioCriado);
      
      } catch (error) {
      const falha = error as Error;
      return res.status(400).send(falha.message);
    };
  };

  export default usuarios;