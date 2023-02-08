### Reflection question 1: As an alternative to the function component above you can use a class component: class ComposeSalad extends react.Component {}. Is there a difference between class components and function components concerning features (use cases where only one of them can be used)?

#### A functional component is easier to read because they are plain JS functions without state or hooks. Class components contain more code and require you to extend from React, but gives the developer more options, such as introducing state (and implements logic) and lifecycle methods. Functional components simply accept data and displays it. However, functional components have access to hooks which can be used to handle state and other features typically only available in class components. 

### Reflection question 2: The render function must be a pure function of props and the component state, the values returned by useState(). What happens if the output of the render function is depending on other data that changes over time? 

#### If the output of the render function depends on other data that changes over time, the component may not re-render or update correctly. This is because the component will not be aware of the changes in the external data, and so it will not trigger a re-render. To fix this, you can either pass the external data as props to the component or use the useEffect hook. 

### Reflection question 3: In the code above, the foundations array is computed every time the component is rendered. The inventory changes very infrequent so this is inefficient. Can you cache foundations so it is only computed when props.inventory changes?

#### Yes, useMemo is a React Hook that lets you cache the result of a calculation between re-renders.

### Reflection question 4: What triggers react to call the render function and update the DOM? 

#### When the state changes. React uses a virtual DOM to keep track of changes in the component's state, and when the state changes, React calls the render function to update the virtual DOM and subsequently update the actual DOM. This process is called re-rendering, and it ensures that the component always displays the most up-to-date data.

### Reflection question 5: When the user change the html form state (DOM), does this change the state of your component?

#### Yes, because changing the html form state changes the state of the component. The state of a component can change when the user interacts with the form and changes the html form state. 

### Reflection question 6: For a class based component, what is the value of this in the event handling call-back functions?
#### When using a class based component this refers to the instance of the component. 

### Reflection question 7: How is the prototype chain affected when copying an object with copy = {...sourceObject}?
#### The prototype chain is changed --> spread tar bara enumerable, typen följer inte med