const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs =  [
    {
        name : 'video-1',
        displayName : 'A',
        artist : 'Aditya',
        im: 'image-1'
    },
    {
        name : 'video-2',
        displayName : 'B',
        artist : 'Aditya',
        im: 'image-2'
    },
    {
        name : 'video-3',
        displayName : 'C',
        artist : 'Aditya',
        im: 'image-3'
    }
]
// Check if Playing
let isPlaying = false;

// Play 
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play of Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong(): playSong()));

// Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp4`
    image.src = `img/${song.im}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// On Load - Select First Song
loadSong(songs[songIndex])

// Update Progress Bar and Time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPrecent = (currentTime / duration) *100;
        progress.style.width = `${progressPrecent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration %60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime %60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// Set Progress Bar 
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    const {duration} = music;
    music.currentTime = (clickX/ width) *duration;
} 
// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);