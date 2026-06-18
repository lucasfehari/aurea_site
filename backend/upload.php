<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$authHeader = null;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
} elseif (function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    }
}

if (!$authHeader || str_replace('Bearer ', '', $authHeader) !== 'aurea-admin-token-secreto-123') {
    http_response_code(401);
    echo json_encode(["error" => "Não autorizado"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['images']) && !isset($_FILES['file'])) {
        echo json_encode(["error" => "Nenhum arquivo enviado."]);
        exit();
    }

    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $uploadedFiles = [];
    
    if (isset($_FILES['images'])) {
        $files = $_FILES['images'];
        if (is_array($files['name'])) {
            $count = count($files['name']);
            for ($i = 0; $i < $count; $i++) {
                $ext = pathinfo($files['name'][$i], PATHINFO_EXTENSION);
                $filename = uniqid('img_') . '.' . $ext;
                $destination = $uploadDir . $filename;
                
                if (move_uploaded_file($files['tmp_name'][$i], $destination)) {
                    $uploadedFiles[] = '/backend/uploads/' . $filename;
                }
            }
        }
    }

    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        if (is_array($file['name'])) {
            if ($file['error'][0] !== UPLOAD_ERR_OK) {
                echo json_encode(["error" => "Erro de upload (código " . $file['error'][0] . "). O arquivo pode ser muito grande."]);
                exit();
            }
            $ext = pathinfo($file['name'][0], PATHINFO_EXTENSION);
            $filename = uniqid('file_') . '.' . $ext;
            $destination = $uploadDir . $filename;
            if (move_uploaded_file($file['tmp_name'][0], $destination)) {
                $uploadedFiles[] = '/backend/uploads/' . $filename;
            }
        } else {
            if ($file['error'] !== UPLOAD_ERR_OK) {
                echo json_encode(["error" => "Erro de upload (código " . $file['error'] . "). O arquivo pode ser muito grande."]);
                exit();
            }
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = uniqid('file_') . '.' . $ext;
            $destination = $uploadDir . $filename;
            if (move_uploaded_file($file['tmp_name'], $destination)) {
                $uploadedFiles[] = '/backend/uploads/' . $filename;
            }
        }
    }

    echo json_encode(["success" => true, "urls" => $uploadedFiles]);
    exit();
}
