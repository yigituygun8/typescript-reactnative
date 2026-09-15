import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
}); // This context is used to manage the state of favorite meals in the application. It provides a default value with an empty array for `ids`, and two functions `addFavorite` and `removeFavorite` that can be implemented to add or remove meal IDs from the favorites list.

// The `FavoritesContextProvider` component will be responsible for providing the context to its children components. It will manage the state of favorite meal IDs and provide functions to add or remove IDs from the favorites list.
function FavoritesContextProvider({ children }) {
    const [favoriteIds, setFavoriteIds] = useState([]);

    const addFavorite = (id) => {
        setFavoriteIds((prevIds) => [...prevIds, id]); // This function adds a new meal ID to the list of favorite IDs. It uses the previous state to ensure that the new ID is added to the existing list without overwriting it.
    };

    const removeFavorite = (id) => {
        setFavoriteIds((prevIds) => prevIds.filter((favId) => favId !== id));
    };

    const value = {
        ids: favoriteIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    }

    // value means the value that will be provided to the components that consume this context. It includes the current list of favorite IDs and the functions to add or remove favorites.
    return <FavoritesContext.Provider value={value}>
        {children}
    </FavoritesContext.Provider>
}

export default FavoritesContextProvider;