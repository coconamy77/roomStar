<template>
<div>
 <div v-show="show" id="loading">
           <div class="cssload-box-loading">

              <img
                src="../../assets/images/roomstar.png"
                style="margin-top:10vh; margin-left:-6vw; width:230px; height:auto ;"
              />
           </div>
        </div>
  <div v-show="!show" id="mypage2">
    <div style="height:100%;">
      <section class="banner">
        <v-parallax id="paral" src="../../assets/images/mypage_banner.jpg">
          <v-container fill-height>
            <v-row class="mx-auto">
              <v-col cols="12" md="12">
                <div class="text-center">
                  <div
                    class="font-weight-black mb-4"
                  ><p class="mypages">마이페이지</p></div>
                </div>
              </v-col>
            </v-row>
            <a href="#" id="scroll-down" class="scroll-down" address="true"></a>
          </v-container>
        </v-parallax>
      </section>
      <section class="mypage_content">
        <div class="options">
          <div
            class="option active"
            id="profile_once"
            :style="{'--optionBackground':'url('+profile+')'}"
          >
            <div class="text" style="writing-mode: tb-rl">NickName</div>
            <!--작은 화면일때-->
            <div class="text2"></div>
            <!-- 큰 화면일때-->
            <div class="shadow"></div>
            <div class="label">
              <div class="icon">
                <i class="fas fa-walking"></i>
              </div>
              <div class="info">
                <div class="main">{{nick}}</div>
                <div class="sub">{{provider}}</div>
              </div>
            </div>
          </div>
          <div class="option">
            <div class="text" style="writing-mode: tb-rl" id="textId2">ID</div>
            <div class="text2" id="textId">{{id}}</div>
            <!-- 큰 화면일때-->
            <div class="shadow"></div>
            <div class="label">
              <div class="icon" id="aa">
                <i class="fas fa-snowflake"></i>
              </div>
              <div class="info">
                <div class="main">{{id}}</div>
                <div class="sub">ID</div>
              </div>
            </div>
          </div>
          <div class="option">
            <div class="graph2">
              <vc-donut
                background="white"
                foreground="grey"
                :sections="sections"
                :total="100"
                id="donut"
              >{{winrate}}%</vc-donut>
            </div>
            <div class="text" style="writing-mode: tb-rl">WinRate</div>

            <div class="shadow"></div>
            <div class="label">
              <div class="icon">
                <i class="fas fa-tree"></i>
              </div>
              <div class="info">
                <div class="main">{{win}} 승 {{lose}} 패</div>
                <div class="sub">승률</div>
              </div>
            </div>
          </div>

          <div class="option" :style="{'--optionBackground':'url('+imgsrc+')'}">
            <div class="text" style="writing-mode: tb-rl">Grade</div>
            <div class="text2">{{grade}}</div>
            <!-- 큰 화면일때-->
            <div class="shadow"></div>
            <div class="label">
              <div class="icon">
                <i class="fas fa-sun"></i>
              </div>
              <div class="info">
                <div class="main">{{grade}}</div>
                <div class="sub">등급</div>
              </div>
            </div>
          </div>

          <div class="option">
            <div class="text" style="writing-mode: tb-rl">RANK</div>
            <div class="text2" id="board">
              <div class="leaderboard">
                <h1>
                  <svg class="ico-cup">
                    <use xlink:href="#cup" />
                  </svg>
                  랭킹
                </h1>
                <ol>
                  <!-- 랭킹수정 -->
                  <li v-for="(rankinguser, index) in rankingUsers" :key="index">
                    <mark>{{rankinguser[1]}}</mark>
                    <small>승률 {{rankinguser[0]}}%</small>
                  </li>
                </ol>
              </div>
            </div>
            <!-- 큰 화면일때-->
            <div class="shadow"></div>
            <div class="label">
              <div class="icon">
                <i class="fas fa-sun"></i>
              </div>
              <div class="info">
                <div class="main">{{this.myranking}}등</div>
                <div class="sub">RANK</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap&subset=korean');
</style>
<script>
import router from "@/routes";
import axios from "axios";
import ModalMyPage from "./ModalMyPage.vue";
import $ from "jquery";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";
import Vue from "vue";
import Trend from "vuetrend";

Vue.use(Trend);
Vue.use(Donut);

export default {
  data() {
    return {
      show: true,
      items: [
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/test-ff9ab.appspot.com/o/diamond.png?alt=media&token=b3ed51ea-3e3a-4e61-9b1e-612553050bf6",
          title: "Diamond"
        },
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/test-ff9ab.appspot.com/o/platinum.png?alt=media&token=41a44d43-5c2d-4b2e-ae36-9e069bf0f870",
          title: "Platinum"
        },
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/test-ff9ab.appspot.com/o/gold.png?alt=media&token=07882658-5846-4ea6-bc2a-1b2eee1f929c",
          title: "Gold"
        },
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/test-ff9ab.appspot.com/o/silver.png?alt=media&token=3e27ecaa-5061-471f-b19e-31ce7ee6568c",
          title: "Silver"
        },
        {
          src:
            "https://firebasestorage.googleapis.com/v0/b/test-ff9ab.appspot.com/o/bronze.png?alt=media&token=fafe32d3-f8cc-426d-8946-ebebff71779b",
          title: "Bronze"
        }
      ],
      id: "",
      nick: "",
      profile: "",
      email: "",
      provider: "",
      grade: "",
      game: "",
      win: "",
      lose: "",
      winrate: "",
      thumbnail: "",
      flag: false,
      imgsrc: "",
      rankingUsers: "",
      fiveRankingUsers: [],
      myranking: "",
      sections: [{ value: null }, { value: null }]
    };
  },

  name: "mypage",

  created() {
    let store = this.$store;
    // 승원 수정
    const userId = this.$session.get("userId");
    axios
      .get(process.env.VUE_APP_SERVER_IP + "/mypage/" + userId)
      .then(response => {
        // 전체에서 몇등인지 정보있어야함
        console.log("success2: ", response);
        const id = response.data.user_info.userid;
        console.log(id);
        const nick = response.data.user_info.nickname;
        const profile = response.data.user_info.profileimg;
        const thumbnail = response.data.user_info.thumbnail;
        const email = response.data.user_info.email;
        const provider = response.data.user_info.provider;
        const grade = response.data.user_info.grade;
        const game = response.data.user_info.game;
        const win = response.data.user_info.win;
        const lose = response.data.user_info.lose;
        const winrate = response.data.win_rate;

        this.id = id;
        this.nick = nick;
        this.profile = profile;
        this.thumbnail = thumbnail;
        this.email = email;
        this.provider = provider;
        this.grade = grade;
        this.game = game;
        this.win = win;
        this.lose = lose;
        this.winrate = winrate;

        for (let i of this.items) {
          console.log(i.title);
          if (i.title == grade) {
            this.imgsrc = i.src;
          }
        }
        this.sections[0].value = 100 - winrate;
        this.sections[1].value = winrate;
      })
      .catch(e => {
        console.log("error: ", e);
      });

    // 랭킹 정보 모두 가져오기

    // http://localhost:8081/getUserInfo
    axios
      .get(process.env.VUE_APP_SERVER_IP + "/getUserInfo/")
      .then(response => {
        console.log(response.data.data);
        this.rankingUsers = response.data.data;
        //var i=0; i<array.length; i++
        for (var i = 0; i < this.rankingUsers.length; i++) {
          console.log(this.rankingUsers[i]);
          // console.log(this.rankingUsers);
          // 승률은?
          // 승률 높은 5명만 뽑아오기
          // 승률 계산 방식
          // 전체게임수 분의 승 곱하기 백
          // 승수 곱하기 백
          // (승리한 경기 수) ÷ (승수+패수)
          let rate = 0;
          if (this.rankingUsers[i].win + this.rankingUsers[i].lose == 0) {
            rate = 0;
          } else {
            rate = (this.rankingUsers[i].win / this.rankingUsers[i].game) * 100;
            rate = Math.floor(rate);
          }
          console.log(rate);
          var user = {
            rate : rate,
            nickname : this.rankingUsers[i].nickname,
          }
          
          this.fiveRankingUsers.push([rate,this.rankingUsers[i].nickname])



        }
        this.fiveRankingUsers.sort()
        this.fiveRankingUsers.reverse()

        for (var j=0; j < this.fiveRankingUsers.length; j ++ ){
          if (this.nick === this.fiveRankingUsers[j][1]) {
            this.myranking = j+1;
          }
        }

        this.fiveRankingUsers = this.fiveRankingUsers.slice(0, 5)
        // 승률 내림차순
        this.rankingUsers = this.fiveRankingUsers;
        console.log(this.rankingUsers)
        console.log(this.myranking)
      });

      setTimeout(() => {
        this.show=false;
}, 1000);
  },
  mounted() {
    $(function() {
      $(".option").click(function() {
        $(".option").removeClass("active");
        $(this).addClass("active");
      });
    });
    $(function() {
      $("#scroll-down").click(function() {
        $("html, body").animate(
          { scrollTop: $(".mypage_content").offset().top },
          "slow"
        );
        return false;
      });
    });
  }

  // viewMypage
};
</script>

<style lang="scss" scoped>

body
{
  margin:0;
  padding:0
}

#loading {
    background: #DA22FF;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    margin-top: 0px;
    top: 0px;
    z-index: 999999;
    display: block;
}


/*-------------------------
    33.Preloader CSS
---------------------------*/
.loadding-page {
  width: 100%;
  height: 100%;
  background: #fdd245;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 9999;
}
.cssload-box-loading {
  width: 49px;
  height: 49px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.cssload-box-loading:before {
  content: '';
  width: 49px;
  height: 5px;
  background: #000000;
  opacity: 0.1;
  position: absolute;
  top: 58px;
  left: 0;
  border-radius: 50%;
  animation: shadow 0.58s linear infinite;
  -o-animation: shadow 0.58s linear infinite;
  -ms-animation: shadow 0.58s linear infinite;
  -webkit-animation: shadow 0.58s linear infinite;
  -moz-animation: shadow 0.58s linear infinite;
}
.cssload-box-loading:after {
  content: '';
  width: 49px;
  height: 49px;
  background: #fdd245;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  animation: cssload-animate 0.58s linear infinite;
  -o-animation: cssload-animate 0.58s linear infinite;
  -ms-animation: cssload-animate 0.58s linear infinite;
  -webkit-animation: cssload-animate 0.58s linear infinite;
  -moz-animation: cssload-animate 0.58s linear infinite;
}
@keyframes cssload-animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 39px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}
@-o-keyframes cssload-animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    -o-transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    -o-transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 39px;
  }
  75% {
    -o-transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    -o-transform: translateY(0) rotate(90deg);
  }
}
@-ms-keyframes cssload-animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    -ms-transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    -ms-transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 39px;
  }
  75% {
    -ms-transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    -ms-transform: translateY(0) rotate(90deg);
  }
}
@-webkit-keyframes cssload-animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    -webkit-transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    -webkit-transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 39px;
  }
  75% {
    -webkit-transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    -webkit-transform: translateY(0) rotate(90deg);
  }
}
@-moz-keyframes cssload-animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    -moz-transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    -moz-transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 39px;
  }
  75% {
    -moz-transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    -moz-transform: translateY(0) rotate(90deg);
  }
}
@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}
@-o-keyframes shadow {
  0%,
  100% {
    -o-transform: scale(1, 1);
  }
  50% {
    -o-transform: scale(1.2, 1);
  }
}
@-ms-keyframes shadow {
  0%,
  100% {
    -ms-transform: scale(1, 1);
  }
  50% {
    -ms-transform: scale(1.2, 1);
  }
}
@-webkit-keyframes shadow {
  0%,
  100% {
    -webkit-transform: scale(1, 1);
  }
  50% {
    -webkit-transform: scale(1.2, 1);
  }
}
@-moz-keyframes shadow {
  0%,
  100% {
    -moz-transform: scale(1, 1);
  }
  50% {
    -moz-transform: scale(1.2, 1);
  }
}


$optionDefaultColours: #ed5565, rgb(223, 7, 243), black, #2ecc71,
  radial-gradient(
    ellipse farthest-corner at center top,
    #f39264 0%,
    #f2606f 100%
  );

.banner {
  height: 100vh !important;
  width: auto;
}

section {
  height: 100vh !important;
  // background-color:rgba(254,248,226,1);
  width: auto;
}
.img_logo {
  position: fixed;
  width: 5vw;
  height: auto;
  margin-left: 35.7vw;
  margin-top: 11vh;
  opacity: 0.9;
}

h1 {
  color: black;
  font-family: fantasy;
  //   font-family: 'Noto Sans KR', sans-serif;
  // font-family: 'Gothic A1', sans-serif;
}
.mypage_text {
  text-align: center;
  color: rgba(136, 53, 151, 0.9);
  padding-top: 1em;
  font-size: 70px;
}
.container {
  width: 100vw;
}
body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100vh;

  font-family: "Roboto", sans-serif;
  .credit {
    position: absolute;
    bottom: 20px;
    left: 20px;

    color: #000;
  }

  .options {
    margin-top: 5vh;
    margin-left: 23vw;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    overflow: hidden;

    min-width: 600px;
    max-width: 900px;
    width: calc(100% - 100px);

    height: 500px;

    @for $i from 1 through 4 {
      @media screen and (max-width: 878px - $i*80) {
        min-width: 600px - $i * 80;
        .option:nth-child(#{6-$i}) {
          display: none;
        }
      }
    }

    .option {
      position: relative;
      overflow: hidden;

      min-width: 60px;
      margin: 10px;
      //border:0px solid --defaultColor;

      background: var(--optionBackground, var(--defaultBackground, #e6e9ed));
      background-size: auto 120%;
      background-position: center;
      background-color: rgba(166, 83, 0, 0.2);

      cursor: pointer;

      transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);

      @for $i from 1 through length($optionDefaultColours) {
        &:nth-child(#{$i}) {
          --defaultBackground: #{nth($optionDefaultColours, $i)};
        }
      }
      &.active {
        flex-grow: 10000;
        transform: scale(1);
        color: white;
        max-width: 600px;
        margin: 0px;
        border-radius: 40px;
        background-size: auto 100%;
        .text {
          color: rgba(0, 0, 0, 0);
        }
        .text2 {
          border-radius: 100%;
          font-size: 100px;
          margin-top: 1em;
          text-align: center;
        }
        #donut {
          color: #000 !important;
          margin-top: 3vw;
        }
        #textId {
          color: white !important;
          font-size: 80px;
        }
        #snow {
          color: black;
        }

        .shadow {
          box-shadow: inset 0 -120px 120px -120px black,
            inset 0 -120px 120px -100px black;
        }
        .label {
          bottom: 20px;
          background-color: rgba(0, 0, 0, 0) !important;
          left: 20px;
          .info {
            background-color: rgba(0, 0, 0, 0) !important;
          }
          .info > div {
            left: 0px;
            opacity: 1;
          }
        }
        /*&:active {
               transform:scale(0.9);
            }*/
      }
      &:not(.active) {
        flex-grow: 1;

        border-radius: 30px;
        #textId2 {
          color: white;
        }
        #snow {
          color: black;
        }
        .text {
          color: white;
          border-radius: 100%;
          font-size: 30px;
          margin-top: 1em;
        }
        .text2 {
          color: rgba(0, 0, 0, 0);
          width: 60px !important;
        }
        .graph2 {
          width: 60px !important;
        }
        #donut {
          opacity: 0;
          margin-top: -16.3vw;
        }
        #board {
          opacity: 0;
          margin-top: -16.3vw;
        }
        .shadow {
          bottom: -40px;
          box-shadow: inset 0 -120px 0px -120px black,
            inset 0 -120px 0px -100px black;
        }
        .label {
          bottom: 10px;
          left: 10px;
          .info {
            background-color: rgba(0, 0, 0, 0) !important;
          }
          .info > div {
            left: 20px;
            opacity: 0;
          }
        }
      }
      .shadow {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;

        height: 120px;

        transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
      }
      .label {
        display: flex;
        position: absolute;
        right: 0px;

        height: 40px;
        transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
        .icon {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          min-width: 40px;
          max-width: 40px;
          height: 40px;
          border-radius: 100%;

          background-color: white;
          color: var(--defaultBackground);
        }
        #aa {
          background-color: white;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;

          margin-left: 10px;

          color: white;

          white-space: pre;
          > div {
            position: relative;

            transition: 0.5s cubic-bezier(0.05, 0.61, 0.41, 0.95),
              opacity 0.5s ease-out;
          }
          .main {
            font-weight: bold;
            font-size: 1.2rem;
          }
          .sub {
            transition-delay: 0.1s;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
/*--------------------
Body
--------------------*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

/*--------------------
Leaderboard
--------------------*/
.leaderboard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 285px;
  height: 308px;
  background: linear-gradient(to bottom, #3a404d, #181c26);
  border-radius: 10px;
  box-shadow: 0 7px 30px rgba(62, 9, 11, 0.3);

  h1 {
    font-size: 18px;
    color: #e1e1e1;
    padding: 12px 13px 18px;

    & svg {
      width: 25px;
      height: 26px;
      position: relative;
      top: 3px;
      margin-right: 6px;
      vertical-align: baseline;
    }
  }

  ol {
    counter-reset: leaderboard;

    li {
      position: relative;
      z-index: 1;
      font-size: 14px;
      counter-increment: leaderboard;
      padding: 18px 10px 18px 50px;
      cursor: pointer;
      backface-visibility: hidden;
      transform: translateZ(0) scale(1, 1);

      &::before {
        content: counter(leaderboard);
        position: absolute;
        z-index: 2;
        top: 15px;
        left: 15px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        color: #c24448;
        background: #fff;
        border-radius: 20px;
        text-align: center;
      }

      mark {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 18px 10px 18px 50px;
        margin: 0;
        background: none;
        color: #fff;

        &::before,
        &::after {
          content: "";
          position: absolute;
          z-index: 1;
          bottom: -11px;
          left: -9px;
          border-top: 10px solid #c24448;
          border-left: 10px solid transparent;
          transition: all 0.1s ease-in-out;
          opacity: 0;
        }

        &::after {
          left: auto;
          right: -9px;
          border-left: none;
          border-right: 10px solid transparent;
        }
      }

      small {
        position: relative;
        z-index: 2;
        display: block;
        text-align: right;
      }

      &::after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fa6855;
        box-shadow: 0 3px 0 rgba(0, 0, 0, 0.08);
        // transform: scaleX(1.06) scaleY(1.03);
        transition: all 0.3s ease-in-out;
        opacity: 0;
      }

      &:nth-child(1) {
        background: #fa6855;
        &::after {
          background: #fa6855;
        }
      }

      &:nth-child(2) {
        background: #e0574f;
        &::after {
          background: #e0574f;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.08);
        }

        & mark {
          &::before,
          &::after {
            border-top: 6px solid #ba4741;
            bottom: -7px;
          }
        }
      }

      &:nth-child(3) {
        background: #d7514d;
        &::after {
          background: #d7514d;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.11);
        }

        & mark {
          &::before,
          &::after {
            border-top: 2px solid #b0433f;
            bottom: -3px;
          }
        }
      }

      &:nth-child(4) {
        background: #cd4b4b;
        &::after {
          background: #cd4b4b;
          box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
        }

        & mark {
          &::before,
          &::after {
            top: -7px;
            bottom: auto;
            border-top: none;
            border-bottom: 6px solid #a63d3d;
          }
        }
      }

      &:nth-child(5) {
        background: #c24448;
        border-radius: 0 0 10px 10px;
        &::after {
          background: #c24448;
          box-shadow: 0 -2.5px 0 rgba(0, 0, 0, 0.12);
          border-radius: 0 0 10px 10px;
        }

        & mark {
          &::before,
          &::after {
            top: -9px;
            bottom: auto;
            border-top: none;
            border-bottom: 8px solid #993639;
          }
        }
      }
    }

    // hover
    li:hover {
      z-index: 2;
      overflow: visible;

      &::after {
        opacity: 1;
        transform: scaleX(1.06) scaleY(1.03);
      }

      & mark {
        &::before,
        &::after {
          opacity: 1;
          transition: all 0.35s ease-in-out;
        }
      }
    }
  }
}

* {
  //display: none;
}

.the-most {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 50vw;
  max-width: 200px;
  padding: 10px;

  img {
    max-width: 100%;
  }
}
.scroll-down {
  opacity: 1;
  -webkit-transition: all 0.5s ease-in 3s;
  transition: all 0.5s ease-in 3s;
}

.scroll-down {
  position: absolute;
  bottom: 150px;
  left: 50%;
  margin-left: -16px;
  display: block;
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  background-size: 14px auto;
  border-radius: 50%;
  z-index: 2;
  -webkit-animation: bounce 2s infinite 2s;
  animation: bounce 2s infinite 2s;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  transform: scale(1);
}

.scroll-down:before {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 6px);
  transform: rotate(-45deg);
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  border: 2px solid white;
  border-width: 0px 0 2px 2px;
}
@import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');
.mypages{
  font-size:100px;
  font-family: 'Do Hyeon', ;
  color:rgba(255,255,255);
  -webkit-text-stroke: 1px #000;
}
#paral {
  height: 100vh !important;
  width: auto;
}
.mypage_content {
  padding-top: 20vh;
  //background-color:rgba(255,213,170);
  background-image: url("../../assets/images/mypage_content.jpg");
  background-opacity: 0.5;
  width: 100vw;
}
</style>