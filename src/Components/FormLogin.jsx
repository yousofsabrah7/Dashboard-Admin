import { useState } from "react";
import { LockKeyhole, Mail, LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../Services/api/AuthApi";
import { setCredentials } from "../Redux/auth/authSlice.js";

const FormLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newError = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email.trim()) {
            newError.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newError.email = "Enter a valid email";
        }

        if (!form.password) {
            newError.password = "Password is required";
        } else if (form.password.length < 8) {
            newError.password = "Password must be at least 8 characters";
        }

        setError(newError);

        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();

        if (!isValid) return;

        setLoading(true);

        try {
            const result = await login(form);

            if (result.user.role !== "admin") {
                toast.error("You don't have admin access");
                return;
            }

            localStorage.setItem("token", result.token);

            dispatch(
                setCredentials({
                    user: result.user,
                    token: result.token,
                })
            );

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full px-10">
            <div className="flex justify-center flex-col items-center gap-3">
                <img
                    src="https://koda-store-dashboard.vercel.app/assets/KodaLogo2-D3eRgjLV.png"
                    width={200}
                    alt="Koda Store"
                />

                <h1 className="text-3xl font-bold text-text-primary">
                    Welcome Back
                </h1>

                <p className="text-sm text-text-muted">
                    Sign in to your admin dashboard
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">

                    {/* Email */}
                    <div className="flex flex-col gap-1 relative justify-center">
                        <Mail
                            width={22}
                            height={20}
                            className="absolute top-11 left-3 text-text-muted"
                        />

                        <label className="text-text-secondary">
                            Email Address
                        </label>

                        <input
                            name="email"
                            type="email"
                            className="px-10 py-3 bg-surface-base! text-text-primary border rounded-2xl focus:outline-none focus:border-accent"
                            placeholder="Enter your Email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        {error.email && (
                            <p className="text-red-500 text-sm">
                                {error.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2 relative">
                        <LockKeyhole
                            width={27}
                            height={20}
                            className="absolute top-12 left-2 text-text-muted"
                        />

                        <label className="text-text-secondary">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            className="px-10 py-3 bg-surface-base! text-text-primary border rounded-2xl focus:outline-none focus:border-accent"
                            placeholder="Enter your Password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        {error.password && (
                            <p className="text-red-500 text-sm">
                                {error.password}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-accent hover:bg-accent-hover disabled:opacity-70 disabled:cursor-not-allowed w-full p-3 rounded-lg text-text-primary font-semibold text-md cursor-pointer flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle
                                    size={20}
                                    className="animate-spin"
                                />
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </div>
            </form>

            <div className="flex gap-4 items-center *:text-white/60 *:text-sm">
                <div className="h-px flex-1 bg-gray-400" />
                <p className="text-sm text-gray-500">OR</p>
                <div className="h-px flex-1 bg-gray-400" />
            </div>

            <div>
                <button
                    type="button"
                    className="flex gap-2 border justify-center items-center cursor-pointer bg-surface-card border-border-subtle w-full p-3 rounded-lg text-text-primary hover:bg-surface-elevated transition font-bold"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="h-5 w-5"
                    />
                    Continue with Google
                </button>
            </div>

            <p className="text-center text-text-secondary">
                Secure Admin Access
            </p>
        </div>
    );
};

export default FormLogin;