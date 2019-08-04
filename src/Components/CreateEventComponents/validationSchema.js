import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().min(2).max(50).required(), // =|=|= DONE =|=|=
  dateTime: yup.date(),
  description: yup.string().min(20).max(500).required(), // =|=|= DONE =|=|=
  type: yup.string()
    .oneOf(["social", "meeting", "meal", "community", "alumni", "campus"])
    .required(), // =|=|= DONE =|=|=
  recurring: yup.bool(false),
  location: yup.object({
    type: yup.string().oneOf(["scholhalls", "campus", "other"]),
    place: yup.string().min(6).required()
  }),
  publicStatus: {
    type: yup.string().oneOf(["any", "complex", "halls", "hall"]),
    halls: yup.array() // only needed with halls | hall
  },
  facilitation: yup.object({
    organizationType: yup.string()
      .oneOf(["hall", "ASHC", "staff", "committee", "campus", "other"])
      .required(),
    organizationName: yup.string().min(6).required(),
    submittedBy: yup.string().required(),
    approvedBy: yup.string().required()
  })
});

export default validationSchema;