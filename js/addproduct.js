let data = { name:'', sku:'', price:'', productType:['dvd', 'book', 'furniture'], size:'', weight:'', height:'', length:'', width:'' }
let initialValidationObj = {
    name: false,
    sku: false,
    price: false,
    productType: false,
    size: false,
    weight: false,
    height: false,
    length: false,
    width: false,
}
const inputPatterns = [
        {
            inputName: 'name',
            pattern: /[a-zA-Z0-9\.\-\_\ ]{3,30}$/g,
            errorMessage: 'Please enter a valid product name',
            required: 1
        },
        {
            inputName: 'sku',
            pattern: /(?!.*[\.\-\_\ ]{2,})^[a-zA-Z0-9\.\-\_\ ]{3,30}$/gm,
            errorMessage: 'Please enter a valid SKU for the product',
            required: 1
        },
        {
            inputName: 'price',
            pattern: /^(\d+(\,\d{3})*(\.\d{1,2})?)?$/gm,
            errorMessage: 'Product must have a valid price',
            required: 1
        },
        {
            inputName: 'productType',
            pattern: /(dvd|book|furniture)/,
            errorMessage: 'Please select the product type',
            required: 1
        },
        {
            inputName: 'size',
            pattern: /^[0-9]+$/,
            errorMessage: 'Please add a size for the DVD',
            required: 0
        },
        {
            inputName: 'weight',
            pattern: /^[0-9]+$/,
            errorMessage: 'Please add the weight of the book',
            required: 0
        },
        {
            inputName: 'height',
            pattern: /^[0-9]+$/,
            errorMessage: 'Please add the height of the furniture',
            required: 0
        },
        {
            inputName: 'length',
            pattern: /^[0-9]+$/,
            errorMessage: 'Please add the length of the furniture',
            required: 0
        },
        {
            inputName: 'width',
            pattern: /^[0-9]+$/,
            errorMessage: 'Please add the width of the furniture',
            required: 0
        }
    ];
function generateForm(data) {
    let output = '';            

    for (const property in data) {

        if (Array.isArray(data[property])) {
            
            output += `<div class="input-group mb-3" id="group` + property + `">
                        <span class="input-group-text" id="label` + property + `">` + property + `:</span>
                        <select class="form-select" aria-label="Select product type" onchange="displayInput(this)" name="` + property + `" id="` + property + `" >`;
                            output += `<option value="" default>Select something</option>`;
                            let i = 0;
                            let val = data[property];
                            while (i < val.length) {
                                output += `<option value="` + val[i] + `">` + val[i] + `</option>`;
                                i++;
                            }
            output += `</select>
                       <div id="error` + property + `" class="input-error"></div>
                       </div>`;    
        } else {
            
            output += `<div class="input-group mb-3" id="group` + property + `">
                        <span class="input-group-text" id="label` + property + `">` + property + `:</span>
                            <input onkeyup="validateInput(this)" type="text" class="form-control" 
                                id="` + property + `"
                                name="` + property + `"
                                placeholder="` + property + `" 
                                aria-label="` + property + `" 
                                aria-describedby="` + property + `">
                            <div id="error` + property + `" class="input-error"></div>
                </div>`;
        }
    }
    output += `
    <div class="input-group mb-3">
                    <input type="submit" value="Save" id="submit_button" class="btn btn-primary" disabled>
                    <input value="Cancel" class="btn btn-warning" onclick="location.href='/product'">
                </div>
            `;
    document.getElementById("addProductForm").innerHTML = output;
    displayNone();
    
}    

function addProduct(form){
    let formData = new FormData(form);
    let addProduct = Object.fromEntries(formData);
    jsonString = JSON.stringify(addProduct);
    let http = new XMLHttpRequest();
    
    http.open("POST", "saveApi.php", true);
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    http.send(jsonString);

    http.onreadystatechange = () => {
        if (http.readyState === 4) {
        let message = '';
        console.log(http.response);
        if (http.response === 'success') {
            message = '<div class="alert alert-success"><strong>Success!</strong> Product created successfully.</div>';
            document.getElementById("addProductForm").reset();
            displayNone();            
        } else {
            message = '<div class="alert alert-warning"><strong>Fail!</strong> Product could not be created.</div>';
        }
        document.getElementById('message').innerHTML = message;
        }
    }

    

    
}

function displayNone() {
    let hiddenIdArr = ['groupsize', 'groupweight', 'groupheight', 'grouplength', 'groupwidth'];
    hiddenIdArr.forEach( element => document.getElementById(element).style.display = "none");
}
function displayInput(el){
    let selectedOption = el.value;
    const productTypeSelect = { dvd: ['size'], book: ['weight'], furniture:['height', 'length', 'width'] }
    // Show the corresponding input elements and hide the others, according to what option was selected as productType
    for (let key in productTypeSelect) {
        if (selectedOption === key) {
            let i = 0;
            for (const inputId of productTypeSelect[key]) {
                sel = 'group' + productTypeSelect[key][i];                      
                document.getElementById(sel).style.display = "flex";
                const result = inputPatterns.find(({ inputName }) => inputName === productTypeSelect[key][i]);
                result.required = 1;
                //Run input validation function on selected input                                   
                validateInput(el);  
                
                i++;
            }               
        } else {
            let i = 0;
            for (const inputId of productTypeSelect[key]) {
                sel = 'group' + productTypeSelect[key][i];   
                document.getElementById(sel).style.display = "none";   
                i++;
            }
        }
    }
}
//Start the validation Object and submit button variable
let validationObj = initialValidationObj;
let submitButtonDisabled = true;

function checkValidationObj() {
    const validationKeys = Object.keys(validationObj);
    let flag = true;
    
    validationKeys.forEach(key => {
        const result = inputPatterns.find(({ inputName }) => inputName === key);
        if(result.required === 1) {
            if(!validationObj[key]) {
                flag = false;
            }
        }
    });

    if(flag) {
        document.getElementById("submit_button").disabled = false;
        submitButtonDisabled = false;
    } else {
        document.getElementById("submit_button").disabled = true;
        submitButtonDisabled = true;
    }
}
function validateInput(inputid) {
    const result = inputPatterns.find(({ inputName }) => inputName === inputid.name);
    let el = document.getElementById(result.inputName);
    let errEl = document.getElementById('error' + result.inputName);
    let objKey = result.inputName;
    let test = result.pattern.test(inputid.value);
    console.log(result.pattern.test(inputid.value));
    if ( test === false ) {
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
        errEl.innerHTML = '<div class="invalid-feedback"><p>' + result.errorMessage + '</p></div>';
        validationObj[objKey] = false;                  
    } else {
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
        errEl.innerHTML = '<div class="valid-feedback"></div>';
        validationObj[objKey] = true;             
    }
    checkValidationObj();

}

function resetInputClasses() {
        const elements = document.querySelectorAll('*');

        elements.forEach((element) => {
            element.classList.remove('is-valid');
            element.classList.remove('is-invalid');
        });
}