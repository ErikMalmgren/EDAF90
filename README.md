EDAF90

Att fixa: 

* Create a react component, ViewOrder, to view the shopping cart and add it in App. The shopping cart should be an input to the component, as inventory is in ComposeSalad. 7. Add the ViewOrder component to App, i.e. <ViewOrder shoppingCart={shoppingCart}>.
This demonstrates the declarative power of react. When the state changes all affected subcomponents will automatically be re-renderd.
An order can contain several salads. Remember to set the key attribute in the repeated html/JSX element. Avoid using array index as key. This can break your application when a salad is removed from the list. This is explained in many blog posts, for example https: //medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318. Hint 1: use the uuid property in the Salad objects as key

**just nu visas en cart väldigt fult som bara visar att logiken fungerar men vi måste göra enligt labbanvisning**
