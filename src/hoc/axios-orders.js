import axios from 'axios';
const instance=axios.create({
    baseURL:'https://burgerbuilder-react-5566d.firebaseio.com/'
});
export default instance;