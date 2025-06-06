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
        <div className="container">
            <div className="page-content">
                <h2>Личный профиль</h2>
                <p>Ваша персональная информация</p>

                <div className="profile-info">
                    <div className="profile-section">
                        <h3>Основная информация</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>ФИО:</label>
                                <span>{userData.name}</span>
                            </div>
                            <div className="info-item">
                                <label>Студенческий ID:</label>
                                <span>{userData.studentId}</span>
                            </div>
                            <div className="info-item">
                                <label>Факультет:</label>
                                <span>{userData.faculty}</span>
                            </div>
                            <div className="info-item">
                                <label>Специализация:</label>
                                <span>{userData.specialization}</span>
                            </div>
                            <div className="info-item">
                                <label>Курс:</label>
                                <span>{userData.year}</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>Контактная информация</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Email:</label>
                                <span>{userData.email}</span>
                            </div>
                            <div className="info-item">
                                <label>Телефон:</label>
                                <span>{userData.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;