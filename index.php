<html>
<head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/font-awesome-061bd4de7d.js" crossorigin="anonymous"></script>
    <script src="js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <script src="js/products.js"></script>
</head>
    <navbar class="navibar">
        <div class="logo">PRODUCTS</div>
        <a id="addbtn" class="addbtn" href="addproduct"><i class="fa-solid fa-plus fa-beat"></i> Add</a>
        <a id="delbtn" class="delbtn disabled" onclick="deleteSelectedProducts()"><i class="fa-solid fa-trash"></i> Mass Delete</a>
        <a id="selectAll" class="selbtn" onclick="selectAllProducts()"> Select All</a>
    </navbar>    
    <div class="contain">
        <div id="message"></div>
        <div id="products" class="products-grid"></div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', getProducts, false);
    </script>
</body>
</html>