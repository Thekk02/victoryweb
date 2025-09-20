<template>
  <el-sub-menu
      :index="menu.id"
      v-if="menu.children.length > 0"
  >
    <template #title>
      <el-icon :size="16" style="margin-right: 6px">
        <component :is="menu.icon" />
      </el-icon>
      <span>{{ menu.id }}</span>
    </template>
    <slide-menu
        v-for="child in menu.children"
        :key="child.id"
        :menu="child"
    ></slide-menu>
  </el-sub-menu>
  <el-menu-item
      v-else-if="menu.children.length === 0"
      :index="setIndex(menu)"
      @click="clickMenu(menu)"
  >
    <template #title>
      <el-icon :size="16" style="margin-right: 6px">
        <component :is="menu.icon" />
      </el-icon>
      <span>{{ menu.id }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import { useRouter } from "vue-router";
import { toRefs } from "vue";
const props = defineProps(["menu"]);
const { menu } = toRefs(props);

// const reload = inject("reload");
const router = useRouter();
const clickMenu = (menu) => {
  if(menu.type == 1){
    let path = "/AppMain" +  menu.path
    router.push({
      path
    });
  }else if(menu.type == 2){
    let path = menu.path
    const link = document.createElement("a")
    link.href = path
    link.target = "_blank"
    link.click()
  }else{
    let path = "i-sipm"
    router.push({
      path
    })
  }

};

const setIndex = (menu) => {
  // let index = `/${menu.url.replace(/\//g, "-")}-${menu.id}`;
  // if (menu.iframe == 1) {
  //   index = `/i-${menu.id}`;
  // }
  // return index;
};
</script>

<style lang="scss">
li.el-menu-item.is-active {
  background-color: darken($sideBgColor, 15%) !important;
}
.el-menu-item .el-icon svg {
  vertical-align: unset;
}
.el-sub-menu__title .el-icon svg {
  vertical-align: unset;
}
// .el-sub-menu.is-active:not(.is-opened) .el-sub-menu__title i {
//     color: $base-color;
// }
</style>
