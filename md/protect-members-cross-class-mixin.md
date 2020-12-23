In my project, I have gone through three stages when using mixin. Your problem happens to be my problem in the third stage, so I provide my three-stage solution, hoping to help you.

The first stage: I just need a simple mixin, and I don't care what target class it will be added to. There is no requirement for the specification of the target class, So the code is very simple:

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function ActivatableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;
    activate() {
      this.isActivated = true;
      this.deactivate();
    }
    deactivate() {
      this.isActivated = false;
    }
    test() {
      console.log(this.isActivated ? 'activated' : 'not activated');
    }
  };
}

class User {
  name: string;
  me: string;
  constructor(name: string) {
    this.name = name;
    this.me = "hi";
  }
}

const ActivatableUser = ActivatableMixin(User);

// Instantiate the new `ActivatableUser` class
const user = new ActivatableUser("John Doe");

// Initially, the `isActivated` property is false
console.log(user.isActivated);

// Activate the user
user.activate();
user.test();

// Now, `isActivated` is true
console.log(user.isActivated);
```

The second stage: I need to be able to access some members (properties or methods) of the target class in the mixin, so I also require that the target class must contain these members. If a class does not contain these members, don't expect to use my mixin. This requires adding some specifications to the first stage code:

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * the target class must fit the Activatable Interface to use the mixin
 */
interface Activatable {
  me: string
}

/**
 * Note that the mixin target class specification is specified here
 * <TBase extends Constructor<Activatable>> 
 * instead of
 * <TBase extends Constructor>
 */
function ActivatableMixin<TBase extends Constructor<Activatable>>(Base: TBase) {
  return class extends Base {
    isActivated = false;
    activate() {
      this.isActivated = true;
      this.deactivate();
    }
    deactivate() {
      this.isActivated = false;
    }
    test() {
      // with target class specification we can access members form specification
      console.log(this.me)
      console.log(this.isActivated ? 'activated' : 'not activated');
    }
  };
}

class UserNoMe {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// UserNoMe does not fit Activatable so can not be mixied
const ActivatableUserNoMe = ActivatableMixin(UserNoMe); // ts2345 error

class UserHasMe {
  name: string;
  me: string;
  constructor(name: string) {
    this.name = name;
    this.me = "hi";
  }
}
// UserHasMe fits Activatable so can be mixied
const ActivatableUser = ActivatableMixin(UserHasMe);

// Instantiate the new `ActivatableUser` class
const user = new ActivatableUser("John Doe");

// Initially, the `isActivated` property is false
console.log(user.isActivated);

// Activate the user
user.activate();
user.test();

// Now, `isActivated` is true
console.log(user.isActivated);
```

The third stage: I need to access the protected members in the target type in mixin. At this time, my first idea is to change the members into protected mode in the specification interface. However, the members of the interface can not use the protected modifier (which is contrary to the responsibilities of the interface), so other methods are needed. Finally, I use the following methods to achieve this:

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * protected members need to be accessed across class and mixin are extracted here
 * 
 */
class ProtectedMembersCrossClassAndMixin {
  protected me: string;
  protected saySomething() {
    throw new Error('must be implement by ')
  }
}

/**
 * the target class must fit the Activatable Interface to use the mixin
 * with protected menmbers derive from ProtectedMembersCrossClassAndMixin
 */
interface Activatable extends ProtectedMembersCrossClassAndMixin {
  you: string
}

/**
 * Note that the mixin target class specification is specified here
 * <TBase extends Constructor<Activatable>> 
 * instead of
 * <TBase extends Constructor>
 */
function ActivatableMixin<TBase extends Constructor<Activatable>>(Base: TBase) {
  return class extends Base {
    isActivated = false;
    activate() {
      this.isActivated = true;
      this.deactivate();
    }
    deactivate() {
      this.isActivated = false;
    }
    test() {
      // with target class specification we can access members within specification
      console.log(this.you)
      // alse access protected members
      console.log(this.me);
      console.log(this.isActivated ? 'activated' : 'not activated');
    }
    /**
     * also access or override protected method members
     */  
    saySomething() {
      super.saySomething();
      console.log('hello activatable mixed');
    }
  };
}

class UserNo {
  name: string;
  you: string;
  protected me: string;
  constructor(name: string) {
    this.name = name;
  }
  protected saySomething() {
    console.log('oh my');
  }
}

// UserNo does fit Activatable 
// but not derive from  ProtectedMembersCrossClassAndMixin 
// so can not be mixied
const ActivatableUserNoMe = ActivatableMixin(UserNo); // ts2345 error

// this one can be mixed
class UserHas extends ProtectedMembersCrossClassAndMixin {
  name: string;
  you: string;
  protected me: string;
  constructor(name: string) {
    super();
    this.name = name;
    this.me = "hi";
  }
  /**
   * typescript will not warn you if you forget to implement this method
   * because typescript thought it's implemented in  ProtectedMembersCrossClassAndMixin
   * which is not really
   */ 
  protected saySomething() {
    console.log('hello');
  }
}
// UserHas fits Activatable so can be mixied
const ActivatableUser = ActivatableMixin(UserHas);

// Instantiate the new `ActivatableUser` class
const user = new ActivatableUser("John Doe");

// Initially, the `isActivated` property is false
console.log(user.isActivated);

// Activate the user
user.activate();
user.test();

// Now, `isActivated` is true
console.log(user.isActivated);
```

Caveats for ProtectedMembersCrossClassAndMixin:

1. The code of the class is different from that of the interface. It will still exist after compilation, so we should keep the class minimized,So don't include any implementation code.
2. Only those that really need to be protected are put into this class, and others are still put into the interface
3. There is another level of inheritance.
4. Don't forget: both sides of base class and mixin specification interface should extend this class
5. Subclasses that inherit from this class may forget to implement those inherited members
6. Use it when you really know you need it and understand the defects