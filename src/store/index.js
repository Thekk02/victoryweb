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
                type: 0,
                id: "plm在线看图",
                path: "plm",
                icon: "Reading",
                children: [
                    {
                        type: 1,
                        id: "客户原图",
                        path: "/CustomerOriginalPicture",
                        icon: "Document",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "图纸工艺",
                        path: "/DrawingProcess",
                        icon: "Notebook",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "检验指导书",
                        path: "/InspectionInstruction",
                        icon: "Tickets",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "标签作业指导书",
                        path: "/LabelWorkInstruction",
                        icon: "Tickets",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "原材料标准",
                        path: "/MaterialInstruction",
                        icon: "Memo",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "型材图",
                        path: "/ProfileDraw",
                        icon: "Collection",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "编程用图",
                        path: "/ProgramDiagram",
                        icon: "Postcard",
                        children: [],
                    },
                    {
                        type: 1,
                        id: "本批有效图",
                        path: "/ValidDiagram",
                        icon: "ScaleToOriginal",
                        children: [],
                    },
                ],
            },
            {
                type: 0,
                id: "技术部工具",
                path:"",
                icon:"Setting",
                children: [],
            },
            {
                type: 2,
                id:"OA",
                path:"http://192.168.1.23/seeyon/index.jsp",
                icon: "BottomRight",
                children: [],
            },
            {
                type: 2,
                id:"U9C",
                path:"http://192.168.1.80/U9C/mvc/login/index?ReturnUrl=%2fu9c",
                icon: "BottomRight",
                children: [],
            },
            // {
            //     type: 3,
            //     id:"思普平台",
            //     path:"http://192.168.1.32:18088/sipmweb/",
            //     icon: "BottomRight",
            //     children: [],
            // }

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
