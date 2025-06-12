import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (storeKey, redirectPath) => {
  const localStorageValue = localStorage.getItem(storeKey);
  const sessionStorageValue = sessionStorage.getItem(storeKey);
  const value = localStorageValue || sessionStorageValue;
  const navigate = useNavigate();

  useEffect(() => {
    if (!value) {
      navigate(redirectPath, { replace: true });
    }
  }, [storeKey, redirectPath, navigate]);

  return value;
};

export default useAuthRedirect;
