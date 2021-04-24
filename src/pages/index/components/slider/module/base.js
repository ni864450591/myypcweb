import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME } from './constants'; //引入常量

import DEFAULTS from './defaults';   //导入默认参数

//类里面需要构造方法
//事件，配置条件
//配置条件分为用户参数和默认参数,所以要合并一下
//

class BaseSlider {
  // 构造函数，先把需要的属性写好
  constructor(el, options) {
    if (el.nodeType !== ELEMENT_NODE_TYPE) {
      throw new Error('实例化的时候，请传入 DOM 元素！');
    }

    // 实际参数
    this.options = {
      ...DEFAULTS,
      ...options
    };

    //获取DOM节点，操作的对象，使内容移动(移动距离，速度，动画，位置），获取项目的宽度，
    const sliderEl = el;
    const sliderContentEl = sliderEl.querySelector('.slider-content');
    const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');

    // 添加到 this 上，为了在方法中使用
    this.sliderEl = sliderEl;
    this.sliderContentEl = sliderContentEl;
    this.sliderItemEls = sliderItemEls;

    //最小索引，最大索引，当前索引(实际索引得校正一下)
    //不能定义为常量，因为图片的数量不能确定
    this.minIndex = 0;
    this.maxIndex = sliderItemEls.length - 1;
    this.currIndex = this.getCorrectedIndex(this.options.initialIndex);

    // 每个 slider-item 的宽度（每次移动的距离）
    //返回的是HTML元素布局的宽度
    this.itemWidth = sliderItemEls[0].offsetWidth;

    this.init();
  }

  // 初始化:一开始时需要进行设置的，宽度的设置，初始的索引，是否开启动画，是否自动切换
  init() {
    // 为每个 slider-item 设置宽度
    this.setItemsWidth();

    // 为 slider-content 设置宽度
    this.setContentWidth();

   

    // 切换到初始索引 initialIndex
    this.move(this.getDistance());

    // 开启动画
    if (this.options.animation) {
      this.openAnimation();
    }

    // 自动切换
    if (this.options.autoplay) {
      this.autoplay();
    }
  }

  // 切换到 index 索引对应的幻灯片  
  to(index) {
    index = this.getCorrectedIndex(index);

    if (this.currIndex === index) return;

    this.currIndex = index;
    const distance = this.getDistance();

    if (this.options.animation) {
      this.moveWithAnimation(distance);
    } else {
      this.move(distance);
    }
  }

  // 切换上一张  鼠标点击左按钮，键盘键入左键时
  prev() {
    this.to(this.currIndex - 1);
  }

  // 切换下一张  鼠标点击右按钮，键盘键入右键时，自动切换时
  next() {
    this.to(this.currIndex + 1);
  }

  // 自动切换   鼠标移出banner时
  autoplay() {
    const { autoplay } = this.options;
    if (autoplay <= 0) return;

    this.pause();
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, autoplay);
  }

  // 暂停自动切换 鼠标进入banner时
  pause() {
    clearInterval(this.autoplayTimer);
  }

  // 开启动画
  openAnimation() {
    this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
  }

  // 关闭动画  动画移动后关闭动画，将速度设为0
  closeAnimation() {
    this.setAnimationSpeed(0);
  }

  
  // 获取要移动的距离  移动前都要获取移动距离
  getDistance(index = this.currIndex) {
    return -this.itemWidth * index;
  }

  // 不带动画的移动  
  move(distance) {
    this.sliderContentEl.style.transform = `translate3d(${distance}px, 0px, 0px)`;
  }

  // 带动画的移动   先开启动画，即将速度置为当前的动画速度，再移动，最后移动完关闭动画
  moveWithAnimation(distance) {
    this.setAnimationSpeed();
    this.move(distance);
    this.sliderContentEl.addEventListener(
      'transitionend',
      () => {
        this.closeAnimation();
      },
      false
    );
  }


  // 设置切换动画速度
  setAnimationSpeed(speed = this.options.speed) {
    this.sliderContentEl.style.transitionDuration = `${speed}ms`;
  }

  // 为每个 slider-item 设置宽度，遍历item节点，逐一赋值
  setItemsWidth() {
    for (const item of this.sliderItemEls) {
      item.style.width = `${this.itemWidth}px`;
    }
  }

  // 为 slider-content 设置宽度，直接对content赋值
  setContentWidth() {
    this.sliderContentEl.style.width = `${
      this.itemWidth * this.sliderItemEls.length
    }px`;
  }

  // 获取修正后的索引值，参数为需要校正的索引，在初始化及移动前要校正
  getCorrectedIndex(index) {
    if (index < this.minIndex) return this.maxIndex;
    if (index > this.maxIndex) return this.minIndex;
    return index;
  }
}

export default BaseSlider;
