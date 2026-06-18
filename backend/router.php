<?php
// Roteador para servidor embutido do PHP local
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Servir arquivos de imagem upados (se o caminho começar com /backend/uploads)
if (preg_match('/^\/backend\/uploads\/(.+)$/', $path, $matches)) {
    $file = __DIR__ . '/uploads/' . $matches[1];
    if (file_exists($file)) {
        $mime = mime_content_type($file);
        header("Content-Type: $mime");
        readfile($file);
        exit;
    }
}

// Redirecionamento da API
if (preg_match('/^\/api\/upload/', $path)) {
    $_SERVER['PATH_INFO'] = str_replace('/api/upload', '', $path);
    require 'upload.php';
    exit;
}

if (preg_match('/^\/api/', $path)) {
    $_SERVER['PATH_INFO'] = str_replace('/api', '', $path);
    require 'api.php';
    exit;
}

// Qualquer outra coisa retorna 404
http_response_code(404);
echo "Not Found";
