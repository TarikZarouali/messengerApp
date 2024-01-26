<?php
include 'config.php';


header('Content-Type: application/json');
$decodedParams = json_decode(file_get_contents('php://input'));
$response = [
    'status' => 404,
    'message' => 'Unknown error occurred!'
];
$response = [
    'status' => 200,
    'message' => 'Succes'
];


function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
/**
 * Returns a list of chats.
 *
 * @return array
 */
if (isset($decodedParams->scope) && !empty($decodedParams->scope)) {
    if ($decodedParams->scope == 'chat') {
        if (isset($decodedParams->action) && !empty($decodedParams->action)) {
            if ($decodedParams->action == 'getChats') {
                $stmt = $dbh->prepare("SELECT chatId, chatName, chatStatus, chatCreatedate FROM chats");
                if ($stmt->execute()) {
                    $response['status'] = '200';
                    $response['message'] = 'Chats fetched successfully';
                    $response['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($response);
                    exit;
                } else {
                    $response['status'] = '500';
                    $response['message'] = 'Chats could not be fetched';
                    echo json_encode($response);
                    exit;
                };
            }
        }
    }
}

if (isset($decodedParams->scope) && !empty($decodedParams->scope)) {
    if ($decodedParams->scope == 'messages') {
        if (isset($decodedParams->action) && !empty($decodedParams->action)) {
            if ($decodedParams->action == 'uploadMessage') {
                $messageId = generateRandomString(4);
                $timestamp = time();
                $message = $decodedParams->messageContent;
                $messageOwner = $decodedParams->messageOwner;
                $chatId = $decodedParams->chatId;

                $stmt = $dbh->prepare("INSERT INTO messages (messageId, messageOwner, messageContent, messageCreateDate) 
                  VALUES (:messageId, :messageOwner, :messageContent, :messageCreateDate)");
                $stmt->bindParam(':messageId', $messageId);
                $stmt->bindParam(':messageOwner', $messageOwner);
                $stmt->bindParam(':messageContent', $message);
                $stmt->bindParam(':messageCreateDate', $timestamp);

                if ($stmt->execute()) {
                    $stmt = $dbh->prepare("INSERT INTO chathasmessages (chatId, messageId) VALUES (:chatId, :messageId)");
                    $stmt->bindParam(':chatId', $chatId);
                    $stmt->bindParam(':messageId', $messageId);
                    if ($stmt->execute()) {
                        $response['status'] = 200;
                        $response['message'] = 'Message successfully uploaded to chat';
                    } else {
                        $response['status'] = 500;
                        $response['message'] = 'Error uploading message to chat';
                    }
                    $response['status'] = 200;
                    $response['message'] = 'Message successfully uploaded';
                } else {
                    $response['status'] = 500;
                    $response['message'] = 'Error uploading message';
                }
            }

            if ($decodedParams->action == 'getMessage') {
                $stmt = $dbh->prepare("SELECT m.messageContent, m.messageCreateDate, m.messageOwner, c.chatName
                    FROM chathasmessages as chm 
                    INNER JOIN messages as m ON chm.messageId = m.messageId
                    INNER JOIN chats as c ON chm.chatId = c.chatId
                    WHERE chm.chatId = :chatId
                    ORDER BY m.messageCreateDate");
                $stmt->bindParam(':chatId', $decodedParams->chatId);
                if ($stmt->execute()) {
                    $response['status'] = 200;
                    $response['message'] = 'Messages fetched successfully';
                    $response['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    $response['status'] = 500;
                    $response['message'] = 'Error getting message';
                    echo json_encode($response);
                    exit();
                }
            }
        }
    }
}

echo json_encode($response);
exit();
