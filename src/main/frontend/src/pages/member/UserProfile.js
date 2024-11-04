import React from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom'; // navigate import 추가

const UserProfile = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate(); // navigate 초기화

    const handleLogout = () => {
        logout();
        window.location.href = '/member';
    };

    const handleModify = () => {
        navigate('/member/modify'); // 회원 정보 수정 페이지로 이동
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.m_name}!</h1>
                    <div>
                        <h2>Your Profile Information</h2>
                        <p><strong>Email:</strong> {user.m_email}</p>
                        <p><strong>연락처:</strong> {user.m_phone}</p>
                        <p><strong>주소:</strong> {user.m_address}</p>
                        <p><strong>생일:</strong> {user.m_birth}</p>
                        <p><strong>성별:</strong> {user.m_gender === 'man' ? 'Male' : 'Female'}</p>
                        <p><strong>MBTI:</strong> {user.m_mbti || 'Not specified'}</p>
                    </div>
                    <button onClick={handleModify}>Modify Profile</button> {/* 수정 버튼 추가 */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h1>Please log in.</h1>
            )}
        </div>
    );
};

export default UserProfile;
