<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once 'database.php';
    include_once 'products.php';
    $meth = $_SERVER['REQUEST_METHOD'];
    if ($meth === 'POST') {
        $database = new Database();
        $db = $database->getConnection();
        $product_api = new ProductAPI($db);
        $data = json_decode(file_get_contents("php://input"));

        $product_api->name = $data->name;
        $product_api->sku = $data->sku;
        $product_api->price = $data->price;
        $product_api->productType = $data->productType;
        $product_api->size = $data->size;
        $product_api->weight = $data->weight;
        $product_api->height = $data->height;
        $product_api->length = $data->length;
        $product_api->width = $data->width;
        
        if($product_api->createProduct()){
            echo 'success';
        } else{
            echo 'fail';
        }
    }
    if ($meth === 'DELETE') {    
        $database = new Database();
        $db = $database->getConnection();
        $product_api = new ProductAPI($db);
        $data = json_decode(file_get_contents("php://input"));
        if($product_api->deleteProducts($data)) {
            echo 'success';
        } else {
            echo 'fail';
        }
    }
?>