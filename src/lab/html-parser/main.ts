import { parseHtml } from "./parser";
import { myParse } from "./thin";
export default function heheda() {
  console.log('heheda');
}

const count = 10000;
const html0 = '111 <div> <span var-name="WX20200312-194235.png" class="var-light var-media"><img src="https://media.choiceform.io/os/media/o_1ej9nkvq7pq0dvbccqq3v117fn.png@m720" style="width:32px;height:32px"></span> </div> <div>f<span edist="1" style="font-weight: bold;">asjdklf</span>jasdkl<span edist="1" style="font-style: italic;">fjal</span>sdkjflka<span edist="1" style="text-decoration: underline;">sdjfl</span>kajs<span edist="1" style="text-decoration: line-through;">dlkfja</span>sd<span edist="1" style="color: rgb(227, 25, 25);">lkfja</span>dsfasdl</div> <div> <span var-name="12799388.jpeg" class="var-light var-media"><img src="https://media.choiceform.io/os/media/o_1ej9nkvq7e63fmg4ak16te1fk8i.jpeg@m720" style="width:32px;height:32px"></span> </div> <div>fasdfasdf</div> <div>fasd<span edist="1" style="background-color: rgba(31, 39, 212, 0.8);">fadsfa</span>dsfas<span edist="1" style="font-size: 220%; line-height: 1.4;">dfasd</span>fasdfasdfasdf</div> <div>fasdfasdf</div> <ol><li>1111</li><li>2222</li><li>3333</li><li>fasd   </li><li>fasdfasdf</li></ol> <div>fasdfasdf</div>';
const html = '您的性别<div>&nbsp;<span class="var-tag var-expression" contenteditable="false" data-id="a8bc16dd:VFT" data-detail="">Q_1/自定义验证失败次数</span>&nbsp;</div><div>&nbsp;<span class="var-tag var-string" contenteditable="false" data-id="QUES_ID" data-detail="">问卷id</span>&nbsp;fs<span edist="1" style="background-color: rgba(67, 197, 77, 0.7);">adfasd</span>fasd</div><div>&nbsp;<span class="var-tag var-string" contenteditable="false" data-id="a8bc16dd:ALO:OTXX" data-detail="">Q_1/全部选项/选项文字</span>&nbsp;</div>';
function testHTMLParser() {
  const start = Date.now();
  for (let i = 0; i <= count; i++) {
    if (i === count) {
      console.log(parseHtml(i + html));
    } else {
      parseHtml(i + html);
    }
  }
  console.log(Date.now() - start);
};

function parseSystem() {
  const start = Date.now();
  for (let i = 0; i <= count; i++) {
    const div = document.createElement('div');
    div.innerHTML = i + html;
    if (i === count) {
      console.log(div.childNodes);
    }
  }
  console.log(Date.now() - start);
}

function parseSelf() {
  const start = Date.now();
  for (let i = 0; i <= count; i++) {
    const tag = myParse(html);
    if (i === count) {
      console.log(tag.children);
    }
  }
  console.log(Date.now() - start);
}

// function simplifyDom(dom: HTMLElement): any {
//   return {
//     parent: dom.parentNode,
//     tagName: dom.tagName,
//     attributes: dom.attributes,
//     children: Array.from(dom.childNodes).map(child => {
//       if(child.nodeType === 3){
//         return {
//           text: child.textContent
//         }
//       }else{
//         return simplifyDom(child as HTMLElement);
//       }
//     })
//   }
// }

function test() {
  // const div = document.createElement('div');
  // div.innerHTML = html0;
  return {
    tag: myParse(html0),
    // dom: simplifyDom(div)
  };
}

(window as any).hehe = {
  parseHtml,
  testHTMLParser,
  parseSystem,
  test,
  myParse,
  parseSelf,
  html0,
}