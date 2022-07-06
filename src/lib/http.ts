import axios from "axios";
class HTTP {
  post(url: string, data?: Object) {
    return axios.post(url, data);
  }
}
export default HTTP;
