import { EventFormPublicType, Hall, User, VerifiedUser } from 'types';

export const canUpdateEvent = (
  publicStatus: {
    type: EventFormPublicType;
    halls: Hall[];
  },
  user: User,
): boolean => {
  const { type, halls } = publicStatus;
  const isPrivate = /^halls?$/.test(type);

  if (user.permissions < 2) {
    return false;
  } else if (type === 'public' && user.permissions >= 3) {
    return true;
    // #TODO Provide support for user roles, eg. ASHC, Community service committee, etc.
  } else if (isPrivate && halls.includes((user as VerifiedUser).hall)) {
    return true;
  }
  return false;
};
