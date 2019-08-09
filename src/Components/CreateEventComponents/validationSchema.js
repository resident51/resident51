import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string("Please provide the name of the event.")
    .min(5, "Provide a more descriptive name!")
    .max(50, "Whoa whoa whoa, calm down bud, we said 50 characters or less!")
    .required("Please provide the name of the event."),
  date: yup
    .date("Please provide the day the event will take place.")
    .min(new Date(), "*Checks watch* Hmmm.... I don't think that's right.")
    .required("Please provide the day the event takes place."),
  time: yup
    .string("Please provide the time the event will take place.")
    .required("Please provide the time the event will take place."), // can use a regex with .matches()
  description: yup
    .string("Please provide a description.")
    .min(20, "Great, love it, but actually could you provide some more information?")
    .max(1000, "Keep it under 1000 characters - people need ")
    .required("Please provide a description."),
  type: yup
    .string("Please provide the type of event.")
    .oneOf(["social", "meeting", "meal", "community", "alumni", "campus"])
    .required("Please provide the type of event."),
  location: yup
    .string("Location is required! How will people find your event?")
    .min(2, "Location is required! How will people find your event?")
    .required("Location is required! How will people find your event?"),
  publicStatus: yup
    .object()
    .shape({
      type: yup.string().oneOf(["any", "complex", "halls", "hall"]),
      halls: yup.array() // only needed with halls | hall
    }),
  facilitation: yup.object().shape({
    organizationType: yup.string()
      .oneOf(["hall", "ASHC", "staff", "committee", "campus", "other"])
      .required(),
    organizationName: yup.string()
      .when("facilitation.organizationType", {
        is: "committee",
        then: yup.string().min(6).required()
      })
      .when("facilitation.organizationType", {
        is: "other",
        then: yup.string().min(6).required()
      }),
  })
});

export default validationSchema;