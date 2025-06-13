import React, { useState } from 'react';

function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('available'); // available, orders, history
  const [selectedCategory, setSelectedCategory] = useState('all');

  const availableDocuments = [
    {
      id: 1,
      name: 'Справка об обучении',
      description: 'Официальная справка о том, что вы являетесь студентом университета',
      category: 'Справки',
      processingTime: '1-2 рабочих дня',
      cost: 'Бесплатно',
      format: 'PDF',
      languages: ['Казахский', 'Русский', 'Английский'],
      requirements: ['Студенческий билет', 'Заявление'],
      icon: '📄'
    },
    {
      id: 2,
      name: 'Академическая справка (Transcript)',
      description: 'Подробная информация об изученных дисциплинах и полученных оценках',
      category: 'Академические документы',
      processingTime: '3-5 рабочих дней',
      cost: '5000 тенге',
      format: 'PDF + печатная версия',
      languages: ['Казахский', 'Русский', 'Английский'],
      requirements: ['Заявление', 'Копия удостоверения личности', 'Оплата'],
      icon: '📊'
    },
    {
      id: 3,
      name: 'Справка о периоде обучения',
      description: 'Документ с указанием дат начала и окончания обучения',
      category: 'Справки',
      processingTime: '1-2 рабочих дня',
      cost: 'Бесплатно',
      format: 'PDF',
      languages: ['Казахский', 'Русский'],
      requirements: ['Студенческий билет'],
      icon: '📅'
    },
    {
      id: 4,
      name: 'Копия диплома',
      description: 'Заверенная копия диплома о высшем образовании',
      category: 'Дипломы и сертификаты',
      processingTime: '5-7 рабочих дней',
      cost: '8000 тенге',
      format: 'Печатная версия',
      languages: ['Казахский', 'Русский', 'Английский'],
      requirements: ['Заявление', 'Оригинал диплома', 'Оплата'],
      icon: '🎓'
    },
    {
      id: 5,
      name: 'Справка для военкомата',
      description: 'Справка об отсрочке от военной службы для студентов',
      category: 'Специальные справки',
      processingTime: '1 рабочий день',
      cost: 'Бесплатно',
      format: 'PDF + печатная версия',
      languages: ['Казахский', 'Русский'],
      requirements: ['Повестка из военкомата', 'Студенческий билет'],
      icon: '🛡️'
    },
    {
      id: 6,
      name: 'Справка для банка',
      description: 'Справка о доходах и статусе студента для банковских операций',
      category: 'Финансовые справки',
      processingTime: '2-3 рабочих дня',
      cost: '2000 тенге',
      format: 'PDF + печатная версия',
      languages: ['Казахский', 'Русский'],
      requirements: ['Заявление', 'Документ из банка с требованиями'],
      icon: '🏦'
    }
  ];

  const documentOrders = [
    {
      id: 1,
      documentName: 'Академическая справка (Transcript)',
      orderDate: '2025-01-15',
      status: 'processing',
      estimatedDate: '2025-01-20',
      cost: '5000 тенге',
      paymentStatus: 'paid',
      language: 'Английский',
      trackingNumber: 'DOC-2025-001',
      comments: 'Требуется для поступления в магистратуру за рубежом'
    },
    {
      id: 2,
      documentName: 'Справка об обучении',
      orderDate: '2025-01-10',
      status: 'ready',
      estimatedDate: '2025-01-12',
      cost: 'Бесплатно',
      paymentStatus: 'not_required',
      language: 'Русский',
      trackingNumber: 'DOC-2025-002',
      comments: 'Для оформления студенческой визы'
    },
    {
      id: 3,
      documentName: 'Справка для банка',
      orderDate: '2025-01-08',
      status: 'completed',
      estimatedDate: '2025-01-11',
      completedDate: '2025-01-11',
      cost: '2000 тенге',
      paymentStatus: 'paid',
      language: 'Русский',
      trackingNumber: 'DOC-2025-003',
      comments: 'Для оформления студенческого кредита'
    }
  ];

  const documentHistory = [
    {
      id: 1,
      documentName: 'Справка об обучении',
      orderDate: '2024-11-15',
      completedDate: '2024-11-17',
      language: 'Казахский',
      purpose: 'Для получения стипендии'
    },
    {
      id: 2,
      documentName: 'Справка для военкомата',
      orderDate: '2024-09-20',
      completedDate: '2024-09-21',
      language: 'Русский',
      purpose: 'Отсрочка от военной службы'
    },
    {
      id: 3,
      documentName: 'Академическая справка',
      orderDate: '2024-06-10',
      completedDate: '2024-06-15',
      language: 'Английский',
      purpose: 'Стажировка в зарубежном университете'
    }
  ];

  const categories = [...new Set(availableDocuments.map(doc => doc.category))];

  const filteredDocuments = selectedCategory === 'all' 
    ? availableDocuments 
    : availableDocuments.filter(doc => doc.category === selectedCategory);

  const getStatusColor = (status) => {
    switch(status) {
      case 'processing': return 'warning';
      case 'ready': return 'success';
      case 'completed': return 'info';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'processing': return 'В обработке';
      case 'ready': return 'Готов к выдаче';
      case 'completed': return 'Выдан';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  const getPaymentStatusText = (status) => {
    switch(status) {
      case 'paid': return 'Оплачено';
      case 'pending': return 'Ожидает оплаты';
      case 'not_required': return 'Не требуется';
      default: return 'Неизвестно';
    }
  };

  const handleOrderDocument = (document) => {
    alert(`Заказ документа: ${document.name}`);
  };

  const handleDownloadDocument = (order) => {
    alert(`Скачивание документа: ${order.documentName}`);
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Документы</h2>
            <p className="lead text-muted mb-0">Заказ справок и официальных документов</p>
          </div>
        </div>

        {/* Навигационные табы */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'available' ? 'active' : ''}`}
              onClick={() => setActiveTab('available')}
            >
              <i className="bi bi-file-earmark-plus me-2"></i>
              Доступные документы
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="bi bi-hourglass-split me-2"></i>
              Мои заказы
              {documentOrders.filter(order => order.status !== 'completed').length > 0 && (
                <span className="badge bg-danger ms-2">
                  {documentOrders.filter(order => order.status !== 'completed').length}
                </span>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="bi bi-clock-history me-2"></i>
              История заказов
            </button>
          </li>
        </ul>

        {/* Доступные документы */}
        {activeTab === 'available' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Доступные для заказа документы</h4>
              <select 
                className="form-select w-auto" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Все категории</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="row">
              {filteredDocuments.map(document => (
                <div key={document.id} className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-start mb-3">
                        <div className="me-3" style={{ fontSize: '2.5rem' }}>
                          {document.icon}
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-1">{document.name}</h5>
                          <span className="badge bg-secondary mb-2">{document.category}</span>
                          <p className="card-text text-muted">{document.description}</p>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-6">
                          <small className="text-muted">Срок изготовления:</small>
                          <div className="fw-bold">{document.processingTime}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Стоимость:</small>
                          <div className="fw-bold text-success">{document.cost}</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Доступные языки:</small>
                        <div className="mt-1">
                          {document.languages.map((language, index) => (
                            <span key={index} className="badge bg-light text-dark me-1">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Требования:</small>
                        <ul className="list-unstyled mt-1">
                          {document.requirements.map((requirement, index) => (
                            <li key={index}>
                              <small>• {requirement}</small>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">Формат: {document.format}</small>
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleOrderDocument(document)}
                        >
                          <i className="bi bi-plus-circle me-2"></i>
                          Заказать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Мои заказы */}
        {activeTab === 'orders' && (
          <div>
            <h4 className="mb-3">Мои заказы</h4>
            
            {documentOrders.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-file-earmark-x display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">У вас пока нет заказов</h5>
                <p className="text-muted">Перейдите во вкладку "Доступные документы" для оформления заказа</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Номер заказа</th>
                      <th>Документ</th>
                      <th>Дата заказа</th>
                      <th>Статус</th>
                      <th>Готовность</th>
                      <th>Стоимость</th>
                      <th>Оплата</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentOrders.map(order => (
                      <tr key={order.id}>
                        <td className="fw-bold">{order.trackingNumber}</td>
                        <td>
                          <div>{order.documentName}</div>
                          <small className="text-muted">{order.language}</small>
                        </td>
                        <td>{order.orderDate}</td>
                        <td>
                          <span className={`badge bg-${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td>
                          {order.status === 'completed' ? order.completedDate : order.estimatedDate}
                        </td>
                        <td>{order.cost}</td>
                        <td>
                          <span className={`badge bg-${order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'secondary'}`}>
                            {getPaymentStatusText(order.paymentStatus)}
                          </span>
                        </td>
                        <td>
                          {order.status === 'ready' && (
                            <button 
                              className="btn btn-sm btn-success"
                              onClick={() => handleDownloadDocument(order)}
                            >
                              <i className="bi bi-download"></i>
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleDownloadDocument(order)}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Детали заказов */}
            {documentOrders.filter(order => order.status !== 'completed').length > 0 && (
              <div className="mt-4">
                <h5>Активные заказы</h5>
                {documentOrders.filter(order => order.status !== 'completed').map(order => (
                  <div key={order.id} className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6>{order.documentName}</h6>
                          <p className="text-muted mb-2">{order.comments}</p>
                          <div className="d-flex gap-3">
                            <small>
                              <strong>Заказ:</strong> {order.orderDate}
                            </small>
                            <small>
                              <strong>Готовность:</strong> {order.estimatedDate}
                            </small>
                            <small>
                              <strong>Язык:</strong> {order.language}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className={`badge bg-${getStatusColor(order.status)} mb-2`}>
                            {getStatusText(order.status)}
                          </span>
                          <div>
                            <small className="text-muted">{order.trackingNumber}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* История заказов */}
        {activeTab === 'history' && (
          <div>
            <h4 className="mb-3">История заказов</h4>
            
            {documentHistory.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-clock-history display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">История пуста</h5>
                <p className="text-muted">Здесь будут отображаться ваши завершенные заказы</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Документ</th>
                      <th>Дата заказа</th>
                      <th>Дата выдачи</th>
                      <th>Язык</th>
                      <th>Цель получения</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentHistory.map(record => (
                      <tr key={record.id}>
                        <td className="fw-semibold">{record.documentName}</td>
                        <td>{record.orderDate}</td>
                        <td>{record.completedDate}</td>
                        <td>{record.language}</td>
                        <td>
                          <small className="text-muted">{record.purpose}</small>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-arrow-clockwise me-1"></i>
                            Повторить заказ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentsPage; 