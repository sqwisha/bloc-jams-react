import React from 'react';
import styled from 'styled-components';
import record from './../images/record.jpg';
import phone from './../images/phone.jpg';
import tape from './../images/tape.jpg';

const LandingContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0;
  max-width: 900px;
`;

const RecordImg = styled.img`
  width: 100%;
  align-self: center;
  flex: 0 0 auto;
`;

const PhoneImg = styled.img`
  width: 450px;
  align-self: flex-start;
  flex: 1 0 auto;

  @media (max-width: 899px) {
    max-width: 850px;
  }
`;

const TapeImg = styled.img`
  width: 100%;
  align-self: flex-end;
  margin-top: 10px;

  @media (max-width: 899px) {
    max-width: 850px;
  }
`;

const SellingPoints = styled.section`
  display: flex;
  flex-direction: column;
  width: 450px;
  align-self: center;
  flex: 1 0 auto;

  @media (max-width: 899px) {
    max-width: 850px;
  }
`;

const PointTitle = styled.h2`
  color: #791422;
`;

const PointDescription = styled.p`
  padding: 0 10%;
  color: #282c34;
  font-family: 'Open Sans', sans-serif;
`;

const Landing = () => (
  <LandingContainer>
    <RecordImg src={record} alt="record player" />
    <SellingPoints>
      <div className="point">
        <PointTitle>Choose your music</PointTitle>
        <PointDescription>
          From our curated library of vintage tunes.
        </PointDescription>
      </div>
      <div className="point">
        <PointTitle>Unlimited, streaming, ad-free</PointTitle>
        <PointDescription>
          No arbitrary limits. No distractions.
        </PointDescription>
      </div>
      <div className="point">
        <PointTitle>Mobile enabled</PointTitle>
        <PointDescription>
          Listen to your music on the go. This streaming service is available on
          all mobile platforms.
        </PointDescription>
      </div>
      <TapeImg src={tape} alt="audio tape" />
    </SellingPoints>
    <PhoneImg src={phone} alt="woman listening to music" />
  </LandingContainer>
);

export default Landing;
