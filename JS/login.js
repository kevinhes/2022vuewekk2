const app = Vue.createApp({
  data() {
    return {
      api_path : 'kevinhesapi',
      api_url : 'https://vue3-course-api.hexschool.io/',
      user:{
        "username": '',
        "password": ''
      }
    }
  },
  methods: {
    login() {
      if(this.user.username != '' && this.user.password){
      axios.post(`${this.api_url}/v2/admin/signin`, this.user)
        .then(res => {
          console.log(res);
          let {token, expired} = res.data
          console.log(token,expired);
          document.cookie = `hextoken=${token}; expires=${new Date(expired)}`
          window.location = './backstage.html'
        })
        .catch(error => {
          console.dir(error);
        })
      } else {
        alert('請輸入帳號密碼')
      }
    }
  }
})

app.mount('#app')

// // 動元素

// const userName = document.querySelector('#username')
// const password = document.querySelector('#password')
// const loginBtn = document.querySelector('#form button')

// // 監聽

// loginBtn.addEventListener('click', e => {
//   e.preventDefault()
//   if(userName.value != '' && password.value != ''){
//     let user = {
//       "username": userName.value,
//       "password": password.value
//     }
//     axios.post(`${api_url}/v2/admin/signin`,user)
//       .then(res => {
//         console.log(res);
//         let {token, expired} = res.data
//         console.log(token,expired);
//         document.cookie = `hextoken=${token}; expires=${new Date(expired)}`
//         window.location = './backstage.html'
//       })
//       .catch(error => {
//         console.dir(error);
//       })
//   }else {
//     alert('請輸入帳密')
//   }
// })

// // 登入函式