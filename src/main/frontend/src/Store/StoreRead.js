import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StoreRead() {
    const { sno } = useParams();
    const [store, setStore] = useState(null); // null로 초기화
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('bookmarks');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        const fetchData = async (username, sno) => {
            try {
                const response = await axios.get('http://localhost:8080/api/store/read', {
                    params: {
                        username,
                        sno,
                    },
                });
                setStore(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const user = JSON.parse(localStorage.getItem('user')); // 저장된 사용자 정보 가져오기
        if (user && user.mid) { // 사용자 정보가 있을 경우
            fetchData(user.mid, sno); // 사용자 ID와 sno를 이용해 데이터 가져오기
        }
    }, [sno]);

    if (!store) {
        return <p>Loading...</p>; // store가 null일 때 로딩 메시지 표시
    }

    return (
        <div className="detail-page">
            <h1>{store.p_name}</h1>
            <p>{store.p_content}</p>
            <img src={store.p_image} alt={store.p_name} />
            <div className="store-info">
                <p><strong>주소:</strong> {store.p_address}</p>
                <p><strong>연락처:</strong> {store.p_call}</p>
                <p><strong>홈페이지:</strong> <a href={store.p_site} target="_blank" rel="noopener noreferrer">{store.p_site}</a></p>
                <p><strong>영업시간:</strong> {store.p_opentime}</p>
                <p><strong>주차 안내:</strong> {store.p_park}</p>
            </div>
        </div>
    );
}

export default StoreRead;
