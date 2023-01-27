## Reflection question 1
### A functional component is easier to read because they are plain JS functions without state or hooks. Class components contain more code and require you to extend from React, but gives the developer more options, such as introducing state (and implements logic) and lifecycle methods. Functional components simply accept data and displays it. 

## Reflection question 2
### If the output of the render function depends on other data that changes over time, the component may not re-render or update correctly. This is because the component will not be aware of the changes in the external data, and so it will not trigger a re-render. To fix this, you can either pass the external data as props to the component or use the useEffect hook.

## Reflection question 3
### Yes, useMemo is a React Hook that lets you cache the result of a calculation between re-renders.  

## Reflection question 4
### When the state changes

### Reflection question 5: When the user change the html form state (DOM), does this change the state of your component?
### Yes, because changing the html form state changes the state of the component

### Reflection question 6: For a class based component, what is the value of this in the event handling call-back functions?
### When using a class based component this refers to the instance of the component