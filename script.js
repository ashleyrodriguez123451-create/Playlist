// console.log("js console");
// var xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function (){
//     if (xhttp.readyState === 4 && xhttp.status === 200){
//         let songs = JSON.parse(xhttp.responseText);
//         console.log(songs[0].title);
//         console.log(songs[1].artist);
//         songs.forEach((song) => {
//             console.log(song);
// });
//     }
// };
// xhttp.open("GET","music.json",true);
// xhttp.send();

// console.log("js console");
// let data;
// let grid = document.querySelector(".grid");
// let Form = document.querySelector("form");

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function (){
//  if (xhttp.readyState === 4 && xhttp.status === 200){
//          data = JSON.parse(xhttp.responseText);
//          console.log(data);
//          data.forEach(function(song){
//             let card = document.createElement("div");
//             card.classList.add("card");

//             let textData = 
//             "<div class='song-title'>"+ song.title + "</div>" + 
//             "<span>"+
//             "Artist: " + song.artist + "<br>" +
//             "Genre: " + song.genre + "<br>" +
//             "Image Source: " + song.imgSrc + "<br>" +
//             "</span>";

//         card.innerHTML = textData;
//         if (song.imgSrc){
//             card.style.backgroundImage = "url("+ song.imgSrc +")";
//         }
//         grid.appendChild(card);

//         });
//     }
// };
//  xhttp.open("GET", "music.json", true);
// xhttp.send();

// Form.addEventListener("submit", function(e){
//     e.preventDefault();
//     let title = titleInput.value;
//     let artist = artistInput.value;
//     let genre = genreInput.value;
//     let imgSrc = imgSrcInput.value;

//     let newSong = {
//         "id": getNextId(),
//         "title": title,
//         "artist": artist,
//         "genre": genre,
//         "imgSrc": imgSrc
//     };
//     submitData(newSong);
//     Form.reset();
// });
console.log("js started");

var data;
var grid = document.querySelector(".grid-container");

// LOAD DATA (localStorage first, otherwise XHR)
if (localStorage.getItem("datalist")) {
  data = JSON.parse(localStorage.getItem("datalist"));
  console.log("Loaded from localStorage");
  if (grid) {
    makeCards();
  }
} else {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      console.log("Loaded from music.json");

      localStorage.setItem("datalist", JSON.stringify(data));
      console.log("Saved starter data to localStorage");

      if (grid) {
        makeCards();
      }
    }
  };

  xhttp.open("GET", "music.json", true);
  xhttp.send();
}

// RENDER CARDS
function makeCards() {
  grid.innerHTML = "";

  data.forEach(function (song) {
    let card = document.createElement("div");
    card.classList.add("card");

    let textData =
      "<div class='song-title'>" + song.title + "</div>" +
      "<div>Genre: " + song.genre + "</div>" +
      "<div>Artist: " + song.artist + "</div>" +
      "<div>"+song.image +"</div>";


    card.innerHTML = textData;
    grid.appendChild(card);
  });

  console.log("cards refreshed");
}
var form = document.querySelector("form");
var titleInput = document.querySelector("#title");
var genreInput = document.querySelector("#genre");
var artistInput = document.querySelector("#artist");
fetch('images.json')
    .then(response => response.json())
    .then(data => {
        // Loop through the array of image objects
        data.forEach(imageObj => {
            // Get the target div using its ID
            const targetDiv = document.getElementById(imageObj.id);

            if (targetDiv) {
                // Create a new image element
                const imgElement = document.createElement('img');
                
                // Set the src and alt attributes from the JSON data
                imgElement.src = imageObj.imageUrl;
                imgElement.alt = imageObj.altText;

                // Append the image element to the div
                targetDiv.appendChild(imgElement);
            }
        });
    })
    .catch(error => console.error('Error fetching images:', error));


form.addEventListener("submit", function (e) {
  e.preventDefault();

  var newObj = {
    title: titleInput.value,
    genre: genreInput.value,
    artist: artistInput.value
    
  };

  data.push(newObj);
  localStorage.setItem("datalist", JSON.stringify(data));
  console.log("Saved new item to localStorage");

  // Only render if grid exists on this page
  if (document.querySelector(".grid-container")) {
    makeCards();
  }

  form.reset();
});


