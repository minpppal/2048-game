"use client";
import Script from "next/script";

export default function KakaoScript() {
  const handleKakaoInit = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string);
  };

  return (
    <Script
      src={"https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"}
      integrity={
        "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
      }
      crossOrigin="anonymous"
      onLoad={handleKakaoInit}
    />
  );
}
