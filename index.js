class HashItem {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.size = 0;
    this.table = (new Array(10)).fill(null);
  }

  hash(key) {
    let sum = 0;

    for (const char of key)
      sum += char.charCodeAt();

    return sum % this.table.length;
  }

  set(key, value) {
    const targetIndex = this.hash(key);

    if (this.table[targetIndex] === null) {
      this.table[targetIndex] = new HashItem(key, value);
      this.size++;
      return;
    }

    let curr = this.table[targetIndex];

    while (true) {
      if (curr.key === key) {
        curr.value = value;
        return;
      }

      if (curr.next === null) {
        curr.next = new HashItem(key, value);
        this.size++;
        return;
      }

      curr = curr.next;
    }
  }

  get(key) {
    const targetIndex = this.hash(key);
    let curr = this.table[targetIndex];

    while (curr) {
      if (curr.key === key)
        return curr.value;

      curr = curr.next;
    }

    return undefined;
  }

  delete(key) {
    const targetIndex = this.hash(key);
    let prev = null;
    let curr = this.table[targetIndex];

    while (curr) {
      if (curr.key === key) {
        this.size--;
        if (prev === null) {
          this.table[targetIndex] = curr.next;
          return true;
        }

        prev.next = curr.next;
        return true;
      }
      prev = curr;
      curr = curr.next;
    }

    return false;
  }
}

const h = new HashMap();

h.set('cat', 'CAT');
h.set('potato', 'POTATO');
h.set('dog', 'DOG');
h.set('cash', 'CASH');
h.set('dog', 'modified-DOG');

console.log(h.get('cat'));      // CAT
console.log(h.get('potato'));   // POTATO
console.log(h.get('dog'));      // modified-DOG
console.log(h.get('cash'));     // CASH

h.set('ace', 'ACE'); // separate chain
h.set('to', 'TO');
h.set('favors', 'FAVORS');

h.set('to', 'modi-TO');
h.set('to', 'modified-TO');
h.set('favors', 'modified-FAVORS');

console.log(h.get('ace'));      // ACE
console.log(h.get('to'));       // modified-TO
console.log(h.get('favors'));   // modified-FAVORS

h.set('bike', 'BIKE'); // separate chain
h.set('sits', 'SITS');

console.log(h.get('bike'));     // BIKE
console.log(h.get('sits'));     // SITS

h.delete('potato');
h.delete('to');
h.delete('bike');

console.log(h.get('potato'));   // undefined
console.log(h.get('to'));       // undefined
console.log(h.get('bike'));     // undefined

console.log(h.get('ace'));      // ACE
console.log(h.get('favors'));   // modified-FAVORS
console.log(h.get('sits'));     // SITS
