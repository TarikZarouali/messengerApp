<?php
$user = 'root';
$pass = '';

/**
 * Establish a PDO connection to the 'messengerapp' database and handle exceptions.
 *
 * @param string $user - The username for the database connection.
 * @param string $pass - The password for the database connection.
 *
 * @var PDO $dbh - PDO instance for database connection.
 * @var array $response - An array to store the response data in case of errors.
 */
try {
    $dbh = new PDO('mysql:host=localhost;dbname=messengerapp', $user, $pass);
} catch (PDOException $e) {
    if ($e->getCode() == 1452) {
        // Foreign key violation
        $response['status'] = 500;
        $response['message'] = 'Error: Invalid user in messageOwner';
    } else {
        // Other PDO exceptions
        $response['status'] = 500;
        $response['message'] = 'Error during database operation';
    }
    echo json_encode($response);
    exit;
}
