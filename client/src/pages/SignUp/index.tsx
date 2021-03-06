import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import AuthSocial from 'components/Auth/AuthSocial';
import AuthLink from 'components/Auth/AuthLink';
import Meta from 'components/Meta';
import Input from 'components/Input';
import { SIGN_UP } from 'graphql/mutations';
import { useAuth, useToast } from 'contexts';
import {
  Container,
  AuthWrapper,
  Heading,
  Form,
  ButtonWrapper,
  LinkWrapper,
} from './styled';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp = (): JSX.Element => {
  const { login: onLogin } = useAuth();
  const { setToast } = useToast();
  const history = useHistory();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      onLogin(data.signUp);
      history.push('/profile');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'El nombre debe tener al menos 6 caracteres')
        .required('Nombre es un campo obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('Contraseña es un campo obligatorio'),
      email: Yup.string()
        .email('Dirección de correo electrónico inválida')
        .required('Correo electrónico es un campo obligatorio'),
    }),
    onSubmit: (values) => {
      signUp({ variables: { input: values } });
    },
  });

  return (
    <Container>
      <Meta title="Sign Up" />
      <AuthWrapper>
        <Heading> Crea tu cuenta </Heading>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            id="name"
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            errorMessage={formik.touched.name && formik.errors.name}
          />

          <Input
            id="email"
            type="text"
            placeholder="Correo electrónico"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
            errorMessage={formik.touched.email && formik.errors.email}
          />

          <Input
            id="password"
            type="password"
            placeholder="Contraseña "
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
            errorMessage={formik.touched.password && formik.errors.password}
          />

          <LinkWrapper>
            <Link to="/forgot-password"> Olvidaste tu contraseña? </Link>
          </LinkWrapper>

          <ButtonWrapper>
            <Button
              type="submit"
              title="Registrase"
              variant="primary"
              disabled={loading}
              loading={loading}
              style={{
                width: '100%',
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            />
          </ButtonWrapper>
        </Form>
        <AuthLink link="signup" />
        <AuthSocial />
      </AuthWrapper>
    </Container>
  );
};

export default SignUp;
