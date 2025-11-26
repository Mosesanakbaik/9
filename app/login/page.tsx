"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      alert("Email atau password salah!");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
