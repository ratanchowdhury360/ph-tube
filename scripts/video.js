console.log("video script added");

//time converter function
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  const second = remainingSecond;
  return `${hour} hour ${minute} min ${second} sec ago`;
}




//1 fetch,Load and show Chetagories on html

//create loadCategories

const loadCategories = () => {
  // console.log("loadCategories is connected");
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
};

const removreActiveClass = () => {
  const button = document.getElementsByClassName("category-btn");
  for (const btn of button) {
    btn.classList.remove("active"); //, "bg-red-500", "text-white");
  }
}


const loadVideos = (searchText = "") => {
  // console.log("loadCategories is connected");
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
};

const loadCategoryVideos = (id) => {
  //alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

      //remobe active class from all buttons
      removreActiveClass();
      //active class is added when a button is clicked

      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active"); //, "bg-red-500", "text-white");
      displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}

const loadDetails = async (videoid) => {
  console.log(videoid);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayDetsils(data.video)
}
const displayDetsils = (video) => {
  console.log(video);
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
  <img src=${video.thumbnail}  />
  <p class="font-bold text-lg my-2">${video.title}</p>
  <p> ${video.description} </p>
  `
  //way 1
  //document.getElementById("showModalData").click();

  //way 2
  document.getElementById("customModal").showModal();
}

const displayVideos = (videos) => {
  // console.log(videos)
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `<div class="min-h-[300px] flex flex-col gap-5 justify-center items-center"> <img src="assets/Icon.png" />
     <h2 class="text-2xl font-bold">No videos found</h2>
    </div>`;

  } else {
    videoContainer.classList.add("grid");
  }


  videos.forEach(video => {
    console.log(video);
    //create a card for each video
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    
     <figure class="h-[200px]" relative>
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length == 0 ? "" : ` <span class="absolute text-xs  bottom-20 right-2 bg-black text-white  rounded p-1">${getTimeString(video.others.posted_date)
        }</span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-3">
    <div>
    <img src =${video.authors[0].profile_picture} class="w-10 h-10 rounded-full" object-cover />
    </div>
    <div>
    <h2 class="card-title text-sm font-bold">${video.title}</h2>
    <div class="flex gap-1 items-center">
      <p class="text-xs text-gray-500">${video.authors[0].profile_name}</p>
      ${video.authors[0].verified == true ? `<img class="w-5"  src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ``}
      
    </div>
    <p> <button onclick="loadDetails('${
      video.video_id
      }')" class="btn btn-sm btn-error">details </button>  </p>

    </div



    </div>
  </div>
  `;

    videoContainer.append(card);

  });
};


//   {
//     "category_id": "1001",
//     "category": "Music"
// }

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }



const displayCategories = (categories) => {
  //  console.log( "displayCategories is connected");
  // console.log(data)
  const categoriesContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    //create a button for each category
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class ="btn category-btn">
      ${item.category}  
      </button>
   `;

    //add button to the categories container
    categoriesContainer.append(buttonContainer);

  });
};

//search functionality
document.getElementById("search-input").addEventListener("keyup", (e) => {
   loadVideos(e.target.value);
});
loadCategories()
loadVideos()


