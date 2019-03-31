const options = [
  {
    value: '',
    text: '選択してください',
  },
  {
    value: '\u30dc',
    text: 'ボ（合成文字：U+30dc）',
  },
  {
    value: '\u30db\u3099',
    text: 'ボ（結合文字：U+30db U+3099）',
  },
  {
    value: '\uff76\u3099',
    text: 'ｶ゙（結合文字：U+ff76 U+3099）',
  },
  {
    value: '\u3300',
    text: '㌀（組文字：U+3300）',
  },
  {
    value: '\u2460',
    text: '①（丸囲み文字：U+2460）',
  },
];

const normalizeWays = [
  'NFC',
  'NFD',
  'NFKC',
  'NFKD',
];

new Vue({
  el: '#app',
  data: {
    options,
    charCode: '',
    normalizeWays,
  },
  computed: {
    normalized() {
      return (normalizeWay) => {
        return this.charCode.normalize(normalizeWay);
      };
    },
    codePoint() {
      return (normalizeWay) => {
        const string = this.normalized(normalizeWay);
        let buffer = '';

        for (let i=0; string.codePointAt(i) !== undefined; i++) {
          const codePoint = string.codePointAt(i).toString(16);
          buffer += `U+${codePoint} `;
        }

        return buffer;
      };
    },
  },
})
