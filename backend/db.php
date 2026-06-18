<?php
// Configurações do Banco de Dados

// --- PARA DESENVOLVIMENTO LOCAL (MAC) ---
// Utiliza SQLite para facilitar, criando um arquivo "database.sqlite"
$db_file = __DIR__ . '/database.sqlite';
$dsn = "sqlite:$db_file";

// --- PARA PRODUÇÃO NO cPanel (MUDAR AQUI ANTES DE SUBIR) ---
/*
$host = 'localhost'; // ou o host do seu cPanel
$dbname = 'nome_do_seu_banco';
$username = 'usuario_do_banco';
$password = 'senha_do_banco';
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
*/

try {
    // Se for produção (MySQL), você passa o $username e $password:
    // $pdo = new PDO($dsn, $username, $password);
    
    // Como estamos usando SQLite local, não precisa de usuário e senha:
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Criação das tabelas se não existirem (Útil para o SQLite local e setup inicial do MySQL)
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, -- Mude para INT AUTO_INCREMENT PRIMARY KEY se for MySQL
        username TEXT NOT NULL UNIQUE, -- VARCHAR(255) no MySQL
        password_hash TEXT NOT NULL
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        title TEXT NOT NULL,
        location TEXT,
        summary TEXT,
        price TEXT,
        specs TEXT, -- JSON armazenado como texto
        cta TEXT,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS property_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        property_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        is_main BOOLEAN DEFAULT 0,
        FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )");

    // Cria um usuário admin padrão se não houver nenhum
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    if ($stmt->fetchColumn() == 0) {
        $hash = password_hash('admin123', PASSWORD_BCRYPT);
        $pdo->exec("INSERT INTO users (username, password_hash) VALUES ('admin', '$hash')");
    }

} catch (PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}
?>
