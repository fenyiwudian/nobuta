class VarTagNode {
  parent?: VarTagNode;
  prev?: VarTagNode;
  next?: VarTagNode;
}

class VarTagElement extends VarTagNode {
  name: string;
  children: VarTagNode[];
  attributes: any;
  constructor(name: string) {
    super();
    this.name = name;
    this.children = [];
    this.attributes = {};
  }
}

class VarTagText extends VarTagNode {
  text: string
  constructor(text: string) {
    super();
    this.text = text;
  }
}

const SELF_CLOSING_TAGS = [
  'br',
  'img',
  'input',
];

function isSelfCloseName(name: string) {
  return SELF_CLOSING_TAGS.includes(name);
}

interface VarTagRaw {
  name: string;
  start: number;
  end: number;
  value: string;
  type: 'open' | 'close';
}

function parseAttribute(str: string) {
  const attr: any = {};
  const reg = /(\S+?)="(.+?)"/g;
  let match = reg.exec(str);
  while (match) {
    attr[match[1]] = match[2];
    match = reg.exec(str);
  }
  return attr;
}

export function myParse(str: string) {
  const openReg = /<(\w+).*?>/g;
  const tags: VarTagRaw[] = [];
  let openMatch = openReg.exec(str);
  while (openMatch) {
    const tagName = openMatch[1];
    const end = openMatch.index + openMatch[0].length;
    tags.push({
      type: 'open',
      name: tagName,
      value: openMatch[0],
      start: openMatch.index,
      end,
    });
    openReg.lastIndex = end;
    openMatch = openReg.exec(str);
  }
  const closeReg = /<\/(\w+)>/g;
  let closeMatch = closeReg.exec(str);
  while (closeMatch) {
    const name = closeMatch[1];
    const end = closeMatch.index + closeMatch[0].length;
    tags.push({
      type: 'close',
      name,
      value: closeMatch[0],
      start: closeMatch.index,
      end,
    });
    closeMatch = closeReg.exec(str);
  }
  tags.sort((a, b) => {
    return a.start > b.start ? 1 : -1;
  });
  const copyTags = [...tags];
  const collector: VarTagElement = { children: [] } as VarTagElement;
  let parentElement: VarTagElement = collector;
  let currentIndex = 0;
  let currentTag = copyTags.shift();
  while (currentTag) {
    const { start, end, name, type, value } = currentTag;
    if (currentIndex < start) {
      parentElement.children.push(new VarTagText(str.substring(currentIndex, start)))
    }
    if (type === 'open') {
      const currentElement = new VarTagElement(name);
      currentElement.attributes = parseAttribute(value)
      parentElement.children.push(currentElement);
      currentElement.parent = parentElement;
      // 非关闭标签
      if (!isSelfCloseName(name)) {
        // 往里钻
        parentElement = currentElement;
      }
    } else {
      // 碰到关闭标签，往外退
      parentElement = parentElement.parent as VarTagElement;
    }
    currentIndex = end;
    currentTag = copyTags.shift();
  }
  return collector;
}