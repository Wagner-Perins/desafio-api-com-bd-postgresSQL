import { Request, Response } from "express";
import pool from "../conexaoBd";

const materias = async (req: Request, res: Response) => {
    try { 
        const {rows} = await  pool.query ("SELECT * FROM materias");
      
      return res.status(200).json(rows);
    
      
    } catch (error) {
      const erro = error as Error
      return res.status(500).json({
          mensagem: erro.message
      });
    };
  };

  export default materias;