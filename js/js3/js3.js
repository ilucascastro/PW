document.addEventListener('DOMContentLoaded', function() {
    conjuntos();
});

function conjuntos(){

    class IntegerSet {
        constructor(maxValue) {
            this.maxValue = maxValue;
            this.set = new Array(maxValue + 1).fill(false);
        }

        add(element) {
            if (element >= 0 && element <= this.maxValue) {
                this.set[element] = true;
            }
        }

        remove(element) {
            if (element >= 0 && element <= this.maxValue) {
                this.set[element] = false;
            }
        }

        union(otherSet) {
            let unionSet = new IntegerSet(this.maxValue);
            for (let i = 0; i <= this.maxValue; i++) {
                unionSet.set[i] = this.set[i] || otherSet.set[i];
            }
            return unionSet;
        }

        intersection(otherSet) {
            let intersectionSet = new IntegerSet(this.maxValue);
            for (let i = 0; i <= this.maxValue; i++) {
                intersectionSet.set[i] = this.set[i] && otherSet.set[i];
            }
            return intersectionSet;
        }

        difference(otherSet) {
            let differenceSet = new IntegerSet(this.maxValue);
            for (let i = 0; i <= this.maxValue; i++) {
                differenceSet.set[i] = this.set[i] && !otherSet.set[i];
            }
            return differenceSet;
        }

        toString() {
            let elements = [];
            for (let i = 0; i <= this.maxValue; i++) {
                if (this.set[i]) {
                    elements.push(i);
                }
            }
            return `{${elements.join(", ")}}`;
        }
    }

    function testIntegerSet() {
        const outputDiv = document.getElementById("test-output");

        let setA = new IntegerSet(10);
        setA.add(1);
        setA.add(3);
        setA.add(5);

        let setB = new IntegerSet(10);
        setB.add(3);
        setB.add(4);
        setB.add(5);

        let unionSet = setA.union(setB);
        let intersectionSet = setA.intersection(setB);
        let differenceSet = setA.difference(setB);

        outputDiv.innerHTML = `
            <p>Set A: ${setA.toString()}</p>
            <p>Set B: ${setB.toString()}</p>
            <p>Union: ${unionSet.toString()}</p>
            <p>Intersection: ${intersectionSet.toString()}</p>
            <p>Difference (A - B): ${differenceSet.toString()}</p>
        `;
    }

    testIntegerSet();

}