<?php
// User-Agent المطلوب
$allowedUA = 'remoTV4.5';

// قراءة الـ User-Agent من الطلب
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// التحقق من الـ User-Agent
if ($userAgent !== $allowedUA) {
    http_response_code(403);
    echo "Access Denied";
    exit;
}

// مسار الملف داخل مجلد secret
$file = __DIR__ . '/secret/test.zip';

// التحقق من وجود الملف
if (!file_exists($file)) {
    http_response_code(404);
    echo "File not found";
    exit;
}

// إرسال الملف
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . basename($file) . '"');
header('Content-Length: ' . filesize($file));
readfile($file);
exit;
?>