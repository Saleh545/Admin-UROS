import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  // --- ENGLISH ---
  en: {
    translation: {
      pricing: {
        title: "Monetization & Pricing 💰",
        subtitle: "Create custom plans & limits.",
        btn_save_all: "Save All Changes",
        tab_manage: "Manage Plans",
        tab_subscriptions: "Subscriptions",
        tab_addons: "Add-Ons",
        tab_coupons: "Coupons",
        plan_name_placeholder: "Plan Name",
        price_label: "Price",
        limits: {
          branches: "BRANCHES",
          staff: "STAFF",
          admins: "ADMINS"
        },
        btn_add_feature: "Add Feature",
        card_create: "Create Plan",
        table: {
          restaurant: "RESTAURANT",
          current_plan: "CURRENT PLAN",
          price_mo: "PRICE/MO",
          addons: "ADD-ONS",
          action: "ACTION",
          btn_edit: "Edit",
          label_plan: "Plan:",
          label_price: "Price:",
          label_addons: "Add-ons:"
        },
        addons: {
          btn_new: "New Add-On",
          col_name: "MODULE NAME",
          col_price: "PRICE",
          col_active: "ACTIVE",
          label_name: "Module Name:",
          label_price: "Price:",
          label_active: "Active:"
        },
        coupons: {
          btn_create: "Create Coupon",
          col_code: "CODE",
          col_target: "TARGET",
          col_discount: "DISCOUNT",
          col_status: "STATUS",
          label_code: "Code:",
          label_target: "Target:",
          label_discount: "Discount:",
          label_status: "Status:"
        },
        dialog: {
          manage_title: "Manage: {{restaurant}}",
          label_select_plan: "Select Plan",
          label_price_override: "Custom Price Override (AZN)",
          helper_price: "Set a specific price for this client only",
          label_addons_enable: "Enable Specific Add-ons:",

          addon_title: "New Add-on",
          label_module_name: "Module Name",
          label_price_input: "Price (AZN)",

          coupon_title: "New Coupon",
          label_code: "Code",
          label_target: "Target Restaurant",
          label_value: "Value",
          label_type: "Type",

          btn_cancel: "Cancel",
          btn_save: "Save Changes",
          btn_create: "Create"
        },
        alert_saved: "All changes saved 💾"
      },

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
      },
      automation: {
        stats: {
          uptime: "System Uptime",
          executions: "Total Executions",
          workflows: "Active Workflows",
          errors: "Webhook Errors"
        },
        server: {
          title: "Server Configuration",
          desc: "Core connection settings between UR-OS and the n8n automation engine.",
          url_label: "Instance URL",
          api_label: "API Key",
          status_online: "SYSTEM ONLINE",
          btn_test: "Test Connection"
        },
        channels: {
          title: "Communication Channels (Bots)",
          btn_restart: "Restart",
          status_online: "Online",
          status_maintenance: "Maintenance"
        },
        scenarios: {
          title: "Active Scenarios (Workflows)",
          cols: {
            name: "WORKFLOW NAME",
            tenant: "TENANT",
            type: "TYPE",
            status: "STATUS",
            health: "HEALTH",
            runs: "RUNS"
          }
        }
      },
      support: {
        title: "Support Tickets",
        subtitle: "Technical support for restaurants",
        btn_push: "Broadcast (Push)",
        menu: {
          delete: "Delete"
        },
        table: {
          id: "ID",
          restaurant: "RESTAURANT",
          problem: "PROBLEM",
          priority: "PRIORITY",
          status: "STATUS",
          actions: "ACTIONS"
        },
        priority: {
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        status: {
          open: "Open",
          closed: "Closed",
          in_progress: "In Progress"
        }
      },
      push: {
        title: "System Broadcast",
        subtitle: "Send push notifications to all restaurant owners.",
        form: {
          title: "Create Message",
          label_recipients: "Recipients",
          option_all: "All Restaurants",
          option_pro: "PRO Plans",
          option_active: "Active Only",
          label_type: "Notification Type",
          type_info: "Information (Blue)",
          type_warning: "Warning (Yellow)",
          type_success: "Success (Green)",
          label_title: "Title",
          label_message: "Message Text",
          btn_send: "Send Broadcast"
        },
        history: {
          title: "Broadcast History",
          col_date: "DATE",
          col_message: "MESSAGE",
          col_recipients: "RECIPIENTS",
          col_actions: "ACTIONS"
        }
      },
      releases: {
        title: "System Updates & Releases",
        subtitle: "Manage changelogs and system status.",
        maintenance: "Maintenance",
        btn_push: "Push Update",
        table: {
          version: "VERSION",
          type: "TYPE",
          desc: "TITLE & DESCRIPTION",
          date: "DATE",
          status: "STATUS"
        },
        modal: {
          title: "Publish New Update",
          version: "Version",
          type: "Type",
          update_title: "Update Title",
          desc: "Changelog Description",
          notify: "Notify All Owners",
          btn_cancel: "Cancel",
          btn_publish: "Publish"
        }
      },
      logs: {
  title: "Global Security Audit",
  search_placeholder: "Search Tenant, IP, User...",
  filter_module: "Module",
  filter_status: "Status",
  stats: {
    total: "Total Events",
    errors: "Critical Errors",
    security: "Security Alerts",
    admins: "Active Admins"
  },
  cols: {
    event: "EVENT",
    tenant: "TENANT / CONTEXT",
    user: "USER",
    source: "SOURCE",
    status: "STATUS",
    time: "TIME",
    action: "ACTION"
  },modal: {
    title: "Log Details",
    tenant: "Tenant",
    user: "User",
    ip: "IP Addr",
    module: "Module",
    payload: "Payload Data",
    ban_ip: "Ban IP",
    close: "Close"
  }
}
    }
  },

  // --- AZERBAIJANI ---
  az: {
    translation: {
      pricing: {
        title: "Monetizasiya və Qiymətlər 💰",
        subtitle: "Xüsusi planlar və limitlər yaradın.",
        btn_save_all: "Yadda Saxla",
        tab_manage: "Planları İdarə Et",
        tab_subscriptions: "Abunəliklər",
        tab_addons: "Əlavələr",
        tab_coupons: "Kuponlar",
        plan_name_placeholder: "Plan Adı",
        price_label: "Qiymət",
        limits: {
          branches: "FİLİALLAR",
          staff: "İŞÇİ",
          admins: "ADMİN"
        },
        btn_add_feature: "Özəllik Əlavə Et",
        card_create: "Plan Yarat",
        table: {
          restaurant: "RESTORAN",
          current_plan: "CARİ PLAN",
          price_mo: "QİYMƏT/AY",
          addons: "ƏLAVƏLƏR",
          action: "ƏMƏLİYYAT",
          btn_edit: "Düzəliş",
          label_plan: "Plan:",
          label_price: "Qiymət:",
          label_addons: "Əlavələr:"
        },
        addons: {
          btn_new: "Yeni Əlavə",
          col_name: "MODUL ADI",
          col_price: "QİYMƏT",
          col_active: "AKTİV",
          label_name: "Modul Adı:",
          label_price: "Qiymət:",
          label_active: "Aktiv:"
        },
        coupons: {
          btn_create: "Kupon Yarat",
          col_code: "KOD",
          col_target: "HƏDƏF",
          col_discount: "ENDİRİM",
          col_status: "STATUS",
          label_code: "Kod:",
          label_target: "Hədəf:",
          label_discount: "Endirim:",
          label_status: "Status:"
        },
        dialog: {
          manage_title: "İdarə et: {{restaurant}}",
          label_select_plan: "Plan Seçin",
          label_price_override: "Xüsusi Qiymət (AZN)",
          helper_price: "İstəyə bağlı (Standartdan fərqli)",
          label_addons_enable: "Xüsusi Əlavələri Aktivləşdir:",

          addon_title: "Yeni Əlavə",
          label_module_name: "Modul Adı",
          label_price_input: "Qiymət (AZN)",

          coupon_title: "Yeni Kupon",
          label_code: "Kod",
          label_target: "Hədəf Restoran",
          label_value: "Dəyər",
          label_type: "Növ",

          btn_cancel: "Ləğv Et",
          btn_save: "Yadda Saxla",
          btn_create: "Yarat"
        },
        alert_saved: "Bütün dəyişikliklər yadda saxlanıldı 💾"
      },
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
      },
      automation: {
        stats: {
          uptime: "Sistem Vaxtı",
          executions: "Cəmi İcra",
          workflows: "Aktiv İş Prosesləri",
          errors: "Webhook Xətaları"
        },
        server: {
          title: "Server Konfiqurasiyası",
          desc: "UR-OS və n8n avtomatlaşdırma mühərriki arasında əlaqə parametrləri.",
          url_label: "İnstance URL",
          api_label: "API Açarı",
          status_online: "SİSTEM ONLAYN",
          btn_test: "Əlaqəni Yoxla"
        },
        channels: {
          title: "Əlaqə Kanalları (Botlar)",
          btn_restart: "Yenidən Başlat",
          status_online: "Onlayn",
          status_maintenance: "Baxımda"
        },
        scenarios: {
          title: "Aktiv Ssenarilər",
          cols: {
            name: "SSENARİ ADI",
            tenant: "MÜŞTƏRİ",
            type: "NÖV",
            status: "STATUS",
            health: "SAĞLAMLIQ",
            runs: "İCRALAR"
          }
        }
      },
      support: {
        title: "Dəstək Tələbləri",
        subtitle: "Restoranlar üçün texniki dəstək",
        btn_push: "Yayım (Push)",
        menu: {
          delete: "Sil"
        },
        table: {
          id: "İD",
          restaurant: "RESTORAN",
          problem: "PROBLEM",
          priority: "VACİBLİK",
          status: "STATUS",
          actions: "ƏMƏLİYYAT"
        },
        priority: {
          high: "Yüksək",
          medium: "Orta",
          low: "Aşağı"
        },
        status: {
          open: "Açıq",
          closed: "Bağlı",
          in_progress: "İcrada"
        }
      },
      push: {
        title: "Sistem Yayımı",
        subtitle: "Bütün restoran sahiblərinə push bildiriş göndərin.",
        form: {
          title: "Mesaj Yarat",
          label_recipients: "Qəbul edənlər",
          option_all: "Bütün Restoranlar",
          option_pro: "PRO Planlar",
          option_active: "Yalnız Aktivlər",
          label_type: "Bildiriş Növü",
          type_info: "Məlumat (Mavi)",
          type_warning: "Xəbərdarlıq (Sarı)",
          type_success: "Uğurlu (Yaşıl)",
          label_title: "Başlıq",
          label_message: "Mesaj Mətni",
          btn_send: "Yayımı Göndər"
        },
        history: {
          title: "Yayım Tarixçəsi",
          col_date: "TARİX",
          col_message: "MESAJ",
          col_recipients: "QƏBUL EDƏNLƏR",
          col_actions: "ƏMƏLİYYAT"
        }
      },
      releases: {
        title: "Sistem Yenilikləri",
        subtitle: "Dəyişiklik qeydlərini və sistem statusunu idarə edin.",
        maintenance: "Baxım Rejimi",
        btn_push: "Yeniləməni Yay",
        table: {
          version: "VERSİYA",
          type: "NÖV",
          desc: "BAŞLIQ VƏ TƏSVİR",
          date: "TARİX",
          status: "STATUS"
        },
        modal: {
    title: "Yeni Yeniləməni Yay",
    version: "Versiya",
    type: "Növ",
    update_title: "Yeniləmə Başlığı",
    desc: "Dəyişiklik Təsviri",
    notify: "Bütün Sahibləri Bildir",
    btn_cancel: "Ləğv Et",
    btn_publish: "Yayımla"
  }
      },
      logs: {
  title: "Qlobal Təhlükəsizlik Auditi",
  search_placeholder: "Axtarış: Müştəri, IP, İstifadəçi...",
  filter_module: "Modul",
  filter_status: "Status",
  stats: {
    total: "Cəmi Hadisələr",
    errors: "Kritik Xətalar",
    security: "Təhlükəsizlik",
    admins: "Aktiv Adminlər"
  },
  cols: {
    event: "HADİSƏ",
    tenant: "MÜŞTƏRİ / KONTEKST",
    user: "İSTİFADƏÇİ",
    source: "MƏNBƏ",
    status: "STATUS",
    time: "VAXT",
    action: "ƏMƏLİYYAT"
  },
  modal: {
    title: "Log Detalları",
    tenant: "Müştəri",
    user: "İstifadəçi",
    ip: "IP Ünvan",
    module: "Modul",
    payload: "Məlumat (Payload)",
    ban_ip: "IP-ni Blokla",
    close: "Bağla"
  }
}

    }
  },

  // --- RUSSIAN ---
  ru: {
    translation: {
      pricing: {
        title: "Монетизация и Цены 💰",
        subtitle: "Создавайте тарифы и лимиты.",
        btn_save_all: "Сохранить Всё",
        tab_manage: "Управление Планами",
        tab_subscriptions: "Подписки",
        tab_addons: "Дополнения",
        tab_coupons: "Купоны",
        plan_name_placeholder: "Название Плана",
        price_label: "Цена",
        limits: {
          branches: "ФИЛИАЛЫ",
          staff: "ПЕРСОНАЛ",
          admins: "АДМИНЫ"
        },
        btn_add_feature: "Добавить Функцию",
        card_create: "Создать План",
        table: {
          restaurant: "РЕСТОРАН",
          current_plan: "ТЕКУЩИЙ ПЛАН",
          price_mo: "ЦЕНА/МЕС",
          addons: "ДОПОЛНЕНИЯ",
          action: "ДЕЙСТВИЕ",
          btn_edit: "Изменить",
          label_plan: "План:",
          label_price: "Цена:",
          label_addons: "Дополнения:"
        },
        addons: {
          btn_new: "Новое Дополнение",
          col_name: "НАЗВАНИЕ МОДУЛЯ",
          col_price: "ЦЕНА",
          col_active: "АКТИВЕН",
          label_name: "Название:",
          label_price: "Цена:",
          label_active: "Активен:"
        },
        coupons: {
          btn_create: "Создать Купон",
          col_code: "КОД",
          col_target: "ЦЕЛЬ",
          col_discount: "СКИДКА",
          col_status: "СТАТУС",
          label_code: "Код:",
          label_target: "Цель:",
          label_discount: "Скидка:",
          label_status: "Статус:"
        },
        dialog: {
          manage_title: "Управление: {{restaurant}}",
          label_select_plan: "Выберите План",
          label_price_override: "Специальная Цена (AZN)",
          helper_price: "Необязательно (вместо стандарта)",
          label_addons_enable: "Включить дополнения:",

          addon_title: "Новое Дополнение",
          label_module_name: "Название модуля",
          label_price_input: "Цена (AZN)",

          coupon_title: "Новый купон",
          label_code: "Код",
          label_target: "Целевой ресторан",
          label_value: "Значение",
          label_type: "Тип",

          btn_cancel: "Отмена",
          btn_save: "Сохранить",
          btn_create: "Создать"
        },
        alert_saved: "Все изменения сохранены 💾"
      },
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
      },
      automation: {
        stats: {
          uptime: "Время работы",
          executions: "Всего исполнений",
          workflows: "Активные процессы",
          errors: "Ошибки вебхуков"
        },
        server: {
          title: "Конфигурация Сервера",
          desc: "Настройки соединения между UR-OS и движком автоматизации n8n.",
          url_label: "URL Инстанса",
          api_label: "API Ключ",
          status_online: "СИСТЕМА ОНЛАЙН",
          btn_test: "Проверить",
        },
        channels: {
          title: "Каналы связи (Боты)",
          btn_restart: "Перезапуск",
          status_online: "Онлайн",
          status_maintenance: "Обслуживание"
        },
        scenarios: {
          title: "Активные Сценарии",
          cols: {
            name: "НАЗВАНИЕ",
            tenant: "КЛИЕНТ",
            type: "ТИП",
            status: "СТАТУС",
            health: "ЗДОРОВЬЕ",
            runs: "ЗАПУСКИ"
          }
        }
      },
      support: {
        title: "Support Tickets",
        subtitle: "Техподдержка ресторанов",
        btn_push: "Рассылка (Push)",
        menu: {
          delete: "Удалить"
        },
        table: {
          id: "ID",
          restaurant: "РЕСТОРАН",
          problem: "ПРОБЛЕМА",
          priority: "ПРИОРИТЕТ",
          status: "СТАТУС",
          actions: "ДЕЙСТВИЯ"
        },
        priority: {
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        status: {
          open: "Open",
          closed: "Closed",
          in_progress: "In Progress"
        }
      },
      push: {
        title: "Системная Рассылка",
        subtitle: "Отправка Push-уведомлений всем владельцам ресторанов.",
        form: {
          title: "Создать Сообщение",
          label_recipients: "Получатели",
          option_all: "Все Рестораны",
          option_pro: "PRO Планы",
          option_active: "Только Активные",
          label_type: "Тип уведомления",
          type_info: "Информация (Синий)",
          type_warning: "Предупреждение (Желтый)",
          type_success: "Успех (Зеленый)",
          label_title: "Заголовок",
          label_message: "Текст сообщения",
          btn_send: "Отправить Рассылку"
        },
        history: {
          title: "История Рассылок",
          col_date: "ДАТА",
          col_message: "СООБЩЕНИЕ",
          col_recipients: "ПОЛУЧАТЕЛИ",
          col_actions: "ДЕЙСТВИЯ"
        }
      },
      releases: {
        title: "Обновления Системы",
        subtitle: "Управление журналом изменений и статусом системы.",
        maintenance: "Режим Обслуживания",
        btn_push: "Выпустить Обновление",
        table: {
          version: "ВЕРСИЯ",
          type: "ТИП",
          desc: "ЗАГОЛОВОК И ОПИСАНИЕ",
          date: "ДАТА",
          status: "СТАТУС"
        },
        modal: {
    title: "Опубликовать Обновление",
    version: "Версия",
    type: "Тип",
    update_title: "Заголовок Обновления",
    desc: "Описание Изменений",
    notify: "Уведомить Всех Владельцев",
    btn_cancel: "Отмена",
    btn_publish: "Опубликовать"
  }
      },
      logs: {
  title: "Глобальный Аудит Безопасности",
  search_placeholder: "Поиск Клиента, IP, Пользователя...",
  filter_module: "Модуль",
  filter_status: "Статус",
  stats: {
    total: "Всего Событий",
    errors: "Критические Ошибки",
    security: "Безопасность",
    admins: "Активные Админы"
  },
  cols: {
    event: "СОБЫТИЕ",
    tenant: "КЛИЕНТ / КОНТЕКСТ",
    user: "ПОЛЬЗОВАТЕЛЬ",
    source: "ИСТОЧНИК",
    status: "СТАТУС",
    time: "ВРЕМЯ",
    action: "ДЕЙСТВИЕ"
  },
  modal: {
    title: "Детали Лога",
    tenant: "Клиент",
    user: "Пользователь",
    ip: "IP Адрес",
    module: "Модуль",
    payload: "Данные (Payload)",
    ban_ip: "Забанить IP",
    close: "Закрыть"
  }
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