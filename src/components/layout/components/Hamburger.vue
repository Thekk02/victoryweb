<!--
 * @Author: your name
 * @Date: 2021-01-07 16:23:33
 * @LastEditTime: 2021-12-02 17:01:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-element-admin\src\components\layout\components\SilderMenu.vue
-->
<template>
    <div class="ve_slider_menu" @click="fn_slider_menu">
        <el-icon>
            <component :is="opened ? 'expand' : 'fold'" />
        </el-icon>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const opened = computed(() => store.getters.Slider);
const fn_slider_menu = () => {
    store.dispatch('SLIDER_MENU',);
};
</script>

<style lang="scss" scoped>
.ve_slider_menu {
    cursor: pointer;
    margin-right: 10px;
    i {
        font-size: 40px;
    }
    &:hover i {
        color: $base-color;
    }
}
</style>
