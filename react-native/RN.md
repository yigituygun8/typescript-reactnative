 # React Native: A Practical Beginner's Guide

 React Native is a framework for building mobile applications with **JavaScript** or **TypeScript** and **React**. With one codebase, you can create apps for Android and iOS while still using native platform components such as buttons, text inputs, and scroll views.

 > **Short version:** React Native lets you use React's component model to build real mobile apps.

 ## 1. What React Native Is

 A React Native application has three important parts:

 1. **JavaScript or TypeScript code** - describes the app's behavior and UI.
 2. **React** - manages components, state, and re-rendering.
 3. **Native platform code** - displays the result using Android and iOS components.

 React Native is not the same as a website inside a mobile wrapper. It renders native views, so the application can use mobile features such as the camera, notifications, location, and device storage.

 ### Bundlers: What You Need to Know

 A **bundler** takes the many files your app imports and turns them into code that the mobile app can load. It also transforms modern syntax, such as JSX and TypeScript, into executable JavaScript and includes imported assets such as images.

 React Native's bundler is called **Metro**. During development, Metro runs a local development server and sends the JavaScript bundle to your emulator or device. This is why changes can appear quickly through Fast Refresh.

 For a release build, the JavaScript code and required assets are packaged into the Android or iOS application. The user's phone does not need your Metro server running.

 #### The beginner-level picture

 ```text
 Your TypeScript/JS files
		   |
		   v
 Metro transforms and bundles them
		   |
		   v
 Development: device loads from Metro
 Release: bundle is included in the app
 ```

 You should understand these terms:

 - **Entry file**: the starting point Metro uses to find the rest of your imported code.
 - **Dependency graph**: the connected map of files imported by your app.
 - **Transform**: converting JSX, TypeScript, and modern JavaScript into runnable JavaScript.
 - **Asset**: a file used by the app, such as an image or font.
 - **Cache**: stored transformation results that make later builds faster.
 - **Fast Refresh**: updates the running app after code changes while preserving as much component state as possible.

 You do **not** need to learn Metro configuration at the beginning. Focus first on writing components and importing files correctly. Learn `metro.config.js`, custom transformers, aliases, and cache troubleshooting when you need custom assets, unusual project configuration, or a build problem.

 > **Important distinction:** Metro bundles JavaScript and app assets. Android Gradle and Xcode still build the native Android and iOS parts of the application.

 ### React Native vs. React

 | React | React Native |
 | --- | --- |
 | Primarily builds web interfaces | Builds Android and iOS applications |
 | Uses HTML elements such as `div` and `button` | Uses components such as `View` and `Pressable` |
 | Uses CSS for styling | Uses JavaScript objects with `StyleSheet` |
 | Runs in a browser | Runs on a mobile device or emulator |

 React Native uses the same React ideas, but the UI building blocks are different.

 ## 2. The Core Mental Model

 React Native applications are built from **components**. A component is a reusable piece of the interface, such as a profile card, login form, or navigation bar.

 A component receives **props**, stores changing information in **state**, and returns a description of what should appear on screen.

 ```tsx
 import { Pressable, Text } from 'react-native';
 import { useState } from 'react';

 export function Counter() {
	 const [count, setCount] = useState(0);

	 return (
		 <Pressable onPress={() => setCount(count + 1)}>
			 <Text>Pressed {count} times</Text>
		 </Pressable>
	 );
 }
 ```

 The flow is usually:

 `user action -> state update -> component re-renders -> screen changes`

 ## 3. Concepts You Need to Know

 ### Components

 Components are functions that return UI. Keep components focused and reusable. A screen is usually a larger component made from smaller components.

 ### JSX

 JSX is the syntax used to describe UI inside JavaScript or TypeScript. It looks similar to HTML, but it is not HTML.

 ```tsx
 <Text>Hello, mobile world!</Text>
 ```

 In React Native, JSX must use React Native components instead of browser elements.

 ### Props

 **Props** are read-only values passed from a parent component to a child component.

 ```tsx
 function Welcome({ name }: { name: string }) {
	 return <Text>Welcome, {name}</Text>;
 }

 <Welcome name="Leyla" />
 ```

 Use props to customize a component or provide it with data.

 ### State

 **State** is data that can change while the app is running. When state changes, React updates the component's UI.

 ```tsx
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 ```

 Do not change state directly. Use its setter function, such as `setIsLoggedIn`.

 ### Hooks

 Hooks are functions that give components React features:

 - `useState` stores changing values.
 - `useEffect` runs side effects such as fetching data or subscribing to events.
 - `useContext` reads shared values without passing props through every component.
 - `useRef` stores a value that should survive renders without causing a re-render.

 Use effects for external work, not for ordinary calculations that can happen during rendering.

 ### Events

 Mobile interfaces respond to events such as presses, text changes, scrolling, and gestures.

 ```tsx
 <Pressable onPress={handleSave}>
	 <Text>Save</Text>
 </Pressable>
 ```

 Event handlers should be small and should call separate functions when the operation becomes more complex.

 ### Styling and Layout

 React Native styles are JavaScript objects rather than CSS files.

 ```tsx
 import { StyleSheet, Text } from 'react-native';

 <Text style={styles.title}>Dashboard</Text>

 const styles = StyleSheet.create({
	 title: {
		 fontSize: 24,
		 fontWeight: '700',
		 color: '#17202A',
	 },
 });
 ```

 Layout is mainly based on **Flexbox**. Common properties include:

 - `flexDirection`: arranges children in a row or column.
 - `justifyContent`: positions children along the main axis.
 - `alignItems`: positions children along the cross axis.
 - `padding` and `margin`: control spacing.
 - `flex`: allows an element to grow and fill available space.

 The default `flexDirection` in React Native is `column`, unlike the web's common row-based default.

 ### Lists

 Use `FlatList` for long or dynamic lists because it renders items efficiently.

 ```tsx
 <FlatList
	 data={tasks}
	 keyExtractor={(task) => task.id}
	 renderItem={({ item }) => <Text>{item.title}</Text>}
 />
 ```

 `ScrollView` is useful for smaller content that does not need virtualization.

 ### Navigation

 Navigation moves users between screens. A navigation library usually provides:

 - **Stack navigation**: screens open on top of one another, like moving forward and back.
 - **Tab navigation**: users switch between main sections.
 - **Drawer navigation**: a side menu reveals additional destinations.

 A navigation state describes which screen is active and what data was passed to it.

 ### Data and APIs

 Apps often request data from a backend API. A typical flow is:

 1. Show a loading state.
 2. Make a network request.
 3. Store the response in state.
 4. Show the data or an error message.

 Always handle loading, success, empty, and error states. Users should not be left looking at a blank screen.

 ## 4. Essential React Native Vocabulary

 | Term | Meaning |
 | --- | --- |
 | **Component** | A reusable UI building block. |
 | **Screen** | A component representing a complete app view. |
 | **Props** | Read-only data passed into a component. |
 | **State** | Data that changes and updates the UI. |
 | **Render** | React creating or updating the visible UI. |
 | **Hook** | A React function such as `useState` or `useEffect`. |
 | **View** | A basic layout container, similar in purpose to a web `div`. |
 | **Text** | The component used to display text. |
 | **Pressable** | A component for handling press interactions. |
 | **TextInput** | A component for entering text. |
 | **Safe area** | The visible region that avoids notches, rounded corners, and system bars. |
 | **Emulator / simulator** | A virtual Android device or iPhone used for development. |
 | **Metro** | React Native's JavaScript bundler and development server. |
 | **Bundle** | The packaged JavaScript code delivered to the app. |
 | **Native module** | JavaScript access to platform-specific Android or iOS functionality. |
 | **Deep link** | A URL that opens a particular screen in the app. |
 | **Build** | The process of creating an installable application. |

 ## 5. Expo and the React Native CLI

 **Expo** is a toolset and platform that simplifies React Native development. It provides project templates, development tools, and many ready-to-use device APIs.

 The **React Native Community CLI** gives more direct control over the Android and iOS native projects.

 A useful beginner rule:

 - Start with **Expo** when you want to learn React Native or build an ordinary mobile app quickly.
 - Consider the **Community CLI** when you need unusual native configuration or full control over native project files.

 Both approaches use React Native components and concepts.

 ## 6. A Sensible Project Structure

 A small project can begin with:

 ```text
 src/
	 components/   Reusable UI pieces
	 screens/      Full app screens
	 navigation/   Navigation configuration
	 services/     API and device integrations
	 hooks/        Reusable custom hooks
	 types/        Shared TypeScript types
	 utils/        Small general-purpose helpers
 ```

 Do not create folders just to follow a template. Add structure when it makes responsibilities easier to find.

 ## 7. Good Practices from the Beginning

 - Use **TypeScript** to catch incorrect data and missing properties early.
 - Keep components small enough to understand at a glance.
 - Give interactive elements accessible labels and clear feedback.
 - Handle loading, empty, error, and offline states.
 - Avoid putting every value in global state; keep state close to where it is used.
 - Use stable keys for list items, usually a database ID rather than an array index.
 - Test on both Android and iOS when the app supports both platforms.
 - Test on a real device before release; emulators cannot reproduce every device behavior.
 - Keep secrets such as API keys out of source control.
 - Optimize only after measuring. Correctness and readable code come first.

 ## 8. Common Beginner Mistakes

 ### Using web elements

 This is incorrect in React Native:

 ```tsx
 <div><button>Save</button></div>
 ```

 Use `View`, `Pressable`, and `Text` instead.

 ### Mutating state directly

 Avoid changing an array or object in place when it is stored in state. Create a new value so React can detect the update.

 ```tsx
 setTasks((currentTasks) => [
	 ...currentTasks,
	 newTask,
 ]);
 ```

 ### Ignoring platform differences

 Android and iOS can differ in permissions, keyboard behavior, back navigation, styling, and available APIs. Shared code is the goal, not the promise that every detail is identical.

 ### Overusing `useEffect`

 An effect is for synchronizing with something outside React. Do not use it merely to calculate a value from other props or state.

 ## 9. Learning Roadmap

 1. Learn JavaScript or TypeScript fundamentals: variables, functions, arrays, objects, modules, and async code.
 2. Learn React: components, JSX, props, state, hooks, and conditional rendering.
 3. Build small React Native screens with `View`, `Text`, `Image`, `TextInput`, and `Pressable`.
 4. Practice Flexbox and responsive layouts.
 5. Add navigation and forms.
 6. Connect to an API and handle all request states.
 7. Learn device permissions, storage, notifications, and platform-specific code.
 8. Add testing, performance checks, and production builds.

 ### Good first projects

 - A task list with filters
 - A notes app with local storage
 - A weather app using an API
 - A small expense tracker
 - A multi-screen profile application

 ## 10. Quick Reference

 Common imports:

 ```tsx
 import {
	 FlatList,
	 Image,
	 Pressable,
	 ScrollView,
	 StyleSheet,
	 Text,
	 TextInput,
	 View,
 } from 'react-native';
 ```

 When debugging, ask:

 1. Is the component receiving the props I expect?
 2. Is the state changing after the user action?
 3. Is the component rendering the correct loading, empty, or error state?
 4. Is a style or layout rule hiding the content?
 5. Is the problem specific to Android, iOS, or both?

 React Native becomes much easier once these questions become a habit. Start with small components, make the data flow explicit, and build one complete feature at a time.
