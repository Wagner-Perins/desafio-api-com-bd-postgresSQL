import bcrypt from "bcrypt";
import { Request, Response } from "express";
import pool from "../conexaoBd";
import  Jwt, {JwtPayload}  from "jsonwebtoken";

//Criando usuario;
// export const usuario = async (req: Request, res: Response) => {
//   const { nome, email, senha } = req.body;
//   if (typeof nome !== "string" || !nome || typeof email !== "string" ||!email ||typeof senha !== "string" ||!senha){
//     return res.status(400).json({
//       mensagem: "Todos os campos são obrigatórios",
//     });
//   };

//   try {
//     const {rows} = await pool.query ("SELECT * FROM usuarios WHERE email = $1", [email])
//      if ( rows.length > 0 ) {
//         return res.status(400).json({
//             "mensagem": "E-mail já cadastrado"
//           });
//      };

//      const hashSenha  = await bcrypt.hash(senha, 10);
//      const newUser = { 
//         nome, 
//         email,
//         senha: hashSenha
//      };

//      type TCriar  = {   
//         nome: string,
//         email: string,
//         senha: string
//      };

//      const inserir = async (propriedade:TCriar) => {
//         const result = await pool.query(
//             'INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING id, nome, email',
//             [propriedade.nome, propriedade.email, propriedade.senha]
//         );
//         return result.rows[0];
//      } 
//      const usuarioCriado = await inserir(newUser);
     
//      return res.status(201).json(usuarioCriado);
    
//     } catch (error) {
//     const falha = error as Error;
//     return res.status(400).send(falha.message);
//   };
// };

// //Criando login;
// export const login = async (req: Request, res: Response) => {
//   const { email, senha } = req.body;
//   if (typeof email !== "string" || !email || typeof senha !== "string" || !senha) {
//     return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
//   };

// try {
//     const {rows} = await pool.query ("SELECT * FROM usuarios WHERE email = $1", [email])
//      if (rows.length == 0 ) {
//         return res.status(400).json({
//             "mensagem": "E-mail ou senha inválidos"
//           })
//      }
//     const compareKey = await bcrypt.compare(senha, rows[0].senha)
//     if (!compareKey) {
//         return res.status(400).json({
//             "mensagem": "E-mail ou senha inválidos"
//           });
//     };
//     const token = Jwt.sign({id:rows[0].id}, process.env.SECRET_JWT as string,{ expiresIn: '20d'})
//     return  res.status(200).json({
//         "token": token
//     });

    
//   } catch (error) {
//   const errologin = error as Error 
//   return res.status(500).send(errologin.message)
//   };

// };

//Listagem de materias;
// export const materias = async (req: Request, res: Response) => {
//   try { 
//       const {rows} = await  pool.query ("SELECT * FROM materias");
    
//     return res.status(200).json(rows);
  
    
//   } catch (error) {
//     const erro = error as Error
//     return res.status(500).json({
//         mensagem: erro.message
//     });
//   };
// };

//Resumo;
// export const cadastroResumo = async (req: Request, res: Response) => {
//   const { materiaId, titulo, topicos, descricao } = req.body;
//   const authorization = req.headers.authorization;

//   if (typeof materiaId !== 'number') {
//     return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
//   };
//   if (!topicos || !Array.isArray(topicos) || topicos.length === 0) {
//     return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
//   };

//   const semTitulo = typeof titulo === 'string' && titulo.trim() ? titulo : "Sem título";
//   const semDescricao = typeof descricao === 'string' ? descricao : "";

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res.status(401).json({ mensagem: "Falha na autenticação" });
//   };

//   const token = authorization.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ mensagem: "Falha na autenticação" });
//   };

//   try {
//     const decoded = Jwt.verify(token, process.env.SECRET_JWT as string) as JwtPayload;
//     const usuarioId = decoded.id;

//     const usuario = await encontrar(usuarioId);
//     if (!usuario) {
//       return res.status(401).json({ mensagem: "Falha na autenticação" });
//     };

//     const materia = await idMateria(materiaId);
//     if (!materia) {
//       return res.status(404).json({ mensagem: "Matéria não encontrada" });
//     };

//     const novoResumo = {
//       usuarioId:usuario.id,
//       materiaId,
//       titulo: semTitulo,
//       topicos: topicos.join(", "),
//       descricao: semDescricao,
//       criado: new Date().toISOString(),
//     };

//     return res.status(201).json(novoResumo);
//   } catch (error) {
//     const erro = error as Error;
//     return res.status(500).json({ mensagem: erro.message });
//   };
// };


// async function encontrar(id: number) {
//   const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
//   return rows[0] || null;
// };


// async function idMateria(id: number) {
//   const { rows } = await pool.query('SELECT * FROM materias WHERE id = $1', [id]);
//   return rows[0] || null;
// };