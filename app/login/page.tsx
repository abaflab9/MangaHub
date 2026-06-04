"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful!");

    router.push("/");
  }

  return (
    <main className="p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold">
          Log In
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded border p-3"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded bg-blue-600 p-3 text-white"
          >
            Log In
          </button>
        </div>
      </div>
    </main>
  );
}