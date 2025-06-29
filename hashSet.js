import LinkedList from "./linkedList.js";
import Node from "./node.js";

class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.currentLoadCount = 0;
    this.hashMap = Array(this.capacity).fill(null);
  }

  hash(strValue) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < strValue.length; i++) {
      hashCode = primeNumber * hashCode + strValue.charCodeAt(i);
    }

    return hashCode;
  }

  set(value) {
    const hashCode = this.hash(value);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      const list = new LinkedList();
      list.append(value);
      this.hashMap[bucketIndex] = list;
      this.currentLoadCount++;

      if (this.currentLoadCount > this.loadFactor * this.capacity) {
        this.grow();
      }

      return;
    }

    let tempHead = this.hashMap[bucketIndex].head;
    if (tempHead?.nextNode === null) {
      if (tempHead?.value === value) {
        return;
      }
    }

    while (tempHead?.nextNode !== null) {
      if (tempHead?.value === value) {
        return;
      }

      tempHead = tempHead?.nextNode;
    }

    const node = new Node();
    node.value = value;
    tempHead.nextNode = node;
    this.currentLoadCount++;

    if (this.currentLoadCount > this.loadFactor * this.capacity) {
      this.grow();
    }
  }

  get(value) {
    const hashCode = this.hash(value);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      return null;
    }

    const bucket = this.hashMap[bucketIndex];
    let tempHead = bucket.head;

    while (tempHead !== null) {
      if (tempHead?.value === value) {
        return tempHead.value;
      }

      tempHead = tempHead?.nextNode;
    }

    return null;
  }

  has(value) {
    const hashCode = this.hash(value);
    const bucketIndex = hashCode % this.capacity;

    if (this.hashMap[bucketIndex] === null) {
      return false;
    }

    const bucket = this.hashMap[bucketIndex];
    let tempHead = bucket.head;

    while (tempHead !== null) {
      if (tempHead?.value === value) {
        return true;
      }

      tempHead = tempHead?.nextNode;
    }

    return false;
  }

  remove(value) {
    const hashCode = this.hash(value);
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
      if (current.value === value) {
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

  values() {
    const values = [];
    this.hashMap.forEach((bucket) => {
      if (bucket !== null) {
        let tempHead = bucket.head;
        while (tempHead !== null) {
          values.push(tempHead.value);
          tempHead = tempHead.nextNode;
        }
      }
    });

    return values;
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
          this.set(tempHead.value);
          tempHead = tempHead.nextNode;
        }
      }
    });
  }
}

export default HashSet;
