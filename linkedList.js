import Node from "./node.js";

class LinkedList {
  #header;

  constructor() {
    this.#header = null;
  }

  append(value) {
    const node = new Node();
    node.value = value;

    if (this.#header === null) {
      this.#header = node;
      return;
    }

    let tempHead = this.#header;

    while (tempHead.nextNode !== null) {
      tempHead = tempHead.nextNode;
    }

    tempHead.nextNode = node;
  }

  prepend(value) {
    const node = new Node();
    node.value = value;

    if (this.#header === null) {
      this.#header = node;
      return;
    }

    node.nextNode = this.#header;
    this.#header = node;
  }

  get size() {
    let linkedListLength = 0;

    if (this.#header === null) {
      return linkedListLength;
    }

    let tempHead = this.#header;

    while (tempHead !== null) {
      linkedListLength++;
      tempHead = tempHead.nextNode;
    }

    return linkedListLength;
  }

  get head() {
    return this.#header;
  }

  get tail() {
    if (this.#header === null) {
      return null;
    }

    let tempHead = this.#header;

    while (tempHead.nextNode !== null) {
      tempHead = tempHead.nextNode;
    }

    return tempHead;
  }

  at(index) {
    if (this.#header === null) {
      return null;
    }

    let tempHead = this.#header;
    let currentIndex = 0;

    while (tempHead !== null && currentIndex <= index) {
      if (currentIndex === index) {
        return tempHead;
      }

      tempHead = tempHead.nextNode;
      currentIndex++;
    }

    return null;
  }

  pop() {
    if (this.#header === null) {
      return null;
    }

    if (this.#header.nextNode === null) {
      const removedNode = this.#header;
      this.#header = null;

      return removedNode;
    }

    let tempHead = this.#header;

    while (tempHead.nextNode.nextNode !== null) {
      tempHead = tempHead.nextNode;
    }

    const removedNode = tempHead.nextNode;
    tempHead.nextNode = null;

    return removedNode;
  }

  contains(value) {
    if (this.#header === null) {
      return false;
    }

    let tempHead = this.#header;

    while (tempHead !== null) {
      if (tempHead.value === value) {
        return true;
      }

      tempHead = tempHead.nextNode;
    }

    return false;
  }

  find(value) {
    if (this.#header === null) {
      return null;
    }

    let tempHead = this.#header;
    let currentIndex = 0;

    while (tempHead !== null) {
      if (tempHead.value === value) {
        return currentIndex;
      }

      tempHead = tempHead.nextNode;
      currentIndex++;
    }

    return null;
  }

  toString() {
    if (this.#header === null) {
      return `${this.#header}`;
    }

    let tempHead = this.#header;
    let resultString = "";

    while (tempHead !== null) {
      resultString += `( ${tempHead.value} ) -> `;
      tempHead = tempHead.nextNode;
    }

    return resultString + `${tempHead}`;
  }

  insertAt(value, index) {
    if (this.#header === null && index > 0) {
      return null;
    }

    if (this.#header === null && index === 0) {
      const node = new Node();
      node.value = value;
      this.#header = node;

      return;
    }

    if (index === 0) {
      const node = new Node();
      node.value = value;
      node.nextNode = this.#header;
      this.#header = node;
    }

    let tempHead = this.#header;
    let currentIndex = 0;

    while (tempHead !== null && currentIndex <= index - 1) {
      if (currentIndex === index - 1) {
        const node = new Node();
        node.value = value;
        node.nextNode = tempHead.nextNode;
        tempHead.nextNode = node;

        return;
      }
      tempHead = tempHead.nextNode;
      currentIndex++;
    }

    return null;
  }

  removeAt(index) {
    if (this.#header === null) {
      return null;
    }

    if (index === 0) {
      const removedNode = this.#header;
      this.#header = this.#header.nextNode;

      return removedNode;
    }

    let tempHead = this.#header;
    let currentIndex = 0;

    while (tempHead.nextNode !== null && currentIndex <= index - 1) {
      if (currentIndex === index - 1) {
        const removedNode = tempHead.nextNode;
        tempHead.nextNode = tempHead.nextNode.nextNode;

        return removedNode;
      }

      tempHead = tempHead.nextNode;
      currentIndex++;
    }

    return null;
  }
}

export default LinkedList;
