import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Layout from '../Layout/Layout.jsx';
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
        {/* <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/page-one">
          <PageOne />
        </Route>
        <Route path="/page-two">
          <PageTwo />
        </Route>
        <Route path="/page-three">
          <PageThree />
        </Route> */}
      </Routes>
    </Layout>
  );
}

export default App;
