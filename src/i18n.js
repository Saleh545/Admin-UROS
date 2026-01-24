import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  // --- ENGLISH ---
  en: {
    translation: {
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
      ownerdashboard: {
        owner: {
          title: "Owner Dashboard",
          subtitle: "Overview for",
          date_filter: "This Month: Jan 2026"
        },
        stats: {
          revenue: "Revenue Today",
          promo: "Active Promo",
          rating: "Guest Rating",
          occupancy: "Occupancy"
        },
        revenue: {
          title: "Revenue (Hourly)"
        },
        promo: {
          title: "Promo Performance",
          btn_manage: "Manage Promos"
        },
        dishes: {
          title: "Top Dishes",
          item: "ITEM",
          price: "PRICE",
          sold: "SOLD",
          trend: "TREND"
        },
        reviews: {
          title: "Recent Reviews"
        }
      },
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
        }, modal: {
          title: "Log Details",
          tenant: "Tenant",
          user: "User",
          ip: "IP Addr",
          module: "Module",
          payload: "Payload Data",
          ban_ip: "Ban IP",
          close: "Close"
        }
      },
      marketing: {
        title: "Marketing & Promo",
        managing: "Managing",
        btn_create: "Create Promo",
        table: {
          name: "NAME",
          code: "CODE",
          branch: "BRANCH",
          discount: "DISCOUNT",
          stats: "STATS",
          expires: "EXPIRES",
          actions: "ACTIONS"
        },
        modal: {
          title: "Create Promo",
          label_name: "Promo Name",
          label_code: "Promo Code",
          label_branch: "Where it applies?",
          label_value: "Discount Value",
          label_type: "Type",
          type_percent: "Percent (%)",
          type_fixed: "Fixed (AZN)",
          label_date: "Expires On",
          btn_cancel: "Cancel",
          btn_create: "Create Promo"
        }
      },
      staff: {
        title: "Team & Access",
        subtitle: "Managing",
        limits: "Plan Limits (Global)",
        btn_add: "Add New Member",
        tab_managers: "Managers",
        tab_staff: "Staff",
        search_placeholder: "Search by name or PIN...",
        confirm_delete: "Are you sure you want to remove this user?",
        btn_edit: "Edit",
        btn_remove: "Remove",
        modal: {
          title_add: "Add New Member",
          title_edit: "Edit User",
          label_branch: "Assign to Branch",
          label_name: "Full Name",
          label_phone: "Phone",
          label_pin: "Access PIN",
          label_email: "Email (Login)",
          label_cash_control: "Require Cash Input on Close",
          btn_cancel: "Cancel",
          btn_save: "Save Member",
          btn_add_confirm: "Add Member"
        }
      },
      security: {
        title: "Security Audit",
        source: "Source",
        search_placeholder: "Search logs...",
        all_branches: "All Branches",
        filters: {
          all: "All",
          high_risk: "High Risk",
          normal: "Normal"
        },
        logs: {
          deleted_receipt: "Deleted Receipt #4092",
          closed_table: "Closed Table #5",
          changed_service: "Changed Service Charge",
          voided_item: "Voided Item \"Cola\"",
          backup_created: "Daily Backup Created",
          edited_reservation: "Edited Reservation",
          badge_cash: "Cash Payment",
          badge_auto: "Auto-Save",
          badge_guest: "Guest Count: 2 → 5",
          today: "Today",
          yesterday: "Yesterday"
        }
      },
      venue: {
        header_title: "Settings",
        configure: "Configure Branch",
        identity_title: "Identity & Location",
        btn_upload: "Upload Network Logo",
        upload_hint: "Changes apply to ALL branches",
        label_name: "Branch Display Name",
        label_slug: "Menu Link Slug",
        label_address: "Address (Text)",
        label_map: "Google Maps Link",
        map_hint: "For humans: clickable link in chat",
        bot_coords: "Bot Coordinates",
        pick_map: "Pick On Map",
        label_lat: "Latitude",
        label_lng: "Longitude",
        label_phone: "Branch Phone",
        label_wifi: "Wi-Fi Password",
        qr_subtitle: "Unique QR for",
        btn_download: "Download PNG",
        rules_title: "Network Rules (Global)",
        label_currency: "Currency",
        label_service: "Service %",
        bot_contacts: "Bot Contacts",
        label_insta: "Instagram Username",
        label_whatsapp: "WhatsApp Number",
        btn_save: "Save Changes"
      },
      analytics: {
        "title": "Analytics & Reports",
        "showing_for": "Showing data for",
        "all_branches": "All Branches (Network)",
        "revenue_growth": "Revenue Growth",
        "sales_perf": "Sales performance",
        "sales_category": "Sales by Category",
        "top_waiters": "Top Waiters",
        "week": "Week",
        "stats": {
          "revenue": "Total Revenue",
          "avg_check": "Avg. Check",
          "orders": "Total Orders",
          "retention": "Retention"
        },
        "categories": {
          "food": "Food",
          "drinks": "Drinks",
          "hookah": "Hookah"
        },
        "filters": {
          "this_week": "This Week",
          "this_month": "This Month",
          "last_month": "Last Month"
        }
      },
      whats_new: {
        "title": "What's New in UR-OS",
        "subtitle": "Stay updated with the latest features and improvements.",
        "current_version": "Current Version",
        "types": {
          "feature": "FEATURE",
          "fix": "FIX",
          "major": "MAJOR"
        },
        "releases": {
          "telegram": {
            "title": "Telegram Integration & Speed Boost",
            "desc": "We have added full support for Telegram bots. Now you can receive orders directly in your group chat.",
            "changes": {
              "bot": "Telegram Bot Module",
              "speed": "Faster Menu Loading",
              "bugs": "Bug fixes in Billing"
            }
          },
          "billing": {
            "title": "Critical Billing Fix",
            "desc": "Resolved an issue where PDF invoices were not downloading correctly on iOS devices.",
            "changes": {
              "pdf": "PDF Generation Fix",
              "ios": "iOS UI Improvements"
            }
          },
          "launch": {
            "title": "Global Launch 🚀",
            "desc": "Welcome to UR-OS! The ultimate operating system for your restaurant."
          }
        }
      },
      help_center: {
        "title": "Help Center",
        "subtitle": "Having issues? Write to us, we will help.",
        "btn_contact": "Contact Support",
        "my_requests": "My Requests",
        "ticket_desc_1": "Technician is looking.",
        "ticket_desc_2": "Done.",
        "cards": {
          "kb_title": "Knowledge Base",
          "kb_desc": "Instructions and guides",
          "wa_desc": "Instant response"
        },
        "table": {
          "topic": "TOPIC",
          "category": "CATEGORY",
          "date": "DATE",
          "priority": "PRIORITY",
          "status": "STATUS"
        },
        "modal": {
          "title": "New Request",
          "cat_label": "Category",
          "topic_label": "Topic (brief)",
          "urgency_label": "Urgency",
          "desc_label": "Detailed description",
          "btn_cancel": "Cancel",
          "btn_send": "Send"
        },
        "options": {
          "tech_issue": "Technical Issue",
          "billing": "Billing / Payment",
          "feature": "Feature Request",
          "other": "Other",
          "high": "High",
          "medium": "Medium",
          "low": "Low"
        }
      },
      billing: {
        "title": "Billing & Subscription",
        "subtitle": "Manage your network plan, payment methods, and invoices.",
        "active_sub": "ACTIVE SUBSCRIPTION",
        "month": "month",
        "next_billing": "Next billing",
        "update": "Update",
        "expires": "Expires",
        "upgrade_btn": "Upgrade / Change Plan",
        "resource_usage": "Network Resource Usage",
        "addons": "Active Add-ons",
        "included": "Included",
        "invoices": "Recent Invoices",
        "view_history": "View All History",
        "resources": {
          "0": "Active Branches",
          "1": "Staff Accounts",
          "2": "Menu Items (SKU)",
          "3": "Monthly AI Messages"
        }
      },
      live_orders: {
        "title": "Kitchen & Orders",
        "managing": "Managing",
        "sound_on": "Sound: ON",
        "sound_off": "Sound: OFF",
        "type_takeaway": "TAKEAWAY",
        "type_dinein": "DINE-IN",
        "table": "Table",
        "in_restaurant": "In restaurant",
        "eta": "ARRIVES",
        "total": "TOTAL",
        "note": "NOTE",
        "btn_cancel": "Cancel",
        "btn_cook": "COOK",
        "btn_assemble": "Assemble Order",
        "all_clean": "All clean, chief!",
        "tabs": {
          "new": "New",
          "working": "In Progress",
          "history": "History"
        }
      },
      staff_profile: {
  "title": "My Profile",
  "role": "Waitress",
  "hours": "Hours",
  "orders": "Orders",
  "personal_data": "Personal Data",
  "firstname": "First Name",
  "lastname": "Last Name",
  "phone": "Phone",
  "shift_status": "Shift Status",
  "working_now": "You are currently working",
  "offline": "You are offline",
  "btn_save": "Save Changes",
  "btn_logout": "Log Out"
}

    }
  },

  // --- AZERBAIJANI ---
  az: {
    translation: {
      dashboard: {
        title: "Super Admin",
        subtitle: "UR-OS Monitorinq Paneli",
        stats: {
          brands: "BRENDLƏR (ŞƏBƏKƏ)",
          branches: "CƏMİ FİLİALLAR",
          revenue_total: "GƏLİR (ÜMUMİ)",
          system: "SİSTEM",
          new: "yeni",
          stable: "Stabil",
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
      },
      ownerdashboard: {
        owner: {
          title: "Sahib Paneli",
          subtitle: "İcmal",
          date_filter: "Bu Ay: Yan 2026"
        },
        stats: {
          revenue: "Bugünkü Gəlir",
          promo: "Aktiv Promo",
          rating: "Qonaq Reytinqi",
          occupancy: "Doluluq"
        },
        revenue: {
          title: "Gəlir (Saatlıq)"
        },
        promo: {
          title: "Promo Performansı",
          btn_manage: "Promoları İdarə Et"
        },
        dishes: {
          title: "Top Yeməklər",
          item: "MƏHSUL",
          price: "QİYMƏT",
          sold: "SATILIB",
          trend: "TREND"
        },
        reviews: {
          title: "Son Rəylər"
        }
      },
      marketing: {
        title: "Marketinq və Promo",
        managing: "İdarə edilir",
        btn_create: "Promo Yarat",
        table: {
          name: "AD",
          code: "KOD",
          branch: "FİLİAL",
          discount: "ENDİRİM",
          stats: "STATİSTİKA",
          expires: "BİTMƏ TARİXİ",
          actions: "ƏMƏLİYYAT"
        },
        modal: {
          title: "Aksiya Yarat",
          label_name: "Aksiya Adı",
          label_code: "Promokod",
          label_branch: "Harada keçərlidir?",
          label_value: "Endirim Dəyəri",
          label_type: "Növ",
          type_percent: "Faiz (%)",
          type_fixed: "Sabit (AZN)",
          label_date: "Bitmə Tarixi",
          btn_cancel: "Ləğv Et",
          btn_create: "Aksiya Yarat"
        }
      },
      staff: {
        title: "Komanda və Giriş",
        subtitle: "İdarə edilir",
        limits: "Plan Limitləri (Qlobal)",
        btn_add: "Yeni Üzv Əlavə Et",
        tab_managers: "Menecerlər",
        tab_staff: "Personal",
        search_placeholder: "Ad və ya PIN ilə axtar...",
        confirm_delete: "Bu istifadəçini silmək istədiyinizə əminsiniz?",
        btn_edit: "Düzəliş",
        btn_remove: "Sil",
        modal: {
          title_add: "Yeni Üzv Əlavə Et",
          title_edit: "İstifadəçini Redaktə Et",
          label_branch: "Filiala Təyin Et",
          label_name: "Tam Ad",
          label_phone: "Telefon",
          label_pin: "Giriş PIN",
          label_email: "Email (Giriş)",
          label_cash_control: "Bağlayarkən Nağd Girişi Tələb Et",
          btn_cancel: "Ləğv Et",
          btn_save: "Yadda Saxla",
          btn_add_confirm: "Əlavə Et"
        }
      },
      security: {
        title: "Təhlükəsizlik Auditi",
        source: "Mənbə",
        search_placeholder: "Logları axtar...",
        all_branches: "Bütün Filiallar",
        filters: {
          all: "Hamısı",
          high_risk: "Yüksək Risk",
          normal: "Normal"
        },
        logs: {
          deleted_receipt: "Çek Silindi #4092",
          closed_table: "Masa Bağlandı #5",
          changed_service: "Xidmət Haqqı Dəyişdirildi",
          voided_item: "\"Cola\" Ləğv Edildi",
          backup_created: "Günlük Nüsxə Yaradıldı",
          edited_reservation: "Rezervasiya Düzəldildi",
          badge_cash: "Nağd Ödəniş",
          badge_auto: "Avto-Yaddaş",
          badge_guest: "Qonaq Sayı: 2 → 5",
          today: "Bu gün",
          yesterday: "Dünən"
        }
      },
      venue: {
        header_title: "Tənzimləmələr",
        configure: "Filialı Tənzimlə",
        identity_title: "Kimlik və Məkan",
        btn_upload: "Şəbəkə Loqosunu Yüklə",
        upload_hint: "Dəyişikliklər BÜTÜN filiallara aiddir",
        label_name: "Filialın Görünən Adı",
        label_slug: "Menyu Linki (Slug)",
        label_address: "Ünvan (Mətn)",
        label_map: "Google Maps Linki",
        map_hint: "Çatda kliklənə bilən link üçün",
        bot_coords: "Bot Koordinatları",
        pick_map: "Xəritədə Seç",
        label_lat: "Enlik",
        label_lng: "Uzunluq",
        label_phone: "Filial Telefonu",
        label_wifi: "Wi-Fi Şifrəsi",
        qr_subtitle: "Unikal QR:",
        btn_download: "PNG Yüklə",
        rules_title: "Şəbəkə Qaydaları (Qlobal)",
        label_currency: "Valyuta",
        label_service: "Xidmət %",
        bot_contacts: "Bot Əlaqələri",
        label_insta: "Instagram Adı",
        label_whatsapp: "WhatsApp Nömrəsi",
        btn_save: "Yadda Saxla"
      },
      analytics: {
        "title": "Analitika və Hesabatlar",
        "showing_for": "Məlumat göstərilir",
        "all_branches": "Bütün Filiallar (Şəbəkə)",
        "revenue_growth": "Gəlir Artımı",
        "sales_perf": "Satış performansı",
        "sales_category": "Kateqoriya üzrə Satış",
        "top_waiters": "Ən Yaxşı Ofisiantlar",
        "week": "Həftə",
        "stats": {
          "revenue": "Ümumi Gəlir",
          "avg_check": "Orta Çek",
          "orders": "Cəmi Sifariş",
          "retention": "Qayıdış Faizi"
        },
        "categories": {
          "food": "Yemək",
          "drinks": "İçkilər",
          "hookah": "Qəlyan"
        },
        "filters": {
          "this_week": "Bu Həftə",
          "this_month": "Bu Ay",
          "last_month": "Keçən Ay"
        }
      },
      whats_new: {
        "title": "UR-OS Yenilikləri",
        "subtitle": "Ən son xüsusiyyətlər və təkmilləşdirmələrdən xəbərdar olun.",
        "current_version": "Cari Versiya",
        "types": {
          "feature": "YENİLİK",
          "fix": "DÜZƏLİŞ",
          "major": "ƏSAS"
        },
        "releases": {
          "telegram": {
            "title": "Telegram İnteqrasiyası və Sürət Artımı",
            "desc": "Telegram botları üçün tam dəstək əlavə etdik. Artıq sifarişləri birbaşa qrup çatınızda qəbul edə bilərsiniz.",
            "changes": {
              "bot": "Telegram Bot Modulu",
              "speed": "Daha Sürətli Menyu Yüklənməsi",
              "bugs": "Ödəniş sistemindəki xətaların həlli"
            }
          },
          "billing": {
            "title": "Kritik Ödəniş Düzəlişi",
            "desc": "PDF qəbzlərinin iOS cihazlarında düzgün yüklənməməsi problemi həll edildi.",
            "changes": {
              "pdf": "PDF Generasiya Düzəlişi",
              "ios": "iOS UI Təkmilləşdirmələri"
            }
          },
          "launch": {
            "title": "Qlobal Açılış 🚀",
            "desc": "UR-OS-a xoş gəlmisiniz! Restoranınız üçün ən mükəmməl əməliyyat sistemi."
          }
        }
      },
      help_center: {
        "title": "Yardım Mərkəzi",
        "subtitle": "Problemlər yarandı? Bizə yazın, kömək edərik.",
        "btn_contact": "Dəstəyə Yazın",
        "my_requests": "Sorğularım",
        "ticket_desc_1": "Texnik artıq baxır.",
        "ticket_desc_2": "Həll olundu.",
        "cards": {
          "kb_title": "Bilik Bazası",
          "kb_desc": "Təlimatlar və bələdçilər",
          "wa_desc": "Ani cavab"
        },
        "table": {
          "topic": "MÖVZU",
          "category": "KATEQORİYA",
          "date": "TARİX",
          "priority": "VACİBLİK",
          "status": "STATUS"
        },
        "modal": {
          "title": "Yeni Sorğu",
          "cat_label": "Kateqoriya",
          "topic_label": "Mövzu (qısa)",
          "urgency_label": "Təcililik",
          "desc_label": "Ətraflı təsvir",
          "btn_cancel": "Ləğv et",
          "btn_send": "Göndər"
        },
        "options": {
          "tech_issue": "Texniki Problem",
          "billing": "Ödəniş / Hesab",
          "feature": "Xüsusiyyət İstəyi",
          "other": "Digər",
          "high": "Yüksək",
          "medium": "Orta",
          "low": "Aşağı"
        }
      },
      billing: {
        "title": "Ödəniş və Abunəlik",
        "subtitle": "Şəbəkə planınızı, ödəniş üsullarını və fakturaları idarə edin.",
        "active_sub": "AKTİV ABUNƏLİK",
        "month": "ay",
        "next_billing": "Növbəti ödəniş",
        "update": "Yenilə",
        "expires": "Bitmə tarixi",
        "upgrade_btn": "Planı Dəyiş / Yüksəlt",
        "resource_usage": "Resurs İstifadəsi",
        "addons": "Aktiv Əlavələr",
        "included": "Daxildir",
        "invoices": "Son Fakturalar",
        "view_history": "Bütün Tarixçəyə Bax",
        "resources": {
          "0": "Aktiv Filiallar",
          "1": "İşçi Hesabları",
          "2": "Menyu Elementləri (SKU)",
          "3": "Aylıq AI Mesajları"
        }
      },
      live_orders: {
        "title": "Mətbəx və Sifarişlər",
        "managing": "İdarə olunur",
        "sound_on": "Səs: AÇIQ",
        "sound_off": "Səs: BAĞLI",
        "type_takeaway": "PAKET",
        "type_dinein": "ZALDA",
        "table": "Stol",
        "in_restaurant": "Restoranda",
        "eta": "ÇATACAQ",
        "total": "CƏMİ",
        "note": "QEYD",
        "btn_cancel": "İmtina",
        "btn_cook": "HAZIRLA",
        "btn_assemble": "Sifarişi Yığ",
        "all_clean": "Hər şey təmizdir, şef!",
        "tabs": {
          "new": "Yeni",
          "working": "İşlənir",
          "history": "Tarixçə"
        }
      },
      staff_profile: {
  "title": "Mənim Profilim",
  "role": "Ofisiant",
  "hours": "Saat",
  "orders": "Sifariş",
  "personal_data": "Şəxsi Məlumatlar",
  "firstname": "Ad",
  "lastname": "Soyad",
  "phone": "Telefon",
  "shift_status": "Növbə Statusu",
  "working_now": "Siz indi işləyirsiniz",
  "offline": "İşdə deyilsiniz",
  "btn_save": "Dəyişiklikləri Yadda Saxla",
  "btn_logout": "Hesabdan Çıx"
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
      },
      ownerdashboard: {
        owner: {
          title: "Панель Владельца",
          subtitle: "Обзор для",
          date_filter: "Этот месяц: Янв 2026"
        },
        stats: {
          revenue: "Доход сегодня",
          promo: "Активные промо",
          rating: "Рейтинг гостей",
          occupancy: "Загруженность"
        },
        revenue: {
          title: "Доход (Почасовой)"
        },
        promo: {
          title: "Эффективность Промо",
          btn_manage: "Управление"
        },
        dishes: {
          title: "Топ Блюд",
          item: "ТОВАР",
          price: "ЦЕНА",
          sold: "ПРОДАНО",
          trend: "ТРЕНД"
        },
        reviews: {
          title: "Недавние отзывы"
        }
      },
      marketing: {
        title: "Маркетинг и Промо",
        managing: "Управление",
        btn_create: "Создать Промокод",
        table: {
          name: "НАЗВАНИЕ",
          code: "КОД",
          branch: "ФИЛИАЛ",
          discount: "СКИДКА",
          stats: "СТАТИСТИКА",
          expires: "ИСТЕКАЕТ",
          actions: "ДЕЙСТВИЯ"
        },
        modal: {
          title: "Создать Акцию",
          label_name: "Название акции",
          label_code: "Промокод",
          label_branch: "Где действует?",
          label_value: "Размер скидки",
          label_type: "Тип",
          type_percent: "Процент (%)",
          type_fixed: "Фикс. (AZN)",
          label_date: "Действует до",
          btn_cancel: "Отмена",
          btn_create: "Создать Акцию"
        }
      },
      staff: {
        title: "Команда и Доступ",
        subtitle: "Управление",
        limits: "Лимиты Плана (Глобально)",
        btn_add: "Добавить Участника",
        tab_managers: "Менеджеры",
        tab_staff: "Персонал",
        search_placeholder: "Поиск по имени или PIN...",
        confirm_delete: "Вы уверены, что хотите удалить этого пользователя?",
        btn_edit: "Изменить",
        btn_remove: "Удалить",
        modal: {
          title_add: "Добавить Участника",
          title_edit: "Редактировать",
          label_branch: "Назначить в филиал",
          label_name: "ФИО",
          label_phone: "Телефон",
          label_pin: "PIN Доступа",
          label_email: "Email (Логин)",
          label_cash_control: "Требовать ввод наличных при закрытии",
          btn_cancel: "Отмена",
          btn_save: "Сохранить",
          btn_add_confirm: "Добавить"
        }
      },
      security: {
        title: "Аудит Безопасности",
        source: "Источник",
        search_placeholder: "Поиск логов...",
        all_branches: "Все Филиалы",
        filters: {
          all: "Все",
          high_risk: "Высокий Риск",
          normal: "Обычный"
        },
        logs: {
          deleted_receipt: "Удален Чек #4092",
          closed_table: "Стол Закрыт #5",
          changed_service: "Изменен Сервисный Сбор",
          voided_item: "Аннулирован Товар \"Cola\"",
          backup_created: "Создана Дневная Копия",
          edited_reservation: "Бронь Изменена",
          badge_cash: "Наличные",
          badge_auto: "Авто-Сохр.",
          badge_guest: "Гостей: 2 → 5",
          today: "Сегодня",
          yesterday: "Вчера"
        }
      },
      venue: {
        header_title: "Настройки",
        configure: "Настроить Филиал",
        identity_title: "Идентификация и Локация",
        btn_upload: "Загрузить Логотип",
        upload_hint: "Применяется ко ВСЕМ филиалам",
        label_name: "Отображаемое Имя",
        label_slug: "Ссылка Меню (Slug)",
        label_address: "Адрес (Текст)",
        label_map: "Ссылка Google Maps",
        map_hint: "Кликабельная ссылка в чате",
        bot_coords: "Координаты Бота",
        pick_map: "Выбрать на карте",
        label_lat: "Широта",
        label_lng: "Долгота",
        label_phone: "Телефон Филиала",
        label_wifi: "Пароль Wi-Fi",
        qr_subtitle: "Уникальный QR для",
        btn_download: "Скачать PNG",
        rules_title: "Правила Сети (Глобально)",
        label_currency: "Валюта",
        label_service: "Сервис %",
        bot_contacts: "Контакты Бота",
        label_insta: "Instagram Имя",
        label_whatsapp: "WhatsApp Номер",
        btn_save: "Сохранить"
      },
      analytics: {
        "title": "Аналитика и отчеты",
        "showing_for": "Данные для",
        "all_branches": "Все филиалы (Сеть)",
        "revenue_growth": "Рост выручки",
        "sales_perf": "Эффективность продаж",
        "sales_category": "Продажи по категориям",
        "top_waiters": "Лучшие официанты",
        "week": "Неделя",
        "stats": {
          "revenue": "Общая выручка",
          "avg_check": "Средний чек",
          "orders": "Всего заказов",
          "retention": "Удержание"
        },
        "categories": {
          "food": "Еда",
          "drinks": "Напитки",
          "hookah": "Кальян"
        },
        "filters": {
          "this_week": "Эта неделя",
          "this_month": "Этот месяц",
          "last_month": "Прошлый месяц"
        }
      },
      whats_new: {
        "title": "Что нового в UR-OS",
        "subtitle": "Будьте в курсе последних функций и улучшений.",
        "current_version": "Текущая версия",
        "types": {
          "feature": "НОВОЕ",
          "fix": "ИСПРАВЛЕНИЕ",
          "major": "РЕЛИЗ"
        },
        "releases": {
          "telegram": {
            "title": "Интеграция с Telegram и Ускорение",
            "desc": "Мы добавили полную поддержку Telegram-ботов. Теперь вы можете принимать заказы прямо в групповом чате.",
            "changes": {
              "bot": "Модуль Telegram-бота",
              "speed": "Ускоренная загрузка меню",
              "bugs": "Исправление ошибок в биллинге"
            }
          },
          "billing": {
            "title": "Критическое исправление биллинга",
            "desc": "Решена проблема, из-за которой PDF-счета не скачивались корректно на устройствах iOS.",
            "changes": {
              "pdf": "Исправление генерации PDF",
              "ios": "Улучшения интерфейса iOS"
            }
          },
          "launch": {
            "title": "Глобальный запуск 🚀",
            "desc": "Добро пожаловать в UR-OS! Идеальная операционная система для вашего ресторана."
          }
        }
      },
      help_center: {
        "title": "Центр Помощи",
        "subtitle": "Возникли проблемы? Напишите нам, мы поможем.",
        "btn_contact": "Написать В Поддержку",
        "my_requests": "Мои Запросы",
        "ticket_desc_1": "Техник уже смотрит.",
        "ticket_desc_2": "Сделано.",
        "cards": {
          "kb_title": "База Знаний",
          "kb_desc": "Инструкции и гайды",
          "wa_desc": "Мгновенный ответ"
        },
        "table": {
          "topic": "ТЕМА",
          "category": "КАТЕГОРИЯ",
          "date": "ДАТА",
          "priority": "ПРИОРИТЕТ",
          "status": "СТАТУС"
        },
        "modal": {
          "title": "Новый запрос",
          "cat_label": "Категория",
          "topic_label": "Тема (кратко)",
          "urgency_label": "Срочность",
          "desc_label": "Подробное описание",
          "btn_cancel": "Отмена",
          "btn_send": "Отправить"
        },
        "options": {
          "tech_issue": "Техническая проблема",
          "billing": "Биллинг / Оплата",
          "feature": "Запрос функции",
          "other": "Другое",
          "high": "Высокая",
          "medium": "Средняя",
          "low": "Низкая"
        }
      },
      billing: {
        "title": "Биллинг и Подписка",
        "subtitle": "Управление планом сети, способами оплаты и счетами.",
        "active_sub": "АКТИВНАЯ ПОДПИСКА",
        "month": "мес",
        "next_billing": "След. оплата",
        "update": "Обновить",
        "expires": "Истекает",
        "upgrade_btn": "Обновить / Сменить план",
        "resource_usage": "Использование ресурсов",
        "addons": "Активные дополнения",
        "included": "Включено",
        "invoices": "Недавние счета",
        "view_history": "Посмотреть всю историю",
        "resources": {
          "0": "Активные филиалы",
          "1": "Аккаунты персонала",
          "2": "Позиции меню (SKU)",
          "3": "AI Сообщения в месяц"
        }
      },
      live_orders: {
        "title": "Кухня и Заказы",
        "managing": "Управление",
        "sound_on": "Звук: ВКЛ",
        "sound_off": "Звук: ВЫКЛ",
        "type_takeaway": "НА ВЫНОС",
        "type_dinein": "В ЗАЛЕ",
        "table": "Стол",
        "in_restaurant": "В ресторане",
        "eta": "ПРИБУДЕТ",
        "total": "ИТОГО",
        "note": "ПРИМЕЧАНИЕ",
        "btn_cancel": "Отмена",
        "btn_cook": "ГОТОВИТЬ",
        "btn_assemble": "Собрать Заказ",
        "all_clean": "Все чисто, шеф!",
        "tabs": {
          "new": "Новые",
          "working": "В Работе",
          "history": "История"
        }
      },
      staff_profile: {
  "title": "Мой Профиль",
  "role": "Официант",
  "hours": "Часов",
  "orders": "Заказов",
  "personal_data": "Личные данные",
  "firstname": "Имя",
  "lastname": "Фамилия",
  "phone": "Телефон",
  "shift_status": "Статус смены",
  "working_now": "Вы сейчас работаете",
  "offline": "Вы не на смене",
  "btn_save": "Сохранить Изменения",
  "btn_logout": "Выйти Из Аккаунта"
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