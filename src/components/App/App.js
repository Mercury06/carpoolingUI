import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Layout from '../Layout/Layout.jsx';
import Login from './Forms/Login/Login.jsx';
//import Navbar from '../Navbar/Navbar';

// function App() {
//   return (
//     <div>
//       <Header />
//       {/* <Navbar /> */}
//       <div></div>
//     </div>
//   );
// }

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="/" exact></Route> */}
        <Route path="login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
