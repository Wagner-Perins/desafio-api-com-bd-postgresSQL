--Criando database;
create database resume_ai;

--Criando tabelas;
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,  
    nome text NOT NULL,          
    email text NOT NULL UNIQUE,  
    senha text NOT NULL          
);

CREATE TABLE materias (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL
);


create table resumos (
        id serial primary key,
        usuario_id int not null,
        materia_id int not null,
        topicos text not null,
        descricao text not null,
        criado timestamptz not null DEFAULT now(),
        constraint fk_usuario_id foreign key (usuario_id) references usuarios(id),
        constraint fk_materia_id foreign key (materia_id) references materias(id)
    );


--Listando Matérias
insert into "materias"(nome) values
('Back-end'),
('Front-end'),
('Carreira'),
('Mobile'),
('Design'),
('Dados'),
('SQL')

--Inserindo registro de tabelas;
select * from materias

SELECT * FROM usuarios WHERE email = 'sla@email.com';

INSERT INTO usuarios (nome, email, senha)
VALUES ('', '', '');


INSERT INTO resumos (usuario_id, materia_id, topicos, descricao)
VALUES (2, 8, 'SQL, Postgres','Resumo SQL e Postgres');


--Inserindo comandos;
SELECT * FROM resumos WHERE usuario_id = 1;


SELECT * FROM resumos WHERE usuario_id = 1 AND materia_id = 2;


SELECT * FROM resumos WHERE id = 10 AND usuario_id = 1;

UPDATE resumos 
SET topicos = 'Novo Tópico', descricao = 'Novo conteúdo', materia_id = 57, criado = NOW() 
WHERE id = 11 AND usuario_id = 2;


DELETE FROM resumos WHERE id = 11 AND usuario_id = 2;


SELECT COUNT(*) AS total_resumos 
FROM resumos 
WHERE EXTRACT(YEAR FROM criado) = 2012
AND EXTRACT(MONTH FROM criado) = 6;