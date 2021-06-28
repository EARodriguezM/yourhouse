import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import Button from 'components/Button';
import { useToast } from 'contexts';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_PASSWORD } from 'graphql/mutations';
import { Container } from './styled';

const ChangePassword = () => {
  const { setToast } = useToast();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      setToast('success', 'Actualizó con éxito su nueva contraseña');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, 'La contraseña anterior debe tener al menos 6 caracteres')
        .required('La contraseña anterior es un campo obligatorio'),
      newPassword: Yup.string()
        .min(6, 'La contraseña nueva debe tener al menos 6 caracteres')
        .required('La contraseña nueva es un campo obligatorio'),
      confirmNewPassword: Yup.string()
        .min(6, 'Confirmar nueva contraseña debe tener al menos 6 caracteres')
        .required('Confirmar nueva contraseña es un campo obligatorio'),
    }),
    onSubmit: (values) => {
      changePassword({ variables: { input: values } });
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Contraseña anterior"
          type="password"
          name="oldPassword"
          id="oldPassword"
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.oldPassword && formik.errors.oldPassword
          )}
          errorMessage={formik.touched.oldPassword && formik.errors.oldPassword}
        />
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

export default ChangePassword;
