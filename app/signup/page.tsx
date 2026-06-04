"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created! Check your email for a confirmation link."
    );
  }

  return (
    <main className="p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold">
          Create Account
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
            onClick={handleSignup}
            className="w-full rounded bg-blue-600 p-3 text-white"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}