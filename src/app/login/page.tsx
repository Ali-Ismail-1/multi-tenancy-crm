"use client";

import React, { useState } from 'react';
import supabase from '../../lib/supabaseClient';
import styles from "./Login.module.css";
import { useRouter } from 'next/navigation';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            alert('Logged in successfully!');
            router.push("/dashboard");
            // Optional: Redirect after login
            // window.location.href = '/dashboard';
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Login</h1>
            <input
                type="email"
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
            />
            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <button
                onClick={handleLogin}
                className={styles.button}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}

export default Login