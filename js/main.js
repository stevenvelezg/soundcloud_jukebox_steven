//@param id is SoundCloud assigned ID
//@param title is Song's title
function Song(id, title) {
  this.id = id;
  this.title = title;
}

function Jukebox() {
  //The following arrays are parallel (item 0 should be the same)
  this.songs = []; //Our song object
  this.players = []; //SoundCloud player object
  this.currentSong = 0;
  this.SC = SC;
  this.SC.initialize({
    client_id:"fd4e76fc67798bfa742089ed619084a6"
  });
}

//Add song to jukebox
Jukebox.prototype.addSong = function(){
    console.log(arguments);
    for(let i = 0; i < arguments.length; i++){
      this.songs.push(arguments[i]);
    }
}

//Play function will play the player for the current track
Jukebox.prototype.play = function(){
  const self=this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  //To do: implement
  //The current song... if so, use that
  if(player){
    player.play();
    document.getElementById("song").innerText = song.title;
  }
  //Else, go to SoundCloud and stream song
  else{
    this.SC.stream('/tracks/'+song.id).then(function(p){
      self.players[self.currentSong] = p;
      self.play();
    });
  }
}

//Pause funtion will pause the player for the current tracks
Jukebox.prototype.pause = function(){
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  player.pause();
}

//Stop function will stop the player for the current tracks
Jukebox.prototype.stop = function(){
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  player.pause();
  player.seek(0);
}

//Forward function will advance the player to the next tracks
Jukebox.prototype.forward = function(){
  this.currentSong = (this.currentSong + 1) % this.songs.length;
  const self=this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  //To do: implement
  //The current song... if so, use that
  if(player){
    player.seek(0);
    player.play();
    document.getElementById("song").innerText = song.title;
  }
  //Else, go to SoundCloud and stream song
  else{
    this.SC.stream('/tracks/'+song.id).then(function(p){
      self.players[self.currentSong] = p;
      self.play();
    });
  }
}

//Backward function will back the player up one track
Jukebox.prototype.backward = function(){
  this.currentSong = (this.currentSong - 1) % this.songs.length;
  const self=this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  //To do: implement
  //The current song... if so, use that
  if (this.currentSong < 0) {
    this.currentSong = this.songs.length;
  }
  else {
    if(player){
      player.seek(0);
      player.play();
      document.getElementById("song").innerText = song.title;
    }
    //Else, go to SoundCloud and stream song
    else{
      this.SC.stream('/tracks/'+song.id).then(function(p){
        self.players[self.currentSong] = p;
        self.play();
      });
    }
  }
}

var myJukebox = new Jukebox();
myJukebox.addSong(new Song('45062705', 'Hotel Dennis - Eagles'), new Song('223228432',"It's Strange - Louis the Child"), new Song('29366957',"Mac Miller - Heat Wave"));

document.addEventListener("DOMContentLoaded",function(){
  myJukebox.play();

  document.querySelector('.play').addEventListener('click',function() {
    myJukebox.play();
  })
  document.querySelector('.pause').addEventListener('click',function() {
    myJukebox.pause();
  })
  document.querySelector('.stop').addEventListener('click',function(){
    myJukebox.stop();
  })
  document.querySelector('.forward').addEventListener('click',function() {
    myJukebox.forward();
  })
  document.querySelector('.back').addEventListener('click',function() {
    myJukebox.backward();
  })
})
