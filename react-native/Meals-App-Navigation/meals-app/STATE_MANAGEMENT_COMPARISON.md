# Context API vs Redux

This guide compares two ways to implement the favorites feature in this Meals App. The goal is to understand the design decisions, not to treat one approach as universally better.

## The Problem

Several screens need to read or change the same state:

```text
MealDetailScreen  -- toggle favorite -->  favorites state  <-- read -- FavoritesScreen
```

The state should have one owner. Both screens should render from that shared state instead of maintaining separate local copies.

For this project, a favorite can be represented by a list of meal IDs:

```js
["m1", "m4", "m8"]
```

Keeping IDs rather than duplicated meal objects avoids stale copies. The full meal data remains in `data/dummy-data.js`.

## First: Choose the Smallest State Tool

Use the simplest tool that matches the scope of the state:

| State type | Good default | Example |
| --- | --- | --- |
| Used by one component | `useState` | A pressed button or input value |
| Shared by a nearby component subtree | Props or a small Context | A theme or form section |
| Shared across unrelated screens | Context + `useReducer`, or Redux Toolkit | Favorites |
| Server/cache state | A data-fetching library | API meals, loading, retries, caching |
| Navigation state | React Navigation | Current route and navigation history |

Context and Redux are not replacements for every kind of state. In particular, Redux should not be used just because an app has more than one component.

## Context API

React Context lets a provider make a value available to descendants without passing it through every intermediate component. Context itself does not define update rules, persistence, or asynchronous workflows. It is commonly paired with `useReducer` when state transitions need to be explicit.

### Typical shape

```jsx
const FavoritesContext = createContext({
  ids: [],
  toggleFavorite: () => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteIds, dispatch] = useReducer(favoritesReducer, []);

  function toggleFavorite(mealId) {
    dispatch({ type: "TOGGLE", payload: mealId });
  }

  const value = {
    ids: favoriteIds,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
```

The provider would wrap the navigation tree in `App.js`:

```jsx
<FavoritesContextProvider>
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
</FavoritesContextProvider>
```

Consumers use the context directly:

```jsx
const { ids, toggleFavorite } = useContext(FavoritesContext);
const isFavorite = ids.includes(meal.id);
```

### Context strengths

- No additional dependency.
- Small amount of setup for app-wide values.
- A good learning path for providers, consumers, reducers, and immutable updates.
- Clear fit for low-frequency shared state such as a theme, current user, or this app's favorites.

### Context limitations

- Every consumer of a context value can re-render when that value changes.
- A single context containing unrelated values becomes difficult to reason about.
- There is no built-in action history, middleware pipeline, or Redux DevTools workflow.
- Async workflows, persistence, and derived state are conventions that the team must design.

For a larger Context solution, split contexts by responsibility and keep the provider value stable where useful. Do not put the entire application state into one giant context.

## Redux with Redux Toolkit

Redux is a predictable state container with a single store. React Redux connects that store to components. Redux Toolkit (RTK) is the official recommended way to write Redux today; it removes much of the old handwritten Redux boilerplate.

The modern Redux flow is:

```text
component -> dispatch(action) -> slice reducer -> store update -> selector -> component
```

### Installation

This project does not currently include Redux packages. Add them with:

```bash
npm install @reduxjs/toolkit react-redux
```

### Typical shape

`store/redux/favoritesSlice.js`:

```js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    favoriteToggled(state, action) {
      const mealId = action.payload;
      const index = state.ids.indexOf(mealId);

      if (index === -1) {
        state.ids.push(mealId);
      } else {
        state.ids.splice(index, 1);
      }
    },
  },
});

export const { favoriteToggled } = favoritesSlice.actions;
export default favoritesSlice.reducer;
```

`store/redux/store.js`:

```js
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
```

Wrap the app with React Redux's provider in `App.js`:

```jsx
<Provider store={store}>
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
</Provider>
```

Read and update the store from a screen:

```jsx
const favoriteIds = useSelector((state) => state.favorites.ids);
const dispatch = useDispatch();

dispatch(favoriteToggled(meal.id));
```

### Redux strengths

- A consistent architecture for many shared state domains.
- Selectors let components subscribe to the exact data they need.
- Actions make state transitions explicit and easy to inspect.
- Middleware supports logging, persistence, analytics, and async workflows.
- Redux DevTools provides useful inspection and action history.
- RTK includes good defaults and uses Immer so reducer updates can be written clearly.

### Redux limitations

- More setup and concepts for a small feature.
- Requires `@reduxjs/toolkit` and `react-redux` dependencies.
- The team must maintain store, slice, selector, and provider boundaries.
- A global store can encourage putting local or server state in the wrong place.

## Side-by-Side Comparison

| Question | Context + `useReducer` | Redux Toolkit |
| --- | --- | --- |
| Extra dependency? | No | Yes |
| Main state owner | Provider and reducer | Redux store and slice reducers |
| How updates happen | Dispatch to a local reducer | Dispatch an action to the store |
| Best scale | Small to medium shared state | Medium to large application state |
| Re-render control | Context consumer boundaries | Selector subscriptions |
| Debugging | React DevTools and logs | Redux DevTools plus action history |
| Async conventions | You design them | Middleware and RTK patterns |
| Learning value here | Understand React fundamentals | Understand scalable state architecture |
| Best fit for this demo | Excellent | Useful as a second implementation |

## What I Would Choose for This App

Implement Context first because favorites are a small, focused state domain and the project already has `store/context/favorites-context.js`. This makes the data flow visible while learning.

Then implement the same feature with Redux Toolkit as a comparison exercise. Keep the approaches separate while learning: do not mount both providers and let two different sources of truth control favorites at the same time.

For a production app, the choice depends on the rest of the state:

- Choose Context + `useReducer` when the shared state is limited and the team values minimal dependencies.
- Choose Redux Toolkit when many unrelated screens and features need coordinated state, traceable events, middleware, or advanced debugging.
- Use a server-state library for remote data instead of turning Redux or Context into an improvised cache.

## Modern Practices

1. Prefer Redux Toolkit APIs such as `configureStore` and `createSlice`. Avoid teaching new code with legacy `createStore`, handwritten action constants, or manually combined reducers.
2. Keep state serializable. Store meal IDs, booleans, strings, and plain objects; avoid putting navigation objects, functions, class instances, or React elements in shared state.
3. Name actions as events, such as `favoriteToggled`, rather than commands such as `setFavorite`. The reducer should decide the resulting state.
4. Keep derived values out of the store. For example, compute `favoriteMeals` from IDs and the meal list instead of storing a second duplicated array.
5. Keep local UI state local. A modal's visibility does not belong in the global favorites state merely because the modal is rendered by a screen.
6. Test the reducer independently. Given an initial state and an action, verify the next state without rendering a screen.
7. Add persistence only when the product needs it. For this demo, in-memory state is enough; persistence introduces storage, hydration, and failure handling decisions.

## A Good Learning Exercise

Build the same behavior twice:

1. Context version: `FavoritesContext`, `favoritesReducer`, provider in `App.js`, and consumers in `MealDetailScreen` and `FavoritesScreen`.
2. Redux version: `favoritesSlice`, `store`, Redux `Provider`, `useSelector`, and `useDispatch`.
3. Use the same state shape and action meaning in both versions.
4. Compare setup, readability, re-render behavior, testing, and debugging.
5. Keep only one implementation active while running the app.

The important result is not memorizing API names. It is recognizing that both approaches centralize ownership and make updates predictable, while Redux provides a more structured ecosystem for state that outgrows a few providers.

## References

- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [Redux Toolkit: Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
- [Redux: Modern Redux Setup](https://redux.js.org/usage/structuring-reducers/using-reducer-logic)