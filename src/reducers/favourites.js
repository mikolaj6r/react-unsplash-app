export const favourites = (state = [], action) => { // (1)
    switch (action.type) { // (2)
      case 'CHANGE_FAVOURITES':
        return [
          ...action.favourites
        ]
      default:
        return state
    }
  }