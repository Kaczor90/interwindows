<?php
// Obsługa formularzy strony (wycena / pomiar, później także konfigurator).
// Działa na zwykłym hostingu z PHP (funkcja mail()).
//
// - Zapytanie AJAX (nagłówek Accept: application/json) dostaje odpowiedź JSON:
//   {"ok": true, "redirect": "/dziekujemy/"} albo {"ok": false, "error": "…"}.
// - Zwykłe wysłanie formularza (bez JavaScriptu) kończy się przekierowaniem 303 na /dziekujemy/.
// - Pola: name, phone (wymagany), email, town, topic, message, consent (wymagana), page,
//   website (pułapka na boty), t (czas otwarcia formularza w ms, opcjonalnie),
//   konfiguracja (opcjonalnie, tekst wielowierszowy – np. zestawienie z konfiguratora),
//   subject (opcjonalnie, dopisek do tematu wiadomości, np. "Konfigurator").

const RECIPIENT = 'biuro@interwindows.pl';
const FROM      = 'formularz@interwindows.pl'; // adres w domenie strony – zmniejsza ryzyko trafienia do spamu
const THANKS    = '/dziekujemy/';

header('X-Robots-Tag: noindex, nofollow');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $error = '', int $code = 200): void {
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $error, 'redirect' => $ok ? THANKS : null], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($ok) {
        header('Location: ' . THANKS, true, 303);
        exit;
    }
    http_response_code($code);
    header('Content-Type: text/html; charset=utf-8');
    $msg = htmlspecialchars($error, ENT_QUOTES, 'UTF-8');
    echo "<!doctype html><html lang=\"pl\"><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex\">"
       . "<title>Nie udało się wysłać</title><body style=\"font-family:sans-serif;max-width:560px;margin:60px auto;padding:0 20px\">"
       . "<h1>Nie udało się wysłać</h1><p>$msg</p><p><a href=\"javascript:history.back()\">Wróć do formularza</a> "
       . "albo zadzwoń: <a href=\"tel:+48697886093\">697 886 093</a>.</p></body></html>";
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Nieprawidłowe żądanie.', 405);
}

// pułapka na boty – prawdziwy użytkownik nie widzi tego pola
if (!empty($_POST['website'])) {
    respond(true);
}
// formularz wysłany szybciej niż 3 s od otwarcia strony – bot (sprawdzane tylko, gdy pole t jest podane)
$started = (int)($_POST['t'] ?? 0);
if ($started > 0 && (microtime(true) * 1000 - $started) < 3000) {
    respond(true);
}

// jednowierszowe pola: bez znaków nowej linii (ochrona przed wstrzykiwaniem nagłówków)
$clean = static fn(string $key, int $max = 200): string =>
    trim(mb_substr(str_replace(["\r", "\n"], ' ', (string)($_POST[$key] ?? '')), 0, $max));
// pola wielowierszowe: ujednolicone końce linii, bez znaków sterujących
$multiline = static function (string $key, int $max): string {
    $v = str_replace(["\r\n", "\r"], "\n", (string)($_POST[$key] ?? ''));
    $v = preg_replace('/[^\P{C}\n\t]/u', '', $v) ?? '';
    return trim(mb_substr($v, 0, $max));
};

$name     = $clean('name', 100);
$phone    = $clean('phone', 40);
$email    = $clean('email', 120);
$town     = $clean('town', 100);
$topic    = $clean('topic', 120);
$page     = $clean('page', 200);
$subjectX = $clean('subject', 80);
$message  = $multiline('message', 3000);
$config   = $multiline('konfiguracja', 20000);
$consent  = !empty($_POST['consent']);

if (strlen(preg_replace('/\D/', '', $phone)) < 9) {
    respond(false, 'Podaj poprawny numer telefonu.', 422);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Adres e-mail wygląda na niepoprawny.', 422);
}
if (!$consent) {
    respond(false, 'Zaznacz zgodę na przetwarzanie danych.', 422);
}

$subject = 'Zapytanie ze strony'
         . ($subjectX !== '' ? " [$subjectX]" : '')
         . ' – ' . ($topic !== '' ? $topic : 'pomiar i wycena')
         . ($town !== '' ? " – $town" : '');

$body = "Nowe zapytanie ze strony interwindows.pl\n\n"
      . "Imię: " . ($name ?: '–') . "\n"
      . "Telefon: $phone\n"
      . "E-mail: " . ($email ?: '–') . "\n"
      . "Miejscowość: " . ($town ?: '–') . "\n"
      . "Temat: " . ($topic ?: '–') . "\n\n"
      . "Wiadomość:\n" . ($message ?: '–') . "\n";

if ($config !== '') {
    $body .= "\n----- Konfiguracja -----\n" . $config . "\n------------------------\n";
}

$body .= "\nStrona: " . ($page ?: '–') . "\n"
       . "Zgoda RODO: tak\n"
       . "Wysłano: " . date('Y-m-d H:i') . "\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Strona Inter Windows <' . FROM . '>',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(
    RECIPIENT,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers)
);

if (!$sent) {
    respond(false, 'Nie udało się wysłać wiadomości. Zadzwoń do nas – chętnie pomożemy.', 500);
}
respond(true);
