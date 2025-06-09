import React from 'react';
import './styles.css';

function ProfilePage() {
    const userData = {
        name: 'Иван Иванов',
        studentId: '2024001',
        faculty: 'Информационные технологии',
        specialization: 'Программная инженерия',
        year: '2',
        email: 'ivan.ivanov@example.com',
        phone: '+7 (777) 123-45-67'
    };

    return (
        <div className="container py-4">
            <div className="page-content card">
                <h2 className="mb-3">Личный профиль</h2>
                <p className="lead text-muted mb-4">Ваша персональная информация</p>

                <div className="profile-info">
                    <div className="profile-section mb-4">
                        <h3 className="h5 mb-3">Основная информация</h3>
                        <div className="profile-details row g-3">
                            <div className="col-md-6 detail-group">
                                <label className="form-label">ФИО:</label>
                                <p className="form-control-plaintext">{userData.name}</p>
                            </div>
                            <div className="col-md-6 detail-group">
                                <label className="form-label">Студенческий ID:</label>
                                <p className="form-control-plaintext">{userData.studentId}</p>
                            </div>
                            <div className="col-md-6 detail-group">
                                <label className="form-label">Факультет:</label>
                                <p className="form-control-plaintext">{userData.faculty}</p>
                            </div>
                            <div className="col-md-6 detail-group">
                                <label className="form-label">Специализация:</label>
                                <p className="form-control-plaintext">{userData.specialization}</p>
                            </div>
                            <div className="col-md-6 detail-group">
                                <label className="form-label">Курс:</label>
                                <p className="form-control-plaintext">{userData.year}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3 className="h5 mb-3">Контактная информация</h3>
                        <div className="profile-details row g-3">
                            <div className="col-md-6 detail-group">
                                <label className="form-label">Email:</label>
                                <p className="form-control-plaintext">{userData.email}</p>
                            </div>
                            <div className="col-md-6 detail-group">
                                <label className="form-label">Телефон:</label>
                                <p className="form-control-plaintext">{userData.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;