export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    character: [],
    favorites: [],
    planets: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      }

    case 'get_personajes':

      const { personajes } = action.payload

      return {
        ...store, character: personajes
      }
    case 'add_favorite':
      const newFavorite = action.payload.item;

      const isDuplicate = store.favorites.some(fav => fav.uid === newFavorite.uid);

      if (isDuplicate) {
        return {
          ...store,
          favorites: store.favorites.filter(fav => fav.uid !== newFavorite.uid)
        };
      } else {
        return {
          ...store,
          favorites: [...store.favorites, newFavorite]
        };
      }
      case 'get_planets':
            return {
                ...store,
                planets: action.payload.planets
            };
    default:
      throw Error('Unknown action.');
  }
}
