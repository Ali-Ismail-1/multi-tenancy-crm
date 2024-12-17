"use client";

import React, { useState } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleSignup = async () => {
        setLoading(true);
        setMessage("");

        const { error } = await supabase.auth.signUp({
            email,
            password
        });

        setLoading(false);

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Signup successful! Check your email to confirm your account.");
            router.push("/login");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 p-2 w-72 border rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 w-72 border rounded"
            />
            <button
                onClick={handleSignup}
                className={`p-2 w-72 text-white font-bold rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                disabled={loading}
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
        </div>
    );
}

export default Signup;
