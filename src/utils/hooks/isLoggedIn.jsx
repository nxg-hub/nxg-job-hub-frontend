const isLoggedIn = () => {
    const storedAuthKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') || window.sessionStorage.getItem('NXGJOBHUBLOGINKEYV1');
    return !!storedAuthKey; // Returns true if storedAuthKey is truthy, otherwise false
};

export default isLoggedIn;
