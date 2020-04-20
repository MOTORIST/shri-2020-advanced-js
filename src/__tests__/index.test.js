const { allKeysAndSymbols, proxyIn, asyncExecutor } = require("..");

describe("allKeysAndSymbols", () => {
  it("should return all property names and symbols form object and prototype", () => {
    const object1 = { id: 1 };
    const a = Symbol("a");
    object1[a] = "localSymbol";

    const object2 = Object.create(object1);
    object2.title = "title";
    const b = Symbol("b");
    object2[b] = "localSymbol";

    const object3 = Object.create(object2);
    object2.description = "description";
    const c = Symbol("c");
    object2[c] = "localSymbol";

    const exp = allKeysAndSymbols(object3);
    const eq = [
      "id",
      "title",
      "description",
      a,
      b,
      c,
      "constructor",
      "__defineGetter__",
      "__defineSetter__",
      "hasOwnProperty",
      "__lookupGetter__",
      "__lookupSetter__",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toString",
      "valueOf",
      "__proto__",
      "toLocaleString",
    ];

    expect(exp).toIncludeSameMembers(eq);
  });
});

describe("proxyIn", () => {
  const proto = { value: 42 };
  const object = Object.create(proto);
  const isPropertyOfObject = (prop, object) => prop in object;

  Object.defineProperty(object, "year", {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
  });

  const symbol = Symbol("bazzinga");
  object[symbol] = 42;

  it("should return all properties, if not proxy object", () => {
    expect(isPropertyOfObject("value", object)).toBeTruthy();
    expect(isPropertyOfObject("year", object)).toBeTruthy();
    expect(isPropertyOfObject(symbol, object)).toBeTruthy();
  });

  it("should return own properties, if proxy object", () => {
    const proxyObject = proxyIn(object);
    expect(isPropertyOfObject("value", proxyObject)).toBeFalsy();
    expect(isPropertyOfObject("year", proxyObject)).toBeTruthy();
    expect(isPropertyOfObject(symbol, proxyObject)).toBeTruthy();
  });
});

describe("asyncExecutor", () => {
  it("should execute all promise and return result in promise", () => {
    const giveApple = () => {
      return new Promise((resolve) => resolve("🍎"));
    };

    const likeApple = (v) => {
      return new Promise((resolve) => resolve(`I like ${v}`));
    };

    asyncExecutor(function* () {
      const apple = yield giveApple();
      return yield likeApple(apple);
    }).then((res) => {
      expect(res).toBe("I like 🍎");
    });
  });

  it("should catch error if promise throw error", () => {
    const bigBang = () => {
      return new Promise((resolve, reject) => reject("💥"));
    };

    asyncExecutor(function* () {
      yield bigBang();
    }).catch((error) => {
      expect(error).toBe("💥");
    });
  });
});
