import React, { useState } from 'react';

function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, payments, scholarship, history

  const financialOverview = {
    balance: -125000, // отрицательный баланс означает задолженность
    totalPaid: 2750000,
    totalDue: 2875000,
    nextPaymentDate: '2025-02-15',
    nextPaymentAmount: 125000,
    scholarship: 45000,
    scholarshipStatus: 'active'
  };

  const payments = [
    {
      id: 1,
      description: 'Оплата за обучение - Весенний семестр 2025',
      amount: 875000,
      dueDate: '2025-02-15',
      status: 'pending',
      category: 'Обучение',
      paymentMethods: ['Банковская карта', 'Банковский перевод', 'Каспи QR'],
      lateFee: 0
    },
    {
      id: 2,
      description: 'Доплата за общежитие - Февраль 2025',
      amount: 25000,
      dueDate: '2025-02-01',
      status: 'overdue',
      category: 'Общежитие',
      paymentMethods: ['Банковская карта', 'Каспи QR'],
      lateFee: 2500
    },
    {
      id: 3,
      description: 'Медицинская страховка',
      amount: 15000,
      dueDate: '2025-03-01',
      status: 'upcoming',
      category: 'Страхование',
      paymentMethods: ['Банковская карта', 'Банковский перевод'],
      lateFee: 0
    }
  ];

  const scholarshipInfo = {
    currentScholarship: {
      name: 'Академическая стипендия',
      amount: 45000,
      period: 'Ежемесячно',
      nextPayment: '2025-02-01',
      requirements: ['GPA > 3.5', 'Без академических задолженностей', 'Активное участие в учебной деятельности'],
      status: 'active'
    },
    availableScholarships: [
      {
        id: 1,
        name: 'Стипендия за отличную учебу',
        amount: 75000,
        requirements: ['GPA > 3.8', 'Не более 1 оценки "B"', 'Рекомендация преподавателя'],
        deadline: '2025-03-15',
        status: 'available'
      },
      {
        id: 2,
        name: 'Социальная стипендия',
        amount: 35000,
        requirements: ['Справка о доходах семьи', 'Социальный статус', 'GPA > 3.0'],
        deadline: '2025-02-28',
        status: 'available'
      },
      {
        id: 3,
        name: 'Стипендия за научную деятельность',
        amount: 50000,
        requirements: ['Участие в исследованиях', 'Публикации', 'Рекомендация научного руководителя'],
        deadline: '2025-04-01',
        status: 'available'
      }
    ]
  };

  const paymentHistory = [
    {
      id: 1,
      date: '2025-01-15',
      description: 'Оплата за обучение - Осенний семестр 2024',
      amount: 875000,
      method: 'Банковская карта',
      status: 'completed',
      category: 'Обучение',
      transactionId: 'TXN-2025-001'
    },
    {
      id: 2,
      date: '2025-01-10',
      description: 'Общежитие - Январь 2025',
      amount: 25000,
      method: 'Каспи QR',
      status: 'completed',
      category: 'Общежитие',
      transactionId: 'TXN-2025-002'
    },
    {
      id: 3,
      date: '2024-12-20',
      description: 'Дополнительные курсы - Английский язык',
      amount: 45000,
      method: 'Банковский перевод',
      status: 'completed',
      category: 'Дополнительное образование',
      transactionId: 'TXN-2024-156'
    },
    {
      id: 4,
      date: '2024-12-01',
      description: 'Получение стипендии',
      amount: 45000,
      method: 'Банковский перевод',
      status: 'completed',
      category: 'Стипендия',
      transactionId: 'STP-2024-12',
      type: 'income'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'overdue': return 'danger';
      case 'upcoming': return 'info';
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'К оплате';
      case 'completed': return 'Оплачено';
      case 'overdue': return 'Просрочено';
      case 'upcoming': return 'Предстоящий';
      case 'active': return 'Активна';
      case 'inactive': return 'Неактивна';
      default: return 'Неизвестно';
    }
  };

  const handlePayment = (payment) => {
    alert(`Оплата: ${payment.description}\nСумма: ${payment.amount.toLocaleString()} тенге`);
  };

  const handleApplyScholarship = (scholarship) => {
    alert(`Подача заявки на стипендию: ${scholarship.name}`);
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString();
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Финансы</h2>
            <p className="lead text-muted mb-0">Платежи, стипендии и финансовая информация</p>
          </div>
          <div className="text-end">
            <div className={`h4 mb-0 ${financialOverview.balance >= 0 ? 'text-success' : 'text-danger'}`}>
              {financialOverview.balance >= 0 ? '+' : ''}{formatAmount(financialOverview.balance)} тенге
            </div>
            <small className="text-muted">
              {financialOverview.balance >= 0 ? 'Переплата' : 'Задолженность'}
            </small>
          </div>
        </div>

        {/* Навигационные табы */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="bi bi-pie-chart me-2"></i>
              Обзор
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <i className="bi bi-credit-card me-2"></i>
              Платежи
              {payments.filter(p => p.status === 'pending' || p.status === 'overdue').length > 0 && (
                <span className="badge bg-danger ms-2">
                  {payments.filter(p => p.status === 'pending' || p.status === 'overdue').length}
                </span>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'scholarship' ? 'active' : ''}`}
              onClick={() => setActiveTab('scholarship')}
            >
              <i className="bi bi-award me-2"></i>
              Стипендии
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="bi bi-clock-history me-2"></i>
              История
            </button>
          </li>
        </ul>

        {/* Обзор */}
        {activeTab === 'overview' && (
          <div>
            {/* Основная статистика */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card text-center border-primary">
                  <div className="card-body">
                    <div className="h4 text-primary">{formatAmount(financialOverview.totalPaid)}</div>
                    <small className="text-muted">Всего оплачено</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center border-warning">
                  <div className="card-body">
                    <div className="h4 text-warning">{formatAmount(Math.abs(financialOverview.balance))}</div>
                    <small className="text-muted">Текущая задолженность</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center border-success">
                  <div className="card-body">
                    <div className="h4 text-success">{formatAmount(financialOverview.scholarship)}</div>
                    <small className="text-muted">Стипендия в месяц</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center border-info">
                  <div className="card-body">
                    <div className="h4 text-info">{formatAmount(financialOverview.nextPaymentAmount)}</div>
                    <small className="text-muted">Следующий платеж</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Предупреждения и уведомления */}
            {financialOverview.balance < 0 && (
              <div className="alert alert-warning mb-4">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <strong>Внимание!</strong> У вас есть задолженность в размере {formatAmount(Math.abs(financialOverview.balance))} тенге. 
                Следующий платеж: <strong>{financialOverview.nextPaymentDate}</strong>
              </div>
            )}

            {/* Ближайшие платежи */}
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Ближайшие платежи</h5>
                  </div>
                  <div className="card-body">
                    {payments.slice(0, 3).map(payment => (
                      <div key={payment.id} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                        <div>
                          <div className="fw-semibold">{payment.description}</div>
                          <small className="text-muted">Срок: {payment.dueDate}</small>
                          {payment.lateFee > 0 && (
                            <div>
                              <small className="text-danger">Пеня: {formatAmount(payment.lateFee)} тенге</small>
                            </div>
                          )}
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">{formatAmount(payment.amount)} тенге</div>
                          <span className={`badge bg-${getStatusColor(payment.status)}`}>
                            {getStatusText(payment.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Стипендия</h5>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <div className="h3 text-success">{formatAmount(scholarshipInfo.currentScholarship.amount)} тенге</div>
                      <small className="text-muted">{scholarshipInfo.currentScholarship.period}</small>
                    </div>
                    <div className="mb-3">
                      <strong>{scholarshipInfo.currentScholarship.name}</strong>
                      <div>
                        <span className={`badge bg-${getStatusColor(scholarshipInfo.currentScholarship.status)}`}>
                          {getStatusText(scholarshipInfo.currentScholarship.status)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted">Следующая выплата:</small>
                      <div className="fw-bold">{scholarshipInfo.currentScholarship.nextPayment}</div>
                    </div>
                  </div>
                </div>

                {scholarshipInfo.availableScholarships.length > 0 && (
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="mb-0">Доступные стипендии</h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <div className="h4 text-info">{scholarshipInfo.availableScholarships.length}</div>
                        <small className="text-muted">программ доступно</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Платежи */}
        {activeTab === 'payments' && (
          <div>
            <h4 className="mb-3">Платежи к оплате</h4>
            
            <div className="row">
              {payments.map(payment => (
                <div key={payment.id} className="col-lg-6 mb-4">
                  <div className={`card border-${getStatusColor(payment.status)}`}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">{payment.category}</span>
                      <span className={`badge bg-${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                    <div className="card-body">
                      <h6 className="card-title">{payment.description}</h6>
                      
                      <div className="row mb-3">
                        <div className="col-6">
                          <small className="text-muted">Сумма к оплате:</small>
                          <div className="h5 mb-0">{formatAmount(payment.amount)} тенге</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Срок платежа:</small>
                          <div className="fw-bold">{payment.dueDate}</div>
                        </div>
                      </div>

                      {payment.lateFee > 0 && (
                        <div className="alert alert-danger py-2">
                          <small>
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Пеня за просрочку: {formatAmount(payment.lateFee)} тенге
                          </small>
                        </div>
                      )}

                      <div className="mb-3">
                        <small className="text-muted">Способы оплаты:</small>
                        <div className="mt-1">
                          {payment.paymentMethods.map((method, index) => (
                            <span key={index} className="badge bg-light text-dark me-1">
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>

                      {payment.status !== 'completed' && (
                        <button 
                          className="btn btn-primary w-100"
                          onClick={() => handlePayment(payment)}
                        >
                          <i className="bi bi-credit-card me-2"></i>
                          Оплатить {formatAmount(payment.amount + payment.lateFee)} тенге
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Стипендии */}
        {activeTab === 'scholarship' && (
          <div>
            {/* Текущая стипендия */}
            <div className="card mb-4 border-success">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Текущая стипендия</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>{scholarshipInfo.currentScholarship.name}</h6>
                    <div className="mb-3">
                      <div className="h4 text-success">{formatAmount(scholarshipInfo.currentScholarship.amount)} тенге</div>
                      <small className="text-muted">{scholarshipInfo.currentScholarship.period}</small>
                    </div>
                    <div>
                      <small className="text-muted">Следующая выплата:</small>
                      <div className="fw-bold">{scholarshipInfo.currentScholarship.nextPayment}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6>Требования для сохранения:</h6>
                    <ul className="list-unstyled">
                      {scholarshipInfo.currentScholarship.requirements.map((requirement, index) => (
                        <li key={index}>
                          <i className="bi bi-check-circle text-success me-2"></i>
                          <small>{requirement}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Доступные стипендии */}
            <h4 className="mb-3">Доступные для подачи заявки</h4>
            <div className="row">
              {scholarshipInfo.availableScholarships.map(scholarship => (
                <div key={scholarship.id} className="col-lg-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">{scholarship.name}</h6>
                      
                      <div className="mb-3">
                        <div className="h5 text-primary">{formatAmount(scholarship.amount)} тенге</div>
                        <small className="text-muted">Ежемесячно</small>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Дедлайн подачи:</small>
                        <div className="fw-bold text-danger">{scholarship.deadline}</div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Требования:</small>
                        <ul className="list-unstyled mt-1">
                          {scholarship.requirements.map((requirement, index) => (
                            <li key={index}>
                              <small>• {requirement}</small>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button 
                        className="btn btn-outline-primary w-100"
                        onClick={() => handleApplyScholarship(scholarship)}
                      >
                        <i className="bi bi-file-earmark-plus me-2"></i>
                        Подать заявку
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* История */}
        {activeTab === 'history' && (
          <div>
            <h4 className="mb-3">История операций</h4>
            
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Дата</th>
                    <th>Описание</th>
                    <th>Категория</th>
                    <th>Сумма</th>
                    <th>Способ оплаты</th>
                    <th>ID транзакции</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map(record => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>{record.description}</td>
                      <td>
                        <span className="badge bg-secondary">{record.category}</span>
                      </td>
                      <td>
                        <span className={record.type === 'income' ? 'text-success' : 'text-primary'}>
                          {record.type === 'income' ? '+' : '-'}{formatAmount(record.amount)} тенге
                        </span>
                      </td>
                      <td>{record.method}</td>
                      <td>
                        <small className="text-muted">{record.transactionId}</small>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Сводка по периодам */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Итого за 2025 год</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <small className="text-muted">Расходы:</small>
                        <div className="h6 text-danger">
                          -{formatAmount(paymentHistory.filter(p => p.type !== 'income').reduce((sum, p) => sum + p.amount, 0))} тенге
                        </div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Доходы:</small>
                        <div className="h6 text-success">
                          +{formatAmount(paymentHistory.filter(p => p.type === 'income').reduce((sum, p) => sum + p.amount, 0))} тенге
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Статистика платежей</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <small className="text-muted">Всего операций:</small>
                        <div className="h6">{paymentHistory.length}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Средний платеж:</small>
                        <div className="h6">
                          {formatAmount(Math.round(paymentHistory.reduce((sum, p) => sum + p.amount, 0) / paymentHistory.length))} тенге
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinancePage; 