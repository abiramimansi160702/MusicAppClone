console.log("welcome to spotify");
let gif = document.getElementById("gif");
// console.log(audioElem);
let songIndex = 0;
let audioElem = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let songItms = Array.from(document.getElementsByClassName("songItem"));
console.log(songItms);
let playBtns = Array.from(document.getElementsByClassName("songPLay"));
let songs = [
  {
    songName: "lofi-music",
    filePath: "songs/1.mp3",
    coverPath: "images/cover/lofiImg.png"
  },
  {
    songName: "shayad",
    filePath: "songs/2.mp3",
    coverPath: "images/cover/shayad.png"
  }
];

// event Listeners
// here on clicking the masterPLay, two things will happen:
// 1. audio should play
// 2. audio should stop
// hence if else statement used
masterPlay.addEventListener("click", () => {
  if (audioElem.paused || audioElem.currentTime < 0) {
    audioElem.play();
    gif.style.opacity = 1;
  } else {
    audioElem.pause();
    gif.style.opacity = 0;
  }
});
audioElem.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  let progress = parseInt((audioElem.currentTime / audioElem.duration) * 100);
  progressBar.value = progress;
});
// adding change event to progress bar so that on changing the progress bar the music also changes accordingly
progressBar.addEventListener("change", () => {
  audioElem.currentTime = (progressBar.value * audioElem.duration) / 100;
});

songItms.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByClassName("lofiImg")[0].src = songs[i].coverPath;
  // Optionally update song name if needed:
  // element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
playBtns.forEach((element) => {
  element.addEventListener("click", (e) => {
    songIndex = parseInt(e.target.id) - 1; // IDs are 1-based, array is 0-based
    audioElem.src = songs[songIndex].filePath;
    document.getElementById('song-track').innerText = songs[songIndex].songName;
    audioElem.currentTime = 0;
    audioElem.play();
  });
});
document.getElementById('next').addEventListener('click', ()=>{
  songIndex = (songIndex + 1) % songs.length;
  audioElem.src = songs[songIndex].filePath;
  document.getElementById('song-track').innerText = songs[songIndex].songName;
  audioElem.currentTime = 0;
  audioElem.play();
})
document.getElementById('previous').addEventListener('click', ()=>{
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElem.src = songs[songIndex].filePath;
  document.getElementById('song-track').innerText = songs[songIndex].songName;
  audioElem.currentTime = 0;
  audioElem.play();
})
