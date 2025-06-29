import LinkedList from "./linkedList.js";
import Node from "./node.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.currentLoadCount = 0;
    this.hashMap = Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      const list = new LinkedList();
      list.append({ key, value });
      this.hashMap[bucketIndex] = list;
      this.currentLoadCount++;

      if (this.currentLoadCount > this.loadFactor * this.capacity) {
        this.grow();
      }

      return;
    }

    let tempHead = this.hashMap[bucketIndex].head;
    if (tempHead?.nextNode === null) {
      if (tempHead?.value?.key === key) {
        tempHead.value.value = value;

        return;
      }
    }

    while (tempHead?.nextNode !== null) {
      if (tempHead?.value?.key === key) {
        tempHead.value.value = value;

        return;
      }

      tempHead = tempHead?.nextNode;
    }

    const node = new Node();
    node.value = { key, value };
    tempHead.nextNode = node;
    this.currentLoadCount++;

    if (this.currentLoadCount > this.loadFactor * this.capacity) {
      this.grow();
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      return null;
    }

    const bucket = this.hashMap[bucketIndex];
    let tempHead = bucket.head;

    while (tempHead !== null) {
      if (tempHead?.value?.key === key) {
        return tempHead?.value?.value;
      }

      tempHead = tempHead?.nextNode;
    }

    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      return false;
    }

    const bucket = this.hashMap[bucketIndex];
    let tempHead = bucket.head;

    while (tempHead !== null) {
      if (tempHead?.value?.key === key) {
        return true;
      }

      tempHead = tempHead?.nextNode;
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      return false;
    }

    if (this.hashMap[bucketIndex].head?.nextNode === null) {
      this.hashMap[bucketIndex].pop();
      this.currentLoadCount--;

      return true;
    }

    let current = this.hashMap[bucketIndex].head;
    let prev = null;

    while (current !== null) {
      if (current.value?.key === key) {
        prev.nextNode = current.nextNode;
        this.currentLoadCount--;

        return true;
      }

      prev = current;
      current = current.nextNode;
    }

    return false;
  }

  length() {
    return this.currentLoadCount;
  }

  clear() {
    this.currentLoadCount = 0;
    this.capacity = 16;
    this.hashMap = Array(this.capacity).fill(null);
  }

  keys() {
    const keys = [];
    this.hashMap.forEach((bucket) => {
      if (bucket !== null) {
        let tempHead = bucket.head;
        while (tempHead !== null) {
          keys.push(tempHead.value?.key);
          tempHead = tempHead.nextNode;
        }
      }
    });

    return keys;
  }

  values() {
    const values = [];
    this.hashMap.forEach((bucket) => {
      if (bucket !== null) {
        let tempHead = bucket.head;
        while (tempHead !== null) {
          values.push(tempHead.value?.value);
          tempHead = tempHead.nextNode;
        }
      }
    });

    return values;
  }

  entries() {
    const entries = [];
    this.hashMap.forEach((bucket) => {
      if (bucket !== null) {
        let tempHead = bucket.head;
        while (tempHead !== null) {
          entries.push([tempHead.value?.key, tempHead.value?.value]);
          tempHead = tempHead.nextNode;
        }
      }
    });

    return entries;
  }

  grow() {
    this.capacity += 16;
    this.currentLoadCount = 0;
    const prevHashMap = this.hashMap;
    this.hashMap = Array(this.capacity).fill(null);

    prevHashMap.forEach((bucket) => {
      if (bucket !== null) {
        let tempHead = bucket.head;
        while (tempHead !== null) {
          this.set(tempHead.value.key, tempHead.value.value);
          tempHead = tempHead.nextNode;
        }
      }
    });
  }
}

export default HashMap;
