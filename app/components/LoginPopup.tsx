"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2, Mail, Lock, Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = "login" | "signup" | "otp";

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

// Slide variants
const slideVariants = {
  enterFromRight: { x: 40, opacity: 0 },
  enterFromLeft: { x: -40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -40, opacity: 0 },
  exitToRight: { x: 40, opacity: 0 },
};

export default function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const [view, setView] = useState<View>("login");
  const [direction, setDirection] = useState<1 | -1>(1);

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

  // — OTP state —
  const [otpCode, setOtpCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (!isOpen) resetAll();
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  function resetAll() {
    setView("login");
    setDirection(1);
    setLoginEmail(""); setLoginPassword(""); setShowLoginPw(false);
    setFullName(""); setSignupEmail(""); setSignupPassword("");
    setConfirmPassword(""); setShowSignupPw(false); setShowConfirmPw(false);
    setPwMismatch(false); setLoading(false);
    setOtpCode(""); setTimer(0);
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
    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      onClose();
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Login failed.");
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
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      setDirection(1);
      setView("otp");
      setTimer(60);
      setIsResendDisabled(true);
    } catch (err: any) {
      alert(err.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResendDisabled) return;
    setLoading(true);
    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.resend({ type: 'signup', email: signupEmail });
      if (error) throw error;
      setTimer(60);
      setIsResendDisabled(true);
      alert("Verification code resent!");
    } catch (err: any) {
      alert(err.message || "Failed to resend.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;
    setLoading(true);
    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email: signupEmail,
        token: otpCode,
        type: 'signup',
      });
      if (error) throw error;
      alert("Account verified! Welcome.");
      onClose();
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const loginValid = loginEmail.length > 0 && loginPassword.length >= 6;
  const signupValid = fullName.trim().length > 1 && signupEmail.length > 0 && signupPassword.length >= 6;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-11000 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/55 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-[360px] bg-white rounded-2xl overflow-hidden z-11010"
          >
            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10">
              <X className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              {view === "login" ? (
                <motion.div key="login" initial={direction === -1 ? slideVariants.enterFromLeft : slideVariants.enterFromRight} animate={slideVariants.center} exit={direction === -1 ? slideVariants.exitToRight : slideVariants.exitToLeft} transition={{ duration: 0.22, ease: "easeInOut" }} className="px-6 pt-5 pb-6 flex flex-col items-center">
                  <div className="mb-4">
                    <Image src="/logo.webp" alt="Logo" width={110} height={34} className="object-contain" />
                  </div>
                  <h2 className="text-[17px] font-bold text-[#191974] mb-1">Welcome back</h2>
                  <p className="text-[12px] text-gray-400 mb-5 text-center lowercase">Sign in to continue</p>
                  
                  <form onSubmit={handleLogin} className="w-full space-y-3">
                    <InputField icon={<Mail className="w-4 h-4" />} type="email" value={loginEmail} onChange={setLoginEmail} placeholder="Email" autoFocus required />
                    <InputField icon={<Lock className="w-4 h-4" />} type={showLoginPw ? "text" : "password"} value={loginPassword} onChange={setLoginPassword} placeholder="Password" required rightSlot={
                      <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} className="text-gray-300 hover:text-gray-500 transition-colors">
                        {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    } />
                    <div className="flex justify-end">
                      <a href="#" className="text-[11px] font-semibold text-[#191974] hover:text-[#ee2229]">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={loading || !loginValid} className="w-full h-[44px] bg-[#ee2229] hover:bg-[#191974] disabled:bg-gray-200 text-white font-bold rounded-xl text-[13px] transition-all flex items-center justify-center gap-2 mt-1">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                    </button>
                  </form>
                  <div className="w-full flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[10px] font-semibold text-gray-300 uppercase">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                  <p className="text-[12px] text-gray-400 text-center">Don&apos;t have an account? <button type="button" onClick={goToSignup} className="font-bold text-[#191974] hover:text-[#ee2229] underline transition-colors">Create account</button></p>
                </motion.div>
              ) : view === "signup" ? (
                <motion.div key="signup" initial={direction === 1 ? slideVariants.enterFromRight : slideVariants.enterFromLeft} animate={slideVariants.center} exit={direction === 1 ? slideVariants.exitToLeft : slideVariants.exitToRight} transition={{ duration: 0.22, ease: "easeInOut" }} className="px-6 pt-5 pb-6 flex flex-col items-center">
                  <div className="mb-4">
                    <Image src="/logo.webp" alt="Logo" width={110} height={34} className="object-contain" />
                  </div>
                  <h2 className="text-[17px] font-bold text-[#191974] mb-1">Create account</h2>
                  <p className="text-[12px] text-gray-400 mb-5 text-center">Join Madura Travel</p>
                  
                  <form onSubmit={handleSignup} className="w-full space-y-3">
                    <InputField icon={<User className="w-4 h-4" />} type="text" value={fullName} onChange={setFullName} placeholder="Full name" autoFocus required />
                    <InputField icon={<Mail className="w-4 h-4" />} type="email" value={signupEmail} onChange={setSignupEmail} placeholder="Email" required />
                    <InputField icon={<Lock className="w-4 h-4" />} type={showSignupPw ? "text" : "password"} value={signupPassword} onChange={setSignupPassword} placeholder="Password" required rightSlot={
                      <button type="button" onClick={() => setShowSignupPw(!showSignupPw)} className="text-gray-300 hover:text-gray-500 transition-colors">
                        {showSignupPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    } />
                    <div>
                      <InputField icon={<Lock className="w-4 h-4" />} type={showConfirmPw ? "text" : "password"} value={confirmPassword} onChange={(v) => { setConfirmPassword(v); setPwMismatch(false); }} placeholder="Confirm password" required rightSlot={
                        <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="text-gray-300 hover:text-gray-500 transition-colors">
                          {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      } />
                      {pwMismatch && <p className="text-[11px] text-[#ee2229] mt-1 pl-1">Passwords do not match.</p>}
                    </div>
                    <button type="submit" disabled={loading || !signupValid} className="w-full h-[44px] bg-[#ee2229] hover:bg-[#191974] disabled:bg-gray-200 text-white font-bold rounded-xl text-[13px] transition-all flex items-center justify-center gap-2 mt-1">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                    </button>
                  </form>
                  <p className="text-[12px] text-gray-400 text-center mt-5">Already have an account? <button type="button" onClick={goToLogin} className="font-bold text-[#191974] hover:text-[#ee2229] underline transition-colors">Sign in</button></p>
                </motion.div>
              ) : (
                <motion.div key="otp" initial={slideVariants.enterFromRight} animate={slideVariants.center} exit={slideVariants.exitToLeft} transition={{ duration: 0.22, ease: "easeInOut" }} className="px-6 pt-5 pb-6 flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#191974]/5 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-7 h-7 text-[#191974]" />
                  </div>
                  <h2 className="text-[17px] font-bold text-[#191974] mb-1">Verify it&apos;s you</h2>
                  <p className="text-[12px] text-gray-400 mb-6 text-center leading-relaxed">Verification code sent to <br/><span className="font-bold text-[#191974]">{signupEmail}</span></p>
                  <form onSubmit={handleVerifyOtp} className="w-full space-y-4">
                    <input required type="text" maxLength={6} value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))} placeholder="Enter code" autoFocus
                      className="w-full h-[54px] text-center text-[24px] font-bold tracking-[0.3em] text-[#191974] bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#191974] focus:bg-white transition-all" />
                    <button type="submit" disabled={loading || otpCode.length !== 6} className="w-full h-[48px] bg-[#ee2229] hover:bg-[#191974] disabled:bg-gray-200 text-white font-bold rounded-xl text-[14px] transition-all flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Account"}
                    </button>
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-[12px] text-gray-400">Didn&apos;t receive the code?</p>
                    <button type="button" disabled={isResendDisabled || loading} onClick={handleResendOtp}
                      className={`text-[13px] font-bold mt-1 transition-colors ${isResendDisabled ? "text-gray-300" : "text-[#191974] hover:text-[#ee2229] underline"}`}>
                      {isResendDisabled ? `Resend in ${timer}s` : "Resend code"}
                    </button>
                  </div>
                  <button type="button" onClick={goToSignup} className="mt-6 text-[11px] font-bold text-gray-400 hover:text-[#191974]">← Back to signup</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
