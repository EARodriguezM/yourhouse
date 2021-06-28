import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { MY_FAVORITES } from 'graphql/queries';
import Listings from 'components/Listings';
import EmptyMessage from 'components/EmptyMessage';
import ErrorMessage from 'components/ErrorMessage';
import ListingsSkeleton from 'components/ListingsSkeleton';
import Meta from 'components/Meta';

const Container = styled.div`
  padding: 2rem 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const Heading = styled.h2`
  font-weight: 600;
  text-align: center;
`;

const PAGE_LIMIT = 10;

const MyFavorites = (): JSX.Element => {
  const { data, loading, error } = useQuery(MY_FAVORITES, {
    variables: { page: 1, limit: PAGE_LIMIT },
    fetchPolicy: 'cache-and-network',
  });

  if (error)
    return <ErrorMessage message="Algo salió mal. Inténtalo de nuevo." />;

  if (loading) {
    return (
      <Container>
        <ListingsSkeleton numbers={5} />
      </Container>
    );
  }

  const { favorites } = data.me;

  return (
    <Container>
      <Meta title="My Favorites" />
      {favorites.total === 0 ? (
        <EmptyMessage
          message="No hay nada que ver aquí aún."
          description="Aquí se mostrarán sus propiedades favoritas."
        />
      ) : (
        <>
          <Heading> Mis Favoritos </Heading>
          <Listings listings={favorites.result} />
        </>
      )}
    </Container>
  );
};

export default MyFavorites;
