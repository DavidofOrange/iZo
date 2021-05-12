<template>
    <div class="nav-container">
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand">PUBFINDER</a>
            <form class="d-flex">
                <div class="nav-item" v-if="!this.$store.state.loggedIn" @click="login">Sign In</div>
                <div class="nav-item" v-if="this.$store.state.loggedIn" @click="settings">{{this.$store.state.user.username}}</div>
            </form>
        </div>
    </nav>  
    <nav class="contain">
        <div class="container-fluid">
            <form class="d-flex justify-content-between">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchInput" @keydown.enter="search">
                <button class="btn btn-outline-success" type="submit"  @click.prevent="search">Search</button>
            </form>
        </div>
    </nav>
    <div class="hidden-map" ref="myRef"></div>
    </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps"

export default {
    name: "Navigation",

    computed: {
        google: gmapApi
    },

    data() {
        return {
            searchInput: "",
        }
    },

    methods: {
        settings() {
            if (this.$store.state.user.type === "business") {
                this.$store.commit("setShowsToFalse")
                this.$store.commit("setShowBusinessView")
            } else {
                alert("You currently do not have settings!")
            }
        },

        login() {
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setLoginToggle")
        },

        search() {
            this.$store.dispatch("getCoords", this.searchInput)

        }
    }

}
</script>

<style>

.hidden-map {
    visibility: hidden;
}

.nav-container {
    margin-bottom: 1%;
}

.navbar-brand, .nav-item{
    cursor: pointer;
}

</style>