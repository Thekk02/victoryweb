export default [
    {
        path:'/',
        name:'Login',
        component:()=>import('@/views/Login.vue')
    },
    {
        path:'/404',
        name:'404',
        component:()=>import('@/views/404.vue')
    },
];

