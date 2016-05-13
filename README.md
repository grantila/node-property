# property

*property* is a getter-setter wrapper object, which wraps any value. The value is read by calling the property without an argument, and is set by calling the property with the value as argument.

`property` objects emit events to notify when they are changed.

The idea behind `property` comes from mithril's `m.prop()` feature, which is useful not only in mithril, but together with other frameworks, e.g. React.

## Usage

```js
var property = require( 'property' );

var prop = property( ); // Creates a property
prop( );     // Returns undefined
prop( 5 );   // Sets value 5
prop( );     // Returns 5
prop( "x" ); // Sets value "x"
prop( );     // Returns "x"

var prop2 = property( "test" ); // Creates a property with initial value "test"
prop( ); // Returns "test"

var prop3 = property( 1 );
prop3.emitter.on( 'data', data => console.log( data ) );
prop3( prop3( ) + 1 ); // Reads value, adds one, then sets value
// console.log: 2
```

Since event emitters are used, if you add a listener, you must remember to remove the listener when appropriate, or your application will leak memory. This applies to all usages of event emitters, `property` is no exception.

### Manually triggering change events

To trigger an event to be sent, use the `notify( )` function. This can be useful if you want to bypass built-in getter-setter notification by modifying internal properties in the object.

```js
var prop = property( { } );
// ...
prop( )[ "hello" ] = "world"; // Modifies the object, but will not notify
prop.notify( );               // Manually notify
```

## Masquerading

### Property objects fit in JSON objects

A property object is auto-convertible to JSON.

```js
var prop = property( { a: 1 } );
JSON.stringify( { p: prop } ); // -> { p: { a: 1 } }
```

### Property objects forward `toString` and `valueOf`.

A property object has a `toString` and a `valueOf` function which forwards to the underlying value.

```js
var prop = property( 1 );
1 + prop; // -> 2

var prop2 = property( "world" );
"hello " + prop2; // -> "hello world"
```
