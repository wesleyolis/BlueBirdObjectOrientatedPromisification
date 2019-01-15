# BlueBirdObjectOrientatedPromisification
BlueBird - Object Orientate Promisification with types

## Methods

### With only a callback will execute the promise and return the result
```.ts
const result = await Promisify(method)
```

### With mutiple parameters will return a promisified method
```.ts
const promise = Promisify(method);
const results = await promise(param1, param2, param3, param3);
```
## Object and Method, instead of using bluebird context

Will ensure that the method key exists on the object.

### With only a callback will execute the promise and return the result
```.ts
const result = await Promisify(object, 'method');
```

### With mutiple parameters will return a promisified method
```.ts
const promise = Promisify(object, 'method');
const results = await promise(param1, param2, param3, param3);
```

### Promises Return type can also be overloaded
Requires spesifying both Promise Return type and callback method type.
```.ts
const promise = Promisify<{results : ''},(() => void)>(method);
```

## Promise with ReturnType, some weird libaries.
```.ts
const promise = PromisifyReturn(...);
let returnType = {}
promise(....,returnType);

console.log(returnType['executeResult']);
```
