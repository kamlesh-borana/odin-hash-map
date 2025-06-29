import HashMap from "./hashMap.js";
import HashSet from "./hashSet.js";

const hashMap = new HashMap();

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");

console.log(hashMap);
console.log(hashMap.get("lion"));
console.log(hashMap.has("lion"));
// console.log(hashMap.remove("lion"));
console.log(hashMap.length());

hashMap.set("kite", "purple");
console.log(hashMap.length());

console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

// hashMap.clear();
// console.log(hashMap);

hashMap.set("moon", "silver");
hashMap.set("planet1", "maroon");
hashMap.set("planet2", "indigo");
hashMap.set("planet3", "burgundy");
hashMap.set("planet4", "dark blue");

hashMap.set("kite", "pink");

console.log(hashMap);
console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

console.log(hashMap.get("moon"));
console.log(hashMap.get("dog"));
console.log(hashMap.has("planet1"));
console.log(hashMap.has("apple"));
console.log(hashMap.remove("planet4"));
console.log(hashMap.remove("lion"));
console.log(hashMap);
console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

hashMap.clear();
console.log(hashMap);

const hashSet = new HashSet();
hashSet.set("one");
hashSet.set("two");
hashSet.set("three");
hashSet.set("four");
hashSet.set("five");
hashSet.set("six");
hashSet.set("seven");
hashSet.set("eight");
hashSet.set("nine");
hashSet.set("ten");
hashSet.set("eleven");
hashSet.set("twelve");

hashSet.set("seven");

hashSet.set("thirteen");

console.log(hashSet.get("seven"));
console.log(hashSet.has("eleven"));

console.log(hashSet.remove("thirteen"));
console.log(hashSet.length());

console.log(hashSet);
console.log(hashSet.values());

hashSet.clear();
console.log(hashSet);
