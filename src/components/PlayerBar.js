import React, { Component } from 'react';
import styled from 'styled-components';

const PlayerBarContainer = styled.section`
  order: 99;
  width: 100%;
  background: #fff;
  font-family: "Open Sans", sans-serif;
  color: #282C34;
  position: fixed;
  bottom: 0;
  padding: 10px 0 40px;

  @media (max-width: 899px) {
    padding: 10px 0;
  }
`;

const Buttons = styled.section`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: 640px;
`;

const PlayControl = styled.button`
  height: 36px;
  width: 48px;
  font-size: 1.7em;
  color: #282C34;
  border: none;
  border-radius: 6px;
  border: none;
  margin: 0;
  text-decoration: none;
  background: none;
  cursor: pointer;
  transition: background 200ms ease-in-out,
              transform 100ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  :hover, :focus {
    color: #000;
  }

  :active {
    transform: scale(0.99);
  }

  :focus {
    outline: 0;
  }
`;

const Previous = styled(PlayControl)``;

const Next = styled(PlayControl)``;

const TimeControl = styled.section`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch
  width: 100%;
  max-height: 40px;
  padding: 10px 0;
`;

const VolumeControl = styled(TimeControl)`
`;

const CurrentTime = styled.span`
  padding: 0 0.5em;
  font-size: 1.1em;
`;

const TotalTime = styled(CurrentTime)``;

const TimeSeekBar = styled.input`
  -webkit-appearance: none;
  width: 60%;
  margin: 4.05px 0;

  :focus {
    outline: none;
  }

  ::-webkit-slider-runnable-track {
    width: 70%;
    height: 14px;
    cursor: pointer;
    background: rgba(109, 163, 152, 0.3);
    border-radius: 0.1px;
    border: 0px solid rgba(1, 1, 1, 0);
  }

  ::-webkit-slider-thumb {
    border: 2px solid rgba(0, 0, 0, 0);
    height: 24px;
    width: 16px;
    border-radius: 4px;
    background: #ffe0aa;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4.05px;
  }

  :focus::-webkit-slider-runnable-track {
    background: rgba(115, 167, 156, 0.3);
  }

  ::-moz-range-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    background: rgba(109, 163, 152, 0.3);
    border-radius: 0.1px;
    border: 0px solid rgba(1, 1, 1, 0);
  }

  ::-moz-range-thumb {
    border: 2px solid rgba(0, 0, 0, 0);
    height: 24px;
    width: 16px;
    border-radius: 4px;
    background: #ffe0aa;
    cursor: pointer;
  }

  ::-ms-track {
    width: 100%;
    height: 14px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: rgba(103, 159, 148, 0.3);
    border: 0px solid rgba(1, 1, 1, 0);
    border-radius: 0.2px;
  }

  ::-ms-fill-upper {
    background: rgba(109, 163, 152, 0.3);
    border: 0px solid rgba(1, 1, 1, 0);
    border-radius: 0.2px;
  }

  ::-ms-thumb {
    border: 2px solid rgba(0, 0, 0, 0);
    height: 24px;
    width: 16px;
    border-radius: 4px;
    background: #ffe0aa;
    cursor: pointer;
    height: 14px;
  }

  :focus::-ms-fill-lower {
    background: rgba(109, 163, 152, 0.3);
  }

  :focus::-ms-fill-upper {
    background: rgba(115, 167, 156, 0.3);
  }
`;

const VolumeSeekBar = styled(TimeSeekBar)`
  width: 40%;
`;

const VolumeIcon = styled.span`
  padding: 0 0.5em;
  font-size: 1.5em;
`;

class PlayerBar extends Component {
  render() {
    return(
      <PlayerBarContainer>
        <Buttons>
          <Previous
            onClick={this.props.handlePrevClick}>
            <span className="icon ion-md-skip-backward"></span>
          </Previous>
          <PlayControl onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
          </PlayControl>
          <Next
            onClick={this.props.handleNextClick}>
            <span className="icon ion-md-skip-forward"></span>
          </Next>
        </Buttons>
        <TimeControl>
          <CurrentTime>{this.props.currentTimeDisplay}</CurrentTime>
          <TimeSeekBar
            type="range"
            value={(this.props.currentTime / this.props.duration) || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <TotalTime>{this.props.totalTimeDisplay}</TotalTime>
        </TimeControl>
        <VolumeControl>
          <VolumeIcon className="icon ion-md-volume-low"></VolumeIcon>
          <VolumeSeekBar
            type="range"
            defaultValue="80"
            onChange={this.props.handleVolumeChange}/>
          <VolumeIcon className="icon ion-md-volume-high"></VolumeIcon>
        </VolumeControl>
      </PlayerBarContainer>
    );
  }
}

export default PlayerBar;
