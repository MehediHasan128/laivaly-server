export const createProductID = (
  group: string,
  category: string,
  subCategory: string,
) => {
  const firstLetter = (name: string) => name.trim().charAt(0).toUpperCase();

  const productHexCode = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();

  if (group && category && subCategory) {
    const productType = `${firstLetter(group)}${firstLetter(category)}${firstLetter(subCategory)}`;

    return `LP-${productType}-${productHexCode}`;
  }

  return `LP-${productHexCode}`;
};
