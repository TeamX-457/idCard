"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const { login, registerSchool } = useAuth();
  const [form, setForm] = useState({ schoolName: "", adminName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!form.email || !form.password || (isRegister && (!form.schoolName || !form.adminName))) {
      setError("Fill in all required fields.");
      return;
    }
    if (isRegister && form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        await registerSchool(form);
      } else {
        await login({ email: form.email, password: form.password });
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1fr_520px]">
      <section className="hidden border-r border-outline-variant bg-surface-container-lowest p-10 lg:flex lg:flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">SmartTrack IoT</h1>
            <p className="text-sm font-semibold text-on-surface-variant">Campus ID and attendance control</p>
          </div>
        </div>
        <div className="mt-auto max-w-xl">
          <p className="font-display text-4xl font-semibold leading-tight text-on-surface">Operational visibility for school access, cards, devices, and attendance.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {["Live scans", "Card lifecycle", "Reader health"].map((item) => (
              <div className="rounded-xl border border-outline-variant bg-surface p-4 text-sm font-semibold text-on-surface-variant" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center p-4">
        <form className="w-full max-w-md rounded-xl border border-outline-variant bg-white p-6 shadow-sm" onSubmit={submit}>
          <h2 className="font-display text-2xl font-semibold text-on-surface">{isRegister ? "Register school" : "Sign in"}</h2>
          <p className="mt-1 text-sm text-on-surface-variant">{isRegister ? "Create a school administrator account." : "Use your school administrator credentials."}</p>
          <div className="mt-6 space-y-4">
            {isRegister ? (
              <>
                <label className="block">
                  <span className="label">School name</span>
                  <input className="field mt-1" name="schoolName" value={form.schoolName} onChange={update} />
                </label>
                <label className="block">
                  <span className="label">Admin name</span>
                  <input className="field mt-1" name="adminName" value={form.adminName} onChange={update} />
                </label>
              </>
            ) : null}
            <label className="block">
              <span className="label">Email</span>
              <input className="field mt-1" name="email" type="email" value={form.email} onChange={update} />
            </label>
            <label className="block">
              <span className="label">Password</span>
              <input className="field mt-1" name="password" type="password" value={form.password} onChange={update} />
            </label>
          </div>
          {error ? <p className="mt-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container">{error}</p> : null}
          <button className="btn-primary mt-6 w-full" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Create school" : "Sign in"}
          </button>
          <p className="mt-4 text-center text-sm text-on-surface-variant">
            {isRegister ? "Already registered?" : "Need a school account?"}{" "}
            <Link className="font-semibold text-primary" href={isRegister ? "/login" : "/register"}>
              {isRegister ? "Sign in" : "Register school"}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
