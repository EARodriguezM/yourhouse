import React from 'react';
import { BsUpload } from 'react-icons/bs';
import Input from 'components/Input';
import {
  Label,
  Select,
  TextArea,
  FormGroup,
  InputFile,
  ImagePreview,
  ErrorText,
} from '../styled';
import { FormProps } from '../types';

const Step1: React.FC<FormProps> = ({
  onChange,
  onImageChange,
  errors,
  touched,
  onBlur,
  values,
}) => {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="title"> Nombre </Label>
        <Input
          id="title"
          name="title"
          onChange={onChange}
          placeholder="Por favor, ingrese el nombre aqui..."
          type="text"
          onBlur={onBlur}
          value={values.title}
          error={Boolean(touched.title && errors.title)}
          errorMessage={touched.title && errors.title}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description"> Descripción </Label>
        <TextArea
          id="description"
          name="description"
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Por favor, ingrese la descripción aqui..."
          value={values.description}
          error={Boolean(touched.description && errors.description)}
        />
        {touched.description && errors.description && (
          <ErrorText>{errors.description}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="type"> Tipo de Transacción </Label>
        <Select
          id="type"
          name="transactionType"
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={values.transactionType}
          error={Boolean(touched.type && errors.type)}
        >
          <option value=""> </option>
          <option value="RENT"> Alquilar </option>
          <option value="BUY"> Comprar </option>
        </Select>
        {touched.transactionType && errors.transactionType && (
          <ErrorText>{errors.transactionType}</ErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="type"> Tipo </Label>
        <Select
          id="type"
          name="type"
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={values.type}
          error={Boolean(touched.type && errors.type)}
        >
          <option value=""> </option>
          <option value="APARTMENT"> Departamento </option>
          <option value="HOUSE"> Casa </option>
        </Select>
        {touched.type && errors.type && <ErrorText>{errors.type}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="price"> Precio </Label>
        <Input
          id="price"
          name="price"
          onChange={onChange}
          placeholder="Por favor, ingrese el precio aqui..."
          type="text"
          onBlur={onBlur}
          value={values.price}
          error={Boolean(touched.title && errors.title)}
          errorMessage={touched.title && errors.title}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="image"> Imagen </Label>
        <InputFile>
          <BsUpload size={23} />
          <span>Seleccionar Imagen</span>
          <input type="file" id="image" name="image" onChange={onImageChange} />
        </InputFile>
      </FormGroup>
      {touched.image && errors.image && <ErrorText>{errors.image}</ErrorText>}
      {values.image && (
        <ImagePreview style={{ backgroundImage: `url(${values.image})` }} />
      )}
    </div>
  );
};

export default Step1;
