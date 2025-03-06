import { componentLoader, Components } from './component-loader.js';
import { User } from '../db/models/user.entity.js';
import { Source } from '../db/models/source.entity.js';
import { Employee } from '../db/models/employee.entity.js';
import { Account } from '../db/models/accounts.entity.js';
import { Income } from '../db/models/income.entity.js';
import { Reports } from '../db/models/reports.entity.js';
import { Schedule } from '../db/models/schedule.entity.js';
import sequelize from '../db/config.js';
const usersNavigation = {
    name: 'Пользователи',
    icon: 'User',
};
const customBefore = (request, context) => {
    console.log(request, ' request');
    console.log(context, ' context');
    return request;
};
const options = {
    componentLoader,
    rootPath: '/',
    resources: [
        {
            resource: User,
            options: {
                id: 'users',
                parent: null,
                navigation: {
                    name: null,
                    icon: 'User',
                },
                titleProperty: 'Пользователи',
                properties: {
                    role: {
                        availableValues: [
                            {
                                value: 2,
                                label: 'Оператор',
                            },
                            {
                                value: 1,
                                label: 'Админ',
                            },
                            {
                                value: 0,
                                label: 'Супер-админ',
                            }
                        ],
                    },
                    password: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: true,
                        },
                    },
                    updatedAt: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        }
                    },
                    createdAt: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false,
                        }
                    },
                    id: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: true,
                            edit: false,
                        }
                    }
                },
                actions: {
                    new: {
                        isAccessible: ({ currentAdmin }) => {
                            console.log(currentAdmin);
                            return true;
                        },
                    },
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    }
                },
            },
        },
        {
            resource: Source,
            options: {
                isAccessible: false,
                id: 'sources',
                parent: null,
                navigation: {
                    name: null,
                    icon: 'Screen',
                },
                actions: {
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    }
                }
            },
        },
        {
            resource: Employee,
            options: {
                isAccessible: false,
                id: 'employee',
                parent: null,
                navigation: {
                    name: null,
                    icon: 'Girl',
                },
                properties: {
                    modelAccounts: {
                        type: 'string',
                        components: {
                            new: Components.ModelAccounts,
                            edit: Components.ModelAccounts,
                            show: Components.ModelAccounts,
                        },
                        isVisible: {
                            list: false,
                            filter: false,
                            new: false,
                            edit: true,
                            show: true,
                        },
                    },
                },
                actions: {
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    },
                    new: {
                        before: [customBefore],
                    },
                }
            },
        },
        {
            resource: Account,
            options: {
                actions: {
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    },
                }
            },
        },
        {
            resource: Schedule,
            options: {
                actions: {
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    },
                }
            },
        },
        {
            resource: Income,
            options: {
                actions: {
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    },
                }
            },
        },
        {
            resource: Reports,
            options: {
                actions: {
                    list: {
                        isAccessible: ({ currentAdmin }) => currentAdmin.role === 0,
                    },
                }
            },
        }
    ],
    pages: {
        schedule: {
            component: Components.ScheduleComponent,
            label: "График работы",
        },
        shifts: {
            component: Components.ShiftsComponent,
            label: "Мои смены",
        }
    },
    databases: [sequelize],
    dashboard: {
        component: Components.Dashboard,
    },
    branding: {
        companyName: 'CRM Webcam',
        withMadeWithLove: false,
        logo: false,
    },
    locale: {
        language: 'ru',
        availableLanguages: ['ru'],
        localeDetection: true,
        translations: {
            ru: {
                "actions": {
                    "new": "Создать",
                    "edit": "Редактировать",
                    "show": "Просмотр",
                    "delete": "Удалить",
                    "bulkDelete": "Удалить все",
                    "list": "Список"
                },
                "buttons": {
                    "save": "Сохранить",
                    "addNewItem": "Добавить",
                    "filter": "Фильтр",
                    "filterActive": "Фильтр ({{count}})",
                    "applyChanges": "Сохранить изменения",
                    "resetFilter": "Очистить фильтр",
                    "confirmRemovalMany": "Подтвердите удаление {{count}} записи",
                    "confirmRemovalMany_plural": "Подтвердите удаление {{count}} записей",
                    "logout": "Выйти",
                    "login": "Войти",
                    "seeTheDocumentation": "Смотреть: <1>документацию</1>",
                    "createFirstRecord": "Создать первую запись",
                    "contactUs": "Связаться с нами",
                    "cancel": "Отменить",
                    "confirm": "Подтвердить"
                },
                "pages": {
                    shifts: 'Мои смены',
                    schedule: 'График работы'
                },
                "components": {
                    "DropZone": {
                        "placeholder": "Перетащите файлы сюда, либо нажмите для просмотра",
                        "acceptedSize": "Максимальный размер: {{maxSize}}",
                        "acceptedType": "Подтвердить: {{mimeTypes}}",
                        "unsupportedSize": "Файл {{fileName}} сликшом большой",
                        "unsupportedType": "Тип файла {{fileName}} не поддерживается: {{fileType}}"
                    },
                    "LanguageSelector": {
                        "availableLanguages": {
                            "de": "Немецкий",
                            "en": "Английский",
                            "es": "Испанский",
                            "it": "Итальянский",
                            "ja": "Японский",
                            "pl": "Польский",
                            "pt-BR": "Португальский (Бразилія)",
                            "ua": "українська",
                            "zh-CN": "китайський",
                            "ru": "Русский"
                        }
                    },
                    "Login": {
                        "welcomeHeader": "Добро пожаловать!",
                        "welcomeMessage": "Авторизуйтесь для начала работы",
                        "properties": {
                            "email": "E-mail",
                            "password": "Пароль"
                        },
                        "loginButton": "Войти в систему"
                    }
                },
                "labels": {
                    "navigation": "Навигация",
                    "pages": "Страницы",
                    "selectedRecords": "Выбрано ({{selected}})",
                    "filters": "Фильтры",
                    "adminVersion": "Версия AdminJS: {{version}}",
                    "appVersion": "Версия приложения: {{version}}",
                    "dashboard": "Дашборд",
                    users: 'Пользователи',
                    sources: 'Источники',
                    employee: 'Модели',
                    schedule: 'График работы',
                    shifts: 'Мои смены'
                },
                "properties": {
                    "length": "Длина",
                    "from": "От",
                    "to": "До",
                    "email": "E-mail",
                    "password": "Пароль"
                },
                "resources": {
                    "Users": {
                        "label": 'Пользователи',
                    },
                    "Sources": {
                        "label": 'Источники',
                    }
                },
                "messages": {
                    "successfullyBulkDeleted": "Успешно удалено {{count}} запись",
                    "successfullyBulkDeleted_plural": "Успешно удалено {{count}} записей",
                    "successfullyDeleted": "Успешно удалено",
                    "successfullyUpdated": "Успешно удалено",
                    "thereWereValidationErrors": "Проверьте правильность введенных значений",
                    "forbiddenError": "Невозможно выполнить действие {{actionName}} на {{resourceId}}",
                    "anyForbiddenError": "Невозможно выполнить действие",
                    "successfullyCreated": "Создана новая запись",
                    "bulkDeleteError": "При удалении записей произошла ошибка. Перейдите в консоль, чтобы просмотреть дополнительную информацию",
                    "errorFetchingRecords": "При получении записей произошла ошибка. Перейдите в консоль, чтобы просмотреть дополнительную информацию",
                    "errorFetchingRecord": "При получении записи произошла ошибка. Перейдите в консоль, чтобы просмотреть дополнительную информацию",
                    "noRecordsSelected": "Вы не выбрали ни одной записи",
                    "theseRecordsWillBeRemoved": "Следующая запись будет удалена",
                    "theseRecordsWillBeRemoved_plural": "Следующие записи будут удалены",
                    "pickSomeFirstToRemove": "Чтобы удалить записи, вы должны сначала выбрать их",
                    "error404Resource": "Ресурс со значением ID: {{resourceId}} не найден",
                    "error404Action": "Ресурс із зазначеним ID: {{resourceId}} не має дії з назвою: {{actionName}} або Ви не маєте права використовувати його!",
                    "error404Record": "Ресурс із зазначеним ID: {{resourceId}} не має запису з ID: {{recordId}} або Ви не маєте права використовувати його!",
                    "seeConsoleForMore": "Просмотрите консоль для устранения ошибок, либо свяжитесь с разработчиком...",
                    "noActionComponent": "Ви повинні заімплементувати ActionComponent для своєї дії",
                    "noRecordsInResource": "У цьому ресурсі немає записів",
                    "noRecords": "Нет записей.",
                    "confirmDelete": "Вы действительно хотите удалить?",
                    "welcomeOnBoard_title": "Добро пожаловать!",
                    "welcomeOnBoard_subtitle": "Пум-пум-пум))",
                    "addingResources_title": "Добавление ресурсов",
                    "addingResources_subtitle": "Як додати нові ресурси до бічної панелі",
                    "customizeResources_title": "Налаштування ресурсів",
                    "customizeResources_subtitle": "Визначення поведінки, додавання властивостей тощо...",
                    "customizeActions_title": "Налаштування дій",
                    "customizeActions_subtitle": "Змінення існуючих дій і додавання нових",
                    "writeOwnComponents_title": "Написання компонентів",
                    "writeOwnComponents_subtitle": "Як змінити зовнішній вигляд AdminJS",
                    "customDashboard_title": "Панелі приладів",
                    "customDashboard_subtitle": "Як змінити цей екран та додати нові сторінки на бічній панелі»",
                    "roleBasedAccess_title": "Контроль доступу на основі ролей",
                    "roleBasedAccess_subtitle": "Створюйте ролі та дозволи користувачів у AdminJS",
                    "community_title": "Приєднуйтесь до нашої спільноти на Discord'y",
                    "community_subtitle": "Розмовляйте з розробниками та іншими користувачами AdminJS",
                    "foundBug_title": "Знайшли помилку? Потребуєте покращення?",
                    "foundBug_subtitle": "Опишіть проблему у нашому репозиторії GitHub",
                    "needMoreSolutions_title": "Потрібні більш просунуті рішення?",
                    "needMoreSolutions_subtitle": "Ми тут, щоб допомогти Вам з UX/UI дизайном та розробленням програмного забезпечення на основі (та не тільки) AdminJS",
                    "invalidCredentials": "Неверный e-mail и/или пароль",
                    "pageNotFound_title": "Страница не найдена",
                    "pageNotFound_subtitle": "Страница <strong>\"{{pageName}}\"</strong> не существует",
                    "componentNotFound_title": "Компонент не найден.",
                    "componentNotFound_subtitle": "Ви повинні вказати компонент, який буде рендерити цей елемент"
                }
            }
        },
    },
};
export default options;
