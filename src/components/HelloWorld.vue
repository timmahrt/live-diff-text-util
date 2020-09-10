<template>
  <div class="hello">
    Please enter the texts to diff in the following boxes and press the "Run diff" button
    <div class="text-entry">
      <input class="text-input" v-model="txtA" placeholder="enter text">
    </div>
    <div class="text-entry">
      <input class="text-input"  v-model="txtB" placeholder="enter text">
    </div>
    <button
      class='diff-button'
      v-on:click="diffAndDecorate()">
      Run Diff
    </button>
    <div class="dynamic-text" v-html="diffedTxtA">
    </div>
    <div class="dynamic-text" v-html="diffedTxtB">
    </div>
    <div class="wrong-pairs-table">
      <div v-for="(pair, key) in indexToWrongCharPair" :key="key">
        <span v-text="pair.left" class="wrong-pairs-cell"></span>
        <span v-text="getCharAsUnicodeCodePoint(pair.left)" class="wrong-pairs-cell"></span>
        <span v-text="pair.right" class="wrong-pairs-cell"></span>
        <span v-text="getCharAsUnicodeCodePoint(pair.right)" class="wrong-pairs-cell"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDiffCharacters } from "../utils/getCharDiff";
export default {
  data: function () {
    return {
      txtA: "",
      txtB: "",
      diffedTxtA: "",
      diffedTxtB: "",
      indexToWrongCharPair: {}
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    diffAndDecorate () {
      let [pairs, diffCharIndicies] = getDiffCharacters(this.txtA, this.txtB);

      let txtA = "";
      let txtB = "";
      pairs.forEach(([left, right], i) => {
        txtA += this.decorateChar(left, i, diffCharIndicies);
        txtB += this.decorateChar(right, i, diffCharIndicies);
      });

      this.diffedTxtA = txtA;
      this.diffedTxtB = txtB;

      this.buildWrongCharPairs(pairs, diffCharIndicies);
    },
    buildWrongCharPairs (pairs, diffCharIndicies) {
      this.indexToWrongCharPair = {};
      diffCharIndicies.forEach( (i) => {
        this.indexToWrongCharPair[i] = {'left': pairs[i][0], 'right': pairs[i][1]};
      })
    },
    decorateChar (char, currentIndex, skipIndexList) {
      let retVal;
      if (char === null) {
        retVal = "<span class='ignore-html'>-</span>";
      }
      else if (skipIndexList.includes(currentIndex)) {
        retVal = `<span class='bad-html'>${char}</span>`;
      }
      else {
        retVal = char;
      }

      return retVal;
    },
    getCharAsUnicodeCodePoint (charVal) {
      let hexVal = charVal.charCodeAt().toString(16);
      let zeroPadding = "0".repeat(4 - hexVal.length);
      return 'U+' + zeroPadding + hexVal;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrong-pairs-table {
  padding: 10px;
}
.wrong-pairs-cell {
  padding: 5px;
}
.dynamic-text >>> .ignore-html {
  color: grey;
}
.dynamic-text >>> .bad-html {
  color: red;
}
.text-entry {
  padding: 10px;
}
.text-input {
  width: 500px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
