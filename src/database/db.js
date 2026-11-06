const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria ou abre o arquivo escola.db na raiz do projeto
const dbPath = path.resolve(__dirname, '../../escola.db');
const db = new sqlite3.Database(dbPath);

// Inicializa a tabela caso ela não exista
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Estudantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      telefone TEXT
    )
  `);


  db.run(`
    CREATE TABLE IF NOT EXISTS Cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
     cargaHoraria INTEGER,
     turno TEXT
    )
  `);
  db.run(`
        CREATE TABLE IF NOT EXISTS Disciplinas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            codigo TEXT NOT NULL UNIQUE,
            cargaHoraria INTEGER NOT NULL,
            curso_id INTEGER NOT NULL,
            FOREIGN KEY (curso_id) REFERENCES cursos(id)
        )
    `);
     db.run(`
        CREATE TABLE IF NOT EXISTS Matriculas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Estudante_id INTEGER NOT NULL,
            curso_id INTEGER NOT NULL,
            numeroMatricula TEXT NOT NULL UNIQUE,
            dataMatricula TEXT NOT NULL,
            status TEXT DEFAULT 'ATIVA',
            FOREIGN KEY (Estudante_id) REFERENCES Estudantes(id),
            FOREIGN KEY (curso_id) REFERENCES Cursos(id)
        )
    `);



});

module.exports = db;
