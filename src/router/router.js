import App from '../App'
import camera from "../components/camera";
import personalInfo from "../components/personalInfo";
export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        name: 'personalInfo',
        component: personalInfo

    },
      {
        path: '/camera',
        name:'camera',
        component: camera,
      }]
}]
