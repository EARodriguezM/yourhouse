import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 0;
  text-align: center;
  line-height: 1.2;

  a {
    color: var(--color-primary);
  }
`;

interface Props {
  link: 'login' | 'signup';
}

const AuthLink = ({ link }: Props): JSX.Element => {
  const linkElement =
    link === 'login' ? (
      <p>
        No tienes una cuenta?
        <Link to="/sign-up"> Crear una cuenta </Link>.
      </p>
    ) : (
      <p>
        Ya tienes una cuenta?
        <Link to="/login"> Inicia sesión en tu cuenta </Link>.
      </p>
    );

  return <Container>{linkElement}</Container>;
};

export default AuthLink;
