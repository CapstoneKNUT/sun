import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './Lists.css';
import { area } from './Area';
import { useUser } from '../member/UserContext';

function Lists() {
  const [places, setPlaces] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const [selectedArea, setSelectedArea] = useState('');
  const [selectedSubArea, setSelectedSubArea] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const location = useLocation();
  const { user } = useUser(); // UserContext에서 사용자 정보 가져오기

  const [pageRequest, setPageRequest] = useState({
    page: 1,
    size: 10,
  });
  const [responseData, setResponseData] = useState({
    dtoList: [],
    prev: false,
    next: false,
    start: 0,
    end: 0,
    page: 1,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/place/list', {
        params: pageRequest,
      });
      if (response.data?.dtoList) {
        setResponseData(response.data);
      } else {
        console.error('Invalid data structure received from API.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageRequest]);

  const handlePageChange = (pageNum) => {
    setPageRequest((prev) => ({
      ...prev,
      page: pageNum,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const p_area = selectedArea;
    const p_subArea = selectedSubArea !== '지역 전체' ? selectedSubArea : '';
    const p_keyword = keywordInput;

    setPageRequest({ ...pageRequest, page: 1 }); // 검색 시 첫 번째 페이지로 초기화

    try {
      const response = await axios.post('http://localhost:8080/api/place/list', {
        p_area,
        p_subArea,
        p_category: '',
        p_count: 20,
        p_keyword,
      });
      setResponseData(response.data);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location') || '';
    const districtParam = searchParams.get('district') || '';
    const keywordParam = searchParams.get('keyword') || '';

    const filteredPlaces = responseData.dtoList.filter((item) => {
      const matchesLocation = locationParam ? item.p_address.includes(locationParam) : true;
      const matchesDistrict = districtParam ? item.p_address.includes(districtParam) : true;
      const matchesKeyword = keywordParam ? item.p_name.includes(keywordParam) : true;

      return matchesLocation && matchesDistrict && matchesKeyword;
    });

    setPlaces(filteredPlaces.length > 0 ? filteredPlaces : responseData.dtoList);
  }, [location, responseData.dtoList]);

  const toggleBookmark = async (pord) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const bookmarkItem = places.find((item) => item.pord === pord);
    if (!bookmarkItem) {
      console.warn('Bookmark item not found:', pord);
      return;
    }

    const isBookmarked = bookmarks.some((bookmark) => bookmark.pord === pord);
    const updatedBookmarks = isBookmarked
        ? bookmarks.filter((bookmark) => bookmark.pord !== pord)
        : [...bookmarks, bookmarkItem];

    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

    try {
      if (!isBookmarked) {
        const response = await axios.post('http://localhost:8080/api/place/register', {
          pord: bookmarkItem.pord,
          username: user.username, // 사용자 이름을 API에 전달
        });
        console.log(`Bookmark added for pord: ${pord}`, response.data);
      }
    } catch (error) {
      console.error('Error registering bookmark:', error.response ? error.response.data : error.message);
    }
  };

  // 지역 필터링
  const filteredSubArea = selectedArea
      ? area.find((a) => a.name === selectedArea)?.subArea || []
      : [];

  return (
      <div className="results-page">
        <h2>검색 결과</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            <option value="">지역 선택</option>
            {area.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
            ))}
          </select>

          <select
              value={selectedSubArea}
              onChange={(e) => setSelectedSubArea(e.target.value)}
              disabled={!selectedArea}
          >
            <option value="">시/구/군</option>
            <option value="지역 전체">지역 전체</option>
            {filteredSubArea.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
            ))}
          </select>

          <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="키워드 검색"
          />
          <button type="submit">검색</button>
        </form>

        <ul className="results-list">
          {places.map((place) => (
              <li key={place.pord}>
                <Link to={`/place/read/${place.pord}`}>
                  <div>{place.p_name}</div>
                  <div>{place.p_category}</div>
                  <div>{place.p_address}</div>
                  <img src={place.p_image} alt={place.p_name} style={{ width: '100px' }} />
                  <div>⭐ {place.p_star}</div>
                </Link>
                <button onClick={() => toggleBookmark(place.pord)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  {bookmarks.some((bookmark) => bookmark.pord === place.pord) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="pink" stroke="black" width="24px" height="24px">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" width="24px" height="24px">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                  )}
                </button>
              </li>
          ))}
        </ul>

        <Pagination responseData={responseData} onPageChange={handlePageChange} />
      </div>
  );
}

const Pagination = ({ responseData, onPageChange }) => (
    <div className="float-end">
      <ul className="pagination">
        {responseData.prev && (
            <li className="page-item">
              <a className="page-link" onClick={() => onPageChange(responseData.page - 1)}>
                Previous
              </a>
            </li>
        )}
        {Array.from({ length: responseData.end - responseData.start + 1 }, (_, index) => {
          const pageNum = responseData.start + index;
          return (
              <li key={pageNum} className={`page-item ${responseData.page === pageNum ? 'active' : ''}`}>
                <a className="page-link" onClick={() => onPageChange(pageNum)}>
                  {pageNum}
                </a>
              </li>
          );
        })}
        {responseData.next && (
            <li className="page-item">
              <a className="page-link" onClick={() => onPageChange(responseData.page + 1)}>
                Next
              </a>
            </li>
        )}
      </ul>
    </div>
);

export default Lists;
