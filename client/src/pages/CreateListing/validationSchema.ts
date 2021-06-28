import * as Yup from 'yup';

type TValidationSchema = Record<string, object>;

export const validationSchema: TValidationSchema = {
  step1: Yup.object({
    title: Yup.string()
      .min(6, 'Nombre no puede ser menos de 6 caracteres')
      .required('Nombre es un campo requerido'),
    description: Yup.string()
      .min(10, 'Descripción no puede ser menor a 10 caracteres')
      .max(100, 'Descripción no puede ser mayor a 100 caracteres')
      .required('Descripción es un campo requerido'),
    transactionType: Yup.string().required(
      'Tipo de transacción es un campo requerido'
    ),
    type: Yup.string().required('Tipo de propiedad es un campo requerido'),
    price: Yup.number()
      .moreThan(0)
      .typeError('Precio debe ser un numero')
      .required('Precio es un campo requerido'),
    image: Yup.string().required('Imagen es un campo requerido'),
  }),
  step2: Yup.object({
    address: Yup.string().required('Dirección es un campo requerido'),
    city: Yup.string().required('Municipio es un campo requerido'),
    state: Yup.string().required('Departamento es un campo requerido'),
    zip: Yup.string()
      .required('Codigo postal es un campo requerido')
      .test('len', 'Codigo postal (Ejm. 200001)', (val) =>
        Boolean(val && val.length === 6)
      ),
  }),
  step3: Yup.object({
    propertySize: Yup.number()
      .moreThan(0)
      .typeError('Tamaño de la propiedad debe ser un numero')
      .required('Tamaño de la propiedad es un campo requerido'),
    numOfBedrooms: Yup.number()
      .moreThan(0)
      .typeError('Numero de habitaciones debe ser un numero')
      .required('Numero de habitaciones required field'),
    numOfGuests: Yup.number()
      .moreThan(0)
      .typeError('Numero de invitados debe ser un numero')
      .required('Numero de invitados es un campo requerido'),
    numOfBaths: Yup.number()
      .moreThan(0)
      .typeError('Numero de baños debe ser un numero')
      .required('Numero de baños es un campo requerido'),
  }),
};
