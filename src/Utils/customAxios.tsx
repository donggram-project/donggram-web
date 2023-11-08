import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};

export const customAxios = axios.create({
  baseURL: "http://13.125.162.181:8084", //8084으로 바꿔보라함
});

customAxios.interceptors.request.use(
  function (config) {
    // window 객체가 있고, localStorage에 accessToken이 있다면 헤더에 추가
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Access_Token"] = token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//200번대 응답이 아닐 경우 error
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    //401 = 토큰 만료
    if (status == 401) {
      const originRequest = config;
      //refreshToken
      const refreshToken = getCookie("refreshToken");
      const response = await axios.post(
        "http://13.125.162.181:8084/refreshToken", // 8084으로바꿔보라함
        {},
        {
          headers: {
            Refresh_Token: `${refreshToken}`,
          },
        }
      );
      //refreshToken 요청 성공
      if (response.status === 200) {
        const newToken = response.data.data;
        localStorage.setItem("accessToken", newToken);
        customAxios.defaults.headers.common.Access_Token = `${newToken}`;
        originRequest.headers.Access_Token = `${newToken}`;
        return axios(originRequest);
      } else if (response.status === 401) {
        alert("로그인 실패");
        window.location.replace("@pages/");
      } else {
        alert("오류가 발생했습니다. 재시도 해주세요");
      }
    }
    return Promise.reject(error);
  }
);
