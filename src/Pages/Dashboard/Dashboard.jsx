import { useEffect } from "react";
import { api } from "../../Config/ApiClient";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const testRequest = async () => {
      try {
        const response = await api.get("/products");
        console.log(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    testRequest();
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    dispatch(logout())
    navigate("/login")
  }
  return(<div>
    Dashboard
    <button onClick={handleLogout}>logout</button>
  </div>)
};

export default Dashboard;