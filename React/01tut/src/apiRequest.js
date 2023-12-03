const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw new Error("Please reload the page");
        const data = await response.json();
        return data;
    } catch (error) {
        errMsg = error.message;
    } finally {
        return errMsg;
    }
};

export default apiRequest;
