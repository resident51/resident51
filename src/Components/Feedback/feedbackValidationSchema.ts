import * as yup from 'yup';

const feedbackValidationSchema = yup.object().shape({
  subject: yup.string()
    .required('Am... I joke to you? 🥺')
    .min(5, 'We love us some brevity, but that\'s a little TOO, uh... brev... you know?')
    .max(100, 'Relax, dude.'),
  message: yup.string()
    .required('Hey buster, this is the most important part. Give us something to work with here.')
    .min(4, 'Hm! Interesting! Care to elaborate?')
    .max(1000, 'Keep it a little shorter! We\'ll send this off to our best software engineers, but remember: engineers can\'t read!')
});

export default feedbackValidationSchema;