import Validator from '../validator.js';

const todoValidator = ({ title }) => {
  const errors = {};

  const titleValidator = new Validator(title)
    .required('Required field')
    .min(4, 'Min 4 symbols')
    .max(50, 'Max 50 symbols');
  if (titleValidator.hasErrors) errors.title = titleValidator.HTMLError;

  return errors;
}

export default todoValidator;