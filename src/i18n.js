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
          brands: "BRANDS (CHAIN)",
          branches: "TOTAL BRANCHES",
          revenue_total: "REVENUE (TOTAL)",
          system: "SYSTEM",
          new: "new",
          stable: "Stable"
        },
        table: {
          title: "Recent Brands",
          all: "All",
          col_brand: "BRAND",
          col_branches: "BRANCHES",
          col_date: "DATE",
          col_status: "STATUS",
          status_active: "Active",
          status_pending: "Pending",
          points: "{{count}} points",
          time_2_days: "2 days ago",
          time_5_hours: "5 hours ago",
          time_1_week: "1 week ago",
          time_2_weeks: "2 weeks ago"
        }
      },
      // --- RESTAURANTS PAGE (EN) ---
      restaurants: {
        title: "Brands & Networks",
        stats: {
          total_brands: "Total Brands",
          active_networks: "Active Networks",
          total_branches: "Total Branches",
          total_revenue: "Total Revenue"
        },
        search_placeholder: "Search Brand or Owner...",
        btn_new_brand: "New Brand",
        filters: {
          all: "All",
          active: "Active",
          pending: "Pending",
          inactive: "Inactive"
        },
        table: {
          brand: "BRAND",
          stats: "STATS",
          public_link: "PUBLIC LINK",
          status: "STATUS",
          actions: "ACTIONS",
          branches_count: "{{count}} Branches",
          currency: "Currency"
        },
        dialog: {
          title: "Delete Brand?",
          text: "Are you sure you want to delete",
          text_warning: "This will delete all branches, menus, and data associated with this network.",
          btn_cancel: "Cancel",
          btn_delete: "Delete Permanently"
        }
      },
      // --- DRAWER (EN) ---
      drawer: {
        title_edit: "Edit Brand",
        title_new: "New Brand Client",
        subtitle: "Setup brand and initial branches",
        section_identity: "BRAND IDENTITY",
        label_brand_name: "Brand Name",
        label_slug: "System URL (Slug)",
        label_currency: "Base Currency",
        section_locations: "PHYSICAL LOCATIONS",
        btn_add_branch: "Add Branch",
        label_branch_name: "Branch Name",
        placeholder_branch: "e.g. Center Branch",
        label_address: "Address",
        placeholder_address: "e.g. Nizami St. 12",
        tooltip_remove: "Remove Branch",
        section_owner: "OWNER PROFILE",
        label_owner_name: "Owner Full Name",
        label_email: "Login Email",
        label_phone: "Phone (WhatsApp)",
        label_password: "Password",
        section_plan: "PLAN",
        label_tariff: "Tariff Plan",
        btn_save: "Save Changes",
        btn_create: "Create Brand & Branches",
        btn_cancel: "Cancel"
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
        // DÜZƏLİŞ: Dashboard stat və table bura əlavə edildi
        stats: {
          brands: "BRENDLƏR (ŞƏBƏKƏ)",
          branches: "CƏMİ FİLİALLAR",
          revenue_total: "GƏLİR (ÜMUMİ)",
          system: "SİSTEM",
          new: "yeni",
          stable: "Stabil"
        },
        table: {
          title: "Son Brendlər",
          all: "Hamısı",
          col_brand: "BREND",
          col_branches: "FİLİALLAR",
          col_date: "TARİX",
          col_status: "STATUS",
          status_active: "Aktiv",
          status_pending: "Gözləmədə",
          points: "{{count}} filial",
          time_2_days: "2 gün əvvəl",
          time_5_hours: "5 saat əvvəl",
          time_1_week: "1 həftə əvvəl",
          time_2_weeks: "2 həftə əvvəl"
        }
      },
      // --- RESTAURANTS PAGE (AZ) ---
      restaurants: {
        title: "Brendlər və Şəbəkələr",
        stats: {
          total_brands: "Cəmi Brendlər",
          active_networks: "Aktiv Şəbəkələr",
          total_branches: "Cəmi Filiallar",
          total_revenue: "Ümumi Gəlir"
        },
        search_placeholder: "Brend və ya Sahibini axtar...",
        btn_new_brand: "Yeni Brend",
        filters: {
          all: "Hamısı",
          active: "Aktiv",
          pending: "Gözləmədə",
          inactive: "Deaktiv"
        },
        table: {
          brand: "BREND",
          stats: "STATİSTİKA",
          public_link: "LİNK",
          status: "STATUS",
          actions: "ƏMƏLİYYATLAR",
          branches_count: "{{count}} Filial",
          currency: "Valyuta"
        },
        dialog: {
          title: "Brendi Sil?",
          text: "Silmək istədiyinizə əminsiniz:",
          text_warning: "Bu əməliyyat bütün filialları, menyuları və məlumatları birdəfəlik siləcək.",
          btn_cancel: "Ləğv Et",
          btn_delete: "Birdəfəlik Sil"
        }
      },
      // --- DRAWER (AZ) ---
      drawer: {
        title_edit: "Brendi Redaktə Et",
        title_new: "Yeni Brend Müştərisi",
        subtitle: "Brendi və ilkin filialları quraşdırın",
        section_identity: "BREND KİMLİYİ",
        label_brand_name: "Brend Adı",
        label_slug: "Sistem Linki (Slug)",
        label_currency: "Əsas Valyuta",
        section_locations: "FİZİKİ FİLİALLAR",
        btn_add_branch: "Filial Əlavə Et",
        label_branch_name: "Filial Adı",
        placeholder_branch: "Məs: Mərkəz Filialı",
        label_address: "Ünvan",
        placeholder_address: "Məs: Nizami küç. 12",
        tooltip_remove: "Filialı Sil",
        section_owner: "SAHİB PROFİLİ",
        label_owner_name: "Sahibin Adı Soyadı",
        label_email: "Giriş Email",
        label_phone: "Telefon (WhatsApp)",
        label_password: "Şifrə",
        section_plan: "PLAN",
        label_tariff: "Tarif Planı",
        btn_save: "Yadda Saxla",
        btn_create: "Brend və Filialları Yarat",
        btn_cancel: "Ləğv Et"
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
        // DÜZƏLİŞ: Dashboard stat və table bura əlavə edildi
        stats: {
          brands: "БРЕНДЫ (СЕТИ)",
          branches: "ВСЕГО ФИЛИАЛОВ",
          revenue_total: "ВЫРУЧКА (ОБЩАЯ)",
          system: "СИСТЕМА",
          new: "нов",
          stable: "Стабил"
        },
        table: {
          title: "Недавние Бренды",
          all: "Все",
          col_brand: "БРЕНД",
          col_branches: "ФИЛИАЛЫ",
          col_date: "ДАТА",
          col_status: "СТАТУС",
          status_active: "Active",
          status_pending: "Pending",
          points: "{{count}} точек",
          time_2_days: "2 дня назад",
          time_5_hours: "5 часов назад",
          time_1_week: "1 неделю назад",
          time_2_weeks: "2 недели назад"
        }
      },
      // --- RESTAURANTS PAGE (RU) ---
      restaurants: {
        title: "Бренды и Сети",
        stats: {
          total_brands: "Всего Брендов",
          active_networks: "Активные Сети",
          total_branches: "Всего Филиалов",
          total_revenue: "Общая Выручка"
        },
        search_placeholder: "Поиск Бренда или Владельца...",
        btn_new_brand: "Новый Бренд",
        filters: {
          all: "Все",
          active: "Актив",
          pending: "Ожидание",
          inactive: "Неактив"
        },
        table: {
          brand: "БРЕНД",
          stats: "СТАТИСТИКА",
          public_link: "ПУБЛИЧНАЯ ССЫЛКА",
          status: "СТАТУС",
          actions: "ДЕЙСТВИЯ",
          branches_count: "{{count}} Филиалов",
          currency: "Валюта"
        },
        dialog: {
          title: "Удалить Бренд?",
          text: "Вы уверены, что хотите удалить",
          text_warning: "Это действие удалит все филиалы, меню и данные, связанные с этой сетью.",
          btn_cancel: "Отмена",
          btn_delete: "Удалить Навсегда"
        }
      },
      // --- DRAWER (RU) ---
      drawer: {
        title_edit: "Редактировать Бренд",
        title_new: "Новый Клиент Бренда",
        subtitle: "Настройка бренда и филиалов",
        section_identity: "ИДЕНТИФИКАЦИЯ БРЕНДА",
        label_brand_name: "Название Бренда",
        label_slug: "Системная Ссылка (Slug)",
        label_currency: "Валюта",
        section_locations: "ФИЗИЧЕСКИЕ ФИЛИАЛЫ",
        btn_add_branch: "Добавить Филиал",
        label_branch_name: "Название Филиала",
        placeholder_branch: "Напр: Центр",
        label_address: "Адрес",
        placeholder_address: "Напр: ул. Низами 12",
        tooltip_remove: "Удалить Филиал",
        section_owner: "ПРОФИЛЬ ВЛАДЕЛЬЦА",
        label_owner_name: "ФИО Владельца",
        label_email: "Email для входа",
        label_phone: "Телефон (WhatsApp)",
        label_password: "Пароль",
        section_plan: "ПЛАН",
        label_tariff: "Тарифный План",
        btn_save: "Сохранить",
        btn_create: "Создать Бренд и Филиалы",
        btn_cancel: "Отмена"
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