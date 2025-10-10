import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { div } from "motion/react-client";

export default function OTP({
  email = "",
  length = 4,
  onVerify = (code) => console.log("Verify called:", code),
  onResend = () => console.log("Resend OTP"),
  verifyLabel = "Verify",
}) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // start countdown when component mounts
    setTimer(60);
    const t = setInterval(() => {
      setTimer((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const focusNext = (index) => {
    if (index < length - 1) inputsRef.current[index + 1].focus();
  };
  const focusPrev = (index) => {
    if (index > 0) inputsRef.current[index - 1].focus();
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value;
    // only digits
    const char = raw.replace(/[^0-9]/g, "");
    if (!char) return;

    const newVals = [...values];
    // if user pasted more than one char, distribute
    if (char.length > 1) {
      for (let i = 0; i < char.length && idx + i < length; i++) {
        newVals[idx + i] = char[i];
      }
      setValues(newVals);
      const nextPos = Math.min(length - 1, idx + char.length - 1);
      inputsRef.current[nextPos].focus();
      return;
    }

    newVals[idx] = char;
    setValues(newVals);
    focusNext(idx);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx]) {
        // clear current
        const newVals = [...values];
        newVals[idx] = "";
        setValues(newVals);
      } else {
        focusPrev(idx);
      }
    } else if (e.key === "ArrowLeft") {
      focusPrev(idx);
    } else if (e.key === "ArrowRight") {
      focusNext(idx);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "");
    if (!digits) return;
    const newVals = [...values];
    for (let i = 0; i < digits.length && i < length; i++) {
      newVals[i] = digits[i];
    }
    setValues(newVals);
    const pos = Math.min(length - 1, digits.length - 1);
    inputsRef.current[pos].focus();
  };

  const submit = async () => {
    const code = values.join("");
    if (code.length !== length) {
      setError("Please enter the full OTP.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await Promise.resolve(onVerify(code));
    } catch (err) {
      setError(err?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(60);
    try {
      await Promise.resolve(onResend());
    } catch (err) {
      setError(err?.message || "Could not resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white/80  rounded-2xl shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Enter verification code</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            We sent a {length}-digit code to{" "}
            <span className="font-medium">{email || "your email"}</span>.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 justify-center mb-3"
        >
          {Array.from({ length }).map((_, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center rounded-lg border border-slate-300 focus:border-slate-500 focus:ring-0 text-xl bg-transparent"
              value={values[i]}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </motion.div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2 rounded-lg shadow-sm text-white bg-gradient-to-r from-slate-700 to-slate-900 disabled:opacity-50"
          >
            {loading ? "Verifying..." : verifyLabel}
          </button>

          <div className="text-right text-sm">
            {timer > 0 ? (
              <p className="text-slate-600">
                Resend in <span className="font-medium">{timer}s</span>
              </p>
            ) : (
              <button onClick={handleResend} className="underline text-sm">
                Resend
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          <p>
            Didn't get the code? Check your spam folder or request a new one.
            For accessibility, you can also paste the code into any of the
            boxes.
          </p>
        </div>
      </div>
    </div>
  );
}
