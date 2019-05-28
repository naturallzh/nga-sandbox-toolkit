Vue.component('countdown-v1', {
  template:
    '<div id="countdown-v1-box">' +
      '<div id="title">{{info.title}}</div>' +
      '<div id="end-time">至 {{endTimeStr}}</div>' +
      '<div id="time-board">' +
        '<div class="text" id="day" style="margin-right: 15px;letter-spacing: 2px;" :style="this.opacityStr">{{countdownTime[0]}}{{countdownTime[1]}}天</div>' +
        '<div class="text">{{countdownTime[2]}}</div>' +
        '<div class="text">{{countdownTime[3]}}</div>' +
        '<div class="colon">:</div>' +
        '<div class="text">{{countdownTime[4]}}</div>' +
        '<div class="text">{{countdownTime[5]}}</div>' +
        '<div class="colon">:</div>' +
        '<div class="text">{{countdownTime[6]}}</div>' +
        '<div class="text" style="margin-right: 2px">{{countdownTime[7]}}</div>' +
      '</div>' +
    '</div>',

  data: function () {
    return {
      endTimeStr: "",
      countdownMs: null,
      opacityStr: "opacity:1",
    }
  },
  props: {
    info: {
      type: Object,
    },
  },
  computed: {
    countdownTime: function () {
      let outputArr = "";
      let ms = Math.floor(this.countdownMs/1000);
      outputArr += this.addZero(Math.floor(ms/3600/24));
      if (outputArr === "00") {
        this.opacityStr = "opacity:0.3";
      }
      ms = ms % (3600*24);
      outputArr += this.addZero(Math.floor(ms/3600));
      ms = ms % 3600;
      outputArr += this.addZero(Math.floor(ms/60));
      outputArr += this.addZero(ms % 60);
      //console.log(outputArr);
      return outputArr.split("");
    }
  },
  watch: {},
  methods: {
    propsInit: function () {
      this.endTimeStr = this.info.end_y+"年"+
        this.addZero(this.info.end_m)+"月"+
        this.addZero(this.info.end_d)+"日 "+
        this.addZero(this.info.end_h)+":"+
        this.addZero(this.info.end_mi);

      const endDate = new Date(
        parseInt(this.info.end_y),
        parseInt(this.info.end_m)-1,
        parseInt(this.info.end_d),
        parseInt(this.info.end_h),
        parseInt(this.info.end_mi),
      );
      const curDate = new Date();
      this.countdownMs = endDate - curDate;
    },

    addZero: function (num) {
      num = parseInt(num);
      if (num < 10) {
        return "0" + num;
      }
      else {
        return "" + num;
      }
    },

    refreshTimer: function () {
      this.propsInit();
    }
  },

  beforeCreate () {},
  created () {
    this.propsInit();
    window.addEventListener('focus', this.refreshTimer);
  },
  beforeMount () {},
  mounted (){
    setInterval(()=>{this.countdownMs -= 500},500);
  },
});