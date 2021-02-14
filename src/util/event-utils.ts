let eventGuid = 0;

export const createEventId = () => {
  return String(eventGuid++);
};
