// INITIAL DATA
var musicList = [
    {
        songName: "No Role Modelz",
        albumCover: "./images/norolemodelz.png",
        artistName: "J. Cole",
        year: 2014,
        like: true
    },
    {
        songName: "Candy Shop",
        albumCover: "./images/candyshop.jpg",
        artistName: "50 Cent",
        year: 2005,
        like: false
    },
    {
        songName: "Robbers",
        albumCover: "./images/robbers.jpg",
        artistName: "The 1975",
        year: 2013,
        like: false
    },
    {
        songName: "Jumpman",
        albumCover: "./images/jumpman.jpg",
        artistName: "Drake",
        year: 2015,
        like: false
    },
    {
        songName: "Bohemian Rhapsody",
        albumCover: "./images/bohemianrhapsody.jpg",
        artistName: "Queen",
        year: 1975,
        like: false
    },
    {
        songName: "Pumped Up Kicks",
        albumCover: "./images/pumpedupkicks.jpg",
        artistName: "Foster The People",
        year: 2023,
        like: true
    },
    {
        songName: "Highest In the Room",
        albumCover: "./images/highestintheroom.jpg",
        artistName: "Travis Scott",
        year: 2020,
        like: false
    },
    {
        songName: "Lemons",
        albumCover: "./images/lemons.jpg",
        artistName: "Rihanna",
        year: 2017,
        like: false
    },
    {
        songName: "Come As You Are",
        albumCover: "./images/comeasyouare.jpg",
        artistName: "Nirvana",
        year: 1991,
        like: false
    },
    {
        songName: "RED",
        albumCover: "./images/red.jpg",
        artistName: "Taylor Swift",
        year: 2012,
        like: false
    },
    {
        songName: "HUMBLE",
        albumCover: "./images/humble.jpg",
        artistName: "Kendrick Lamar",
        year: 2017,
        like: true
    },
    {
        songName: "Save Your Tears",
        albumCover: "./images/saveyourtears.jpg",
        artistName: "The Weeknd",
        year: 2020,
        like: false
    },
    {
        songName: "Money In The Grave",
        albumCover: "./images/moneyinthegrave.jpg",
        artistName: "Drake",
        year: 2019,
        like: false
    },
    {
        songName: "Stronger",
        albumCover: "./images/stronger.jpg",
        artistName: "Kanye West",
        year: 2007,
        like: false
    },
    {
        songName: "Billie Jean",
        albumCover: "./images/billiejean.jpg",
        artistName: "Michael Jackson",
        year: 1982,
        like: true
    }
]

//USING LOCAL STORAGE
if (!localStorage.getItem('musicList')) {
    localStorage.setItem('musicList', JSON.stringify(musicList));
}
var mList = JSON.parse(localStorage.getItem('musicList'));


//LIKE FUNCTION

function clickedlike(x, y) {
    if (mList[y].like == true) {
        x.classList.remove("fa-heart")
        x.classList.add("fa-heart-o")
    }
    else {
        x.classList.remove("fa-heart-o")
        x.classList.add("fa-heart")
    }
    mList[y].like = !mList[y].like;
    localStorage.setItem('musicList', JSON.stringify(mList));
}



//DISPLAY ALL

function display() {
    var heart;
    table.innerHTML = "";
    for (var i in mList) {
        if (mList[i].like == true) {
            heart = `<i onclick="clickedlike(this,${i});" class=" jix fa fa-heart"></i>`;
        }
        else {
            heart = `<i onclick="clickedlike(this,${i});" class=" jix fa fa-heart-o"></i>`;
        }
        table.innerHTML += `<tr>
    <td class="album"><img width="70px" style="border-radius:50%" src="${mList[i].albumCover}" alt=""></td>
    <td class="song">${mList[i].songName}</td>
    <td class="artist">${mList[i].artistName}</td>
    <td class="year">${mList[i].year}</td>
    <td>${heart}</td>
    </tr>`
    }
}

//INITIAL LOADING
var table = document.getElementById('playtable').getElementsByTagName('tbody')[0];
display();

//NUMBER OF SONGS
var sm = document.getElementsByTagName('small')[0];
sm.innerHTML = `${mList.length} Songs`;
sm.style.paddingLeft = "90%";

//SEARCH DISPLAY
function searchdisplay(element) {
    document.getElementsByTagName('small')[0].style.display = "none";
    if (table.innerHTML.includes(element.songName)) {
        //console.log("exists");
    }
    else {
        if (element.like == true) {
            var heart = `<i onclick="clickedlike(this,${element});" class=" jix fa fa-heart"></i>`;
        }
        else {
            var heart = `<i onclick="clickedlike(this,${element});" class="jix fa fa-heart-o"></i>`;
        }
        table.innerHTML += `<tr>
    <td class="album"><img width="70px" style="border-radius:50%" src="${element.albumCover}" alt=""></td>
    <td class="song">${element.songName}</td>
    <td class="artist">${element.artistName}</td>
    <td class="year">${element.year}</td>
    <td>${heart}</td>
    </tr>`
    }
}

//GET UPLOADED IMAGE URL

let albumform = "./images/defaultmusic.jpg";
    function loadfile(event) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            albumform = reader.result;
        });
        reader.readAsDataURL(event.target.files[0]);
    };

//ADD NEW DATA
function getvalue() {


    var song = document.getElementById('nsong').value;
    var name = document.getElementById('nartist').value;
    var yearform = document.getElementById('nyear').value;

    var added =
    {
        songName: song,
        albumCover: albumform,
        artistName: name,
        year: yearform,
        like: false
    }
    mList.push(added);
    localStorage.setItem('musicList', JSON.stringify(mList));
    display();
}


//SEARCH

function search() {

    var x = document.getElementById('music-player1');
    if (x.style.display != "none") {
        x.style.display = "none";
    }
    var searchItem = document.getElementById("search-input").value;
    table.innerHTML = "";
    if (searchItem.length != 0) {
        mList.forEach(element => {

            var gsearchelement = Object.values(element);
            gsearchelement.splice(1, 1);
            gsearchelement.splice(3, 1);

            gsearchelement.forEach((i) => {
                if ((String(i).toLowerCase()).match(searchItem.toLowerCase())) {
                    searchdisplay(element);
                }
            })

        })
    }
    else {
        display();
        x.style.display = 'block';
    }

}

//VIEW LIKED

function viewfav() {
    var x = document.getElementById('music-player1');
    if (x.style.display != "none") {
        x.style.display = "none";
    }
    table.innerHTML = "";
    for (var i = 0; i < mList.length; i++) {
        if (mList[i].like == true) {
            searchdisplay(mList[i]);
        }
    }
}

//SORTING

function desc(any) {
    var x = document.getElementById('music-player1');
    x.style.display = "block";
    mList.sort((a, b) => {
        if (a[any] < b[any]) {
            return 1;
        }
        if (a[any] > b[any]) {
            return -1;
        }
        return 0;
    })
    display();

}

function asc(any) {
    mList.sort((a, b) => {
        if (a[any] < b[any]) {
            return -1;
        }
        if (a[any] > b[any]) {
            return 1;
        }
        return 0;
    })
    display();

}

display();


