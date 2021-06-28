import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { City } from 'types';

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 2rem 0 3rem 0;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 1200px;
    margin: 2rem auto;
  }
`;

const List = styled.div`
  background-size: cover;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  padding-top: 70%;
`;

const Info = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CityTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
`;

const cities: City[] = [
  {
    id: '1',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Bogot%C3%A1_Colpatria_Night.jpg',
    name: 'Bogota',
  },
  {
    id: '2',
    imageUrl:
      'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2016/08/03/1101/Hyatt-Regency-Cartagena-P016-Bay-View-with-Old-City.jpg/Hyatt-Regency-Cartagena-P016-Bay-View-with-Old-City.16x9.jpg',
    name: 'Cartagena',
  },
  {
    id: '3',
    imageUrl:
      'https://s3-us-west-2.amazonaws.com/public.travel2latam.com/imagenes/000/504/874/000504874.png',
    name: 'Medellin',
  },
  {
    id: '4',
    imageUrl:
      'https://cdn.theculturetrip.com/wp-content/uploads/2017/11/santiago_de_cali-1.jpg',
    name: 'Cali',
  },
];

const FeaturedCities = (): JSX.Element => {
  return (
    <div>
      <Title> Ciudades Destacadas </Title>
      <ListWrapper>
        {cities.map((city) => (
          <Link to={`/listings/${city.name}`} key={city.id}>
            <List
              style={{
                backgroundImage: `url(${city.imageUrl})`,
              }}
            >
              <Info>
                <CityTitle> {city.name} </CityTitle>
              </Info>
            </List>
          </Link>
        ))}
      </ListWrapper>
    </div>
  );
};

export default FeaturedCities;
