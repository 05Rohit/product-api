let searchBox = document.getElementById("search_box");
let buttonBtn = document.getElementById("button");
let contentBOX = document.querySelector("#content-box");
let TotalDisplay = document.querySelector('#totalDisplay')

let ProductArray = [];
const fetchData = (filteredData) => {
   // console.log("fetchApi")
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
            ProductArray.push(data.products);
            //console.log(ProductArray);

            //Iterate over each array data
            let eachData = "";
            let productsToRender = filteredData || ProductArray[0] || categoryData;
           let count= productsToRender.length
           let cou=10
           
            console.log(count)
            // if(count>0){
            //     TotalDisplay.textContent= count;
            // }
            

            productsToRender.forEach((item) => {
                //console.log(item.category);
                eachData += `
                <div class="col-4 ">
                    <div class="container_card m-2">
                        <div class="bg-transparent text-center p-5">
                            <img src= ${item.images[0]} width='200px' height='200px' >
                            
                        </div>
                        <div class="mt-1 ps-5 pe-2 pb-3  ">
                            <h5> Brand Name: ${item.brand} </h5>
                            <p class="" >${item.title}</p>
                            <p class="" >Description ${item.description}</p>
                            <p class="" > Price:- &#x20B9 ${item.price};</p>
                            <p class="" >Stock Left:- ${item.stock}</p>
                        </div>
                    </div>
                </div>
            `;
            });

            document.getElementById("Display").innerHTML = eachData;
        })
        .catch((error) => console.error("Error fetching data:", error));
};
fetchData()

buttonBtn.addEventListener('click',(e)=>{
    e.preventDefault();

})

searchBox.addEventListener("keyup", () => {
    let text = searchBox.value;

    if (text.length > 0) {
        let filteredData = searchData(text, ProductArray);
        fetchData(filteredData);
    } else {
        fetchData();
    }
});

let filteredProductData;
function searchData(values, productData) {
    values = values.toUpperCase().trim();
     filteredProductData = [];
    

    for (let product of productData[0]) {
        let filterName = product.title.toUpperCase().trim();

        if (filterName.startsWith(values)) {
            filteredProductData.push(product);
        }
    }
  
    return filteredProductData;
    
}


// For CategoryWise Data
contentBOX.addEventListener('change', () => {
    let inputBOX = contentBOX.value;
    // console.log(inputBOX)
    if (inputBOX.length > 0) {
        let categoriesData = categoryData(inputBOX, ProductArray);
        fetchData(categoriesData);
    } else {
        fetchData();
    }
})


function categoryData(category, categoryFilterData) {
    let categoriesFilterData = [];
    console.log(category)

    for (let val of categoryFilterData[0]) {
        let categoryName = val.category;

        if (categoryName == category) {
            categoriesFilterData.push(val);
        }
        
    }

    return categoriesFilterData;
}

