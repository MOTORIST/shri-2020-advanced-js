# Advanced JS (shri 2020)

## Getting Started <a name = "getting_started"></a>

### Prerequisites

```
const { allKeysAndSymbols, proxyIn, asyncExecutor } = require("./src/index.js");
```

```
    const MySet = require("./src/MySet");

    const set = new MySet([{ id: 1 }, { id: 2 }, { id: 1 }]);

    console.log([...set]);
    console.log("Size", set.size);
    console.log("Has", set.has({ id: 2 }));
    set.add({ id: 10 });
    console.log("HAS Add", set.has({ id: 10 }));
    console.log("Has DELETE 1 true", set.has({ id: 1 }));
    set.delete({ id: 1 });
    console.log("Has DELETE 1 false", set.has({ id: 1 }));
    set.clear();
    console.log("Has clear"), [...set];

    ...
```

### Tests

```
yarn install
yarn test
```
