<?php
//phpinfo();
echo '<pre>';
print_r($_COOKIE);
?>

<?php
// Создаем поток
$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Accept-language: en\r\n" .
              "Cookie: foo=bar\r\n"
  )
);

$context = stream_context_create($opts);

// Открываем файл с помощью установленных выше HTTP-заголовков
$file = file_get_contents('http://37.46.131.190', false, $context);
print_r($file);
?>