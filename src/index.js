function getOwnPropertyNamesAndSymbols(object) {
  return [
    ...Object.getOwnPropertyNames(object),
    ...Object.getOwnPropertySymbols(object),
  ];
}

function allKeysAndSymbols(object) {
  const namesAndSymbols = getOwnPropertyNamesAndSymbols(object);

  const prototype = Object.getPrototypeOf(object);

  if (!prototype) {
    return namesAndSymbols;
  }

  return [...namesAndSymbols, ...allKeysAndSymbols(prototype)];
}

function proxyIn(object) {
  const proxyObject = new Proxy(object, {
    has(target, prop) {
      const namesAndSymbols = getOwnPropertyNamesAndSymbols(target);
      return namesAndSymbols.includes(prop);
    },
  });

  return proxyObject;
}

function asyncExecutor(generator) {
  const iterator = generator();

  const executor = ({ value, done }) => {
    if (done) {
      return Promise.resolve(value);
    }

    return Promise.resolve(value)
      .then((res) => executor(iterator.next(res)))
      .catch(generator.throw);
  };

  return executor(iterator.next());
}

module.exports = {
  allKeysAndSymbols,
  proxyIn,
  asyncExecutor,
};
