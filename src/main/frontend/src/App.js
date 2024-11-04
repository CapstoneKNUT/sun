import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderPage from '../src/components/menus/Header.js';
import Main from './pages/Main/Main.js';
import Lists from './pages/place/Lists.js';
import Read from './pages/place/Read.js';
import StoreLists from './Store/StoreLists.js';
import StoreRead from './Store/StoreRead.js';
import LoginForm from './pages/member/LoginForm.js';
import UserProfile from './pages/member/UserProfile.js';
import { UserProvider } from './pages/member/UserContext.js';
import JoinForm from './pages/member/JoinForm.js';
import Modify from './pages/member/Modify.js';

function App() {
    return (
        <UserProvider>
            <Router>
                <HeaderPage />
                <Routes>
                    <Route path="/member" element={<LoginForm />} />
                    <Route path="/member/join" element={<JoinForm />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/place/list" element={<Lists />} />
                    <Route path="/place/read/:pord" element={<Read />} />
                    <Route path="/store/list" element={<StoreLists />} />
                    <Route path="/store/read/:sno" element={<StoreRead />} />
                    <Route path="/member/profile" element={<UserProfile />} />
                    <Route path="/member/modify" element={<Modify />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
