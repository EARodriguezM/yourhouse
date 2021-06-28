import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import Button from 'components/Button';
import { useAuth, useToast } from 'contexts';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PROFILE } from 'graphql/mutations';
import { Container } from './styled';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const { setToast } = useToast();

  const initialValues = {
    name: user?.name ? user.name : '',
    email: user?.email ? user.email : '',
  };

  const [updateUserProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted(data) {
      updateProfile(data.updateProfile.user);
      setToast('success', 'Actualizó con éxito su perfil de usuario');
    },
    onError() {
      setToast(
        'error',
        'No se puede actualizar su perfil de usuario en este momento. Por favor, inténtelo de nuevo más tarde'
      );
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'El nombre debe tener al menos 6 caracteres')
        .required('El nombre es un campo obligatorio'),
      email: Yup.string()
        .email('Dirección de correo electrónico inválida')
        .required('El correo electrónico es un campo obligatorio'),
    }),
    onSubmit: (values) => {
      updateUserProfile({ variables: { input: values } });
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.name && formik.errors.name)}
          errorMessage={formik.touched.name && formik.errors.name}
        />
        <Input
          label="Correo electrónico"
          type="text"
          name="email"
          id="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.email && formik.errors.email)}
          errorMessage={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" title="Guardar Cambios" loading={loading} />
      </form>
    </Container>
  );
};

export default EditProfile;
