import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Khởi tạo i18n
i18n

  // Sử dụng backend để load file JSON dịch từ server (hoặc public/locales)
  .use(Backend)

  // Tự động phát hiện ngôn ngữ từ browser (navigator.language, cookie, localStorage…)
  .use(LanguageDetector)

  // Tích hợp i18n vào React thông qua initReactI18next
  .use(initReactI18next)

  // Cấu hình i18n
  .init({
    // Ngôn ngữ mặc định khi khởi chạy app
    lng: 'vi',

    // Cấu hình cho backend → chỉ định đường dẫn tới file chứa translation
    // ví dụ: /locales/vi.json hoặc /locales/en.json
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },

    // Nếu không tìm thấy ngôn ngữ người dùng → fallback sang 'vi'
    fallbackLng: 'vi',

    // Bật log debug (false để tắt, true để theo dõi quá trình load dịch)
    debug: false,

    // Nếu keySeparator = false → i18n sẽ coi toàn bộ key là 1 chuỗi
    // (vd: "home.title" sẽ được coi là một key thay vì { home: { title: ... } })
    keySeparator: false,

    react: {
      // useSuspense: false → tránh warning khi dùng với React Suspense
      useSuspense: false
    },

    interpolation: {
      // Không escape HTML trong giá trị dịch (React đã escape sẵn)
      escapeValue: false,

      // Nếu bạn dùng format nhiều giá trị trong 1 key, phân cách bằng dấu ,
      formatSeparator: ','
    }
  })

export default i18n

export const LANGUAGE_OPTIONS = [
  {
    lang: 'Tiếng Việt',
    value: 'vi'
  },
  {
    lang: 'English',
    value: 'en'
  }
]
