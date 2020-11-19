"use strict";

import { assemble, disassembleToString } from "hangul-js";

// 한글 자음/모음 쪼개기 함수
const hangulTyping = {
  target: null,
  interval: null,
  play: function (target, text, interval = 100, delay = 0) {
    this.target = target;

    const splitText = _splitText(text);

    let textCnt = 0;
    this.interval = setInterval(() => {
      if (textCnt > splitText.length - 2) {
        clearInterval(this.interval);
      }
      document.querySelector(target).innerHTML = splitText[textCnt++];
    }, interval);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    clearInterval(this.interval);
    document.querySelector(this.target).innerHTML = "";
  },
};

// text split function
function _splitText(originText = "") {
  const splitBrText = originText.split(/(<br\/>|<br \/>)/);
  const removeBrText = splitBrText.filter((v) => {
    if (!v.match(/(<br\/>|<br \/>)/)) {
      return v;
    }
  });

  const disassemble = removeBrText.map((v) => {
    return disassembleToString(v);
  });

  let result = [];
  let lastText = "";
  if (disassemble.length > 1) {
    disassemble.forEach((v, idx) => {
      let i = 0;
      while (i++ < disassemble[idx].length) {
        result = [
          ...result,
          lastText + assemble(disassemble[idx].substring(0, i)),
        ];
      }
      if (idx < disassemble.length - 1) {
        lastText = result[result.length - 1] + "<br/>";
      }
    });
  } else {
    let i = 0;
    while (i++ < disassemble[0].length) {
      result = [...result, assemble(disassemble[0].substring(0, i))];
    }
  }
  return result;
}

window.hangulTyping = hangulTyping;
export default hangulTyping;
