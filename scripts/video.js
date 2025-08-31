console.log("video script added");
//1 fetch,Load and show Chetagories on html

//create loadCategories

const loadCategories = () =>{
   // console.log("loadCategories is connected");
      //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error)=> console.log(error))
};


 
//   {
//     "category_id": "1001",
//     "category": "Music"
// }



const displayCategories = (categories) =>{
  //  console.log( "displayCategories is connected");
 // console.log(data)
  const categoriesContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    //create a button for each category
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    //add button to the categories container
    categoriesContainer.append(button);
    
  });
};
 
loadCategories() 

