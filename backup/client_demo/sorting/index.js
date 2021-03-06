var array = [6, 3, 8, 4, 9, 2, 7, 5, 1];



/**
 * 选择排序
 * 本质：选择排序
 * 分有序部分和无序部分两块
 * 初始状态全部都是无序部分，每排完一趟有序部分增长一位，无序部分减少一位
 * 每一趟开始时假设以无序部分第一个为最小，然后遍历无序部分得到真正最小的
 * 然后无序第一个和最小的换位，就完成了该趟排序，有序加一位，无序减一位
 */
Array.prototype.selectSort = function (a) {
  var temp, min, i, j;
  for (i = 0; i < this.length - 1; i++) {
    // 初始假设第一个为最小
    min = i;
    // 尝试往后找更小的
    for (j = i + 1; j < this.length; j++) {
      // 找到更小的
      if (this[j] < this[min]) {
        // 更换最小的
        min = j;
      }
    }
    // 找完了后让最小的和当前位置更换位置
    temp = this[min];
    this[min] = this[i];
    this[i] = temp;
  }
  return this;
}
document.writeln(`<div>${array.join(' | ')} -> 选择排序 -> ${[...array].selectSort().join(' - ')}</div>`);

/**
 * 冒泡排序
 * 本质：交换排序
 * 末尾一部分为冒好泡的有序部分，开始一段为即将冒泡的无序部分
 * 初始状态下全是无序部分，每进行一趟冒泡无序部分减少一个元素，有序部分增加一个元素
 * 冒泡过程中碰到比自己小的，继续往上冒，
 * 遇到比自己大的自己停下，让比自己大的那个接着冒
 */
Array.prototype.bubbleSort = function () {
  var temp, i, j;
  for (i = 0; i < this.length - 1; i++) {
    // 从前往后取一个开始冒泡
    for (j = 0; j < this.length - 1 - i; j++) {
      // 碰到比自己小的
      if (this[j] > this[j + 1]) {
        // 往上冒
        temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
      // 碰到比自己大的，啥都不干自己停下
      // 下一轮让比自己大的家伙冒泡
    }
  }
  return this;
}
document.writeln(`<div>${array.join(' | ')} -> 冒泡排序 -> ${[...array].bubbleSort().join(' - ')}</div>`);


/**
 * 直接插入排序
 * 本质：插入排序
 * 概念上分为有序的一部分和无序的一部分，如果从前往后处理的话，
 * 则开头一部分为有序，后面一部分为无序，
 * 初始场合第一个元素被当成有序部分，其余部分为无序的。
 * 每一趟都是拿出无序部分的第一个往有序部分插入，够小则插入中间或前面，够大则跟在后面
 * 每完成一趟则有序部分向后扩张一个位置，无序部分向后缩减一个位置
 * 直到所有都有序，完成排序。
 */
Array.prototype.insertSort = function () {
  var temp, i, j;
  // 第零个元素无论是什么都可以认为是有序的
  // 遍历1-n个元素（这些元素现在还是无序的）
  // 我们拿出每个元素尝试往有序的一部分中插入
  // 一次循环为一趟排序
  for (i = 1; i < this.length; i++) {
    // 记下当前元素，这是无序部分的第一个元素
    // 我们要把该元素拿出来尝试插入到之前的位置
    temp = this[i];
    // 以从后往前的顺序和有序部分的每个元素进行比较，
    // 够小则和前一个换位，直到遇到不比自己小的结束该趟
    for (j = i - 1; j >= 0 && this[j] > temp; j--) {
      this[j + 1] = this[j];
    }
    // 移不动了一趟结束，缓存放在最后比较的位置
    this[j + 1] = temp;
  }
  return this;
}

document.writeln(`<div>${array.join(' | ')} ->  插入排序 -> ${[...array].insertSort().join(' - ')}</div>`);

/**
 * 希尔排序
 * 本质：交换排序
 * 按步长分组优化直接插入排序
 * 步长：分组的长度，每一趟的步长是不一样的，都比前一趟小，步长尽量不要成倍数关系
 * 否则下次分组分到的组其实是上次分组得到的组的再分割，然后再排序没意义，因为已经排好了。
 * 按步长分组，但是分组的元素都不是连续的，而是按步长跳跃取得。
 * 然后对每个分组进行插入排序，可以让元素进行大跨度的调整位置，尽快让元素跑到该到的位置，
 * 下一趟用新的更小的步长再分组，再组内排序，进一步接近最后结果，
 * 到最后一趟步长为1，就是进行普通的插入排序，
 * 但此时经过前几趟的组内大跨度跳跃，该数组已经基本有序
 * 而直接插入排序对于基本有序的数组效率非常高，
 * 综合下来在直接插入排序的基础上提升了速度
 */
Array.prototype.shellSort = function () {
  var temp, i, j;
  // 步长可自定，一般有公式生成每一趟的步长（还有最优步长计算公式，具体维基百科查找）
  // 该例子中我们简单的用除以2向下取整生成每一趟的步长
  for (var gap = this.length >> 1; gap > 0; gap >>= 1) {
    // 对每一组进行直接插入排序
    // 直接插入排序中第一个元素默认为有序，从第二个元素开始
    // 所以对于我们跨步长分组中我们步长索引处的元素（正好是第一组的第二个元素）开始
    for (i = gap; i < this.length; i++) {
      // 缓存起该位置的元素
      temp = this[i];
      // 跨步和组内前一个元素进行比较
      for (j = i - gap; j >= 0 && this[j] > temp; j -= gap) {
        // 前一个元素太大则移到后面位置
        this[j + gap] = this[j];
      }
      // 无法再移动了说明该位置已经够小了
      // 就把缓存的元素的放在
      this[j + gap] = temp;
    }
  }
  return this;
}


document.writeln(`<div>${array.join(' | ')} -> 希尔排序 -> ${[...array].shellSort().join(' - ')}</div>`);


/**
 * 归并排序
 * 本质：归并排序
 * 分治递归策略，将一个数组分成平分成两个（奇数个则一个多一个少没关系）
 * 然后对着两个个数组递归调用归并排序，再将排好序的两个合并起来，
 * 合并的时候那两个数组的第一个元素进行比较，最小的那个脱离原数组并加入到结果数组中，
 * 直到某个原数组已经没有元素则，将另一个数组的剩余元素加入到结果数组中即可
 */
Array.prototype.mergeSort = function () {
  var merge = function (left, right) {
    var final = [];
    while (left.length && right.length)
      final.push(left[0] <= right[0] ? left.shift() : right.shift());
    return final.concat(left.concat(right));
  };
  var len = this.length;
  if (len < 2) return this;
  var mid = len / 2;
  return merge(this.slice(0, parseInt(mid)).mergeSort(), this.slice(parseInt(mid)).mergeSort());
};

document.writeln(`<div>${array.join(' | ')} -> 归并排序 -> ${[...array].mergeSort().join(' - ')}</div>`);


/**
 * 鸡尾酒排序
 * 本质：交换排序
 * 双向冒泡排序
 * 每一趟分别冒泡和沉底,直到冒泡有序部分和沉底有序部分相连
 */
Array.prototype.cockTailSort = function () {
  var i, left = 0, right = this.length - 1;
  var temp;
  while (left < right) {
    // 冒泡
    for (i = left; i < right; i++)
      if (this[i] > this[i + 1]) {
        temp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = temp;
      }
    right--;
    // 沉底
    for (i = right; i > left; i--)
      if (this[i - 1] > this[i]) {
        temp = this[i];
        this[i] = this[i - 1];
        this[i - 1] = temp;
      }
    left++;
  }
  return this;
};

document.writeln(`<div>${array.join(' | ')} -> 鸡尾酒排序 -> ${[...array].cockTailSort().join(' - ')}</div>`);


/**
 * 奇偶排序
 * 本质：交换排序
 * 一趟排序为：奇偶相邻位置比较交换，然后偶奇位置相邻比较交换，
 * 在此过程中没有任何位置交换，则代表已经排好序了，
 * 如果发生了任意位置交换，则认为可能还未排好序，就会重复进行下一趟。
 */
Array.prototype.oddEvenSort = function () {
  var odd_even, i;
  var temp;
  // 默认未排好序
  var sorted = 0;
  while (!sorted) {
    // 真心希望走完这一趟我们就排好了
    sorted = 1;
    for (odd_even = 0; odd_even < 2; odd_even++)
      for (i = odd_even; i < this.length - 1; i += 2)
        if (this[i] > this[i + 1]) {
          temp = this[i];
          this[i] = this[i + 1];
          this[i + 1] = temp;
          // 事实是我们发生了位置交换，不能确保我们已经排好了，
          // 还得进行下一趟排序
          sorted = 0;
        }
  }
  return this;
};

document.writeln(`<div>${array.join(' | ')} -> 奇偶排序 -> ${[...array].oddEvenSort().join(' - ')}</div>`);

/**
 * 原地快速排序

 */
Array.prototype.inPlaceQuickSort = function () {

  return this;
};

document.writeln(`<div>${array.join(' | ')} -> 原地快速排序 -> ${[...array].inPlaceQuickSort().join(' - ')}</div>`);


/**
 * 非原地快速排序
 * 找一个元素为基准值，开两块空间：左边，右边
 * 数组中所有比基准值小的放左边，比基准值大的放右边，
 * 然后递归助理左边部分和右边部分，然后合并排好序左边和基准值和排好序的右边
 * 非原地，需要额外较多空间，元素组不变，返回新数组
 */
Array.prototype.quickSort = function () {
  var len = this.length;
  if (len <= 1)
    return this.slice(0);
  var left = [];
  var right = [];
  var mid = [this[0]];
  for (var i = 1; i < len; i++)
    if (this[i] < mid[0])
      left.push(this[i]);
    else
      right.push(this[i]);
  return left.quickSort().concat(mid.concat(right.quickSort()));
};

document.writeln(`<div>${array.join(' | ')} -> 非原地快速排序 -> ${[...array].quickSort().join(' - ')}</div>`);

function quickSort(array) {
  function sort(prev, numsize) {
    var nonius = prev;
    var j = numsize - 1;
    var flag = array[prev];
    if ((numsize - prev) > 1) {
      while (nonius < j) {
        for (; nonius < j; j--) {
          if (array[j] < flag) {
            array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
            break;
          };
        }
        for (; nonius < j; nonius++) {
          if (array[nonius] > flag) {
            array[j--] = array[nonius];
            break;
          }
        }
      }
      array[nonius] = flag;
      console.log(array.slice(prev, numsize).join('-'));
      sort(0, nonius);
      sort(nonius + 1, numsize);
    }
  }
  sort(0, array.length);
  return array;
}