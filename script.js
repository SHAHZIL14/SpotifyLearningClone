let currenSong = new Audio();
let currenSong_index;
let songName = document.getElementById("song-name");
let current_song_li;
let song_percentage;
let current_card;
let resultant = [];
let current_likes;
let sorted;
let last;
let current_src;
let topResult;
let filteredItems = [];
let topArtists = [];
let current_id;
let src_arr = [];
let current_gaana;
let artist_arr = [];
let artist_array = Array.from(document.getElementsByClassName("artist-card"));
let matchedartist = [];
let random_red;
let random_green;
let random_blue;
let recentPlayedArray = [];
let recentlist = [];

let song_cardsss = (Array.from(document.getElementsByClassName("main-content-section")[0].getElementsByClassName("song-card")));
console.log(song_cardsss);
song_cardsss.forEach((element) => {
    recentPlayedArray.push(element.getElementsByClassName("song-details")[0].getElementsByClassName("artist-name")[0].getElementsByTagName("span")[1].getAttribute("id"));
})
console.log(recentPlayedArray);


let loop = 0;

(Array.from(document.getElementsByClassName("song-card"))).forEach((element) => {
    src_arr.push(element.firstElementChild.src);
});
(Array.from(document.getElementsByClassName("song-card"))).forEach((element) => {
    artist_arr.push(element.getElementsByClassName("song-details")[0].getElementsByClassName("artist-name")[0].firstElementChild.innerHTML);
});
// console.log(artist_arr);
let play = document.getElementsByClassName("Play")[0];
async function getSongs() {
    let fetched = await fetch("Songs");
    let parsed = await fetched.text();
    let div = document.createElement("div");
    div.innerHTML = parsed;
    let allA = div.getElementsByTagName('a');
    let songs = [];
    for (let index = 0; index < allA.length; index++) {
        const element = allA[index];
        if (element.href.endsWith("mp3")) {
            let first_song = `${element.href}`;
            let songfilterone = first_song.split("/");
            // console.log(songfilterone)
            let songfiltertwo = songfilterone[4].replaceAll("%20", " ");
            // console.log(songfiltertwo);
            let songfilterthree = songfiltertwo.replaceAll("%", "");
            // console.log(songfilterthree)
            let songfilterfour = songfilterthree.split("_")[0];
            // console.log(songfilterfour)
            songs.push(songfilterfour);
        }
    }
    // console.log(songs);
    return songs;
}


function PlaySong(track) {
    currenSong.src = "songs/" + track;
    currenSong.play();

}



async function main() {
    // songName.innerHTML = "No Song Loaded"
    // songName.outerHTML = "No Song Loaded"
    document.getElementById("song-about").innerHTML = "NO SONG LOADED !!!!"
    let songs = await getSongs();
    console.log(songs);

    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    // for (const song of songs) {
    //     songul.innerHTML = songul.innerHTML + `<li id = 'song'> ${song.replaceAll("%20%", "")}</li>`;

    // }
    for (let index = 0; index < songs.length; index++) {
        songul.innerHTML = songul.innerHTML + `<li >
        <div class="info">
        
        <div class="song-name">${((songs[index].replaceAll("%20%", "   "))).split(".")[0]} </div>
        
    </div>
    <div class="playbutton"><img class="svgs-new" src="/Other resources/SVGS/play-circle-svgrepo-com.svg" alt=""></div>
        </li>`;
        songul.getElementsByTagName('li')[index].setAttribute("id", `${index}`);
        songul.getElementsByTagName('li')[index].setAttribute("class", `song`);
    }
    // console.log(songs);

    var songlist_array = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));
    // console.log(songlist_array);
    var songlist_array_length = songlist_array.length;
    // console.log(songlist_array_length);
    songlist_array.forEach((e) => {
        e.addEventListener("click", element => {

            if (current_song_li != null) {
                current_song_li.classList.remove("selected-list");
            }
            document.getElementById(`${e.getAttribute("id")}`).classList.add("selected-list");
            if (current_card != null) {
                current_card.classList.remove("selected-card");
            }

            if (currenSong_index != null) {
                document.getElementById(`${currenSong_index}`).removeAttribute("class", "selected");
                document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
            }
            currenSong_index = e.getAttribute('id');
            console.log("currensongindex", currenSong_index)
            console.log(currenSong_index);
            let src = `${e.querySelector(".info").firstElementChild.innerHTML.trim()}.mp3`;
            current_src = src;
            console.log(src);
            PlaySong(src);

            for (let index = 0; index < recentPlayedArray.length; index++) {
                if (song_cardsss[index].getElementsByClassName("song-details")[0].getElementsByClassName("artist-name")[0].getElementsByTagName("span")[1].getAttribute("id") == currenSong_index) {
                    if (!recentlist.includes(song_cardsss[index])) {
                        if (recentlist.length < 6) {
                            recentlist.push(song_cardsss[index]);

                        }
                        else {
                            recentlist[0] = recentlist[1];
                            recentlist[1] = recentlist[2];
                            recentlist[2] = recentlist[3];
                            recentlist[3] = recentlist[4];
                            recentlist[4] = recentlist[5];
                            recentlist[5] = song_cardsss[index];
                        }
                    }

                }

            }
            document.getElementsByClassName("recent-container")[0].innerHTML = '';
            document.getElementsByClassName("recent-container")[0].style.justifyContent = 'flex-start';
            for (let index = 0; index < recentlist.length; index++) {
                Card_maker(recentlist[index]);
            }

            if (currenSong_index != null) {
                current_id = (e.id);
                document.getElementById("song-about").innerHTML = `  <div id="song-name">
                <div class="poster"><img class="svgs1" src="${src_arr[current_id]}" alt=""></div>
                <div class="content">
                    <div class="song-name-poster">${e.querySelector(".info").firstElementChild.innerHTML.trim()}</div>
                    <div class="artist-name-poster">${artist_arr[current_id]}</div>
                </div>
            </div>`
            }


            let playbutton = e.lastElementChild.firstElementChild;
            playbutton.style.filter = "invert(1)";
            // console.log("e=",playbutton);
            playbutton.src = 'Other resources/SVGS/pause-stroke-rounded.svg';
            // console.log(playbutton.firstElementChild);
            play.firstElementChild.src = 'Other resources/SVGS/pause-stroke-rounded.svg';
            e.classList.toggle("selected");
            return currenSong_index;
        })
    })
    // duration and time //

    currenSong.addEventListener("timeupdate", () => {
        function secondsToMinutes(seconds) {
            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        song_percentage = (currenSong.currentTime / currenSong.duration);
        // console.log(song_percentage);
        if (song_percentage == 1) {

            for (let index = 0; index < 10; index++) {
                if (loop == 1) {
                    PlaySong(current_src);
                    let playpause = document.getElementsByClassName("Play")[0];
                    playpause.firstElementChild.src = " Other resources/SVGS/pause-stroke-rounded.svg";
                    document.getElementById(`${currenSong_index}`).setAttribute("class", "selected");
                    // current_card.classList.add("selected-card");
                    document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";

                    index++;
                }
                else {
                    let playpause = document.getElementsByClassName("Play")[0];
                    playpause.firstElementChild.src = " Other resources/SVGS/play-stroke-rounded.svg";
                    document.getElementById(`${currenSong_index}`).removeAttribute("class", "selected");
                    document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
                    if (current_song_li != null) {
                        current_song_li.classList.remove("selected-list");

                    }
                    if (current_card != null) {
                        current_card.classList.remove("selected-card");

                    }

                    break;
                }
            }



        }
        const parentElementWidth = document.getElementsByClassName('seekbar')[0].offsetWidth;
        const childElement = document.getElementById('seek-rocker');
        const percentageWidth = song_percentage;
        // console.log(song_percentage);

        // Set the width of the child element in terms of percentage of its parent element

        childElement.style.width = `${(parentElementWidth * percentageWidth) / 4.57888}%`;
        // console.log(childElement.style.width = `${(parentElementWidth * percentageWidth) / 4.788}%`);
        if (song_percentage == 1) {
            childElement.style.width = "0px";
        }
        let current_time = (secondsToMinutes(currenSong.currentTime).toString()).split('.')[0];
        let current_duration = (secondsToMinutes(currenSong.duration).toString()).split('.')[0];

        document.getElementById('current-time').innerHTML = current_time;
        document.getElementById('current-duration').innerHTML = current_duration;
    })


    play.addEventListener('click', () => {
        if (currenSong.paused) {
            currenSong.play();
            let playbutton = document.getElementById(`${currenSong_index}`).lastElementChild;
            play.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
            playbutton.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg"
        }
        else {
            currenSong.pause();
            let playbutton = document.getElementById(`${currenSong_index}`).lastElementChild;
            play.firstElementChild.src = "/Other resources/SVGS/play-stroke-rounded.svg";
            console.log(playbutton)
            playbutton.firstElementChild.src = "/Other resources/SVGS/play-stroke-rounded.svg";
        }
    })


    // previous button//

    let previous = document.getElementsByClassName("previous")[0];
    previous.addEventListener("click", () => {


        if (currenSong_index != 0) {
            let currenSong_class = document.getElementById(`${currenSong_index}`);
            currenSong_class.lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
            currenSong_class.removeAttribute("class", 'selected');
            currenSong_index--;
            currenSong_class = document.getElementById(`${currenSong_index}`);
            currenSong_class.lastElementChild.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
            currenSong_class.setAttribute("class", 'selected');
            prev_li = document.getElementById(`${currenSong_index}`);
            let new_src = `${prev_li.querySelector('.info').firstElementChild.innerHTML.trim()}.mp3`;
            PlaySong(new_src);
            songName.innerHTML = `Playing:` + new_src;
            console.log("curren-song-index", currenSong_index);
            play.firstElementChild.src = "/Other resources/SVGS/pause-stroke-rounded.svg";
            if (currenSong_index != null) {
                current_id = (currenSong_index);
                document.getElementById("song-about").innerHTML = `  <div id="song-name">
                <div class="poster"><img class="svgs1" src="${src_arr[current_id]}" alt=""></div>
                <div class="content">
                    <div class="song-name-poster">${prev_li.querySelector(".info").firstElementChild.innerHTML.trim()}</div>
                    <div class="artist-name-poster">${artist_arr[current_id]}</div>
                </div>
            </div>`}
        }

        else {
            prev_li = document.getElementById(`${currenSong_index}`);
            let new_src = `${prev_li.querySelector('.info').firstElementChild.innerHTML.trim()}.mp3`;
            PlaySong(new_src);
            console.log("prev sorry")
        }

    })
    // previous button//

    // next button//

    let next = document.getElementsByClassName("Next")[0];
    next.addEventListener("click", () => {
        if (currenSong_index < songlist_array_length) {
            let currenSong_class = document.getElementById(`${currenSong_index}`);
            console.log(currenSong_class);
            currenSong_class.removeAttribute("class", 'selected')
            currenSong_class.lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
            currenSong_index++;
            currenSong_class = document.getElementById(`${currenSong_index}`);
            console.log(currenSong_class);
            currenSong_class.setAttribute("class", 'selected')
            currenSong_class.lastElementChild.firstElementChild.src = "/Other resources/SVGS/pause-stroke-rounded.svg";
            let next_li = document.getElementById(`${currenSong_index}`);
            let new_src = `${next_li.querySelector(".info").firstElementChild.innerHTML.trim()}.mp3`;
            PlaySong(new_src);
            songName.innerHTML = `Playing:` + next_li.querySelector(".info").firstElementChild.innerHTML.trim();
            console.log("curren-song-index", currenSong_index);
            play.firstElementChild.src = "/Other resources/SVGS/pause-stroke-rounded.svg";
            if (currenSong_index != null) {
                current_id = (currenSong_index);
                document.getElementById("song-about").innerHTML = `  <div id="song-name">
                <div class="poster"><img class="svgs1" src="${src_arr[current_id]}" alt=""></div>
                <div class="content">
                    <div class="song-name-poster">${next_li.querySelector(".info").firstElementChild.innerHTML.trim()}</div>
                    <div class="artist-name-poster">${artist_arr[current_id]}</div>
                </div>
            </div>`
            }
        }
        else {
            let next_li = document.getElementById(`${currenSong_index}`);
            let new_src = `${next_li.querySelector(".info").firstElementChild.innerHTML.trim()}.mp3`;
            PlaySong(new_src);
        }
    })



    // next button//

    // seekbar-navigation//

    let seekbar = document.getElementsByClassName("seekbar")[0];

    seekbar.addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        currenSong.currentTime = (((currenSong.duration) * percent) / 100);
    })


    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    // output.innerHTML = slider.value;

    slider.oninput = function () {
        //   output.innerHTML = this.value;
        console.log(slider.value);
        currenSong.volume = slider.value / 100;
    }

}



let PlayNow = document.getElementsByClassName("Play-now");
let PlayNowArray = Array.from(PlayNow);
// console.log("playnowarray=", PlayNowArray);
PlayNowArray.forEach((e) => {
    e.addEventListener("click", () => {

        if (current_card != null) {
            current_card.classList.remove("selected-card");
        }
        current_card = e.parentElement.parentElement.parentElement;
        current_card.classList.add("selected-card");
        if (currenSong_index != null) {
            document.getElementById(`${currenSong_index}`).removeAttribute("class", "selected");
            document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
        }
        currenSong_index = e.getAttribute("id");
        document.getElementById(`${currenSong_index}`).setAttribute("class", "selected");
        if (current_song_li != null) {
            current_song_li.removeAttribute("class", "selected-list");
        }
        currrent_li = document.getElementById(e.getAttribute("id"));
        // console.log(currrent_li);
        let src = `${currrent_li.querySelector(".info").firstElementChild.innerHTML.trim()}.mp3`;
        current_src = src;
        // console.log(src);
        PlaySong(src);

        if (song_percentage == 1) {

            for (let index = 0; index < 10; index++) {
                if (loop == 1) {
                    PlaySong(current_src);
                    let playpause = document.getElementsByClassName("Play")[0];
                    playpause.firstElementChild.src = " Other resources/SVGS/pause-stroke-rounded.svg";
                    document.getElementById(`${currenSong_index}`).setAttribute("class", "selected");
                    document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
                    index++;
                }
                else {
                    let playpause = document.getElementsByClassName("Play")[0];
                    playpause.firstElementChild.src = " Other resources/SVGS/play-stroke-rounded.svg";
                    document.getElementById(`${currenSong_index}`).removeAttribute("class", "selected");
                    document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
                    break;
                }
            }

        }




        if (currenSong_index != null) {
            current_id = (e.getAttribute("id"));
            document.getElementById("song-about").innerHTML = `  <div id="song-name">
            <div class="poster"><img class="svgs1" src="${src_arr[current_id]}" alt=""></div>
            <div class="content">
                <div class="song-name-poster">${currrent_li.querySelector(".info").firstElementChild.innerHTML.trim()}</div>
                <div class="artist-name-poster">${artist_arr[current_id]}</div>
            </div>
        </div>`
        }
        play.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
        let playbutton = document.getElementById(`${currenSong_index}`).lastElementChild;
        playbutton.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg"
    })
})

const searching = () => {

    let input = document.getElementById('searchbox').value;
    input = input.toLowerCase()
    // console.log("first char = ", input.charAt(0));
    if (input && input.trim().length > 0) {
        document.getElementById("searchup").style.display = 'flex';

    }
    else {
        document.getElementById("searchup").style.display = "none";
    }

    let x = document.getElementsByClassName('song-card');
    let song_card_likes = [21, 18, 20];
    let y = document.getElementsByClassName("card-list-li");

    let z = document.getElementsByClassName("artist-card");

    for (i = 0; i < y.length; i++) {

        if (input && input.trim().length > 0) {
            document.getElementsByClassName("main-content")[0].style.display = "flex"
            document.getElementsByClassName("artist-card-section")[0].style.display = "block";
            document.getElementById("default").style.display = 'none';
            if (y[i].firstElementChild.getElementsByClassName("card-list-details")[0].firstElementChild.innerHTML.toLowerCase().includes(input)) {
                y[i].style.display = "flex";
                document.getElementsByClassName("unavailable")[1].style.display = "none"
                // console.log("matched")
            }
            else {
                y[i].style.display = "none";
            }
        }
        else {
            document.getElementsByClassName("main-content")[0].style.display = "none"
            document.getElementsByClassName("artist-card-section")[0].style.display = "none";
            document.getElementById("default").style.display = 'block';
            y[i].style.display = "none";
        }
    }



    let searchText = input.trim();
    let card_array = Array.from(x);
    // console.log(card_array);
    filteredItems = card_array.filter((element) => {
        return element.getElementsByClassName("song-details")[0].firstElementChild.innerHTML.toLowerCase().startsWith((searchText.toLowerCase()));
    })
    topResult = filteredItems.sort()[0];
    card_array.forEach((e) => {
        e.style.display = "none";
    })
    if (topResult != null) {
        console.log("matching");
        console.log("topresult=", topResult)
        topResult.style.display = "block";
        document.getElementsByClassName("main-content")[0].style.display = "flex";
        document.getElementsByClassName("unavailable")[0].style.display = "none"
        document.getElementsByClassName("main-content-section")[0].style.display = "block";
        document.getElementsByClassName("main-content-section")[1].style.display = "block";
        document.getElementsByClassName("top-result")[0].getElementsByTagName('h2')[0].style.display = "block";
        document.getElementsByClassName("songs")[0].getElementsByTagName("h2")[0].style.display = "block";
    }

    else {
        console.log("no matching")
        for (let index = 0; index < x.length; index++) {
            current_gaana = (x[index].getElementsByClassName("song-details")[0].firstElementChild.innerHTML.toLowerCase())
            if (current_gaana.includes(input)) {
                console.log("pushing")
                filteredItems.push(x[index])

            }
        }
        if (filteredItems.length != 0) {
            console.log("if worked");
            filteredItems[0].style.display = 'block';
            document.getElementsByClassName("top-result")[0].getElementsByTagName('h2')[0].style.display = "block";
            document.getElementsByClassName("songs")[0].getElementsByTagName("h2")[0].style.display = "block";
            document.getElementsByClassName("unavailable")[0].style.display = "none"
        }
        else {
            console.log("else worked")
            document.getElementsByClassName("main-content")[0].style.display = "none";
            document.getElementsByClassName("top-result")[0].getElementsByTagName('h2')[0].style.display = "none";
            document.getElementsByClassName("songs")[0].getElementsByTagName("h2")[0].style.display = "none";
            document.getElementsByClassName("unavailable")[0].style.display = "flex"
            document.getElementsByClassName("main-content-section")[0].style.display = "none";
            document.getElementsByClassName("main-content-section")[1].style.display = "none";
        }

    }

    const filteredArtist = artist_array.filter((element) => {
        return element.getElementsByClassName("text")[0].firstElementChild.innerHTML.toLocaleLowerCase().includes((searchText.toLowerCase()));
    })
    console.log("filteredartist=", filteredArtist)
    if (filteredArtist != null) {
        topArtists = filteredArtist.sort();
    }

    artist_array.forEach((e) => {
        e.style.display = "none";
        console.log("worked");
    })

    if (input && input.trim().length > 0) {
        console.log("topartist=", topArtists);

        if (topArtists.length != 0) {
            console.log("not zero")
            for (let index = 0; index < topArtists.length; index++) {
                document.getElementsByClassName("artist-card-section")[0].getElementsByTagName("h2")[0].style.display = "block"
                topArtists[index].style.display = "block"

            }

        }
        else {
            console.log("zero")
            for (let index = 0; index < 5; index++) {
                artist_array[index].style.display = "block";
                document.getElementsByClassName("artist-card-section")[0].getElementsByTagName("h2")[0].style.display = "block"
            }
        }

    }
    else {

        artist_array.forEach((e) => {
            document.getElementsByClassName("artist-card-section")[0].getElementsByTagName("h2")[0].style.display = "none"
            e.style.display = "none";
            console.log("worked");
        })


    }

}


let card_list_li = document.getElementsByClassName("card-list-li");
Array.from(card_list_li).forEach((e) => {
    e.addEventListener("click", () => {

        if (current_card != null) {
            current_card.classList.remove("selected-card");
        }

        if (currenSong_index != null) {
            document.getElementById(`${currenSong_index}`).removeAttribute("class", "selected");
            document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
        }
        currenSong_index = e.getAttribute("id");
        document.getElementById(`${currenSong_index}`).setAttribute("class", "selected");
        document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
        if (current_song_li != null) {
            current_song_li.classList.remove("selected-list");
        }
        current_song_li = e;
        current_li = document.getElementById(currenSong_index);
        console.log("currentli=", current_li);
        let src = `${current_li.querySelector(".info").firstElementChild.innerHTML.trim()}.mp3`;
        current_src = src;

        console.log(src);
        PlaySong(src);
        if (!recentPlayedArray.includes(e.getAttribute("id"))) {
            recentPlayedArray.push(e.getAttribute("id"));
        }

        if (song_percentage == 1) {

            for (let index = 0; index < 10; index++) {
                if (loop == 1) {
                    PlaySong(current_src);
                    let playpause = document.getElementsByClassName("Play")[0];
                    playpause.firstElementChild.src = " Other resources/SVGS/pause-stroke-rounded.svg";
                    document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
                    index++;
                }
                else {
                    let playpause = document.getElementsByClassName("Play")[0];
                    playpause.firstElementChild.src = " Other resources/SVGS/play-stroke-rounded.svg";
                    document.getElementById(`${currenSong_index}`).removeAttribute("class", "selected");
                    document.getElementById(`${currenSong_index}`).lastElementChild.firstElementChild.src = "/Other resources/SVGS/play-circle-svgrepo-com.svg";
                    current_song_li.classList.remove("selected-list");
                    break;
                }
            }



        }



        if (currenSong_index != null) {
            current_id = (e.id);
            document.getElementById("song-about").innerHTML = `  <div id="song-name">
            <div class="poster"><img class="svgs1" src="${src_arr[current_id]}" alt=""></div>
            <div class="content">
                <div class="song-name-poster">${current_li.querySelector(".info").firstElementChild.innerHTML.trim()}</div>
                <div class="artist-name-poster">${artist_arr[current_id]}</div>
            </div>
        </div>`
        }

        play.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg";
        let playbutton = document.getElementById(`${currenSong_index}`).lastElementChild;
        playbutton.firstElementChild.src = "Other resources/SVGS/pause-stroke-rounded.svg"
        current_song_li.classList.add("selected-list");
    })
})

let song_card_array = Array.from(document.getElementsByClassName("song-card"));
song_card_array.forEach((card) => {
    card.addEventListener("mouseover", () => {
        card.getElementsByClassName("song-details")[0].getElementsByClassName("artist-name")[0].getElementsByTagName("span")[1].style.display = "inline";
    })

    card.addEventListener("mouseout", () => {
        card.getElementsByClassName("song-details")[0].getElementsByClassName("artist-name")[0].getElementsByTagName("span")[1].style.display = "none";
    })
})

const coloring = (array) => {
    array.forEach((element) => {
        random_red = Math.random() * 100;
        random_green = Math.random() * 100;
        random_blue = Math.random() * 100;
        element.style.background = `rgb(${random_red}, ${random_green}, ${random_blue})`;
    })
}

function playloop(src) {
    PlaySong(src);
    if (looping == 1) {
        console.log("if worked")
        playloop();
    }
    console.log("func terminated");
}
let artist_url = [
    "Other resources/artists/anirudh ravichander.jpeg", "Other resources/artists/arijit.jpeg", "Other resources/artists/darshan.jpeg", "Other resources/artists/jonita.jpeg", "Other resources/artists/download.jpeg", "Other resources/artists/raaghav.jpeg", "Other resources/artists/king.jpeg", "Other resources/artists/vishaal.jpeg", "Other resources/artists/shreya.jpg"
]

Array.from(document.getElementsByClassName("made_poster")).forEach((element) => {
    element.style.background = `url("${artist_url[(Math.floor(Math.random() * artist_url.length))]}"`;
    element.style.backgroundPosition = "center";
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundSize = "cover";
})


let browse_cards = Array.from(document.getElementsByClassName("browse-all-cards"));
coloring(browse_cards);
main();

document.getElementsByClassName("loop1")[0].addEventListener("click", (element) => {
    if (loop != 0) {
        loop = 0;
        document.getElementsByClassName("loop1")[0].style.filter = "invert(1)";

    }
    else {
        loop = 1;
        document.getElementsByClassName("loop1")[0].style.filter = "contrast(0.0000001)";

    }
    console.log(loop);
})

// song-card-function//

function Card_maker(card) {
    console.log(card);
    let src = card.getElementsByTagName("img")[0].src;
    let song_name = card.getElementsByClassName("song-details")[0].getElementsByClassName("gaane")[0].innerHTML;
    let singer_name = card.getElementsByClassName("song-details")[0].getElementsByClassName("artist-name")[0].getElementsByTagName("span")[0].innerHTML;
    let song_card = document.createElement("div");
    song_card.setAttribute("class", "song-card-div");
    song_card.innerHTML += `<div class="song-carding">

    <div class="poster-song"><img src="${src}" alt=""></div>
    <div class="about-song-card">${song_name}</div>
<div class ="singer-name">${singer_name}</div>
  </div>`;
    document.getElementsByClassName("recent-container")[0].prepend(song_card);
}
let besharam_rang_card = document.getElementById("3").parentElement.parentElement.parentElement;
let chaleya = document.getElementById("6").parentElement.parentElement.parentElement;

document.getElementsByClassName("home")[0].addEventListener("click", () => {
    document.getElementsByClassName("home-page")[0].style.display = "block";
    document.getElementsByClassName("home")[0].style.color = "#169b3a";
    document.getElementsByClassName("search-html")[0].style.display = "none";
    document.getElementsByClassName("search")[0].style.color = "#b3b3b3";
})

document.getElementsByClassName("search")[0].addEventListener("click", () => {
    document.getElementsByClassName("home-page")[0].style.display = "none";
    document.getElementsByClassName("home")[0].style.color = "#b3b3b3";
    document.getElementsByClassName("search-html")[0].style.display = "block";
    document.getElementsByClassName("search")[0].style.color = "#169b3a";
})



// Card_maker(document.getElementById("3").parentElement.parentElement.parentElement);
// Card_maker(chaleya);

