import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = {
    data() {
        return {
            api_Url: 'https://ec-course-api.hexschool.io/v2',
            api_Path: 'chinging',
            products: []
        }
    },
    methods: {
        checkUser(){
            axios.post(`${this.api_Url}/api/user/check`)
                .then((res) => {
                    console.log(res.data);
                    console.log("使用者驗證正確");
                    this.getProducts()
                }).catch((err) => {
                    console.log(err.response);
                    console.log("使用者驗證失敗");
                });
        },
        getProducts(){
            axios.get(`${this.api_Url}/api/${this.api_Path}/admin/products/all`)
                .then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                });
        }
        
    },
    mounted() {
        axios.defaults.headers.common['Authorization'] = document.cookie.split('=')[1]
        this.checkUser()
    },
}


createApp(app).mount('#app')