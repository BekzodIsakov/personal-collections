import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

// import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <Routes />
    </>
    /* // <Routes>
    //   <Route element={<ProtectedRoute />}>
    //     <Route path='/' element={<div>Main page</div>} />
    //     <Route path='/me' element={<div>My page</div>} />
    //   </Route>
    //   <Route path='/login' element={<div>Login</div>} />
    //   <Route path='/register' element={<div>Register</div>} />
    //   <Route path='*' element={<h3>Page you are looking not found: 404!</h3>} />
    // </Routes> */
  );
}

export default App;
