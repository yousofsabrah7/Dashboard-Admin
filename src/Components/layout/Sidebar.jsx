import React from "react";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    LogOut,
} from "lucide-react";

const Sidebar = () => {
    return
    <div>
        <aside>
            <div>
                <p>Commerce</p>
                <p>Admin Panel</p>
            </div>
            <div>

                <ul>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Users</a></li>
                    <li><a href="">Products</a></li>
                    <li><a href="">Add product</a></li>
                    <li><a href="">Orders</a></li>
                    <li><a href="">WishList</a></li>
                    <li><a href="">Settings</a></li>
                </ul>
                <div>
                    <p>live</p>
                    <p>Connected to the E-commerce API</p>
                </div>
            </div>

        </aside>
    </div>;
};

export default Sidebar;
