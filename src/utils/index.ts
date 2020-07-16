import { EventFormPublicType, Hall, SignedInUser, SignedOutUser } from '@app/types';

export const canUpdateEvent = (
  publicStatus: {
    type: EventFormPublicType;
    halls: Hall[];
  },
  user: SignedInUser | SignedOutUser | undefined,
): boolean => {
  // const { type, halls } = publicStatus;
  // const isPrivate = /^halls?$/.test(type);

  if (!user || !user.signedIn) {
    return false;
  } else {
    // Will need to update this once permissions structure is flushed out
    // } else if (user.permissions < 2) {
    //   return false;
    // } else if (type === 'public' && user.permissions >= 3) {
    //   return true;
    //   // #TODO Provide support for user roles, eg. ASHC, Community service committee, etc.
    // } else if (isPrivate && halls.includes(user.hall)) {
    return true;
  }
  // return false;
};
