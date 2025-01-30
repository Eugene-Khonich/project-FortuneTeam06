const parseContactType = (type) => {
  if (typeof type !== 'string') return undefined;
  const allowedTypes = ['work', 'home', 'personal'];
  return allowedTypes.includes(type) ? type : undefined;
};

const parseIsFavourite = (value) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseContactType(type);
  const parsedFavourite = parseIsFavourite(isFavourite);

  const filters = {};
  if (parsedType) filters.contactType = parsedType;
  if (parsedFavourite !== undefined) filters.isFavourite = parsedFavourite;

  return filters;
};
