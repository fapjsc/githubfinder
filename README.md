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
