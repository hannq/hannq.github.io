---
path: "/blog/editor-oriented-programming"
publishDate: 2020-01-11
title: "[未完待续]如何面向编辑器编程？"
cover: "./images/cover.png"
---

# [未完待续]面向编辑器编程

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;—— **Typescript 篇**

###### 前言

> 为什么叫 `面向编辑器编程`，大家可能没听过，~~因为名字是我自己瞎编的~~，但是大家可能听过  `面向对象编程`、`面向过程编程` 等等，那么`面向编辑器编程` 是什么意思呢？`面向 xxx 编程`, 其实是一种 `设计模式(面向对象编程、面向过程编程)`、`编程范式(函数式编程)`、`行为习惯[面向百度/谷歌编程、面向测试编程(手动@我司)]` 等等在编程上的体现，所以 `面向编辑器编程` ，顾名思义，就是写出让编辑器认识的代码，并让编辑器辅助我们编写/校验代码。如果我们写出的代码连编辑器都不认识，那么可能在一段时间(~~第二天~~)之后，自己写的代码自己都不认识，别的同事接手(~~接盘~~)成本也会变大。

## 目录

[toc]

```toc

```

## 大纲

1. `Typescript` 介绍
   1. 基本介绍
   2. 基础知识&常见利用类型推断的用法
   3. `Typescript`内置常见 `泛型操作符` 介绍
   4. 如何自己写一个`泛型操作符`
   5. 一些 `泛型操作符` 的高级写法
2. 写出编辑器让编辑器 "认识" 的代码
   1. 写 `Typescript` 代码时的一些注意事项&原则&小技巧
   2. 写 `Javascript` 代码时的一些注意事项&原则&小技巧
3. **Q&A**
   1. `面向编辑器编程` 的优势在哪里
   2. 如何平稳地接入 `面向编辑器编程`
   3. 真的一定要每一行代码都必须要有完善的提示吗
   4. 哪些场景适合 `面向编辑器编程`

## `Typescript` 介绍

### 1. 基本介绍

#### 1.1 简介

 `Typescript` 是 `Javascript` 的超集，意味着 `Javascript` 本身的语法在 `Typescript` 里面也能跑的通。`Typescript`一方面是对 `Javascript` 加上了很多条条框框的限制，另一方面是拓展了 `Javascript` 的一些能力，就像 `es6` 提供了那么多神奇的语法糖一样。只要按照一定的规则去书写`Javascript` ，就能享受到 `Typescript` 带来的好处。

### 2. 基础知识&常见用法

#### 2.1 基础知识

##### 2.1.1 `Typescipt` 中的基础类型

```typescript
/** string 类型 */
const str: string = 'aaa';

/** number 类型 */
const num: number = 100;

/** boolean 类型 */
const bool: string = true;

/** Array 类型 */
const arr: string[] = [];

/** 元组 类型 */
const tuple: [string, number] = ['aaa', 100];

/** 枚举 类型 */
enum Color {
    Red = 1,
    Green,
    Blue
}
const c: Color = Color.Green;

/** Any 类型 */
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

/** Void 类型 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void */
function warnUser(): void {
    console.log("This is my warning message");
}

/** Null 和 Undefined 类型 */
let u: undefined = undefined;
let n: null = null;

/** Never 类型，never类型表示的是那些永不存在的值的类型，never类型是任何类型的子类型，也可以赋值给任何类型*/
function error(message: string): never {
	throw new Error(message);
}

/** Object 类型 表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。 */
const obj = {
	a: 'aaa',
    b: 100
}
```

##### 2.1.2 `Typescipt` 中指派类型的方法

###### 类型断言

```typescript
/** 使用尖括号方式 `尖括号` */
const someValue: any = "this is a string";
const strLength: number = (<string>someValue).length;

/** 使用 `as` 语法 */
const someValue: any = "this is a string";
const strLength: number = (someValue as string).length;
```

> **Tips**:  当你在`Typescript` 里使用 `JSX` 时，只有 `as` 语法断言是被允许的。

###### 类型赋值

```typescript
const someValue: number = "this is a string";
```


###### 类型推断

```typescript
/** 此时 num 被自动推断为 number 类型 */
const num = 1200;
```

> **Notes**： 以上的权重依次递减，即：`类型断言` $\gt$ `类型赋值` $\ge$ `类型推断`，所以当类型推断存在偏差时，可以使用 `类型断言` 来纠正 `类型推断`，反之则不行。

#### 2.2 常见利用类型推断的用法

##### 2.2.1 基础的类型推断

###### 基本方式

```typescript
/** 此时 num 的类型为 number */
const num = 3;

/** 此时 str 的类型为 string */
const str = 'hello world';
```

###### 基础类型推断(这种方式也被称为类型保护)

```typescript
/** 使用 typeof、instanceof 推断类型 */
function Foo(val: any) {
  	if (typeof val === 'string') {
    	/* 在这个块中，TypeScript 知道 `val` 的类型必须是 `string` */
    	console.log(val.substr(1));
  	}
    /** 无法保证 `val` 是 `string` 类型 */
  	val.substr(1);
}

function Foo2(val: any) {
    if (val instanceof String) {
        /* 在这个块中，TypeScript 知道 `val` 的类型必须是 `string` */
        console.log(val.substr(1));
    }
    /** 无法保证 `val` 是 `string` 类型 */
    val.substr(1);
}

/** 使用 in 操作符 推断类型 */
interface A {
  	a: number;
}

interface B {
  	b: string;
}

function Foo(val: A | B) {
  	if ('b' in val) {
    	/** 此时 val 类型为 A */
  	} else {
    	/** 此时 val 类型为 B */
  	}
}

/** 使用 字面量类型 推断类型 */
interface A {
  	propName: 'a';
};

interface B {
  	propName: number;
};

function Foo(val: A | B) {
	if (val.propName === 'a') {
		/** 此时 val 类型为 A */
  	} else {
    	/** 此时 val 类型为 B */
  	}
}
```

###### 类型可以被传递

```typescript
/** 推断函数返回为一个 number 类型 */
function add(a: number, b: number) {
  return a + b;
}

/** 这里同样可以推断函数返回为一个 number 类型 */
function double(a: number, b: number) {
  return add(a, b) * 2;
}
```

> **Tips**: 在类型传递时遇到 `any`, 会直接被同化成 `any`, 这里需要小心使用

##### 2.2.2 一些其他推断类型的方法

###### 解构

```typescript
const foo = {
  a: '123',
  b: 456
};

/**
 * 这里可以准确地得到
 * a 的类型为 string
 * rest 的类型为 { b: number } 所以解构也可以当作 Omit 泛型操作符使用，缺点是可能造成无用变量的冗余
 */
const { a, ...rest } = foo;
```

###### 自定义类型推断的规则

```typescript
function checkIsDog(val: any): val is 'dog' {
  	return val === 'dog'
}

function Foo (val: any) {
	if(checkIsDog(val)) {
    	/** 这里 TypeScript 可以得到 val 的准确的类型为 'dog' */
  	}
}
```

### 3. `Typescript`内置常见 `泛型操作符` 介绍

```typescript
/** 把传入的类型全部转换为 可选类型 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/** 把传入的类型全部转换为 必填类型 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/** 把传入的类型全部转换为 只读类型 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/** 从传入的 K 中取出 T 中的类型 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/** 创建一个以 K 为 key， T 为 value 的类型 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

/** 从 T 中排除掉 U 的类型 */
type Exclude<T, U> = T extends U ? never : T;


/** 从 T 中提取 U 所包含的类型 */
type Extract<T, U> = T extends U ? T : never;

/** 从 T 中忽略掉 K 为 key 的属性 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/** 从 T 排除掉所有的 null 或 undefined 类型 */
type NonNullable<T> = T extends null | undefined ? never : T;

/** 把函数的入参类型以元组类型取出 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/** 把构造函数的入参类型以元组类型取出 */
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

/** 把函数的返回值类型取出 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/** 取出构造函数的实例类型 */
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

```

### 4. 如何自己写一个 `泛型操作符`

##### 4.1 了解 `Typescript` 中的高级类型。

> `Typescript` 中类型分为 `基础类型`  和 `高级类型`, `基础类型` 在上面的第二章中已经有较为详细的描述, 这里不做过多的赘述，这一小节主要讨论一下 `Typescript` 中的 `高级类型` 。所谓 `高级类型` 并不是字面意义上的非常牛X的特殊类型 (~~就好像 `Rx` 中的高阶流, 也并不是那种超出次元壁的非常非常高级的流, 其实它也只是一个普通流, 只不过这个流每一次发送出来的数据本身也是一个流, 仅此而已 **: )**~~), 它也只是由基础类型通过一些逻辑运算符组合起来的类型而已。`高级类型` 官方文档的分类有很多, 比如 `交叉类型(Intersection Types)`、`联合类型(Union Types)` 、`类型保护与区分类型 (Type Guards and Differentiating Types)`、`可辨识联合(Discriminated Unions)` 等等。这里我们只讨论最据操作性的两种 -- `交叉类型(Intersection Types)` 和 `联合类型(Union Types)`, 这两种类型怎么理解呢, 我个人理解可以把它理解成集合, 但又有点区别, 可以理解成有逻辑关系的集合。

###### 交叉类型(Intersection Types)

`交叉类型` 怎么理解呢？我个人理解你可以把她当作是并集, 或者你可以当成 `既又`。 比如 `A & B` 可以当成 A $\cup$ B, 或者你可以理解为这个类型既是  A 又是 B。在平时开发代码的过程中, 如果你想把几个不同类型的属性拼凑到一起, 那么这个操作符是你的首选。

###### 联合类型(Union Types)

`联合类型` 怎么理解呢？我个人理解你可以把它理解为提供了一个选择范围。或者说他是多个类型的集合, 通俗一点讲, 你甚至可以把它理解为一个数组, 数组的每一项就是一个类型。

> **Tips**: 把 `联合类型` 理解为一个数组这很重要, 否则你可能无法理解后面章节中提到的泛型操作符的一些常见写法。

##### 4.2 了解 `Typescript` 中的常见操作类型的关键字。

> `Typescript` 中有很多可以操作类型的关键字, 它们有各自的用途。例如 `in` 可以用来遍历 `联合类型` (就像在 `Javascript` 中使用 `for in` 来遍历数组一样); `keyof`可以提取出 `字典类型(Mapped Types)` 中的键; `extends` 可以用来约束泛型, `extends` 还可以用在 `条件类型(Conditional Types)` 中做条件判断(类似于 `Javascript` 中的三元运算符); `infer` 可以当作占位符, 配合 `条件类型` 可以提取出一些特定位置类型等等。

###### `in` 关键字

`in` 关键字的功能和 `Javascript` 中的 `in` 关键字很像, 可以用来循环遍历 `联合类型`, 这个操作符很重要, 比如我们在 **第3节** 中讲到的一些官方自带的泛型操作符的实现原理就很容易理解了, 像 `Partial` 、`Required` 、`Readonly` 这些, 核心都是使用的 `in` 关键字来遍历类型并附加一些特殊的操作来实现不同的效果。

###### `keyof` 关键字

`keyof` 关键字, 从字面意思就很容易理解了, 它可以很容易地提取出 `字典类型(Mapped Types)`(你也可以翻译成 `映射类型`, 其实我更热衷于翻译为 `键值对类型` 哈哈 **: )**) 的 `key`, 并以 `联合类型` 的方式返回。如果不是很好理解的话, 你可以把 `字典类型` 类型理解为 `Javascript`  中的 **对象**, 使用 `keyof` 操作 `字典类型`, 可以理解为在 `Javascript` 中使用 `Object.keys` 方法操作一个**对象**, 得到的返回值就是一个由**对象**的 `key` 组成的数组。

> **Tips**: 这里一定要明确的是, 使用 `keyof` 关键字操作 `字典类型`, 返回的是一个由 `key` 组成的 `联合类型`(数组! 数组! 数组!), 否则在下面的章节中, 你将无法理解一些泛型操作符的核心原理。

###### `extends` 关键字

`extends` 关键字, 从字面上来看, 很像常见的 `oop` 语言中的 `extends` 关键字。当你在定义一个 `interface` 的时候, 如果使用 `extends` 关键字, 也确实可以从另一个 `interface` 中继承属性类型定义(实际开发中也推荐这么写, 这有利于代码的复用)。

```typescript
interface Animal {
  eat(): void;
  sleep(): void;
}

interface Dog extends Animal {
	// 这里就不需要为 Dog 重复定义 eat sleep
  bark(): void;
}
```

但是如果在泛型中使用 `extends` 关键字, 其表现更像是 `implements`, 主要起到约束作用。

```typescript
interface Dog {
  bark(): void;
}

// 这里通过 `extends` 来约束传入的宠物狗的类型, 你可以把 柯基、二哈 当成 宠物狗，但你不能把 蓝猫 当作宠物狗
interface Person<D extends Dog> {
  walk(): void;
  petDog: D;
}
```

> **Tips**: 这里理解 `extends` 关键字起约束作用远比起继承作用要重要的多(虽然实际开发中用作继承的场景更加常见**: )**), 尤其是想要自定义一个泛型操作符的时候, 这可以校验泛型入参也可以做类型收敛。

###### `extends` 关键字实现 `条件类型(Conditional Types)`

`条件类型(Conditional Types)` 官方的示例这样的

```typescript
T extends U ? X : Y
```

这里的 `T`、`U`、`X`、`Y` 都可以是不同的类型, 这里的表达式怎么理解呢? 其实你可以类比成 `Javascript` 中的 `三元表达式`, 前面的 `T extends U` 是判断条件, 后面的 `X : Y` 是根据前面的判断条件返回的值, 如果是条件成立, 那么返回  `X`, 如果不成立, 那么返回 `Y`。在 `泛型操作符` 中百分之八十的骚操作都是依靠 `条件类型` 来实现的, 所以这里的逻辑关系一定要好好理解。

###### `infer` 关键字

`infer` 关键字, 常常与 `条件类型(Conditional Types)` 一起使用, 官方文档上表达的意思是 `推断类型变量(inferred type)` 可以在条件成立时, 作为判断条件的任意位置的类型的引用(~~英文不好，大家凑活看吧**: )**~~)。换成大白话什么意思呢? 就是说你可以在判断条件中的任意位置使用 `infer` 来声明一个变量 `占位符`, 这个 `占位符` 在条件判断为真的时候, 拿到所占位置的类型引用, 方便你做后续的操作。

##### 4.3 写一个简单的 `泛型操作符`。

> 有了上面的基础知识铺垫之后, 我们就可以写一些非常简单而且实用的泛型操作符啦！

比如，你可以使用 `infer` 配合 `条件类型` 来实现一个取出数组泛型的 `泛型操作符`。

```typescript
type GetArrayGenerics<A> = A extends Array<infer G> ? G : never;

// 让我们测试一下
type T1 = GetArrayGenerics<string[]>;  // string
type T2 = GetArrayGenerics<number[]>;  // number
```

像上面这样, 我们就可以快速地定义一个最简单的 `泛型操作符`。如果上面的章节没仔细看的同学, 可能看到这里就会很懵, 没关系, 让我来仔细看看这个简单的 `泛型操作符`。首先这个 `泛型操作符` 本质上就是一个 `条件类型`, 我们先来看它的判断条件部分, 传入的泛型 `A` 如果满足 `Array<infer G>` 这个类型结构的话, 使用 `infer` 定义一个占位符 `G`, 作为数组泛型的类型引用, 并把该引用返回, 如果不成立则返回一个 `never` 类型(如果不清楚 `never` 类型的同学可以翻看**第二章**中的基础类型介绍)。那么如果你传入的是一个带泛型的数组类型, 那么你就可以得到它的泛型类型。

>  看到这里可能有的同学要问了, 我都已经明确知道并且定义数组的泛型是什么了, 我还用泛型操作符拿出有什么用呢? 我直接写不就好了吗? 这个问题问的很好, 首先如果这个类型依赖于数组的泛型, 那么重复定义显然不符合代码复用原则。其次如果数组的泛型有改动, 下面依赖的类型也需要跟着改动, 有维护过维护老代码经历的同学肯定知道(~~你说的这个同学是不是你自己呀?~~), 老代码(~~万年屎山~~)能不动, 尽量不要动, 鬼知道动一行, 会出现多少未知的 `bug`, 更何况动一片代码, 想想都觉得后怕; 再其次不是所有的场景下, 我们都是清楚地知道一个数组的泛型是什么, 有些场景下比如传参的类型不同, 返回值也会跟着变化(这种场景在封装一些通用的工具函数或者类库的时候非常常见), 你可能就需要使用泛型操作符来帮助你做类型推断。所以尝试自己写泛型操作符还是非常有必要的啦。

### 5. 一些 `泛型操作符` 的高级写法(~~骚操作~~)

##### 5.1 更高级的 `泛型操作符` 的使用场景与价值

##### 5.2 浅析常见简单写法(官方提供的泛型操作符)

##### 5.3 一些高级写法与原理解析

##### 5.4 使用高级写法实现功能更加复杂的泛型操作符

## 写出编辑器让编辑器 "认识" 的代码

##### 1. 写 `Typescript` 代码时的一些注意事项&原则&小技巧

##### 2. 写 `Javascript` 代码时的一些注意事项&原则&小技巧

## **Q&A**

##### 1. `面向编辑器编程` 的优势在哪里

##### 2. 如何平稳地接入 `面向编辑器编程`

##### 3. 真的一定要每一行代码都必须要有完善的提示吗

##### 4. 哪些场景适合 `面向编辑器编程`

