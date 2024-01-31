<html>

<head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/font-awesome-061bd4de7d.js"></script>
    <script src="js/addproduct.js"></script>
</head>

<body onload="generateForm(data)">
    <navbar class="navibar">
        <div class="logo">PRODUCTS</div>
        <a id="addbtn" class="addbtn active" onclick="redirectTo('/');"><i class="fa-solid fa-home"></i> Products</a>
        <a id="delbtn" class="delbtn disabled"><i class="fa-solid fa-trash"></i> Mass Delete</a>
        <a id="selectAll" class="selbtn disabled"> Select All</a>
    </navbar>
    <div class="container">
        <div class="row pt-5">
            <div class="col-4 add-product-form p-none">
                <button type="button" class="btn-close float-end p-3" aria-label="Close" onclick="redirectURL();"></button>
                <div style="width: 100%; padding: 1rem;">
                    <h3>Add new product</h3>
                </div>
                <div id="message" class="m-3"></div>
                <form id="addProductForm" class="pt-5 ps-3 pe-3 pb-3">
                </form>
            </div>
        </div>
        <script>
            
            document.getElementById("addProductForm").addEventListener("submit", function(e) {
                e.preventDefault();
                let currentURL = window.location.href;
                let pathArray = currentURL.split('/');
                let currentFolderName = pathArray[pathArray.length - 2];
                let newURL = '/' + currentFolderName;                
                if (submitButtonDisabled === false) {
                    addProduct(e.target);
                    resetInputClasses();
                    window.location.replace(newURL);
                }
            });
        </script>
    </div>
</body>

</html>