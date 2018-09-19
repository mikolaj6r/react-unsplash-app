export const changeCategories = (categories) => ({
    type: 'CHANGE_CATEGORIES',
    categories
  });

export const searchKeyword = (keyword) => ({
    type: 'KEYWORD_SEARCH',
    keyword
});
export const changeFavourites = (favourites) => ({
    type: 'CHANGE_FAVOURITES',
    favourites
});