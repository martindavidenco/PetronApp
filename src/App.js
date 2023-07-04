import NavApp from './components/NavApp/NavApp';
import Main from './components/main/Main';
import Chat from './components/Chat/Chat';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatHistory from './components/ChatHistory/ChatHistory';
import Register from './components/Register/Register';
import { UserProvider } from "./context/UserProvider";
import Footer from './components/Footer/Footer';
import Quien from "./components/Quien/Quien";
import Preguntas from './components/Preguntas/Preguntas';
import Profile from './components/Profile/Profile';

import ChatHistoryDetail from './components/ChatHistoryDetail/ChatHistoryDetail';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <NavApp></NavApp>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chatHistory' element={<Profile />} />
          <Route path='/quien' element={<Quien />} />
          <Route path='/preguntas' element={<Preguntas />} />
      
          <Route path='/chatHistory/:id' element={<ChatHistoryDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;