export const categories = (state = {}, action) => { // (1)
    switch (action.type) { // (2)
      case 'CHANGE_CATEGORIES':
        return {
          ...action.categories
        }
      default:
        return state
    }
  }