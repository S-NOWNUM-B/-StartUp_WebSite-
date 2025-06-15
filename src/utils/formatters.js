/**
 * Утилиты для форматирования данных
 * EduSpace - Educational Portal
 */

/**
 * Форматирует дату в локальном формате
 * @param {Date|string} date - Дата для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @param {object} options - Опции форматирования
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, locale = 'ru-RU', options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString(locale, defaultOptions);
};

/**
 * Форматирует время в локальном формате
 * @param {Date|string} date - Дата/время для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @returns {string} Отформатированное время
 */
export const formatTime = (date, locale = 'ru-RU') => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Форматирует GPA с нужным количеством знаков после запятой
 * @param {number} gpa - Средний балл
 * @param {number} decimals - Количество знаков после запятой
 * @returns {string} Отформатированный GPA
 */
export const formatGPA = (gpa, decimals = 2) => {
  return Number(gpa).toFixed(decimals);
};

/**
 * Форматирует процент посещаемости
 * @param {number} attendance - Процент посещаемости
 * @returns {string} Отформатированная посещаемость
 */
export const formatAttendance = (attendance) => {
  return `${Math.round(attendance)}%`;
};

/**
 * Сокращает длинный текст до указанной длины
 * @param {string} text - Исходный текст
 * @param {number} maxLength - Максимальная длина
 * @returns {string} Сокращенный текст
 */
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Форматирует размер файла в человекочитаемый формат
 * @param {number} bytes - Размер в байтах
 * @returns {string} Отформатированный размер
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Б';
  
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Генерирует инициалы из полного имени
 * @param {string} fullName - Полное имя
 * @returns {string} Инициалы
 */
export const getInitials = (fullName) => {
  return fullName
    .split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .join('');
}; 