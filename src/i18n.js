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
        pricing: "Pricing & Plans",
        automation: "n8n Automation",
        support: "Support Tickets",
        push: "Push Notifications",
        releases: "System Releases",
        logs: "Global Logs",
        management: "Management",
        venue_dashboard: "Venue Dashboard",
        marketing: "Marketing & Promo",
        staff: "Staff & Access",
        limits: "Limits",
        security: "Security Logs",
        settings: "Venue Settings",
        analytics: "Analytics",
        whats_new: "What's New",
        help: "Help & Support",
        finance: "Finance",
        billing: "Billing",
        operations: "Operations",
        ops_dashboard: "Dashboard",
        live_orders: "Live Orders",
        chat: "Chat / CRM",
        reviews: "Reviews / Feedback",
        menu_mgmt: "Menu Management",
        table_layout: "Table Layout",
        floor_plan: "Visual Floor Plan",
        personal: "Personal",
        profile_settings: "Profile Settings",
        staff_interface: "Staff Interface",
        open_mobile: "Open Mobile App",
        staff_profile: "Staff Profile"
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
      // YENİ: USERS PAGE
      users_page: {
        title: "System Users",
        subtitle: "Access Management (Admins, Owners, Staff)",
        btn_add_user: "Add New User",
        search_placeholder: "Search by Name, Email or Restaurant...",
        filter_all_roles: "All Roles",
        table: {
          col_user: "USER",
          col_role: "ROLE",
          col_restaurant: "RESTAURANT",
          col_contact: "CONTACT",
          col_status: "STATUS",
          col_actions: "ACTIONS",
          last_login: "Last login: {{time}}"
        },
        drawer: {
          title: "New User",
          label_fullname: "Full Name",
          label_email: "Email (Login)",
          label_phone: "Phone",
          label_restaurant: "Restaurant",
          label_role: "Role",
          label_status: "Status",
          btn_save: "Save User",
          btn_cancel: "Cancel",
          alert_required: "Name and Email are required!"
        },
        reset_password: {
          title: "Reset Password",
          confirm_text: "Reset password for",
          warning: "Current password will stop working.",
          success: "Password reset successfully!",
          label_new_pass: "New Password",
          btn_cancel: "Cancel",
          btn_reset: "Reset",
          btn_done: "Done"
        },
        tooltips: {
          ban_user: "Ban User",
          unban_user: "Unban User",
          reset_pass: "Reset Password"
        }
      },
      venue_dashboard: {
        you_manage: "You Manage:",
        shift: "Shift: 12:00 - 00:00",
        stats: {
          hall_load: "HALL LOAD",
          tables_count: "{{count}} / 20 Tables",
          reserves: "RESERVES",
          guests_count: "Guests: {{count}}",
          waiters: "WAITERS",
          on_shift: "On Shift",
          ai_assistant: "AI ASSISTANT",
          status_online: "Online",
          status_norm: "Normal"
        },
        reserves: {
          title: "Upcoming Reserves",
          calendar: "Calendar",
          guest_count: "{{count}} Pers.",
          status_confirmed: "Confirmed",
          status_pending: "Pending",
          hall_vip: "VIP",
          hall_terrace: "Terrace",
          hall_main: "Main Hall"
        },
        stop_list: {
          title: "Stop List",
          count: "{{count}} Items",
          hint: "Tap to edit"
        }
      },
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
        pricing: "Qiymət və Planlar",
        automation: "n8n Avtomatlaşdırma",
        support: "Dəstək Tələbləri",
        push: "Push Bildirişlər",
        releases: "Sistem Yenilikləri",
        logs: "Qlobal Loglar",
        management: "İdarəetmə",
        venue_dashboard: "Məkan Paneli",
        marketing: "Marketinq və Promo",
        staff: "Personal və Giriş",
        limits: "Limitlər",
        security: "Təhlükəsizlik",
        settings: "Məkan Ayarları",
        analytics: "Analitika",
        whats_new: "Yeniliklər",
        help: "Kömək və Dəstək",
        finance: "Maliyyə",
        billing: "Ödənişlər",
        operations: "Əməliyyatlar",
        ops_dashboard: "İdarə Paneli",
        live_orders: "Canlı Sifarişlər",
        chat: "Çat / CRM",
        reviews: "Rəylər",
        menu_mgmt: "Menyu İdarəetməsi",
        table_layout: "Masa Düzümü",
        floor_plan: "Vizual Plan",
        personal: "Şəxsi",
        profile_settings: "Profil Ayarları",
        staff_interface: "Personal İnterfeysi",
        open_mobile: "Mobil Tətbiqi Aç",
        staff_profile: "Personal Profili"
      },
      dashboard: {
        title: "Super Admin",
        subtitle: "UR-OS Monitorinq Paneli",
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
      // YENİ: USERS PAGE
      users_page: {
        title: "Sistem İstifadəçiləri",
        subtitle: "Giriş İdarəetməsi (Adminlər, Sahibləri, Personal)",
        btn_add_user: "İstifadəçi Əlavə Et",
        search_placeholder: "Ad, Email və ya Restoran üzrə axtar...",
        filter_all_roles: "Bütün Rollar",
        table: {
          col_user: "İSTİFADƏÇİ",
          col_role: "ROL",
          col_restaurant: "RESTORAN",
          col_contact: "ƏLAQƏ",
          col_status: "STATUS",
          col_actions: "ƏMƏLİYYATLAR",
          last_login: "Son giriş: {{time}}"
        },
        drawer: {
          title: "Yeni İstifadəçi",
          label_fullname: "Tam Ad",
          label_email: "Email (Giriş)",
          label_phone: "Telefon",
          label_restaurant: "Restoran",
          label_role: "Rol",
          label_status: "Status",
          btn_save: "Yadda Saxla",
          btn_cancel: "Ləğv Et",
          alert_required: "Ad və Email mütləqdir!"
        },
        reset_password: {
          title: "Şifrəni Sıfırla",
          confirm_text: "Şifrəni sıfırlamaq istəyirsiniz:",
          warning: "Hazırki şifrə etibarsız olacaq.",
          success: "Şifrə uğurla sıfırlandı!",
          label_new_pass: "Yeni Şifrə",
          btn_cancel: "Ləğv Et",
          btn_reset: "Sıfırla",
          btn_done: "Hazırdır"
        },
        tooltips: {
          ban_user: "İstifadəçini Blokla",
          unban_user: "Bloku Aç",
          reset_pass: "Şifrəni Sıfırla"
        }
      },
      venue_dashboard: {
        you_manage: "Siz İdarə Edirsiniz:",
        shift: "Növbə: 12:00 - 00:00",
        stats: {
          hall_load: "ZAL YÜKÜ",
          tables_count: "{{count}} / 20 Masa",
          reserves: "REZERVLƏR",
          guests_count: "Qonaq: {{count}}",
          waiters: "OFİSİANTLAR",
          on_shift: "Növbədə",
          ai_assistant: "AI ASSİSTENT",
          status_online: "Onlayn",
          status_norm: "Norma"
        },
        reserves: {
          title: "Yaxın Rezervlər",
          calendar: "Təqvim",
          guest_count: "{{count}} Nəf.",
          status_confirmed: "Təsdiqləndi",
          status_pending: "Gözləmədə",
          hall_vip: "VİP",
          hall_terrace: "Teras",
          hall_main: "Əsas Zal"
        },
        stop_list: {
          title: "Stop List",
          count: "{{count}} Məhsul",
          hint: "Dəyişmək üçün toxunun"
        }
      },
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
        pricing: "Тарифы и Планы",
        automation: "Автоматизация n8n",
        support: "Тикеты поддержки",
        push: "Push-уведомления",
        releases: "Релизы Системы",
        logs: "Глобальные логи",
        management: "Управление",
        venue_dashboard: "Панель заведения",
        marketing: "Маркетинг и Промо",
        staff: "Персонал и Доступ",
        limits: "Лимиты",
        security: "Безопасность",
        settings: "Настройки заведения",
        analytics: "Аналитика",
        whats_new: "Что Нового",
        help: "Помощь и Поддержка",
        finance: "Финансы",
        billing: "Биллинг",
        operations: "Операции",
        ops_dashboard: "Панель Управления",
        live_orders: "Живые Заказы",
        chat: "Чат / CRM",
        reviews: "Отзывы",
        menu_mgmt: "Управление Меню",
        table_layout: "Раскладка Столов",
        floor_plan: "Визуальный План",
        personal: "Личное",
        profile_settings: "Настройки Профиля",
        staff_interface: "Интерфейс Персонала",
        open_mobile: "Открыть Приложение",
        staff_profile: "Профиль Персонала"
      },
      dashboard: {
        title: "Супер Админ",
        subtitle: "Панель мониторинга UR-OS",
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
      // YENİ: USERS PAGE
      users_page: {
        title: "Пользователи Системы",
        subtitle: "Управление доступами (Админы, Владельцы, Персонал)",
        btn_add_user: "Добавить Пользователя",
        search_placeholder: "Поиск по имени, email или ресторану...",
        filter_all_roles: "Все Роли",
        table: {
          col_user: "ПОЛЬЗОВАТЕЛЬ",
          col_role: "РОЛЬ",
          col_restaurant: "РЕСТОРАН",
          col_contact: "КОНТАКТ",
          col_status: "СТАТУС",
          col_actions: "ДЕЙСТВИЯ",
          last_login: "Вход: {{time}}"
        },
        drawer: {
          title: "Новый Пользователь",
          label_fullname: "ФИО",
          label_email: "Email (Логин)",
          label_phone: "Телефон",
          label_restaurant: "Ресторан",
          label_role: "Роль",
          label_status: "Статус",
          btn_save: "Сохранить",
          btn_cancel: "Отмена",
          alert_required: "Имя и Email обязательны!"
        },
        reset_password: {
          title: "Сброс пароля",
          confirm_text: "Сбросить пароль для",
          warning: "Текущий пароль перестанет работать.",
          success: "Пароль успешно сброшен!",
          label_new_pass: "Новый пароль",
          btn_cancel: "Отмена",
          btn_reset: "Сбросить",
          btn_done: "Готово"
        },
        tooltips: {
          ban_user: "Заблокировать",
          unban_user: "Разблокировать",
          reset_pass: "Сбросить пароль"
        }
      },
      venue_dashboard: {
        you_manage: "Вы управляете:",
        shift: "Смена: 12:00 - 00:00",
        stats: {
          hall_load: "ЗАГРУЗКА ЗАЛА",
          tables_count: "{{count}} / 20 Столов",
          reserves: "РЕЗЕРВЫ",
          guests_count: "Гостей: {{count}}",
          waiters: "ОФИЦИАНТЫ",
          on_shift: "На смене",
          ai_assistant: "AI АССИСТЕНТ",
          status_online: "Online",
          status_norm: "Норма"
        },
        reserves: {
          title: "Ближайшие резервы",
          calendar: "Календарь",
          guest_count: "{{count}} Перс.",
          status_confirmed: "Подтверждено",
          status_pending: "Ожидание",
          hall_vip: "VIP",
          hall_terrace: "Терраса",
          hall_main: "Основной зал"
        },
        stop_list: {
          title: "Stop List",
          count: "{{count}} Позиций",
          hint: "Нажмите, чтобы изменить"
        }
      },
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