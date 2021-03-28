function 組件寫法

propType 使用方法

axios

spinner

github api key : https://github.com/settings/applications/new
(github register application)

環境變數
.env
REACT_APP_GITHUB_CLIENT_SECRET=...
use
process.env.REACT_APP_GITHUB_CLIENT_SECRET

search component

setText = e => {
this.setState({
[e.target.name]: e.target.value,
});
};

useEffect(() => {
getUser(match.params.login);
getUserRepo(match.params.login);
// eslint-disable-next-line
}, []);

這裏會得到一個警告，要求在 array 添加一個依賴，比如 getUser，但這樣會形成一個迴圈，因此可以在上面添加一個註釋，取消 eslint 的警告 ( //eslint-disable-next-line)

重構爲使用 useContext 作數據管理
