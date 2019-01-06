import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: '',
      isPlaying: false,
      hoveredSong: ''
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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

  handleSongClick(e, song) {
    const isSameSong = this.state.currentSong === song;
    if (isSameSong && this.state.isPlaying) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  onHover(song) {
    this.setState({ hoveredSong: song });
  }

  offHover() {
    this.setState({ hoveredSong: '' });
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
                  onClick={(e) => this.handleSongClick(e, song)}
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
      </section>
    );
  }
}

export default Album;
