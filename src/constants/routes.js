/**
 * Константы маршрутов приложения EduSpace
 * Централизованное управление URL маршрутами
 */

export const ROUTES = {
  // Основные страницы
  HOME: '/',
  PROFILE: '/profile',
  
  // Учебный процесс
  SCHEDULE: '/schedule',
  GRADES: '/grades',
  INDIVIDUAL_PLAN: '/individual-plan',
  LEARNING_MATERIALS: '/learning-materials',
  TESTING: '/testing',
  APPEALS: '/appeals',
  TRANSCRIPT: '/transcript',
  
  // Коммуникации
  NEWS: '/news',
  ANNOUNCEMENTS: '/announcements',
  EVENTS: '/events',
  TEACHERS: '/teachers',
  
  // Административные
  DOCUMENTS: '/documents',
  FINANCE: '/finance',
  SETTINGS: '/settings',
};

export const ROUTE_LABELS = {
  [ROUTES.HOME]: 'Главная',
  [ROUTES.PROFILE]: 'Профиль',
  [ROUTES.SCHEDULE]: 'Расписание',
  [ROUTES.GRADES]: 'Оценки',
  [ROUTES.INDIVIDUAL_PLAN]: 'Индивидуальный план',
  [ROUTES.LEARNING_MATERIALS]: 'Учебные материалы',
  [ROUTES.TESTING]: 'Тестирование',
  [ROUTES.APPEALS]: 'Апелляции',
  [ROUTES.TRANSCRIPT]: 'Транскрипт',
  [ROUTES.NEWS]: 'Новости',
  [ROUTES.ANNOUNCEMENTS]: 'Объявления',
  [ROUTES.EVENTS]: 'События',
  [ROUTES.TEACHERS]: 'Преподаватели',
  [ROUTES.DOCUMENTS]: 'Документы',
  [ROUTES.FINANCE]: 'Финансы',
  [ROUTES.SETTINGS]: 'Настройки',
}; 