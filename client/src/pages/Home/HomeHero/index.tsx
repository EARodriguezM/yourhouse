import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import SearchTab from './SearchTab';

const StyledHero = styled.div`
  height: 18rem;
  width: 100%;
  background-size: cover;
  position: relative;
  background-position: center center;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    height: 30rem;
  }
`;

const Info = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    font-size: 2.5rem;
  }
`;

interface Props {
  searchSubmit(value: string): void;
}

const HomeHero: React.FC<Props> = ({ searchSubmit }) => {
  const [transactionType, setTransactionType] = useState('rent');

  const handleOnChangeTab = (selected: string) => {
    setTransactionType(selected);
  };

  return (
    <StyledHero
      style={{
        backgroundImage: `url(https://www-img-cc.s3.amazonaws.com/proyecto/167307-P561/tipos/2-Cocina---El-Molino----66-m2---Constructora-Bolivar----Cajica--10161547371615_plana.jpeg)`,
      }}
    >
      <Info>
        <Title> Encuentra un lugar para ti </Title>
        <SearchTab onChangeTab={handleOnChangeTab} selected={transactionType} />
        <SearchForm
          searchSubmit={searchSubmit}
          selectedTransaction={transactionType}
        />
      </Info>
    </StyledHero>
  );
};

export default HomeHero;
