<template>
    <div id="main">
        <header-app />

        <div class="content m-5">
            <router-view></router-view>
        </div>

        <footer-app />
    </div>
</template>

<script>
    import HeaderApp from "../components/HeaderApp.vue"
    import FooterApp from "../components/FooterApp.vue"
    
    export default {
        name: 'main-app',
        
        components: {
            HeaderApp,
            FooterApp
        },
    }
</script>