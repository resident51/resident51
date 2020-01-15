import { firestore } from "firebase/app";

import { Hall } from "./common";

// Common Types
export type EventId = string;
export type EventType = "social" | "meal" | "community" | "meeting" | "alumni" | "campus";
export type EventTypeFormat = {
  formal: string;
  color: string;
};
export type EventTypeFormats = {
  [index in EventType]: EventTypeFormat;
};
export type EventFormPublicType = "public" | "halls" | "hall";
export type EventCFSPublicType = "private" | "public";
export type OrganizationType = "hall" | "ASHC" | "staff" | "committee" | "campus" | "other";

export interface EventMetadata {
  userId: string;
  displayName: string;
  hall: Hall;
}
export type EventSubmission = Omit<EventMetadata, "dateTime"> & {
  dateTime: number;
};
export type EventCFSSubmission = Omit<EventMetadata, "dateTime"> & {
  dateTime: firestore.Timestamp;
};
export type EventToCFSSubmission = Omit<EventMetadata, "dateTime"> & {
  dateTime: firestore.FieldValue | Date;
};

// Extensible event interface
export interface EventBase {
  id: EventId;
  name: string;
  type: EventType;
  description: string;
  location: string;
  dateTime: number;
  publicStatus: {
    type: EventFormPublicType;
    halls: Hall[];
  };
  facilitation: {
    organizationType: OrganizationType;
    organizationName: string;
  };
  lastEdit: number;
  submission: EventSubmission;
}

// The main, site-wide Event interface.
export type EventR51 = EventBase;
export type Events = null | EventR51[];

// Cloud Firestore event types
export interface CFSEvent
  extends Omit<EventBase, "dateTime" | "publicStatus" | "lastEdit" | "submission"> {
  dateTime: firestore.Timestamp;
  publicStatus: { type: EventCFSPublicType; halls: Hall[] };
  lastEdit: firestore.Timestamp;
  submission: EventCFSSubmission;
}
export interface EventToCFS extends Omit<CFSEvent, "id" | "dateTime" | "lastEdit" | "submission"> {
  id?: EventId;
  dateTime: Date;
  lastEdit: firestore.FieldValue;
  submission: EventToCFSSubmission;
}

// Event draft, not submitted yet
export interface EventDraft
  extends Partial<Omit<EventBase, "publicStatus" | "facilitation" | "lastEdit" | "submission">> {
  // Must also specify EventBase's properties' objects as partials (confusing, but simple ;^D)
  publicStatus: Partial<EventBase["publicStatus"]>;
  facilitation: Partial<EventBase["facilitation"]>;
}

// Structure of all event forms
export interface EventForm extends Omit<EventBase, "dateTime" | "lastEdit" | "submission"> {
  date: number;
  time: string;
}
