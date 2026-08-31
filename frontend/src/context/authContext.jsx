import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Deployed backend URL
const API_URL = 'https://ems-backend-brown.vercel.app';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await axios.get(
                        `${API_URL}/api/auth/verify`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                        localStorage.removeItem('token');
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Authentication verification failed:', error);
                setUser(null);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;