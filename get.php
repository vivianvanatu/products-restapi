<?php
    header("Access-Control-Allow-Origin: https://wepri.net");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once 'database.php';
    include_once 'products.php';
    $meth = $_SERVER['REQUEST_METHOD'];
    $query = $_SERVER['QUERY_STRING'];
    if ($query !== "") {
        if($_GET['sku'] == "") {
            echo "SKU is empty";
        }
        if($_GET['sku']) {            
            $skui = $_GET['sku'];
            $database = new Database();
            $db = $database->getConnection();
            $product_api = new ProductAPI($db);
            $product = $product_api->getProductBySKU($skui);
            $json = json_encode($product);
            echo $json;
        }
        else {
            echo "Invalid SKU";
        }
    } else {
        if ($meth === 'GET') {    
            $database = new Database();
            $db = $database->getConnection();
            $product_api = new ProductAPI($db);
            $product_list = $product_api->getProductList();
            $product_count = count($product_list);
            if($product_count > 0) {
                $json = json_encode($product_list);
                echo $json;
            } else {
                http_response_code(404);
                echo json_encode(
                    array("message" => "No record found.")
                );
            }
        }

    }

        

?>