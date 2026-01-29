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

console.log("js console");
let data;
let grid = document.querySelector(".grid");
let Form = document.querySelector("form");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (){
 if (xhttp.readyState === 4 && xhttp.status === 200){
         data = JSON.parse(xhttp.responseText);
         console.log(data);
         data.forEach(function(song){
            let card = document.createElement("div");
            card.classList.add("card");

            let textData = 
            "<div class='song-title'>"+ song.title + "</div>" + 
            "<span>"+
            "Artist: " + song.artist + "<br>" +
            "Genre: " + song.genre + "<br>" +
            "Image Source: " + song.imgSrc + "<br>" +
            "</span>";

        card.innerHTML = textData;
        if (song.imgSrc){
            card.style.backgroundImage = "url("+ song.imgSrc +")";
        }
        grid.appendChild(card);

        });
    }
};
 xhttp.open("GET", "music.json", true);
xhttp.send();

Form.addEventListener("submit", function(e){
    e.preventDefault();
    let title = titleInput.value;
    let artist = artistInput.value;
    let genre = genreInput.value;
    let imgSrc = imgSrcInput.value;

    let newSong = {
        "id": getNextId(),
        "title": title,
        "artist": artist,
        "genre": genre,
        "imgSrc": imgSrc
    };
    submitData(newSong);
    Form.reset();
});