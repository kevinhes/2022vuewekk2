// 取得 cookie

const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token

// 驗證是否登入

function checkLoginStatus() {
    if(token == ''){
        alert('您尚未登入')
        window.location = './login.html'
    }
}

// 測試是否登入

const checkLoginBtn = document.querySelector('.checkLogin')

checkLoginBtn.addEventListener('click', e=> {
    axios.post(`${api_url}/v2/api/user/check`)
        .then(res => {
            if(res.data.success === true){
                alert('正在登入狀態')
            }
        })
        .catch(error => {
            console.log(error);
        })
})

// 動元素

const productList = document.querySelector('#productList')

// 初始化

let productsData = []

function init() {
    getProdutsList()
    checkLoginStatus()
}

init()

// 取得產品列表

function getProdutsList() {
    axios.get(`${api_url}/v2/api/${api_path}/admin/products`)
        .then(res => {
            productsData = res.data.products
            console.log(productsData);
            let str = ''
            productsData.forEach( i => {
                str += `
                <tr>
                    <td>${i.title}</td>
                    <td width="120">
                    ${i.origin_price}
                    </td>
                    <td width="120">
                    ${i.price}
                    </td>
                    <td width="100">
                    <span class="">${i.is_enabled ? '啟用':'未啟用'}</span>
                    </td>
                    <td width="120">
                    <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${i.id}"> 刪除 </button>
                    </td>
                </tr>
                `
            })
            productList.innerHTML = str
        })
        .catch(error => {
            console.log(error.response);
        })
}