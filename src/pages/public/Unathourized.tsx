import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";


const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Auto-redirect after a few seconds
    const timer = setTimeout(() => {
      navigate('/login')
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="bg-white shadow-lg p-6 rounded-2xl max-w-md">
        <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>
        <Button
          className="mt-6 w-full bg-red-500 hover:bg-red-600"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
