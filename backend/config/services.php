<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'historia_pojazdu' => [
        'base_url' => env('HISTORIA_POJAZDU_BASE_URL', 'https://moj.gov.pl'),
        'app_name' => env('HISTORIA_POJAZDU_APP_NAME', 'HistoriaPojazdu'),
        'api_version' => env('HISTORIA_POJAZDU_API_VERSION', '1.0.17'),
        'timeout' => (int) env('HISTORIA_POJAZDU_TIMEOUT', 15),
        'user_agent' => env('HISTORIA_POJAZDU_USER_AGENT'),
    ],

];
