import React from 'react';
import styled from 'styled-components';
import { Listing } from 'types';
import Listings from 'components/Listings';

const Container = styled.div`
  padding: 1rem 0;
`;

const Heading = styled.h2`
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
`;

const ListingWrapper = styled.div`
  margin-top: 2rem;
`;

interface UserListingsData {
  total: number;
  result: Listing[];
}

interface Props {
  listings: UserListingsData;
}

const UserListings: React.FC<Props> = ({ listings }): JSX.Element => {
  return (
    <Container>
      {listings.total === 0 ? (
        <div> Aún no se han añadido propiedades. </div>
      ) : (
        <ListingWrapper>
          <Heading> Propiedades </Heading>
          <Listings listings={listings.result} />
        </ListingWrapper>
      )}
    </Container>
  );
};

export default UserListings;
