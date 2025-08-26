import Vuex from 'vuex'
import router,{resetRouter} from "../router/router";

function addNewRoute(menuList) {
    let routes = router.options.routes
    routes.forEach(routeItem=>{
        if(routeItem.path=="/Index"){
            menuList.forEach(menu=>{
                let childRoute =  {
                    path:'/'+menu.menuclick,
                    name:menu.menuname,
                    meta:{
                        title:menu.menuname
                    },
                    component:()=>import('../components/'+menu.menucomponent)
                }

                routeItem.children.push(childRoute)
            })
        }
    })

    resetRouter()
    router.addRoutes(routes)
}

export default new Vuex.Store({
    state: {
        uname: "guest",
        menuList: [
            {
                parentId: -1,
                id: 100,
                name: "系统设置", //看官网，这个名字是3-5之间的
                url: "",
                menu: "",
                type: 0,
                icon: "Setting",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 100,
                id: 1,
                name: "用户管理", //看官网，这个名字是3-5之间的
                url: "system/Users", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "",
                type: 1,
                icon: "UserFilled",
                sort: 2,
                iframe: 0,
            },
            {
                parentId: 1,
                id: 2,
                name: "查询", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "search",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 1,
                id: 3,
                name: "添加", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "add",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 1,
                id: 4,
                name: "编辑", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "edit",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 100,
                id: 5,
                name: "菜单管理", //看官网，这个名字是3-5之间的
                url: "system/Menus", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "",
                type: 1,
                icon: "Menu",
                sort: 1,
                iframe: 0,
            },
            {
                parentId: 5,
                id: 6,
                name: "查询", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "search",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 5,
                id: 7,
                name: "添加", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "add",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 5,
                id: 8,
                name: "编辑", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "edit",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 5,
                id: 9,
                name: "添加子级", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "addChild",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 5,
                id: 10,
                name: "添加按钮", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "addBtn",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 100,
                id: 11,
                name: "角色管理", //看官网，这个名字是3-5之间的
                url: "system/Roles", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "",
                type: 1,
                icon: "HelpFilled",
                sort: 3,
                iframe: 0,
            },
            {
                parentId: 11,
                id: 12,
                name: "查询", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "search",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 11,
                id: 13,
                name: "添加", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "add",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 11,
                id: 14,
                name: "编辑", //看官网，这个名字是3-5之间的
                url: "", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "edit",
                type: 2,
                icon: "",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: -1,
                id: 15,
                name: "参考资料", //看官网，这个名字是3-5之间的
                url: "",
                menu: "",
                type: 0,
                icon: "DocumentCopy",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 15,
                id: 16,
                name: "vue3.0", //看官网，这个名字是3-5之间的
                url: "https://www.vue3js.cn/docs/zh/", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "",
                type: 1,
                icon: "Promotion",
                sort: 1,
                iframe: 1,
            },
            {
                parentId: 15,
                id: 17,
                name: "element-plus", //看官网，这个名字是3-5之间的
                url: "https://element-plus.org/#/zh-CN", //这个类似上面的id一个，只是初始值是从100开始的
                menu: "",
                type: 1,
                icon: "ElemeFilled",
                sort: 1,
                iframe: 1,
            },

        ],
        sliderstate: false,

    },
    mutations: {
        setMenu(state,menuList) {
            state.menu = menuList

            addNewRoute(menuList)
        },
        setName(state,name){
            state.uname = name
        },
        callbackSlider(state){
            state.sliderstate = !state.sliderstate
        }

    },
    getters: {
        uname(state){
            return state.uname
        },
        Menu(state) {
            return state.menuList
        },
        Slider(state){
            return state.sliderstate
        }
    },
    actions: {
        ['SLIDER_MENU']({ commit }) {
            commit("callbackSlider");
        },

    },
})
