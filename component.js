Vue.component('countdown-v1', {
  template:
    '<div id="countdown-v1-box">' +
      '<div id="title">{{info.title}}</div>' +
      '<div id="end-time">至 {{endTimeStr}}</div>' +
      '<div id="time-board">' +
        '<div class="text" style="margin-right: 15px;opacity: 0.3">00天</div>' +
        '<div class="text">1</div>' +
        '<div class="text">9</div>' +
        '<div class="colon">:</div>' +
        '<div class="text">0</div>' +
        '<div class="text">7</div>' +
        '<div class="colon">:</div>' +
        '<div class="text">5</div>' +
        '<div class="text" style="margin-right: 2px">9</div>' +
      '</div>' +
    '</div>',

  data: function () {
    return {
      endTimeStr: "",
      countdownTime: [],
    }
  },
  props: {
    info: {
      type: Object,
    },
  },
  computed: {},
  watch: {},
  methods: {
    propsInit: function () {
      this.endTimeStr = this.info.end_y+"年"+
        this.addZero(this.info.end_m)+"月"+
        this.addZero(this.info.end_d)+"日 "+
        this.addZero(this.info.end_h)+":"+
        this.addZero(this.info.end_mi);
    },
    addZero: function (num) {
      num = parseInt(num);
      if (num < 10) {
        return "0" + num;
      }
      else {
        return "" + num;
      }
    }
  },

  beforeCreate () {},
  created () {
    this.propsInit();
  },
  beforeMount () {},
  mounted (){},
});