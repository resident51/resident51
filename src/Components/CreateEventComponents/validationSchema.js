import * as yup from 'yup';

const generateValidationSchema = ({halls, eventTypes}) => yup.object().shape({
  name: yup.string()
    .min(5, "Provide a more descriptive name!")
    .max(50, "Whoa whoa whoa, calm down bud, we said 50 characters or less!")
    .required("Please provide the name of the event."),
  type: yup.string()
    .oneOf(Object.keys(eventTypes), "Please choose one of the provided event types.")
    .required("Please provide the type of event."),
  description: yup.string()
    .min(20, "Provide some more information! What do attendees need to know?")
    .max(1000, "Keep it under 1000 characters - people need ")
    .required("Please provide a description."),
  date: yup.date()
    .required("Please provide the day the event takes place.")
    .min(new Date(), "Please provide the day the event takes place."),
  time: yup.string()
    .required("Please provide the time the event will take place.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Literally what are you doing."),
  location: yup.string()
    .min(2, "Location is required! How will people find your event?")
    .required("Location is required! How will people find your event?"),
  publicStatus: yup.object()
    .shape({
      type: yup.string()
        .oneOf(["any", "complex", "halls", "hall"], 
          "Please select who will be attending this event"),
      halls: yup.array()
        .when("type", {
          is: "halls",
          then: yup.array()
            .min(2, 'You must choose at least two halls, one being your own.')
            .of(yup.string().oneOf(halls, "Choose from the options provided"))
        })
    }),
  facilitation: yup.object().shape({
    organizationType: yup.string()
      .oneOf(["hall", "ASHC", "staff", "committee", "campus", "other"],
        "Choose from the options provided"
      )
      .required("What organization is facilitating this event?"),
    organizationName: yup.string()
      .when("organizationType", {
        is: "committee",
        then: yup.string()
          .min(6, "What committee will put on this event?")
          .required("What committee will put on this event?")
      })
      .when("organizationType", {
        is: "other",
        then: yup.string()
          .min(6, "What organization will put on this event?")
          .required("What organization will put on this event?")
      }),
  })
});

export default generateValidationSchema;