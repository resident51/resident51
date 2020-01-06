import { firestore } from 'firebase';

import { Hall } from './common';

// Common Types
export type EventId = string;
export type EventType = 'social' | 'meal' | 'community' | 'meeting' | 'alumni' | 'campus';
export type EventTypeProperties = {
  formal: string, color: string
};
export type EventTypeFormats = {
  [index in EventType]: EventTypeProperties;
};
export type EventFormPublicType = 'public' | 'halls' | 'hall';
export type EventCFSPublicType = 'private' | 'public';
export type OrganizationType = 'hall' | 'ASHC' | 'staff' | 'committee' | 'campus' | 'other';

export interface EventFormat {
  color: string,
  formal: string,
}

// Extensible event interface
export interface EventBase {
  id: EventId,
  name: string,
  type: EventType,
  description: string,
  location: string,
  dateTime: number,
  publicStatus: {
    type: EventFormPublicType,
    halls: Hall[]
  },
  facilitation: {
    organizationType: OrganizationType,
    organizationName: string,
  },
}

// The main, site-wide Event interface.
export interface EventR51 extends EventBase {};
export type Events = null | EventR51[];

// Cloud Firestore event types
export interface CFSEvent extends Omit<EventBase, 'dateTime' | 'publicStatus'> {
  dateTime: firestore.Timestamp,
  publicStatus: { type: EventCFSPublicType, halls: Hall[] },
}
export interface EventToCFS extends Omit<CFSEvent, 'dateTime' | 'id'> {
  id?: EventId,
  dateTime: Date,
}

// Event draft, not submitted yet
export interface EventDraft extends Partial<Omit<EventBase, 'publicStatus' | 'facilitation'>> {
  // Must also specify EventBase's properties' objects as partials (confusing, but simple ;^D)
  publicStatus: Partial<EventBase['publicStatus']>,
  facilitation: Partial<EventBase['facilitation']>,
}

// Structure of all event forms
export interface EventForm extends Omit<EventBase, 'dateTime'> {
  date: number,
  time: string,
};
