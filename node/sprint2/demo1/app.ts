// types
type NumOrStr = number | string;

// interfaces
interface MyObj1 {
  name: string;
  value: number;
}

interface DynamicObj {
  [key: string]: NumOrStr;
}

// string / number

const myInt: number = 1;
const myStr: string = "1";
const myFloat: number = 1.5;
const myDate1: Date = new Date();
const myDate2: string = new Date().toISOString();

// arrays
const myArray1: number[] = [1, 2, 3];
const myArray2: Array<number> = [1, 2, 3];
const myArray3: Array<string> = ["1", "2", "3"];
const myArray4: Array<object> = [{}];
const myArray5: object[] = [{}];
const myArray6: Array<NumOrStr> = ["1", 1];
const myArray7: Array<string | number> = ["1", 1];

// objects
const myObj1: object = { name: "name", value: 5 };
const myObj2: Object = { name: "name", value: 5 };
const myObj3: { [key: string]: NumOrStr } = { name: "name", value: 5 };
const myObj4: { [chave: string]: NumOrStr } = { name: "name", value: 5 };
const myObj5: { [chave: string]: string | number } = { name: "name", value: 5 };
const myObj6: MyObj1 = { name: "str", value: 0 };
const myObj7: DynamicObj = { randomName: "str", value: 0 };

// functions
const myFunction1 = (name: string, age: number): string => {
  return `Nome ${name} - Idade ${age}`;
};

const myFunction2 = (name: string, age: number = 9): string => {
  if (!age) {
    return `Nome: ${name}`;
  }

  const _ = age + 1;

  return `Nome ${name} - Idade ${age}`;
};

const myFunction3 = (data: Partial<MyObj1>): string => {
  return `Nome ${data.name} - Idade ${data.value}`;
};

console.log(myFunction3({ name: "Pedro" }));

const myFunction4 = (data: MyObj1): string => {
  return `Nome ${data.name} - Idade ${data.value}`;
};

// myFunction4({ name: "Pedro" });

// data["name"] -> raise KeyError // python
// data.value -> undefined // javascript
