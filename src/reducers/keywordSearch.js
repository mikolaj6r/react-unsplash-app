export const keywordSearch = (state = 'home', action) => {
    switch (action.type) {
      case 'KEYWORD_SEARCH':
        return action.keyword;
      default:
        return state;
    }
  }