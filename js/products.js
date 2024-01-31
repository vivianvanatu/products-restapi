          function getProducts() {
            let http = new XMLHttpRequest();
            let url = "http://localhost/product/get.php"; 
            http.open("GET", url, true);
            http.send();           

            http.onreadystatechange = function() {
                if (http.readyState === XMLHttpRequest.DONE) {
                    const status = http.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        const allProducts = JSON.parse(this.responseText);
                        displayProducts(allProducts);
                        // console.log("Loaded Successfully");
                    } else {
                        setInactiveBtn("selectAll");
                        document.getElementById("products").innerHTML = "<p>No products in the database</p>";
                        // console.log("Error");
                    }
                }             
                
            }; 
        }

        function displayProducts(arr) {
            let output = "";
            let i;
            let unit = '';
            
            //Change this to handle productType with object
            for(i = 0; i < arr.length; i++) {            
                if(arr[i].productType === 'dvd'){
                    unit = 'Size:' + arr[i].size + ' Mb';             
                } 
                if(arr[i].productType === 'book'){
                    unit = 'Weight: ' + arr[i].weight + ' Kg';
                }
                if(arr[i].productType === 'furniture'){
                    unit = 'Dimensions:' + arr[i].height + 'x' + arr[i].width + 'x' + arr[i].length;
                }
                output += '<a href="get?sku=' + arr[i].sku + '"><div class="product-card"><input  type="checkbox" onclick="isChecked()" id="' + arr[i].sku + '" class="delete-checkbox"><div class="card-text">' + arr[i].sku + '<p>' + arr[i].name + '</p><p>' + arr[i].price + ' $</p><p>' + unit + '</p></div></div></a>';
            
            document.getElementById("products").innerHTML = output;
            }
        }
        function isChecked() {
            let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
            if (checkboxes.length == 0) {
                setInactiveBtn("delbtn");
            } else {
                setActiveBtn("delbtn");
            }
        }
        let allSelected = false;
        function selectAllProducts() {
            let arrayCb = [];            
            let isDisabled = document.getElementById('selectAll').classList.contains('disabled');
            if(isDisabled == false) { 
                if(allSelected == false) {
                    let chk = document.querySelectorAll('input[type=checkbox]');
                    for (let i = 0; i < chk.length; i++) {
                        chk[i].checked = true;
                        arrayCb.push(chk[i].id);                   
                    };
                    
                    document.getElementById('selectAll').innerHTML = 'Deselect All';
                    setActiveBtn("delbtn");
                    allSelected = true;                        
                } else { 
                    let chk = document.querySelectorAll('input[type=checkbox]:checked');
                    for (let i = 0; i < chk.length; i++) {
                        chk[i].checked = false;
                        arrayCb = [];                   
                    };
                    
                    document.getElementById('selectAll').innerHTML = 'Select All';
                    setInactiveBtn("delbtn");
                    allSelected = false;
                }
            } else {            

            }
            return arrayCb;
        }

        function selectedProducts() {
            let arrayCb = [];    
            let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
            for (let i = 0; i < checkboxes.length; i++) {
                
                arrayCb.push(checkboxes[i].id)
            }
            console.log('arrayCb: ', arrayCb);
            return arrayCb;         
        }

        function setActiveBtn(id) {
            document.getElementById(id).classList.remove("disabled");
        }

        function setInactiveBtn(id) {
            document.getElementById(id).classList.add("disabled");
        }
        function animateFaChild(parentid, childclass, animation, dur) {
            let parent = document.getElementById(parentid);
            let child = parent.getElementsByClassName(childclass);
            child[0].classList.add(animation);
            setTimeout( () => { 
                child[0].classList.remove(animation);
                setInactiveBtn("delbtn");                
            }, dur)         
        }
        
        function deleteSelectedProducts() {
            let deleteIds = selectedProducts();
            let isDisabled = document.getElementById('delbtn').classList.contains('disabled');
            if(isDisabled == false) { 
                animateFaChild("delbtn", "fa-trash", "fa-bounce", 2000);
                let countedProd = 'product';
                if (deleteIds.length > 1) {
                    countedProd = 'products';
                }

                /// Check why after hitting cancel delete request the selected products list is messed and the delete button is unavailable
                //
                //
                //
                let title = 'Confirm Deletion';
                let message = 'Warning! You are about to permanently delete ' + deleteIds.length + ' ' + countedProd + ' in the database. This action cannot be undone. Are you sure you want to continue?';
                
                let action = '<button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="delConfirm">Delete ' + deleteIds.length + ' ' + countedProd + '</button>';
                prepareConfirmation(title, message, action);
                triggerConfirmation();
                const el = document.getElementById("delConfirm");
                console.log(el);
                el.addEventListener("click", function(){
                    deleteProducts(deleteIds);
                    getProducts();
                }, false);
            }
        }
        function deleteProducts(idsArray){    
            jsonString = JSON.stringify(idsArray);
                    
            let http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                   
                    let message = '';
                    if (http.response === 'success') {
                        message = '<div class="alert alert-success"><strong>Success!</strong> Products successfully deleted.</div>';
                    } else {
                        message = '<div class="alert alert-warning"><strong>Fail!</strong> Product could not be deleted.</div>';
                    }
                    // console.log(http.response);
                    document.getElementById('message').innerHTML = message;
                }
            }

            http.open("DELETE", "http://localhost/product/saveApi.php", true);
            http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            console.log(http);
            http.send(jsonString);
        }
        function triggerConfirmation() {            
            let myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {});
            myModal.show();
        }
        function prepareConfirmation(title, message, action) {
            let output = `<!-- Modal -->
            <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="confirmationModalLabel">` + title + `</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    ` + message + `
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    ` + action + `
                    </div>
                </div>
                </div>
            </div>`;
            let bodyTag = document.getElementById('message');
            bodyTag.innerHTML += output;            
        }
        