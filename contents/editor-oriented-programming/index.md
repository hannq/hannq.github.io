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
```toc
```

## 大纲
1. `Typescript` 介绍
   1. 基本介绍
   2. 基础知识&常见利用类型推断的用法
   3. `Typescript`内置常见 `泛型操作符` 介绍
   4. 如何自己写一个`泛型操作符`
   5. 一些 `泛型操作符` 的高级写法
2. 写出编辑器让编辑器 ‘’认识‘’ 的代码
   1.
3. **Q&A**
   1.



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

##### 2.2.1 一些其他推断类型的方法

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

#####

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

/** 把传入的类型全部转换为 必填类型 */
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

$Y_1$ +
