<?php

// Define the abstract Product class
abstract class Product
{
    // Define protected properties for SKU, name, price, and product type
    protected $sku;
    protected $name;
    protected $price;
    protected $productType;

    // Define the constructor method
    public function __construct($sku, $name, $price, $productType)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->productType = $productType;
    }

    // Define the abstract method to get product information
    abstract public function showInfo();

    // Define the __get magic function to get the value of a property
    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    // Define the __set magic function to set the value of a property
    public function __set($property, $value)
    {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
        return $this;
    }
}
class ProductInfo
{
    public $sku;
    public $name;
    public $price;
    public $productType;
    public $size;
    public $weight;
    public $height;
    public $width;
    public $length;
}

// Define the DVD class that extends the abstract Product class
class DVD extends Product
{
    // Define protected properties for product dimensions
    protected $size;

    // Define the constructor method
    public function __construct($sku, $name, $price, $productType, $size)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->size = $size;
    }

    // Define the showInfo method to return the DVD product information
    public function showInfo()
    {
        $info = new ProductInfo();
        $info->sku = $this->sku;
        $info->name = $this->name;
        $info->price = $this->price;
        $info->productType = $this->productType;
        $info->size = $this->size;

        return $info;
    }
}

// Define the Book class that extends the abstract Product class
class Book extends Product
{
    // Define protected properties for product dimensions
    protected $weight;

    // Define the constructor method
    public function __construct($sku, $name, $price, $productType, $weight)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->weight = $weight;
    }
    // Define the showInfo method to return the Book product information
    public function showInfo()
    {
        $info = new ProductInfo();
        $info->sku = $this->sku;
        $info->name = $this->name;
        $info->price = $this->price;
        $info->productType = $this->productType;
        $info->weight = $this->weight;

        return $info;
    }
}

// Define the Furniture class that extends the abstract Product class
class Furniture extends Product
{
    // Define protected properties for product dimensions
    protected $height;
    protected $width;
    protected $length;

    // Define the constructor method
    public function __construct($sku, $name, $price, $productType, $height, $width, $length)
    {
        parent::__construct($sku, $name, $price, $productType);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    // Define the showInfo method to return the Furniture product information
    public function showInfo()
    {
        $info = new ProductInfo();
        $info->sku = $this->sku;
        $info->name = $this->name;
        $info->price = $this->price;
        $info->productType = $this->productType;
        $info->height = $this->height;
        $info->width = $this->width;
        $info->length = $this->length;

        return $info;
    }
}

// Define the ProductAPI class
class ProductAPI
{
    // Define the private database connection and product array
    private $conn;
    protected $products = array();
    public $name;
    public $sku;
    public $price;
    public $productType;
    public $size;
    public $weight;
    public $height;
    public $length;
    public $width;
    // Define the constructor method to connect to the database and retrieve the products
    public function __construct($db)
    {
        $this->conn = $db;
        $stmt = $this->conn->query('SELECT * FROM products');
        $product = null;
        while ($row = $stmt->fetch()) {
            switch ($row['productType']) {
                case 'dvd':
                    $product = new DVD($row['sku'], $row['name'], $row['price'], $row['productType'], $row['size']);
                    break;
                case 'book':
                    $product = new Book($row['sku'], $row['name'], $row['price'], $row['productType'], $row['weight']);
                    break;
                case 'furniture':
                    $product = new Furniture($row['sku'], $row['name'], $row['price'], $row['productType'], $row['height'], $row['width'], $row['length']);
                    break;
            }
            array_push($this->products, $product);
        }
    }
    // Define the getProductList method to retrieve a list of products
    public function getProductList()
    {
        $product_list = array();
        foreach ($this->products as $product) {
            $product_info = $product->showInfo();
            array_push($product_list, $product_info);
        }
        return $product_list;
    }
    // Define the getProductBySKU method to retrieve a product by SKU
    public function getProductBySKU($sku)
    {
        foreach ($this->products as $product) {
            if ($product->sku === $sku) {
                $product_info = $product->showInfo();
                return $product_info;
            }
        }
        return null;
    }
    // Define createProduct method to insert a product in the database
    public function createProduct()
    {
        $sqlQuery = "INSERT INTO
                     products
                SET
                    name = :name,
                    sku = :sku,
                    price = :price,
                    productType = :productType,
                    size = :size,
                    weight = :weight,
                    height = :height,
                    length = :length,
                    width = :width";

        $stmt = $this->conn->prepare($sqlQuery);

        // Sanitize Inputs
        $this->name = $this->sanitizeInput($this->name);
        $this->sku = $this->sanitizeInput($this->sku);
        $this->price = $this->sanitizeInput($this->price);
        $this->productType = $this->sanitizeInput($this->productType);
        $this->size = $this->sanitizeInput($this->size);
        $this->weight = $this->sanitizeInput($this->weight);
        $this->height = $this->sanitizeInput($this->height);
        $this->length = $this->sanitizeInput($this->length);
        $this->width = $this->sanitizeInput($this->width);

        // bind data
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":sku", $this->sku);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":productType", $this->productType);
        $stmt->bindParam(":size", $this->size);
        $stmt->bindParam(":weight", $this->weight);
        $stmt->bindParam(":height", $this->height);
        $stmt->bindParam(":length", $this->length);
        $stmt->bindParam(":width", $this->width);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    // Define the deleteProducts method to delete the products passed in as argument
    public function deleteProducts($data)
    {
        $valid = false;
        for ($i = 0; $i < count($data); $i++) {
            $sku = $data[$i];
            $sqlQuery = "DELETE FROM products WHERE `sku` = '" . $sku . "'";
            $stmt = $this->conn->prepare($sqlQuery);
            if ($stmt->execute()) {
                $valid = true;
            }
        }
        if ($valid == true) {
            return true;
        }
    }
    // public function deleteProducts($skus) {   
    //     foreach ($skus as $sku) {
    //         $this->conn = $db;
    //         $stmt = $this->conn->query("DELETE FROM products WHERE sku = '$sku'");
    //         // $sql = "DELETE FROM products WHERE sku = '$sku'";
    //         $result = $db->query($stmt);

    //       if (!$result) {
    //         return false;
    //       }
    //     }

    //     return true;
    //   }
    // Sanitize Inputs
    public function sanitizeInput($data)
    {
        $data = strip_tags($data);
        $data = htmlspecialchars($data);
        //$data = stripslashes($data);
        //$data = trim($data);
        return $data;
    }
}
