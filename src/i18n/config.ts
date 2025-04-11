import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// サポートする言語をオブジェクトで定義しています。
// ユーザーが言語を手動で切り替える場合に使用するためのものです。
export const supportedLngs = {
  en: "English",
  ja: "日本語",
};

i18n
  .use(HttpApi) // 翻訳ファイルを非同期に読み込むため
  .use(LanguageDetector) // ユーザーの言語設定を検知するため
  .use(initReactI18next) // i18next インスタンスを初期化
  .init({
    fallbackLng: "ja", // フォールバック言語。指定された言語ファイルがない場合などにこの言語が使用される
    returnEmptyString: false, // 空文字での定義を許可に
    supportedLngs: Object.keys(supportedLngs),
    debug: true, // true にすると開発コンソールに i18next が正しく初期化されたことを示す出力が表示される

    // バックエンドの設定を修正
    backend: {
      // 翻訳ファイルのパスを/publicを含むように修正
      loadPath: "/public/locales/{{lng}}/{{ns}}.json",
    },

    // デフォルトは`escapeValue: true`
    // 18next が翻訳メッセージ内のコードをエスケープし、XSS 攻撃から保護するためのもの
    // React がこのエスケープを行ってくれるので、今回はこれをオフにする
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
