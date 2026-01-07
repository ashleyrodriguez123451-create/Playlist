console.log("js console");
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function (){
    if (xhttp.readyState === 4 && xhttp.status === 200){
        let songs = JSON.parse(xhttp.responseText);
        console.log(songs[0].title);
        console.log(songs[1].artist);
        songs.forEach((song) => {
            console.log(song);
});
    }
};
xhttp.open("GET","music.json",true);
xhttp.send();