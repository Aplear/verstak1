<?php
return [
    'adminEmail'                        => 'admin@example.com',
    'supportEmail'                      => 'support@example.com',
    'user.passwordResetTokenExpire'     => 3600,
    'novaPoshtaApiKey'                  => '417deaf0f34fb9db9cd910910aa2fe0d',
    'unisenderApiKey'                   => 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
    'liqpay' => [
        'public_key' => 'i69655207445',
        'private_key' => 'ceuDg5qCzHuC25R0J4Fdoe0a1FFhl9qh35VVvidi'
    ],

    // params for datepicker && timepicker

    'workHours' => [
        0 => ['min' => '9', 'max' => '20'], //вс
        1 => ['min' => '9', 'max' => '20'], //пн
        2 => ['min' => '9', 'max' => '20'], //вт
        3 => ['min' => '9', 'max' => '20'], //ср
        4 => ['min' => '9', 'max' => '20'], //чт
        5 => ['min' => '9', 'max' => '20'], //пт
        6 => ['min' => '9', 'max' => '20'], //сб
    ],
    'deliveryTime' => [
        0 => ['min' => '10:00', 'max' => '21:00'], //вс
        1 => ['min' => '10:00', 'max' => '21:00'], //пн
        2 => ['min' => '10:00', 'max' => '21:00'], //вт
        3 => ['min' => '10:00', 'max' => '21:00'], //ср
        4 => ['min' => '10:00', 'max' => '21:00'], //чт
        5 => ['min' => '10:00', 'max' => '21:00'], //пт
        6 => ['min' => '10:00', 'max' => '21:00'], //сб
    ],
    'disabledDays' => [], // example: [0,6]

];
