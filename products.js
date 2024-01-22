import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let productModal = null;
let delProductModal = null;
const app = {
    data() {
        return {
            api_Url: 'https://ec-course-api.hexschool.io/v2',
            api_Path: 'chinging',
            products: [], 
            modalProduct: {},
            newModalProduct: {},
            state: ''
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
                this.state = state
                this.modalProduct = {}
                productModal.show()
            }else if (state === 'edit'){
                this.state = state
                this.modalProduct = item
                productModal.show()
            }else if (state === 'del'){
                this.modalProduct = item
                delProductModal.show()
            }
        },
        updateProduct(){
            let url = `${this.api_Url}/api/${this.api_Path}/admin/product`;
            let way = 'post';
      
            if (this.state !== 'isNew') {
              url = `${this.api_Url}/api/${this.api_Path}/admin/product/${this.modalProduct.id}`;
              way = 'put'
            }
      
            console.log(this.modalProduct);
            axios[way](url, { data: this.modalProduct }).then((response) => {
              alert(response.data.message);
              productModal.hide();
              this.getProducts();
            }).catch((err) => {
              alert(err.response.data.message);
            })
            

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