import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import Button from 'components/Button';
import Meta from 'components/Meta';
import { useToast } from 'contexts';
import { useMutation } from '@apollo/react-hooks';
import { RESET_PASSWORD } from 'graphql/mutations';
import { Container, Heading } from './styled';

interface Params {
  token: string;
}

const ResetPassword = () => {
  const history = useHistory();
  const { setToast } = useToast();
  const { token } = useParams<Params>();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted() {
      setToast('success', 'Actualizó con éxito su nueva contraseña');
      history.push('/login');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
        .required('Nueva contraseña es un campo obligatorio'),
      confirmNewPassword: Yup.string()
        .min(6, 'Confirmar nueva contraseña debe tener al menos 6 caracteres')
        .required('Confirmar nueva contraseña es un campo obligatorio'),
    }),
    onSubmit: (values) => {
      const input = {
        ...values,
        token,
      };
      resetPassword({ variables: { input } });
    },
  });

  return (
    <Container>
      <Meta title="Reset Password" />
      <Heading> Restablecer la contraseña </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Nueva contraseña"
          type="password"
          name="newPassword"
          id="newPassword"
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.newPassword && formik.errors.newPassword
          )}
          errorMessage={formik.touched.newPassword && formik.errors.newPassword}
        />
        <Input
          label="Confirmar nueva contraseña"
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
          )}
          errorMessage={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
          }
        />
        <Button
          type="submit"
          title="Guardar Cambios"
          loading={loading}
          disabled={loading}
        />
      </form>
    </Container>
  );
};

export default ResetPassword;
