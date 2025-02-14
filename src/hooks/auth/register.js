import { useState } from "react";

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async ({ username, displayname, password, email }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, displayname, password, email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đăng ký thất bại");
            }

            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};

export default useRegister;
