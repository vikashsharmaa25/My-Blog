"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/apis/auth-apis";
import { handleError, handleSuccess } from "@/utils/response-handler";
import { loginSuccess } from "@/slice/authSlice";
import { isValidEmail } from "@/common/validation";

const LoginPage: React.FC<any> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isEmailValid = isValidEmail(email);

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/");
      onSuccess?.();
    }
  }, [user, router, onSuccess]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (isLoading) return;
    if (!isEmailValid) {
      handleError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      handleSuccess(response?.message);
      dispatch(
        loginSuccess({ user: response.user, accessToken: response.accessToken })
      );
    } catch (error: any) {
      handleError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow border">
          <Lock className="w-8 h-8 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-700">Sign in to your account to continue</p>
      </div>

      {/* Login form */}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-12 pr-12 py-3  text-gray-700 border border-gray-700 rounded-xl placeholder-gray-700 transition-all duration-300 outline-none"
            required
            autoComplete="email"
            inputMode="email"
            aria-label="Email address"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-12 pr-12 py-3  text-gray-700 border border-gray-700 rounded-xl placeholder-gray-700 transition-all duration-300 outline-none"
            required
            autoComplete="current-password"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || !isEmailValid || !password}
          className="w-full text-white bg-blue-500 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
