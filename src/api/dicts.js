import axios from "axios";


const HONGBAOSHU = "https://raw.githubusercontent.com/kebug/qwerty-learner/master/public/dicts/hongbaoshu.json"
const HONGBAOSHU_CDN = "https://cdn.jsdelivr.net/gh/kebug/qwerty-learner@master/public/dicts/hongbaoshu.json"
export function LoadDict() {
    return axios.get(HONGBAOSHU_CDN)
}