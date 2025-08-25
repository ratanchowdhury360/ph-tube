console.log("video script added");
//1 fetch,Load and show Chetagories on html

//crae loadCategories

const loadCategories = () =>{
   // console.log("loadCategories is connected");
      //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error)=> console.log(error))
};



const displayCategories = (data) =>{
  //  console.log( "displayCategories is connected");
  console.log(data)
};
 
loadCategories()
displayCategories()