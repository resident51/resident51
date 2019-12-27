import * as yup from 'yup';
import { Hall } from '../../../Types/';

const generateResidentValidationSchema = (halls: Hall[]) => yup.object().shape({
  name: yup.string()
    .min(4, "Man, that's a short name!")
    .max(100, "Lmao your parents must hate your ass huh")
    .required("Man, that's a short name!"),
  hall: yup.string()
    .oneOf(halls, 'Please choose a valid hall.')
    .required('You gotta choose a hall.'),
  email: yup.string()
    .required("Please?")
    .min(4, "Please!")
    .email("Hey! That's no email!")
    .matches(/@ku\.edu$/, 'Valid KU email please!')
    .max(100, "That's... a lot of email..."),
});

export default generateResidentValidationSchema;