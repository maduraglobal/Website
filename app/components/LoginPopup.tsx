"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Loader2, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = "login" | "signup";

// Shared input wrapper with icon
function InputField({
  icon,
  type,
  value,
  onChange,
  placeholder,
  autoFocus,
  required,
  rightSlot,
}: {
  icon: React.ReactNode;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoFocus?: boolean;
  required?: boolean;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
        {icon}
      </span>
      <input
        required={required}
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[44px] pl-9 pr-10 text-[13px] font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#191974] focus:bg-white transition-all placeholder:text-gray-300"
      />
      {rightSlot && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightSlot}
        </span>
      )}
    </div>
  );
}

// Slide variants — login slides out left, signup enters from right (and vice-versa)
const slideVariants = {
  enterFromRight: { x: 40, opacity: 0 },
  enterFromLeft: { x: -40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -40, opacity: 0 },
  exitToRight: { x: 40, opacity: 0 },
};

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const [view, setView] = useState<View>("login");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward to signup, -1 = back to login

  // — login state —
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  // — signup state —
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwMismatch, setPwMismatch] = useState(false);

  const [loading, setLoading] = useState(false);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (!isOpen) resetAll();
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  function resetAll() {
    setView("login");
    setDirection(1);
    setLoginEmail(""); setLoginPassword(""); setShowLoginPw(false);
    setFullName(""); setSignupEmail(""); setSignupPassword("");
    setConfirmPassword(""); setShowSignupPw(false); setShowConfirmPw(false);
    setPwMismatch(false); setLoading(false);
  }

  function goToSignup() {
    setDirection(1);
    setView("signup");
  }

  function goToLogin() {
    setDirection(-1);
    setView("login");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPwMismatch(false);

    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      // Success
      onClose();
      window.location.reload(); // Refresh to update auth state globally
    } catch (err: any) {
      alert(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      setPwMismatch(true);
      return;
    }
    setPwMismatch(false);
    setLoading(true);

    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      alert("Check your email for the confirmation link!");
      onClose();
    } catch (err: any) {
      alert(err.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  const loginValid = loginEmail.length > 0 && loginPassword.length >= 6;
  const signupValid =
    fullName.trim().length > 1 &&
    signupEmail.length > 0 &&
    signupPassword.length >= 6 &&
    confirmPassword.length >= 6;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 backdrop-blur-sm"
          />

          {/* Modal Card — fixed size, never resizes */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-[360px] bg-white rounded-2xl overflow-hidden z-[11010]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Sliding inner panel — AnimatePresence keeps height stable */}
            <AnimatePresence mode="wait" initial={false}>
              {view === "login" ? (
                <motion.div
                  key="login"
                  initial={direction === -1 ? slideVariants.enterFromLeft : slideVariants.enterFromRight}
                  animate={slideVariants.center}
                  exit={direction === -1 ? slideVariants.exitToRight : slideVariants.exitToLeft}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="px-6 pt-5 pb-6 flex flex-col items-center"
                >
                  {/* Logo */}
                  <div className="mb-4">
                    <Image src="/logo.webp" alt="Madura Travel" width={110} height={34} className="object-contain" />
                  </div>

                  <h2 className="text-[17px] font-bold text-[#191974] tracking-tight mb-1">
                    Welcome back
                  </h2>
                  <p className="text-[12px] text-gray-400 mb-5 text-center">
                    Sign in to continue to Madura Travel
                  </p>

                  <form onSubmit={handleLogin} className="w-full space-y-3">
                    <InputField
                      icon={<Mail className="w-4 h-4" />}
                      type="email"
                      value={loginEmail}
                      onChange={setLoginEmail}
                      placeholder="Email address"
                      autoFocus
                      required
                    />

                    <InputField
                      icon={<Lock className="w-4 h-4" />}
                      type={showLoginPw ? "text" : "password"}
                      value={loginPassword}
                      onChange={setLoginPassword}
                      placeholder="Password"
                      required
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowLoginPw(!showLoginPw)}
                          className="text-gray-300 hover:text-gray-500 transition-colors"
                          aria-label={showLoginPw ? "Hide password" : "Show password"}
                        >
                          {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />

                    <div className="flex justify-end">
                      <a href="#" className="text-[11px] font-semibold text-[#191974] hover:text-[#ee2229] transition-colors">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !loginValid}
                      className="w-full h-[44px] bg-[#ee2229] hover:bg-[#191974] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl text-[13px] tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="w-full flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  <p className="text-[12px] text-gray-400 text-center">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={goToSignup}
                      className="font-bold text-[#191974] hover:text-[#ee2229] underline underline-offset-2 transition-colors"
                    >
                      Create a new account
                    </button>
                  </p>

                  <p className="text-[10px] text-gray-300 text-center mt-3 leading-relaxed">
                    By signing in you agree to our{" "}
                    <a href="#" className="underline text-gray-400 font-semibold">Terms of Use</a>
                    {" "}&amp;{" "}
                    <a href="#" className="underline text-gray-400 font-semibold">Privacy Policy</a>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={direction === 1 ? slideVariants.enterFromRight : slideVariants.enterFromLeft}
                  animate={slideVariants.center}
                  exit={direction === 1 ? slideVariants.exitToLeft : slideVariants.exitToRight}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="px-6 pt-5 pb-6 flex flex-col items-center"
                >
                  {/* Logo */}
                  <div className="mb-4">
                    <Image src="/logo.webp" alt="Madura Travel" width={110} height={34} className="object-contain" />
                  </div>

                  <h2 className="text-[17px] font-bold text-[#191974] tracking-tight mb-1">
                    Create account
                  </h2>
                  <p className="text-[12px] text-gray-400 mb-5 text-center">
                    Join Madura Travel and start exploring
                  </p>

                  <form onSubmit={handleSignup} className="w-full space-y-3">
                    <InputField
                      icon={<User className="w-4 h-4" />}
                      type="text"
                      value={fullName}
                      onChange={setFullName}
                      placeholder="Full name"
                      autoFocus
                      required
                    />

                    <InputField
                      icon={<Mail className="w-4 h-4" />}
                      type="email"
                      value={signupEmail}
                      onChange={setSignupEmail}
                      placeholder="Email address"
                      required
                    />

                    <InputField
                      icon={<Lock className="w-4 h-4" />}
                      type={showSignupPw ? "text" : "password"}
                      value={signupPassword}
                      onChange={setSignupPassword}
                      placeholder="Password"
                      required
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowSignupPw(!showSignupPw)}
                          className="text-gray-300 hover:text-gray-500 transition-colors"
                          aria-label={showSignupPw ? "Hide password" : "Show password"}
                        >
                          {showSignupPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />

                    <div>
                      <InputField
                        icon={<Lock className="w-4 h-4" />}
                        type={showConfirmPw ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(v) => { setConfirmPassword(v); setPwMismatch(false); }}
                        placeholder="Confirm password"
                        required
                        rightSlot={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPw(!showConfirmPw)}
                            className="text-gray-300 hover:text-gray-500 transition-colors"
                            aria-label={showConfirmPw ? "Hide password" : "Show password"}
                          >
                            {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        }
                      />
                      {pwMismatch && (
                        <p className="text-[11px] text-[#ee2229] mt-1 pl-1">Passwords do not match.</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !signupValid}
                      className="w-full h-[44px] bg-[#ee2229] hover:bg-[#191974] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl text-[13px] tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="w-full flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  <p className="text-[12px] text-gray-400 text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={goToLogin}
                      className="font-bold text-[#191974] hover:text-[#ee2229] underline underline-offset-2 transition-colors"
                    >
                      Sign in
                    </button>
                  </p>

                  <p className="text-[10px] text-gray-300 text-center mt-3 leading-relaxed">
                    By creating an account you agree to our{" "}
                    <a href="#" className="underline text-gray-400 font-semibold">Terms of Use</a>
                    {" "}&amp;{" "}
                    <a href="#" className="underline text-gray-400 font-semibold">Privacy Policy</a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
