import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
// import { login } from "./Services/api/AuthApi";

const App = () => {
  // const credentials = {
  //   email: "yousofsabrah7@gmail.com",
  //   password: "yousuf121",
  // };

  // const test = async () => {
  //   try {
  //     const result = await login(credentials);
  //     console.log("success", result);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response);
  //     console.log(error.response?.data);
  //   }
  // };

  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;