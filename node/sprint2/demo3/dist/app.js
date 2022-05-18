"use strict";
// string / number
const myInt = 1;
const myStr = "1";
const myFloat = 1.5;
const myDate1 = new Date();
const myDate2 = new Date().toISOString();
// arrays
const myArray1 = [1, 2, 3];
const myArray2 = [1, 2, 3];
const myArray3 = ["1", "2", "3"];
const myArray4 = [{}];
const myArray5 = [{}];
const myArray6 = ["1", 1];
const myArray7 = ["1", 1];
// objects
const myObj1 = { name: "name", value: 5 };
const myObj2 = { name: "name", value: 5 };
const myObj3 = { name: "name", value: 5 };
const myObj4 = { name: "name", value: 5 };
const myObj5 = { name: "name", value: 5 };
const myObj6 = { name: "str", value: 0 };
const myObj7 = { randomName: "str", value: 0 };
// functions
const myFunction1 = (name, age) => {
    return `Nome ${name} - Idade ${age}`;
};
const myFunction2 = (name, age = 9) => {
    if (!age) {
        return `Nome: ${name}`;
    }
    const _ = age + 1;
    return `Nome ${name} - Idade ${age}`;
};
const myFunction3 = (data) => {
    return `Nome ${data.name} - Idade ${data.value}`;
};
console.log(myFunction3({ name: "Pedro" }));
const myFunction4 = (data) => {
    return `Nome ${data.name} - Idade ${data.value}`;
};
// myFunction4({ name: "Pedro" });
