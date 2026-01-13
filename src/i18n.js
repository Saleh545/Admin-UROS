import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      sidebar: {
        super_admin: "Super Admin",
        dashboard: "Dashboard",
        restaurants: "Restaurants",
        users: "Users",
        automation: "n8n Automation",
        support: "Support Tickets",
        push: "Push Notifications",
        logs: "Global Logs",
        management: "Management",
        venue_dashboard: "Venue Dashboard",
        marketing: "Marketing & Promo",
        staff: "Staff & Access",
        limits: "Limits",
        security: "Security Logs",
        settings: "Venue Settings",
        analytics: "Analytics"
      },
      dashboard: {
        title: "Super Admin",
        subtitle: "UR-OS Monitoring Panel",
        stats: {
          restaurants: "Restaurants",
          revenue: "Revenue",
          users: "Users",
          system: "System"
        },
        table: {
          title: "Recent Registrations",
          all: "All",
          col_restaurant: "Restaurant",
          col_date: "Date",
          col_status: "Status"
        }
      },
      profile: {
        profile: "Profile",
        settings: "Settings",
        logout: "Logout"
      }
    }
  },
  az: {
    translation: {
      sidebar: {
        super_admin: "Super Admin",
        dashboard: "İdarə Paneli",
        restaurants: "Restoranlar",
        users: "İstifadəçilər",
        automation: "n8n Avtomatlaşdırma",
        support: "Dəstək Tələbləri",
        push: "Push Bildirişlər",
        logs: "Qlobal Loglar",
        management: "İdarəetmə",
        venue_dashboard: "Məkan Paneli",
        marketing: "Marketinq və Promo",
        staff: "Personal və Giriş",
        limits: "Limitlər",
        security: "Təhlükəsizlik",
        settings: "Məkan Ayarları",
        analytics: "Analitika"
      },
      dashboard: {
        title: "Super Admin",
        subtitle: "UR-OS Monitorinq Paneli",
        stats: {
          restaurants: "Restoranlar",
          revenue: "Gəlir",
          users: "İstifadəçilər",
          system: "Sistem"
        },
        table: {
          title: "Son Qeydiyyatlar",
          all: "Hamısı",
          col_restaurant: "Restoran",
          col_date: "Tarix",
          col_status: "Status"
        }
      },
      profile: {
        profile: "Profil",
        settings: "Ayarlar",
        logout: "Çıxış"
      }
    }
  },
  ru: {
    translation: {
      sidebar: {
        super_admin: "Супер Админ",
        dashboard: "Панель управления",
        restaurants: "Рестораны",
        users: "Пользователи",
        automation: "Автоматизация n8n",
        support: "Тикеты поддержки",
        push: "Push-уведомления",
        logs: "Глобальные логи",
        management: "Управление",
        venue_dashboard: "Панель заведения",
        marketing: "Маркетинг и Промо",
        staff: "Персонал и Доступ",
        limits: "Лимиты",
        security: "Безопасность",
        settings: "Настройки заведения",
        analytics: "Аналитика"
      },
      dashboard: {
        title: "Супер Админ",
        subtitle: "Панель мониторинга UR-OS",
        stats: {
          restaurants: "Рестораны",
          revenue: "Выручка",
          users: "Юзеры",
          system: "Система"
        },
        table: {
          title: "Недавние регистрации",
          all: "Все",
          col_restaurant: "Ресторан",
          col_date: "Дата",
          col_status: "Статус"
        }
      },
      profile: {
        profile: "Профиль",
        settings: "Настройки",
        logout: "Выйти"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "az", // Varsayılan dil
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;