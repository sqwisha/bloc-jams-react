import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import albumData from './../data/albums';

const LibraryContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0;
  max-width: 900px;
`;

const AlbumLink = styled(Link)`
  text-decoration: none;
  font-family: "Open Sans", sans-serif;
  align-self: center;
  flex: 0 1 auto;
  padding: 22px 0 0;
  width: 445px;
  color: #282C34;


  &:visited {
    color: #0E5244;
  }

  &:hover {
    color: #791422;
  }

  @media (max-width: 899px) {
    width: 100%;
    max-width: 780px;
  }
`;

const AlbumImg = styled.img`
  width: 90%;
`;

const AlbumInfo = styled.div`
  text-align: left;
  padding-left: 6%;
`;

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: albumData
    };
  }

  render() {
    return (
      <LibraryContainer>
        {
          this.state.albums.map( (album, index) =>
            <AlbumLink to={`/album/${album.slug}`} key={index}>
              <AlbumImg src={album.albumCover} alt={album.title} />
              <AlbumInfo>
                <div>{album.title} - {album.artist}</div>
                <div>{album.songs.length} songs</div>
              </AlbumInfo>
            </AlbumLink>
          )
        }
      </LibraryContainer>
    );
  }
}

export default Library;
