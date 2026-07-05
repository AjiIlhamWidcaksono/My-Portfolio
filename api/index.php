<?php

// Membuat folder penampung temporary di /tmp secara dinamis jika belum ada
$required_directories = [
    '/tmp/views',
    '/tmp/cache',
    '/tmp/sessions'
];

foreach ($required_directories as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Teruskan permintaan dari Vercel ke file index.php Laravel di folder public
require __DIR__ . '/../public/index.php';
