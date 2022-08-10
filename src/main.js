// import "core-js"; 全部引入
// import 'core-js/es/promise' 按需引入
import count from "./js/count";
import sum from "./js/sum";
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./styl/index.styl";

let result = count(2, 1);
console.log(result);
console.log(sum(2, 5, 6, 8, 9));

// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
