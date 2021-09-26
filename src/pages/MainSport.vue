<template>
  <div class="wrapper">
    <div class="content">
      <div
        style="
          background: rgba(255, 255, 255, 0.3);
          padding: 12px;
          border-radius: 5px;
          margin-top: 90px;
          font-size: 15px;
        "
      >
        <p style="text-indent: 2em">
          为进一步推进党史学习教育走深走实，深化对党的光辉历程的学习掌握，教育引导广大党员、干部、群众坚定理想信念、坚守为民宗旨、继承建党精神，强化使命担当，现特在全公司范围开展“凝聚成钞力量
          传承时代精神”
          ——学习贯彻习近平总书记“七一”重要讲话精神线上答题活动。请大家认真学习习近平总书记在庆祝中国共产党成立100周年大会上的重要讲话，在规定时间内完成答题。
        </p>
        <br />
        <p style="text-align: right">党委宣传部<br />2021年9月27日</p>
      </div>
      <br />
      <div class="login">
        <x-button
          type="primary"
          @click.native="jump('doc')"
          :disabled="times > 0"
          >开始学习 {{ times > 0 ? "(" + times + ")" : "" }}</x-button
        >
      </div>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
    <!-- <canvas ref="band"></canvas> -->
    <div class="canvas" id="home"></div>
    <v-foot color="#333" />
    <img src="../assets/img/back.jpg" class="mainbg" />
  </div>
</template>
<script>
import particles from "particles.js";
import particlesSetting from "../lib/particlesSetting";
import { XButton, Toast } from "vux";

export default {
  components: {
    XButton,
    Toast,
  },
  data() {
    return {
      toast: {
        show: false,
        msg: "",
      },
      showLoginfo: false,
      haveAnswerTimes: true,
      times: 10,
      clvId: 0,
    };
  },
  computed: {
    sport: {
      get() {
        return this.$store.state.sport;
      },
      set(val) {
        this.$store.commit("setSport", val);
      },
    },
  },
  methods: {
    jump(router) {
      this.$router.push(router);
    },
    animateCanvas() {
      function i() {
        if ((ctx.clearRect(0, 0, w, h), firstTime))
          for (
            q = [
              {
                x: 0,
                y: 0.7 * h + bandwidth,
                v_x: 0,
                v_y: 0,
              },
              {
                x: 0,
                y: 0.7 * h - bandwidth,
                v_x: 0,
                v_y: 0,
              },
            ],
              verticals.push(q[0]),
              verticals.push(q[1]);
            q[1].x < w + bandwidth;

          )
            firstDraw(q[0], q[1]);
        else
          for (var t = 0, e = 1; e < verticals.length - 1; )
            tweak(t, e), t++, e++;
        (firstTime = !1), requestAnimationFrame(i);
      }

      function go(t) {
        random() < 0.5 || (t.v_x += 0.1 * (random() - 0.5)),
          random() < 0.5 || (t.v_y += 0.1 * (random() - 0.5));
        var e = 0.3;
        (t.v_x = Math.max(Math.min(t.v_x, e), -e)),
          (t.v_y = Math.max(Math.min(t.v_y, e), -e)),
          (t.x += t.v_x),
          (t.y += t.v_y),
          (t.x < 0 || t.x > w) && (t.v_x *= -1.01),
          (t.y < 0 || t.y > h) && (t.v_y *= -1.01);
      }

      function tweak(t, e) {
        ctx.beginPath();
        var i = verticals[t],
          a = verticals[e],
          o = verticals_side[t],
          r = fillStyles[t];
        go(a),
          ctx.moveTo(i.x, i.y),
          ctx.lineTo(a.x, a.y),
          go(o),
          ctx.lineTo(o.x, o.y),
          ctx.closePath();
        (ctx.strokeStyle = r), ctx.stroke();
        // ctx.fillStyle = r;
        // ctx.fill();
      }

      function firstDraw(t, e) {
        ctx.beginPath(), ctx.moveTo(t.x, t.y), ctx.lineTo(e.x, e.y);
        var i = e.x + (2 * random() - 0.25) * bandwidth,
          a = y(e.y);
        ctx.lineTo(i, a), ctx.closePath(), (r -= twoPi / -50);
        ctx.strokeStyle =
          "#" +
          (
            ((127 * cos(r) + 128) << 16) |
            ((127 * cos(r + twoPi / 3) + 128) << 8) |
            (127 * cos(r + (twoPi / 3) * 2) + 128)
          ).toString(16);
        // ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke();
        ctx.fill;
        (q[0] = q[1]),
          (q[1] = {
            x: i,
            y: a,
            v_x: 0,
            v_y: 0,
          }),
          verticals.push(q[1]),
          fillStyles.push(ctx.strokeStyle),
          verticals_side.push(q[1]);
      }

      function y(t) {
        var e = t + (2 * random() - 1.1) * bandwidth;
        return e > h || 0 > e ? y(t) : e;
      }
      var canvas = this.$refs.band,
        ctx = canvas.getContext("2d"),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        bandwidth = 90,
        q,
        r = 0,
        twoPi = 2 * Math.PI,
        cos = Math.cos,
        random = Math.random;
      (canvas.width = w * pr),
        (canvas.height = h * pr),
        ctx.scale(pr, pr),
        (ctx.globalAlpha = 0.2);
      var verticals = [],
        verticals_side = [],
        fillStyles = [],
        firstTime = !0;
      requestAnimationFrame(i);
    },
    loadUserInfo() {
      let userInfo = localStorage.getItem("cc_p_userInfo");
      if (userInfo == null) {
        return;
      }
    },
  },
  mounted() {
    // this.animateCanvas();
    this.loadUserInfo();
    particlesJS("home", particlesSetting);
    document.title = this.sport.name; //+ "微信答题";
    var that = this;
    this.clvId = window.setInterval(function () {
      that.times > 0 && that.times--;
    }, 1000);
  },
  unmounted() {
    this.clvId && window.clearInterval(this.clvId);
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  .mainbg {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: -1;
  }
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13pt;
  color: #333;
  width: 100%;
  justify-content: center;
  .title {
    font-size: 16pt;
    text-align: center;
  }
  .time {
    font-size: 12pt;
  }
  .btn-wrapper {
    position: absolute;
    bottom: 24%;
    width: 145px;
    font-size: 10pt;
    p {
      padding-bottom: 10px;
    }
  }
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@red-color: #d0080d;

.weui-btn + .weui-btn {
  margin-top: 5px;
}
.weui-btn_default {
  line-height: 2;
  background: transparent;
  color: #333;
}

.weui-btn_disabled.weui-btn_primary {
  background-color: #cc3c3e;
}
.weui-btn:after {
  border-color: @red-color;
}

.weui-btn_primary {
  background-color: @red-color;
  border: 1px solid rgb(200, 200, 200);
}

.slogan {
  padding-top: 15px;
  font-size: 15pt;
  color: #333;
  font-weight: normal;
}
</style>
