import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { EMAIL_VERIFICATION } from 'graphql/mutations';
import { useAuth, useToast } from 'contexts';
import Meta from 'components/Meta';
import Alert from 'components/Alert';
import Spinner from 'components/Spinner';
import { Container, Title } from './styled';

const EmailConfirmation = (): JSX.Element | null => {
  const { token } = useParams();
  const { login } = useAuth();
  const { setToast } = useToast();
  const history = useHistory();

  const [confirmEmail, { error, loading }] = useMutation(EMAIL_VERIFICATION, {
    variables: { token },
    onCompleted(data) {
      setToast('success', 'Correo verificado');
      login(data.emailTokenVerification);
      history.push('/profile');
    },
    onError() {
      setToast(
        'error',
        'Hubo un error al verificar su cuenta. Por favor, inténtelo de nuevo más tarde.'
      );
    },
  });

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  if (loading) {
    return (
      <Container>
        <Meta title="Verify Email" />
        <Title> Verificando tu correo electrónico... </Title>
        <Spinner size={5} color="var(--color-primary)" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Meta title="Verify Email" />
        <Alert message="Error al verificar el correo electrónico." type="error" />
      </Container>
    );
  }

  return null;
};

export default EmailConfirmation;
