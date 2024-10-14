import express  from 'express';
import { Request, Response } from 'express';
import pool from '../conexaoBd';
import  Jwt, { JwtPayload } from 'jsonwebtoken';
const app = express();
app.use(express.json());
interface RequestCustom extends Request {
  usuarioId?: number;
}
const cadastroResumo = async (req: RequestCustom, res: Response) => {
    const { materiaId, titulo, topicos, descricao } = req.body;
  
    if (typeof materiaId !== 'number') {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    };
    if (!topicos || !Array.isArray(topicos) || topicos.length === 0) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    };
  
    const semTitulo = typeof titulo === 'string' && titulo.trim() ? titulo : "Sem título";
    const semDescricao = typeof descricao === 'string' ? descricao : "";
  
    try {
   
      const usuarioId = req.usuarioId as number;
  
      const materia = await idMateria(materiaId);
      if (!materia) {
        return res.status(404).json({ mensagem: "Matéria não encontrada" });
      };
  
      const novoResumo = {
        usuarioId:usuarioId,
        materiaId,
        titulo: semTitulo,
        topicos: topicos.join(", "),
        descricao: semDescricao,
        criado: new Date().toISOString(),
      };
  
      return res.status(201).json(novoResumo);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ mensagem: erro.message });
    };
  }; 
  
  async function encontrar(id: number) {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return rows[0] || null;
  };
  
  async function idMateria(id: number) {
    const { rows } = await pool.query('SELECT * FROM materias WHERE id = $1', [id]);
    return rows[0] || null;
  };

  export default cadastroResumo;