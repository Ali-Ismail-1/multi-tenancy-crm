"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

function Dashboard() {
    const [user, setUser] = useState<any>(null); // User state
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check user session
    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error || !user) {
                router.push("/login");
            } else {
                setUser(user);
            }

            setLoading(false);
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert("Error logging out");
        } else {
            router.push("/login");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
            <p className="text-lg mb-4">Hello, {user?.email}</p>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;