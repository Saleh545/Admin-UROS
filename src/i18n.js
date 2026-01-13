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
          system: "System",
          new: "new",
          total: "Total",
          stable: "Stable"
        },
        table: {
          title: "Recent Registrations",
          all: "All",
          col_restaurant: "Restaurant",
          col_date: "Date",
          col_status: "Status",
          status_active: "Active",
          status_pending: "Pending",
          time_2_days: "2 days ago",
          time_5_hours: "5 hours ago",
          time_1_week: "1 week ago",
          time_2_weeks: "2 weeks ago"
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
          system: "Sistem",
          new: "yeni",
          total: "Cəmi",
          stable: "Stabil"
        },
        table: {
          title: "Son Qeydiyyatlar",
          all: "Hamısı",
          col_restaurant: "Restoran",
          col_date: "Tarix",
          col_status: "Status",
          status_active: "Aktiv",
          status_pending: "Gözləmədə",
          time_2_days: "2 gün əvvəl",
          time_5_hours: "5 saat əvvəl",
          time_1_week: "1 həftə əvvəl",
          time_2_weeks: "2 həftə əvvəl"
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
          system: "Система",
          new: "нов",
          total: "Всего",
          stable: "Стабил"
        },
        table: {
          title: "Недавние регистрации",
          all: "Все",
          col_restaurant: "Ресторан",
          col_date: "Дата",
          col_status: "Статус",
          status_active: "Актив",
          status_pending: "Ожидание",
          time_2_days: "2 дня назад",
          time_5_hours: "5 часов назад",
          time_1_week: "1 неделю назад",
          time_2_weeks: "2 недели назад"
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
    fallbackLng: "az",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;