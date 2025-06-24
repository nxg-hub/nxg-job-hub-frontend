import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (storeKey, redirectPath) => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storeValueObj =
      localStorage.getItem(storeKey) || sessionStorage.getItem(storeKey);
    if (!storeValueObj) {
      navigate(redirectPath, { replace: true });
    } else {
      setValue(storeValueObj);
    }
  }, [storeKey, redirectPath, navigate]);

  return value;
};

export default useAuthRedirect;
