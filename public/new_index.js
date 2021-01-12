const firebaseConfig = { apiKey: "AIzaSyCf9rsyLv7kGfuLJL4y56oLBk0GtKqKP8s", authDomain: "to-audio.firebaseapp.com", databaseURL: "https://to-audio.firebaseio.com", projectId: "youtube-to-audio", storageBucket: "youtube-to-audio.appspot.com", messagingSenderId: "131106559443", appId: "1:131106559443:web:8933da11d4a2e694120b26", measurementId: "G-JKPVVFPP5F" };
const db =  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
console.log(db);
console.log(auth);
var notClicked = true;
var email, password;
var music = document.querySelector('.youtube-video');
console.log();
var userID;
var playlistLinks = {};
var number = 0;
var playListToString = '';
var subtitle_index = 0
var xmlDoc;
auth.onAuthStateChanged(function (user) {
    if (user) {
        userID = user.uid;
        var ref = firebase.database().ref();
        ref.on("value", function (snapshot) {
            playlistLinks = snapshot.val().Users[userID]['Playlist']['playlistLinks'];
            objToString(snapshot.val().Users[userID]['Playlist']['playlistLinks']);
            banner(playlistLinks[0])
            fetch('https://video.google.com/timedtext?lang=en&v='+playlistLinks[number])
            .then(function (resp) {
                return resp.text();
            }).then(function (data) {
                var parser = new DOMParser()
                xmlDoc = parser.parseFromString(data, 'text/xml');
                console.log(xmlDoc)
            }).catch((err) => console.log(err));
            function onYouTubeIframeAPIReady() {
    
                player = new YT.Player('video-placeholder', {
        
                    playerVars: {
            
                        playlist: playListToString
            
                    },
                    
                    events: {
            
                        onReady: initialize
                        
                    }
                    
                });
                

            }
            
            onYouTubeIframeAPIReady()

function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();
        // if(pst == 0 || pst == 2 || pst == 5) {
        //     player.playVideo();

        // } else if (pst == 1) {
        //     player.pauseVideo();
        // }
    // Clear any old interval.
    clearInterval(time_update_interval);
    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        // console.log(player.unloadModule("captions"));
        var pst = player.getPlayerState();
        // console.log(player.getOptions("cc", "fontSize", 0));
        switch (pst) {
            case 1:
                document.querySelector('.buff').innerHTML = 'Playing'
                document.querySelector('.title-image img').classList.add('playing')
                notClicked = false;
                document.querySelector('.music-wave').style.display = 'block';
                console.log('playing')
                document.querySelector('#lottie').innerHTML = `<img src="images/pause-solid.svg" alt=""
style="height: 20px;margin-top: 15px;">`
                break;
                
            case 3:
                document.querySelector('.buff').innerHTML = 'Buffering'
                document.querySelector('.title-image img').classList.remove('playing')
                break;
            case 2:
                document.querySelector('.buff').innerHTML = 'Paused'
                document.querySelector('.title-image img').classList.remove('playing')
                notClicked = true;
                document.querySelector('.music-wave').style.display = 'none';
                console.log('paused')
                document.querySelector('#lottie').innerHTML = `<img src="images/play-solid.svg"style="height: 20px;margin-top: 15px;">`
                break;
            default:
                break;
        }
        updateTimerDisplay();
        updateProgressBar();
 
        
        // import { getSubtitles } from 'youtube-captions-scraper';     
    }, 1000);
            }
            function updateTimerDisplay() {
    // Update current time text display.
                $('#current-time').text(formatTime(player.getCurrentTime()));
                
                $('#duration').text(formatTime(player.getDuration()));
            }

            function updateProgressBar() {
    
                // Update the value of our progress bar accordingly.
                $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
                
                // console.log((document.querySelector('#progress-bar').value))
                
                if ((document.querySelector('#progress-bar').value) == '100') {
        
                    number = number + 1
                    
                    banner(playlistLinks[number])
                };

            }
            
            $('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});

        }, function (error) {
            
                console.log("Error: " + error.code);
        });

    }
    console.log(playlistLinks);
function objToString (obj) {
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {

            playListToString += ',' + obj[p];

        }
    }
    console.log(playListToString)
    // playListToString = str;
}
console.log(playListToString)
})
function signIn() {
    email = document.querySelector('#Sign-Email-Id').value;
    
    password = document.querySelector('#Sign-Email-Password').value;
    
    const promise = auth.createUserWithEmailAndPassword(email, password)
    
    promise.catch(e => alert(e.message));
    
    alert('Insert The YouTube Link in Text Field');
    
            // alert("Sign In");
            // $("#SignInModal").dialog("hide");
}
function login() {           
    email = document.querySelector('#Login-Email-Id').value;
    
    password = document.querySelector('#Login-Password').value;
    
    const promise = auth.signInWithEmailAndPassword(email, password)
    
    promise.catch(e => alert(e.message))
    
}
        

function addToDatabase(link) {
    firebase.database().ref('Users/' + userID + '/Playlist').set({
        playlistLinks
    });
    // console.log(newLinks);
}





// declaring player
var player,
    time_update_interval = 0;



function saveHome() {
    url = document.querySelector('.home-link').value;
    // newLinks = []
    if (url != null || url != '') {
        console.log(url);
        playlistLinks[Object.keys(playlistLinks).length] = url.split("v=")[1].substring(0, 11);
        document.querySelector('.home-link').value = '';
        addToDatabase(url.split("v=")[1].substring(0, 11));
        window.location.replace("/playList");
    } else {
        alert('provide The Correct Link');
    }
}
function SaveItPlaylist() {
    url = document.querySelector('.video-link').value;
    
    // newLinks = []

    if (url != null) {
        console.log(url);
        playlistLinks[Object.keys(playlistLinks).length] = url.split("v=")[1].substring(0, 11);
        document.querySelector('.video-link').value = '';
        addToDatabase(url.split("v=")[1].substring(0, 11));
        location.reload();
    } else {
        alert('provide The Correct Link');
    }
}

document.querySelector('#prev').addEventListener('click', Prevfunction);
document.querySelector('#next').addEventListener('click', Nextfunction);
function Prevfunction() {

    // document.querySelector("#play-video").innerHTML = '<img src="images/pause-circle.svg" alt="">';
    // animation.playSegments([20, 0], true);
    // Prev.playSegments([0, 35], true);
        document.querySelector('.music-wave').style.display = 'block';
    document.querySelector('#lottie').innerHTML = `<img src="images/pause-solid.svg" alt=""
style="height: 20px;margin-top: 15px;">`
    
    // document.querySelector('.title-image img').classList.add('playing')
    notClicked = true;
        
    player.previousVideo()
    // $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    // number = number - 1;
    if ((number-1) < ((Object.keys(playlistLinks).length))) {
        number = number - 1;
        console.log(number);
    }
    if (number < 0) {
        number = 0;
    }
    // console.log(playlistLinks[number]);

    // newload(playlistLinks[number]);
    banner(playlistLinks[number]);

}
function Nextfunction() {
// document.querySelector("#play-video").innerHTML = '<img src="images/pause-circle.svg" alt="">';
    // animation.playSegments([20, 0], true);
    // Next.playSegments([0, 35], true);
        document.querySelector('.music-wave').style.display = 'block';
document.querySelector('#lottie').innerHTML = `<img src="images/pause-solid.svg" alt=""
style="height: 20px;margin-top: 15px;">`
    // document.querySelector('.title-image img').classList.add('playing')
    notClicked = true;
    player.nextVideo()
    // $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    if ((Object.keys(playlistLinks).length) > (number+1)) {
        number = number + 1;
        console.log(number);
    }
    // console.log(playlistLinks[number]);

    // newload(playlistLinks[number]);

    banner(playlistLinks[number]);

}

document.querySelector('#lottie').addEventListener('click', function () {

    if (notClicked) {
        document.querySelector('#lottie').innerHTML = `<img src="images/pause-solid.svg" alt=""
style="height: 20px;margin-top: 15px;">`
        notClicked = false;
         player.playVideo();
        document.querySelector('.music-wave').style.display = 'block';
        
    } else {
        document.querySelector('#lottie').innerHTML = `<img src="images/play-solid.svg"style="height: 20px;margin-top: 15px;">`
        notClicked = true;
        player.pauseVideo();
        document.querySelector('.music-wave').style.display = 'none';
    
    }
})
function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}
function banner(vid) {

    fetch("https://www.googleapis.com/youtube/v3/videos?id=" + (vid) +

        "&part=snippet&key=AIzaSyCYSQpsJMGawflpMm53i91eS626OdrcYCU")

        .then((res) => res.json()).then((data) => {

            console.log(data);
            document.querySelector(".title").innerHTML = data["items"][0]["snippet"]["title"];

            document.querySelector('.channel-title').innerHTML = data['items'][0]['snippet']['channelTitle'];

            var video_images = data["items"][0]['snippet']['thumbnails']['maxres']['url'];
            document.querySelector(".title-image").innerHTML = '<img src="' + video_images + '"style="width: 150px;height: 150px;border-radius:50%">'
        })
}
