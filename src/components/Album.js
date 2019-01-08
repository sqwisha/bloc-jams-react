import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hoveredSong: null,
      currentTime: 0,
      duration: album.songs[0].duration
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime })
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.removeEventListener('timeupdate',this.eventListeners.timeupdate);
    this.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({  isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  formatTime(num) {
    const time = parseInt(~~(num));
    if ( isNaN(time) || time < 0 ) {return '-:--';}
    const minutes = ~~(num / 60);
    const seconds = ~~(num % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds }`;
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (isSameSong && this.state.isPlaying) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  onHover(song) {
    this.setState({ hoveredSong: song });
  }

  offHover() {
    this.setState({ hoveredSong: null });
  }

  songNumberDisplay(song, index) {
    const isCurrentSong = song === this.state.currentSong;
    const isPlaying = this.state.isPlaying;
    const isSongHovered = song === this.state.hoveredSong;
    const hoveredNotCurrent = !isCurrentSong && isSongHovered;
    const currentNotPlaying = isCurrentSong && !isPlaying;

    if (hoveredNotCurrent || currentNotPlaying) {
      return(
        <span className="icon ion-md-play"></span>
      );
    } else if (isCurrentSong && isPlaying) {
      return(
        <span className="icon ion-md-pause"></span>
      );
    } else {
      return(
        <span>{index + 1}</span>
      );
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value / 100;
    this.audioElement.volume = newVolume;
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              {
                this.state.album.songs.map( (song, index) =>
                  <tr className="song" key={index}
                  onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.onHover(song)}
                  onMouseLeave={() => this.offHover()}>
                    <td>{this.songNumberDisplay(song, index)}</td>
                    <td>{song.title}</td>
                    <td>{song.duration}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentTimeDisplay={this.formatTime(this.audioElement.currentTime)}
          totalTimeDisplay={this.formatTime(this.audioElement.duration)} />
      </section>
    );
  }
}

export default Album;
