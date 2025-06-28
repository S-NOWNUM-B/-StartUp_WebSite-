'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  Bell, 
  Keyboard, 
  Mouse, 
  Zap,
  Cloud,
  Info,
  ArrowRight
} from 'lucide-react';

interface HeaderGuideProps {
  show: boolean;
  onClose: () => void;
}

export default function HeaderGuide({ show, onClose }: HeaderGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Умный поиск',
      icon: <Search className="w-6 h-6" />,
      description: 'Ищите курсы, преподавателей, документы и аудитории',
      features: [
        'Автодополнение в реальном времени',
        'Ранжирование по релевантности', 
        'Поиск по всем типам контента',
        'Горячая клавиша: Ctrl+K'
      ],
      shortcut: 'Ctrl + K'
    },
    {
      title: 'Уведомления',
      icon: <Bell className="w-6 h-6" />,
      description: 'Управляйте уведомлениями и не пропускайте важное',
      features: [
        'Отметка как прочитанные',
        'Удаление уведомлений',
        'Фильтрация по приоритету',
        'Переход по ссылкам'
      ],
      shortcut: 'Ctrl + Shift + N'
    },
    {
      title: 'Контекстные действия',
      icon: <Zap className="w-6 h-6" />,
      description: 'Быстрые действия в зависимости от времени и контекста',
      features: [
        'Следующее занятие (Ctrl+Shift+S)',
        'Проверка оценок (Ctrl+Shift+G)',
        'Библиотека (Ctrl+Shift+L)',
        'Документы (Ctrl+Shift+D)'
      ],
      shortcut: 'Ctrl + Shift + [Буква]'
    },
    {
      title: 'Информационная панель',
      icon: <Cloud className="w-6 h-6" />,
      description: 'Погода и полезная информация',
      features: [
        'Текущая погода',
        'Обновление по клику',
        'Время последнего обновления',
        'Адаптивное отображение'
      ],
      shortcut: 'Клик для обновления'
    }
  ];

  const shortcuts = [
    { key: 'Ctrl + K', action: 'Открыть поиск' },
    { key: 'Ctrl + Shift + S', action: 'Расписание' },
    { key: 'Ctrl + Shift + G', action: 'Оценки' },
    { key: 'Ctrl + Shift + L', action: 'Библиотека' },
    { key: 'Ctrl + Shift + D', action: 'Документы' },
    { key: 'Ctrl + Shift + N', action: 'Уведомления' },
    { key: 'Escape', action: 'Закрыть панели' }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="header-guide-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="header-guide-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="header-guide-header">
              <div className="guide-title">
                <h2>Руководство по навигации</h2>
                <p>Изучите все возможности верхней панели</p>
              </div>
              <motion.button
                className="close-guide-btn"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="header-guide-content">
              {/* Прогресс */}
              <div className="guide-progress">
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="progress-text">
                  {currentStep + 1} из {steps.length}
                </span>
              </div>

              {/* Текущий шаг */}
              <motion.div
                className="guide-step"
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                  <div className="step-icon" style={{ color: 'var(--accent-blue)' }}>
                    {currentStepData.icon}
                  </div>
                  <div className="step-info">
                    <h3>{currentStepData.title}</h3>
                    <p>{currentStepData.description}</p>
                  </div>
                  <div className="step-shortcut">
                    <Keyboard className="w-4 h-4" />
                    <span>{currentStepData.shortcut}</span>
                  </div>
                </div>

                <div className="step-features">
                  <h4>Возможности:</h4>
                  <ul>
                    {currentStepData.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ArrowRight className="w-3 h-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Навигация */}
              <div className="guide-navigation">
                <motion.button
                  className="nav-btn prev"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                >
                  Назад
                </motion.button>
                
                <div className="step-indicators">
                  {steps.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`step-indicator ${index === currentStep ? 'active' : ''}`}
                      onClick={() => setCurrentStep(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                <motion.button
                  className="nav-btn next"
                  onClick={currentStep === steps.length - 1 ? onClose : nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep === steps.length - 1 ? 'Готово' : 'Далее'}
                </motion.button>
              </div>
            </div>

            {/* Справочник горячих клавиш */}
            <div className="shortcuts-section">
              <h4>
                <Keyboard className="w-4 h-4" />
                Горячие клавиши
              </h4>
              <div className="shortcuts-grid">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    className="shortcut-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <kbd className="shortcut-key">{shortcut.key}</kbd>
                    <span className="shortcut-action">{shortcut.action}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 