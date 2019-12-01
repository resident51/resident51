export const eventTypes = {
  social: { formal: "Social Event", color: "green" },
  meeting: { formal: "Meeting", color: "orange" },
  community: { formal: "Community Event", color: "plum" },
  meal: { formal: "Co-Hall Meal", color: "lightcoral" },
  alumni: { formal: "Alumni Event", color: "maroon" },
  campus: { formal: "Campus Event", color: "lightseagreen" }
};

export const halls = [
  "Battenfeld",
  "Douthart",
  "Grace Pearson",
  "KK Amini",
  "Krehbiel",
  "Margaret Amini",
  "Miller",
  "Pearson",
  "Rieger",
  "Sellards",
  "Stephenson",
  "Watkins"
];

// Format event queried from Firebase
export const formatRetrievedEvent = event => {
  event.dateTime = event.dateTime.toDate();

  if (event.publicStatus.type === 'private') {
    if (event.publicStatus.halls.length === 1) {
      event.publicStatus.type = 'hall';
    } else {
      event.publicStatus.type = 'halls';
    }
  } else if (event.publicStatus.type !== 'public') {
    throw new Error("Cloud Firestore error: poorly formatted event map.");
  }
}

// Format event before sending to Firebase
export const formatSubmittedEventByHall = hall => event => {
  const [hour, minute] = event.time.split(':');
  event.dateTime = event.date.hour(+hour).minute(+minute).toDate();
  delete event.date;
  delete event.time;

  if (event.publicStatus.type === 'public') {
    event.publicStatus.halls = halls;
  } else if (event.publicStatus.type === 'halls') {
    event.publicStatus.type = 'private';
  } else if (event.publicStatus.type === 'hall') {
    event.publicStatus.type = 'private';
    event.publicStatus.halls = [hall];
  }
}