import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let productModal = null;
let delProductModal = null;
const app = {
    data() {
        return {
            api_Url: 'https://ec-course-api.hexschool.io/v2',
            api_Path: 'chinging',
            products: [], 
            modalProduct: '',
            newModalProduct: ''
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
                    console.log(res.data.products);
                    this.products = res.data.products
                }).catch((err) => {
                    console.log(err);
                });
        },
        openModal(state, item){
            if (state === 'isNew'){
                this.modalProduct = ''
                productModal.show()
            }else if (state === 'edit'){
                this.modalProduct = item
                productModal.show()
            }else if (state === 'del'){
                this.modalProduct = item
                delProductModal.show()
            }
        },
        updateProduct(state, id){
            if (state === 'isNew'){
                
                // axios.post(`${this.api_Url}/v2/api/${this.api_Path}/admin/product`, {data: temp})
            
            }else if (state === 'edit'){
                this.modalProduct = item
                productModal.show()
            }else if (state === 'del'){
                this.modalProduct = item
                delProductModal.show()
            }

        }
        
    },
    mounted() {
        axios.defaults.headers.common['Authorization'] = document.cookie.split('=')[1]
        productModal = new bootstrap.Modal(document.getElementById('editProduct'))
        delProductModal = new bootstrap.Modal(document.getElementById('delProduct'))
        this.checkUser()
    },
}


createApp(app).mount('#app')