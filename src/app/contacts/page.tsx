'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Send,
  MessageCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Calendar,
  Building,
  User,
  GraduationCap,
  TrendingUp,
  Share,
  Download,
  CheckCircle,
  Smartphone,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

interface Department {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  head: string;
  workingHours: string;
  icon: React.ReactNode;
  color: string;
}

interface ContactsCategory {
  id: string;
  name: string;
  count?: number;
  icon: React.ReactNode;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

export default function ContactsPageCompact() {
  const [selectedTab, setSelectedTab] = useState<string>('main');
  const [mounted, setMounted] = useState(true);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments: Department[] = [
    {
      id: 'admissions',
      name: 'Приемная комиссия',
      phone: '+7 (495) 123-45-67',
      email: 'admissions@university.edu',
      location: 'Главный корпус, ауд. 101',
      head: 'Иванова Елена Петровна',
      workingHours: 'Пн-Пт: 9:00-18:00',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'var(--accent-blue)'
    },
    {
      id: 'academic',
      name: 'Учебный отдел',
      phone: '+7 (495) 123-45-68',
      email: 'academic@university.edu',
      location: 'Главный корпус, ауд. 205',
      head: 'Петров Михаил Сергеевич',
      workingHours: 'Пн-Пт: 8:30-17:30',
      icon: <Building className="w-4 h-4" />,
      color: 'var(--accent-green)'
    },
    {
      id: 'students',
      name: 'Студенческий отдел',
      phone: '+7 (495) 123-45-69',
      email: 'students@university.edu',
      location: 'Студенческий центр, ауд. 15',
      head: 'Сидорова Анна Владимировна',
      workingHours: 'Пн-Пт: 9:00-17:00',
      icon: <Users className="w-4 h-4" />,
      color: 'var(--accent-purple)'
    },
    {
      id: 'tech',
      name: 'Техническая поддержка',
      phone: '+7 (495) 123-45-70',
      email: 'tech@university.edu',
      location: 'IT-центр, ауд. 301',
      head: 'Козлов Дмитрий Александрович',
      workingHours: 'Пн-Вс: 24/7',
      icon: <MessageCircle className="w-4 h-4" />,
      color: 'var(--accent-orange)'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/university',
      icon: <Facebook className="w-4 h-4" />,
      color: '#1877F2'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/university',
      icon: <Twitter className="w-4 h-4" />,
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/university',
      icon: <Instagram className="w-4 h-4" />,
      color: '#E4405F'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/university',
      icon: <Youtube className="w-4 h-4" />,
      color: '#FF0000'
    }
  ];

  const categories: ContactsCategory[] = [
    { id: 'main', name: 'Основные', icon: <Phone className="w-4 h-4" /> },
    { id: 'departments', name: 'Отделы', count: departments.length, icon: <Building className="w-4 h-4" /> },
    { id: 'form', name: 'Обратная связь', icon: <Send className="w-4 h-4" /> },
    { id: 'location', name: 'Местоположение', icon: <MapPin className="w-4 h-4" /> },
    { id: 'social', name: 'Соцсети', count: socialLinks.length, icon: <Share className="w-4 h-4" /> }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'call',
      title: 'ПОЗВОНИТЬ',
      description: 'Основной номер',
      icon: <Phone className="w-4 h-4" />,
      color: 'var(--accent-green)',
      badge: 'БЫСТРО'
    },
    {
      id: 'email',
      title: 'НАПИСАТЬ',
      description: 'Email письмо',
      icon: <Mail className="w-4 h-4" />,
      color: 'var(--accent-blue)'
    },
    {
      id: 'route',
      title: 'МАРШРУТ',
      description: 'Проложить путь',
      icon: <MapPin className="w-4 h-4" />,
      color: 'var(--accent-orange)'
    },
    {
      id: 'callback',
      title: 'ОБРАТНЫЙ ЗВОНОК',
      description: 'Мы перезвоним',
      icon: <Smartphone className="w-4 h-4" />,
      color: 'var(--accent-purple)'
    }
  ], []);

  const contactsStats = useMemo(() => {
    const totalContacts = 12;
    const responseTime = 2; // часа
    const availability = 95; // процент
    const activeChannels = 8;
    
    return {
      contacts: {
        value: totalContacts,
        label: 'Способов связи',
        change: '+2',
        trend: 'up' as const
      },
      response: {
        value: responseTime,
        label: 'Часа ответ',
        change: '-0.5ч',
        trend: 'up' as const
      },
      availability: {
        value: availability,
        label: '% доступности',
        change: '+3%',
        trend: 'up' as const
      },
      channels: {
        value: activeChannels,
        label: 'Активных каналов',
        change: '+1',
        trend: 'up' as const
      }
    };
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      case 'stable': return <TrendingUp className="w-3 h-3 text-blue-500" />;
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'call':
        window.open('tel:+74951234567');
        toast.success('Совершение звонка...');
        break;
      case 'email':
        window.open('mailto:info@university.edu');
        toast.success('Открытие почтового клиента...');
        break;
      case 'route':
        window.open('https://maps.google.com/maps?q=университет');
        toast.success('Построение маршрута...');
        break;
      case 'callback':
        toast.success('Заявка на обратный звонок принята!');
        break;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedTab(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Контакты';
    toast.success(`Переход: ${categoryName}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка контактов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contacts-compact">
      {/* Компактный заголовок */}
      <div className="contacts-header-compact">
        <div className="header-main">
          <Phone className="w-6 h-6" />
          <div>
            <h1>Контакты</h1>
            <p>Свяжитесь с нами удобным способом</p>
          </div>
            </div>
        <div className="current-contacts-indicator">
          <span className="contacts-badge">{contactsStats.availability.value}%</span>
          <span className="contacts-label">Доступность</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="contacts-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="contacts-top-row">
          {/* Статистика контактов */}
      <motion.div 
            className="contacts-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Текущие показатели связи</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{contactsStats.contacts.value}</span>
                  <span className="stat-label-compact">{contactsStats.contacts.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(contactsStats.contacts.trend)}
                    <span>{contactsStats.contacts.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{contactsStats.response.value}</span>
                  <span className="stat-label-compact">{contactsStats.response.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(contactsStats.response.trend)}
                    <span>{contactsStats.response.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{contactsStats.availability.value}%</span>
                  <span className="stat-label-compact">{contactsStats.availability.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(contactsStats.availability.trend)}
                    <span>{contactsStats.availability.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{contactsStats.channels.value}</span>
                  <span className="stat-label-compact">{contactsStats.channels.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(contactsStats.channels.trend)}
                    <span>{contactsStats.channels.change}</span>
                  </div>
                </div>
              </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="contacts-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-contacts">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  className="action-btn-contacts"
                  onClick={() => handleQuickAction(action.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="action-icon-contacts" style={{ color: action.color }}>
                    {action.icon}
                  </div>
                  {action.badge && (
                    <div className="action-badge-contacts" style={{ color: action.color }}>
                      {action.badge}
                    </div>
                  )}
                  <div className="action-content-contacts">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - категории и контент */}
        <div className="contacts-bottom-row">
          {/* Категории */}
          <motion.div 
            className="contacts-categories-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="categories-header">
              <h3>Разделы</h3>
              <p>Способы связи</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category, index) => (
              <motion.button
                  key={category.id}
                  className={`category-card-compact ${selectedTab === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="category-card-header">
                    <div className="category-icon">
                      {category.icon}
            </div>
                    {category.count && (
                      <div className="category-count">{category.count}</div>
                    )}
                  </div>
                  <div className="category-card-content">
                    <div className="category-name">{category.name}</div>
                  </div>
                </motion.button>
              ))}
          </div>
        </motion.div>

          {/* Контент */}
        <motion.div 
            className="contacts-content-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="contacts-content-header">
              <h3>{categories.find(c => c.id === selectedTab)?.name || 'Контакты'}</h3>
              <p>Информация для связи</p>
                </div>
                
            <div className="contacts-content-area">
              {selectedTab === 'main' && (
                <div className="main-contacts-section">
                  <div className="contacts-grid">
                    <div className="contact-card">
                      <div className="contact-card-header">
                        <User className="w-5 h-5" />
                        <h4>Ректор</h4>
                      </div>
                      <div className="contact-card-content">
                        <h5>Николаев Владимир Александрович</h5>
                        <div className="contact-details">
                          <div className="contact-item">
                            <Phone className="w-4 h-4" />
                        <span>+7 (495) 123-45-60</span>
                      </div>
                          <div className="contact-item">
                            <Mail className="w-4 h-4" />
                        <span>rector@university.edu</span>
                      </div>
                          <div className="contact-item">
                            <Calendar className="w-4 h-4" />
                        <span>Прием: Вт, Чт 14:00-16:00</span>
                      </div>
                    </div>
                        <div className="contact-actions">
                          <button className="contact-btn call" onClick={() => toast.success('Звонок ректору...')}>
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="contact-btn email" onClick={() => toast.success('Письмо ректору...')}>
                            <Mail className="w-4 h-4" />
                          </button>
                    </div>
                      </div>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-card-header">
                        <GraduationCap className="w-5 h-5" />
                        <h4>Проректор</h4>
                      </div>
                      <div className="contact-card-content">
                        <h5>Смирнова Елена Николаевна</h5>
                        <div className="contact-details">
                          <div className="contact-item">
                            <Phone className="w-4 h-4" />
                        <span>+7 (495) 123-45-61</span>
                      </div>
                          <div className="contact-item">
                            <Mail className="w-4 h-4" />
                        <span>academic@university.edu</span>
                      </div>
                          <div className="contact-item">
                            <Calendar className="w-4 h-4" />
                        <span>Прием: Пн, Ср, Пт 10:00-12:00</span>
                      </div>
                    </div>
                        <div className="contact-actions">
                          <button className="contact-btn call">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="contact-btn email">
                            <Mail className="w-4 h-4" />
                          </button>
                      </div>
                      </div>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-card-header">
                        <Building className="w-5 h-5" />
                        <h4>Административный офис</h4>
                      </div>
                      <div className="contact-card-content">
                        <h5>Общие вопросы</h5>
                        <div className="contact-details">
                          <div className="contact-item">
                            <Phone className="w-4 h-4" />
                        <span>+7 (495) 123-45-67</span>
                      </div>
                          <div className="contact-item">
                            <Mail className="w-4 h-4" />
                        <span>office@university.edu</span>
                      </div>
                          <div className="contact-item">
                            <Clock className="w-4 h-4" />
                        <span>Пн-Пт: 8:00-20:00</span>
                      </div>
                    </div>
                        <div className="contact-actions">
                          <button className="contact-btn call">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="contact-btn email">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                        </div>
                      </div>
                        </div>
                      </div>
              )}

              {selectedTab === 'departments' && (
                <div className="departments-section">
                  <div className="departments-grid">
                    {departments.map((department) => (
                      <div key={department.id} className="department-card">
                        <div className="department-header">
                          <div className="department-icon" style={{ background: department.color }}>
                            {department.icon}
                        </div>
                          <h4>{department.name}</h4>
                      </div>
                        <div className="department-content">
                          <h5>{department.head}</h5>
                          <div className="department-details">
                            <div className="department-item">
                              <Phone className="w-4 h-4" />
                          <span>{department.phone}</span>
                        </div>
                            <div className="department-item">
                              <Mail className="w-4 h-4" />
                          <span>{department.email}</span>
                        </div>
                            <div className="department-item">
                              <MapPin className="w-4 h-4" />
                          <span>{department.location}</span>
                        </div>
                            <div className="department-item">
                              <Clock className="w-4 h-4" />
                          <span>{department.workingHours}</span>
                        </div>
                      </div>
                          <div className="department-actions">
                            <button className="contact-btn call" onClick={() => toast.success(`Звонок в ${department.name}...`)}>
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="contact-btn email" onClick={() => toast.success(`Письмо в ${department.name}...`)}>
                              <Mail className="w-4 h-4" />
                            </button>
                      </div>
                  </div>
                      </div>
              ))}
            </div>
                </div>
              )}

              {selectedTab === 'form' && (
                <div className="form-section">
                  <div className="feedback-form-card">
                    <div className="form-card-header">
                      <Send className="w-5 h-5" />
                      <h4>Форма обратной связи</h4>
                      </div>
                    <form onSubmit={handleSubmit} className="contact-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Ваше имя</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Введите ваше имя"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="example@email.com"
                          />
                        </div>
                        </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Тема</label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="Тема обращения"
                          />
                        </div>
                        <div className="form-group">
                          <label>Категория</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                          >
                            <option value="general">Общий вопрос</option>
                            <option value="admission">Поступление</option>
                            <option value="academic">Учебные вопросы</option>
                            <option value="technical">Техническая поддержка</option>
                            <option value="other">Другое</option>
                          </select>
                        </div>
                        </div>

                      <div className="form-group">
                        <label>Сообщение</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Подробно опишите ваш вопрос или предложение..."
                        />
                      </div>

                      <button type="submit" className="submit-btn" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                            <Clock className="w-4 h-4" />
                              <span>Отправка...</span>
                            </>
                          ) : (
                            <>
                            <Send className="w-4 h-4" />
                              <span>Отправить сообщение</span>
                            </>
                          )}
                      </button>
                    </form>
                </div>
            </div>
              )}

              {selectedTab === 'location' && (
                <div className="location-section">
                  <div className="location-cards">
                    <div className="info-card">
                      <div className="info-card-header">
                        <MapPin className="w-5 h-5" />
                        <h4>Адрес</h4>
                      </div>
                      <p><strong>Главный корпус:</strong><br />г. Москва, ул. Технологическая, д. 1</p>
                      <p><strong>Метро:</strong> "Технопарк" (5 минут пешком)</p>
                    </div>
                    
                    <div className="info-card">
                      <div className="info-card-header">
                        <Clock className="w-5 h-5" />
                        <h4>Время работы</h4>
                      </div>
                      <p><strong>Понедельник - Пятница:</strong> 8:00 - 20:00</p>
                      <p><strong>Суббота:</strong> 9:00 - 15:00</p>
                      <p><strong>Воскресенье:</strong> выходной</p>
                    </div>
                    
                    <div className="info-card">
                      <div className="info-card-header">
                        <Globe className="w-5 h-5" />
                        <h4>Карта</h4>
                      </div>
                      <p>Точное местоположение университета на интерактивной карте</p>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => toast.success('Открытие в картах...')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Открыть в картах
                      </button>
                      </div>
                      </div>
                    </div>
              )}

              {selectedTab === 'social' && (
                <div className="social-section">
                  <div className="social-grid">
                    {socialLinks.map((social) => (
                      <div key={social.name} className="social-card">
                        <div className="social-icon" style={{ background: social.color }}>
                          {social.icon}
                      </div>
                        <h4>{social.name}</h4>
                        <p>Официальная страница университета</p>
                        <div className="social-stats">
                          <CheckCircle className="w-4 h-4" />
                          <span>Верифицированный аккаунт</span>
                    </div>
                        <button 
                          className="social-btn" 
                          style={{ background: social.color }}
                          onClick={() => toast.success(`Переход в ${social.name}...`)}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                          Перейти
                        </button>
                      </div>
                    ))}
                      </div>
                    </div>
              )}
                    </div>
                  </motion.div>
                </div>
            </div>
      </div>
  );
} 