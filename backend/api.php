<?php
// Permitir CORS (para desenvolvimento local)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

// Função auxiliar para verificar token (implementação básica sem dependências complexas)
function authenticate() {
    $authHeader = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        }
    }

    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(["error" => "Não autorizado"]);
        exit();
    }
    
    $token = str_replace('Bearer ', '', $authHeader);
    // No PHP puro, faremos uma verificação simples simulando um token pra facilitar,
    // Num sistema real você usaria Firebase JWT.
    if ($token !== 'aurea-admin-token-secreto-123') {
        http_response_code(401);
        echo json_encode(["error" => "Token inválido"]);
        exit();
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// No cPanel e Vite proxy, a URL pode ser /api/properties ou apenas /properties dependendo da config.
// Remove o prefixo /api se existir para padronizar a rota internamente.
$path = preg_replace('/^\/api/', '', $requestUri);
if (empty($path)) $path = '/';

// ROTAS
if ($path === '/login' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        echo json_encode(["token" => "aurea-admin-token-secreto-123", "user" => $user['username']]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Credenciais inválidas"]);
    }
    exit();
}

if ($path === '/upload' && $method === 'POST') {
    authenticate();
    $uploadedUrls = [];
    $uploadDir = __DIR__ . '/../public/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (isset($_FILES['images'])) {
        $files = $_FILES['images'];
        for ($i = 0; $i < count($files['name']); $i++) {
            if ($files['error'][$i] === UPLOAD_ERR_OK) {
                $tmpName = $files['tmp_name'][$i];
                $name = basename($files['name'][$i]);
                $uniqueName = time() . '_' . uniqid() . '_' . $name;
                $targetFile = $uploadDir . $uniqueName;
                
                if (move_uploaded_file($tmpName, $targetFile)) {
                    $uploadedUrls[] = '/uploads/' . $uniqueName;
                }
            }
        }
    }
    
    echo json_encode(["success" => true, "urls" => $uploadedUrls]);
    exit();
}

if ($path === '/properties' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id DESC");
    $properties = $stmt->fetchAll();
    
    foreach ($properties as &$prop) {
        $prop['specs'] = json_decode($prop['specs'], true);
        
        $imgStmt = $pdo->prepare("SELECT image_url FROM property_images WHERE property_id = ? AND is_main = 1");
        $imgStmt->execute([$prop['id']]);
        $mainImg = $imgStmt->fetchColumn();
        $prop['image'] = $mainImg ? $mainImg : null;

        $imgAllStmt = $pdo->prepare("SELECT image_url FROM property_images WHERE property_id = ?");
        $imgAllStmt->execute([$prop['id']]);
        $prop['images'] = $imgAllStmt->fetchAll(PDO::FETCH_COLUMN);
    }
    
    echo json_encode($properties);
    exit();
}

if ($path === '/properties' && $method === 'POST') {
    authenticate();
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $pdo->prepare("INSERT INTO properties (code, title, location, summary, price, specs, cta, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $specs = isset($data['specs']) ? json_encode($data['specs']) : '[]';
    $stmt->execute([
        $data['code'] ?? '',
        $data['title'] ?? '',
        $data['location'] ?? '',
        $data['summary'] ?? '',
        $data['price'] ?? '',
        $specs,
        $data['cta'] ?? 'Fale com a gente',
        $data['category'] ?? 'exclusive'
    ]);
    
    $propId = $pdo->lastInsertId();
    
    if (isset($data['images']) && is_array($data['images'])) {
        $isMain = 1;
        foreach ($data['images'] as $imgUrl) {
            $imgStmt = $pdo->prepare("INSERT INTO property_images (property_id, image_url, is_main) VALUES (?, ?, ?)");
            $imgStmt->execute([$propId, $imgUrl, $isMain]);
            $isMain = 0; // A primeira é a principal
        }
    }
    
    echo json_encode(["success" => true, "id" => $propId]);
    exit();
}

if (preg_match('/^\/properties\/(\d+)$/', $path, $matches) && $method === 'DELETE') {
    authenticate();
    $id = $matches[1];
    
    $stmt = $pdo->prepare("DELETE FROM properties WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(["success" => true]);
    exit();
}

if (preg_match('/^\/properties\/(\d+)$/', $path, $matches) && $method === 'PUT') {
    authenticate();
    $id = $matches[1];
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $pdo->prepare("UPDATE properties SET code=?, title=?, location=?, summary=?, price=?, specs=?, cta=?, category=? WHERE id=?");
    $specs = isset($data['specs']) ? json_encode($data['specs']) : '[]';
    $stmt->execute([
        $data['code'] ?? '',
        $data['title'] ?? '',
        $data['location'] ?? '',
        $data['summary'] ?? '',
        $data['price'] ?? '',
        $specs,
        $data['cta'] ?? 'Fale com a gente',
        $data['category'] ?? 'exclusive',
        $id
    ]);
    
    // Deletar imagens antigas se vieram novas
    if (isset($data['images']) && is_array($data['images']) && count($data['images']) > 0) {
        $delStmt = $pdo->prepare("DELETE FROM property_images WHERE property_id = ?");
        $delStmt->execute([$id]);
        
        $isMain = 1;
        foreach ($data['images'] as $imgUrl) {
            $imgStmt = $pdo->prepare("INSERT INTO property_images (property_id, image_url, is_main) VALUES (?, ?, ?)");
            $imgStmt->execute([$id, $imgUrl, $isMain]);
            $isMain = 0;
        }
    }
    
    echo json_encode(["success" => true]);
    exit();
}

if ($path === '/settings' && $method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM settings");
    $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    echo json_encode($settings);
    exit();
}

if ($path === '/settings' && $method === 'PUT') {
    authenticate();
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $pdo->prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
    
    foreach ($data as $key => $value) {
        $stmt->execute([$key, $value]);
    }
    
    echo json_encode(["success" => true]);
    exit();
}

http_response_code(404);
echo json_encode(["error" => "Rota não encontrada"]);
