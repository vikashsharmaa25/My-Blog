"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { loginUser, userRegister } from "@/apis/auth-apis";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/slice/authSlice";
import { handleError, handleSuccess } from "@/utils/response-handler";
import { isValidEmail, isValidPhone, getPasswordStrength } from "@/common/validation";
import Lottie from "lottie-react";
import AuthLottie from "../../../public/lottie/auth.json";
import { EyeClosedIcon, EyeIcon, MoveLeft } from "lucide-react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const initialTab = modeParam === "signup" ? 1 : 0;
  const [tab, setTab] = useState<number>(initialTab);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const switchToLogin = () => {
    setTab(0);
    router.replace(`/auth?mode=login`, { scroll: false });
  };

  const switchToSignup = () => {
    setTab(1);
    router.replace(`/auth?mode=signup`, { scroll: false });
  };

  return (
    <Box className="min-h-screen flex">
      {/* Left Side - Lottie */}
      <Box className="hidden md:flex flex-1 items-center justify-center bg-[rgba(229,232,255,.431372549)] p-5">
        <Box className="w-full max-w-[500px]">
          <Lottie animationData={AuthLottie} loop={true} />
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box className="flex-1 flex items-center justify-center p-6 relative">
        {/* Back Button */}
        <a href="/" className="absolute top-0 left-6 mt-3">
          <IconButton className="text-slate-500">
            <MoveLeft />
          </IconButton>
        </a>

        <Box className="w-full max-w-[600px]">
          {/* Logo */}
          <Typography variant="h4" className="font-bold text-slate-800 mb-6">
            🎨
          </Typography>
          <>
            {tab === 0 ? (
              <LoginForm
                onLoggedIn={(payload) => dispatch(loginSuccess(payload))}
                onSwitchToSignup={switchToSignup}
              />
            ) : (
              <SignupForm
                onSuccess={switchToLogin}
                onSwitchToLogin={switchToLogin}
              />
            )}
          </>
        </Box>
      </Box>
    </Box>
  );
}

/* ---------------------- LOGIN FORM ---------------------- */
function LoginForm({
  onLoggedIn,
  onSwitchToSignup,
}: {
  onLoggedIn: (p: any) => void;
  onSwitchToSignup: () => void;
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const canSubmit = identifier.trim() !== "" && password.trim() !== "";
  const identifierValid = isValidEmail(identifier) || isValidPhone(identifier);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !identifierValid) return;

    setLoading(true);
    try {
      const res = await loginUser(identifier, password);
      
      // Redux state update immediately (synchronous)
      onLoggedIn({ user: res.user, accessToken: res.accessToken });
      
      // Use startTransition for non-blocking navigation
      startTransition(() => {
        router.push("/");
      });
      
      // Show success message after navigation starts
      handleSuccess(res?.message || "Login successful");
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography
        variant="overline"
        className="text-slate-500 text-xs font-semibold"
      >
        WELCOME BACK
      </Typography>
      <Typography variant="h4" className="font-bold text-slate-800 mb-1">
        Log in to your account
      </Typography>
      <span className="text-slate-700 mb-4">
        Don't have an account?
        <Link
          component="button"
          onClick={onSwitchToSignup}
          className="text-blue-500 font-semibold no-underline ml-2"
        >
          Sign Up
        </Link>
      </span>

      <Stack spacing={1.5} className="mt-10">
        <TextField
          label="Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          fullWidth
          variant="filled"
          slotProps={{ input: { disableUnderline: true } }}
          autoComplete="username"
          className="bg-slate-50 rounded-lg"
          error={!!identifier && !identifierValid}
          required
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="filled"
          required
          className="bg-slate-50 rounded-lg"
          slotProps={{
            input: {
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Stack className="mt-10">
        <Button
          type="submit"
          variant="contained"
          disabled={!canSubmit || !identifierValid || loading || isPending}
          className="primary_button"
        >
          {loading || isPending ? "Logging in..." : "Log In"}
        </Button>
      </Stack>
    </Box>
  );
}

/* ---------------------- SIGNUP FORM ---------------------- */
function SignupForm({
  onSuccess,
  onSwitchToLogin,
}: {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}) {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailOk = isValidEmail(form.email);
  const phoneOk = isValidPhone(form.mobile);
  const pwdStrength = getPasswordStrength(form.password);
  const passwordsMatch =
    form.password.length >= 6 && form.password === form.confirmPassword;
  const canSubmit = Boolean(
    form.username && form.fullName && emailOk && phoneOk && passwordsMatch
  );

  const setField = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const res = await userRegister({
        username: form.username,
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        profileImage: null,
      });
      handleSuccess(res?.message || "Account created");
      onSuccess();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography
        variant="overline"
        className="text-slate-500 text-xs font-semibold"
      >
        START FOR FREE
      </Typography>
      <Typography variant="h4" className="font-bold text-slate-800 mb-1">
        Create new account
      </Typography>
      <span className="text-slate-700 my-6">
        Already a member?
        <Link
          component="button"
          onClick={onSwitchToLogin}
          className="text-blue-500 font-bold no-underline ml-2"
        >
          Log In
        </Link>
      </span>

      <Stack spacing={1.5} className="mt-10">
        <Stack direction="row" spacing={2}>
          <TextField
            label="Username *"
            value={form.username}
            onChange={(e) => setField("username", e.target.value)}
            fullWidth
            variant="filled"
            slotProps={{ input: { disableUnderline: true } }}
            className="bg-slate-50 rounded-lg"
          />
          <TextField
            label="Full Name *"
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            fullWidth
            variant="filled"
            slotProps={{ input: { disableUnderline: true } }}
            className="bg-slate-50 rounded-lg"
          />
        </Stack>

        <TextField
          label="Email Address *"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          fullWidth
          variant="filled"
          error={!!form.email && !emailOk}
          className="bg-slate-50 rounded-lg"
          slotProps={{
            input: {
              disableUnderline: true,
              endAdornment:
                emailOk && form.email ? (
                  <InputAdornment position="end">
                    <Box className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                      ✓
                    </Box>
                  </InputAdornment>
                ) : undefined,
            },
          }}
        />

        <TextField
          label="Mobile Number"
          value={form.mobile}
          onChange={(e) => setField("mobile", e.target.value)}
          fullWidth
          variant="filled"
          error={!!form.mobile && !phoneOk}
          slotProps={{ input: { disableUnderline: true } }}
          className="bg-slate-50 rounded-lg"
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Password *"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            fullWidth
            variant="filled"
            className="bg-slate-50 rounded-lg"
            slotProps={{
              input: {
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            error={!!form.password && pwdStrength.score === 0}
            helperText={
              form.password
                ? (
                    <span style={{
                      color:
                        pwdStrength.label === "strong" ? "#16a34a" :
                        pwdStrength.label === "good" ? "#f59e0b" :
                        pwdStrength.label === "weak" ? "#ef4444" : "#ef4444",
                    }}>
                      {pwdStrength.label === "too short" ? "too short" : pwdStrength.label}
                    </span>
                  )
                : undefined
            }
          />

          <TextField
            label="Confirm Password *"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
            fullWidth
            variant="filled"
            error={!!form.confirmPassword && !passwordsMatch}
            className="bg-slate-50 rounded-lg"
            slotProps={{
              input: {
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Stack>

      <Stack className="mt-10">
        <Button
          type="submit"
          variant="contained"
          disabled={!canSubmit || loading}
          className="primary_button"
        >
          {loading ? "Creating..." : "Register"}
        </Button>
      </Stack>
    </Box>
  );
}