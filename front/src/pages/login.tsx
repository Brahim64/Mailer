import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { googleLogin } from "@/services/authService";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loginWithGoogle = async (credential: string) => {
    try {
      
      googleLogin({ credential }).then(
        res=> {
          console.log(res.message);
          navigate('/messages');
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
      console.error(err);
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    setIsLoading(true);
    setError(null);
    try {
      loginWithGoogle(credentialResponse.credential);
      // TODO: Redirect to dashboard after successful login
    } catch (err) {
      setError("Failed to process login. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    console.error("Login Failed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mailer</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="300"
            />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Email Login Option */}
          <button
            disabled={isLoading}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign in with Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
