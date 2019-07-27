import lorem from './lorem';
const gen = lorem.generateSentences.bind(lorem);

// const makeEvent = (id) => {
//   return {
//     id: id,
//     name: "Breakfast Shmeckfast",
//     dateTime: new Date(), // for both date and time (must have both for approval)
//     location: "Pearson",
//     description: "Three a year! Breakfast!", // display
//     type: "social", // social, meeting, campus, meal, community (paws for pups?), other
//     recurring: false,
//     publicStatus: {
//       isPublic: false,
//       hallsInvited: ["Pearson", "Miller", "Sellards"],
//       openToCampus: false
//     },
//     facilitation: {
//       organizationType: "Hall", // hall, ASHC, staff, committee, campus, other
//       organizationName: "Pearson",
//       submittedBy: 12343220934,
//       approvedBy: 12343220934
//     },
//     funding: [{
//       fundedBy: "Pearson",
//       amount: 200
//     }]
//   }
// }

const bshmeck_0 = {
  id: 0,
  name: "Breakfast Shmeckfast",
  dateTime: new Date(2019, 8, 20, 19, 30, 0, 0), // 7:00pm, 9/20/2019 // for both date and time (must have both for approval)
  description: "Three a year! Breakfast!", // display
  type: "social", // social, meeting, campus, meal, community (paws for pups?), other
  recurring: false,
  location: "Pearson Hall",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: [] // only needed with halls | hall
  },
  facilitation: {
    organizationType: "Hall", // hall, ASHC, staff, committee, campus, other
    organizationName: "Pearson",
    submittedBy: 12343220934,
    approvedBy: 12343220934
  },
  funding: [{
    fundedBy: "Pearson",
    amount: 200
  }]
}

const bshmeck_1 = {
  id: 1,
  name: "Breakfast Shmeckfast",
  dateTime: new Date(2019, 10, 29, 19, 0, 0, 0), // 7:00pm, 11/29/2019
  description: "Three a year! Breakfast!",
  type: "social",
  recurring: false,
  location: "Pearson Hall",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: []
  },
  facilitation: {
    organizationType: "Hall", // hall, ASHC, staff, committee, campus, other
    organizationName: "Pearson",
    submittedBy: 12343220934,
    approvedBy: 12343220934
  },
  funding: [{
    fundedBy: "Pearson",
    amount: 100
  }]
};

const bshmeck_2 = {
  id: 2,
  name: "Breakfast Shmeckfast",
  dateTime: new Date(2020, 3, 20, 19, 30, 0, 0), // 7:30pm, 4/20/2019
  description: "Three a year! Breakfast!",
  type: "social",
  recurring: false,
  location: "Pearson Hall",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: []
  },
  facilitation: {
    organizationType: "Hall", // hall, ASHC, staff, committee, campus, other
    organizationName: "Pearson",
    submittedBy: 12343220934,
    approvedBy: 12343220934
  },
  funding: [{
    fundedBy: "Pearson",
    amount: 100
  }]
};

const NeanderthallBall = {
  id: 3,
  name: "Neanderthall Ball",
  dateTime: new Date(2019, 10, 15, 19, 0, 0, 0), // 11/15/2019, 7pm
  description: gen(4),
  type: "social", // social, meeting, campus, meal, community (paws for pups?), other
  recurring: false,
  location: "Stephenson Hall",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: []
  },
  facilitation: {
    organizationType: "Hall", // hall, ASHC, staff, committee, campus, other
    organizationName: "Stephenson",
    submittedBy: 57834920293,
    approvedBy: 12343220934
  },
  funding: [{
    fundedBy: "Stephenson",
    amount: 400
  }, {
    fundedBy: "ASHC",
    amount: 250
  }]
}

const WinterFormal = {
  id: 4,
  name: "Winter Formal",
  dateTime: new Date(2019, 10, 29, 19, 0, 0, 0), // 7:00pm, 9/20/2019
  description: gen(9), // display
  type: "social",
  recurring: false,
  location: "Memorial Union",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: []
  },
  facilitation: {
    organizationType: "committee", // hall, ASHC, staff, committee, campus, other
    organizationName: "ASHC",
    submittedBy: 17834920293,
    approvedBy: 343220934
  },
  funding: [{
    fundedBy: "ASHC",
    amount: 800
  }]
}

const ASHCFullCouncilMeeting = {
  id: 5,
  name: "ASHC Full Council Meeting",
  dateTime: new Date(2019, 8, 2, 19, 0, 0, 0), // 7:00pm, 9/2/2019
  description: gen(9), // display
  type: "meeting",
  recurring: true,
  location: "Watkins Hall",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: []
  },
  facilitation: {
    organizationType: "committee", // hall, ASHC, staff, committee, campus, other
    organizationName: "ASHC",
    submittedBy: 17834920293,
    approvedBy: 343220934
  },
  funding: []
}

const AminiCoHallMeal = {
  id: 6,
  name: "Maggie-KK Amini Co-Hall Meal",
  dateTime: new Date(2019, 8, 14, 6, 0, 0, 0), // 7:00pm, 9/14/2019
  description: gen(1), // display
  type: "meal",
  recurring: true,
  location: "Amini Patio",
  publicStatus: {
    type: "complex", // "any" | "complex" | "halls" | "hall"
    halls: []
  },
  facilitation: {
    organizationType: "hall", // hall, ASHC, staff, committee, campus, other
    organizationName: "KK",
    submittedBy: 17834920293,
    approvedBy: 343220934
  },
  funding: []
}

// const events = [
//     NeanderthallBall,
//     WinterFormal,
//     ASHCFullCouncilMeeting,
//     StephensonMeeting,
//     MillerMeeting,
//     MoveInDay,
//     MoveOutDay,
//     ComplexCommunityServiceEvent,
//     HallCommunityServiceEvent,
//     BreakfastShmeckfast,
//     CasinoNight,
//     CerealNight,
//     TriviaNight,
//     AminiCoHallMeal,
//     SocialChairMeeting,
// ]




export default [bshmeck_0, bshmeck_1, bshmeck_2, NeanderthallBall, WinterFormal, ASHCFullCouncilMeeting, AminiCoHallMeal];