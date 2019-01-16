import React, { Component } from 'react';
import styled from 'styled-components';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

const AlbumContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto 166px;

  @media (max-width: 899px) {
    margin: 0 auto 136px;
  }
`;

const AlbumInfo = styled.section`
  order: 1;
  flex: 1 1 auto;
  text-align: left;
  max-width: 450px;
  margin: 22px 22px 0 0;

  @media (max-width: 899px) {
    max-width: 640px;
    text-align: center;
    margin: 22px 22px 0;
  }
`;

const AlbumDetails = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const AlbumTitle = styled.h1`
  font-size: 3em;
  color: #00362C;
  margin: 0 0 8px;
`;

const Artist = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-size: 2em;
  color: #791422;
  margin: 0 0 16px;
`;

const ReleaseInfo = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 1.1em;
  margin: 0;
`;

const SongList = styled.table`
  flex: 1 1 auto;
  width: 100%;
  font-size: 1.1em;
  text-align: center;
  border-collapse: collapse;
  font-family: "Open Sans", sans-serif;

  .song {
    line-height: 3em;
  }

  .song td:first-of-type {
    width: 3em;
  }

  .song td:nth-of-type(even) {
    text-align: left;
    padding-left: 5%;

    @media (max-width: 899px) {
      text-align: center;
    }
  }

  .song:nth-of-type(odd) {
    background-color: rgba(109,163,152, 0.3);
  }
`;

const CoverArt = styled.img`
  order: 2;
  flex: 0 1 auto;
  max-width: 450px;
  margin: 22px;
  width: 90%;

  @media (max-width: 899px) {
    max-width: 640px;
  }
`;

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug;
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
      timeupdate: () => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: () => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate',this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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
      <AlbumContainer>

        <AlbumInfo>
          <AlbumDetails>
            <AlbumTitle>{this.state.album.title}</AlbumTitle>
            <Artist>{this.state.album.artist}</Artist>
            <ReleaseInfo>{this.state.album.releaseInfo}</ReleaseInfo>
          </AlbumDetails>
          <SongList>
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
                    <td>{this.formatTime(song.duration)}</td>
                  </tr>
                )
              }
            </tbody>
          </SongList>
        </AlbumInfo>
        <CoverArt src={this.state.album.albumCover} alt={this.state.album.title} />

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
      </AlbumContainer>
    );
  }
}

export default Album;
