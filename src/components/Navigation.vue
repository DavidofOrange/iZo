<template>
    <div class="nav-container">
    <nav class="navbar">
        <div class="container-fluid">
            <a class="navbar-brand"></a>
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
            if (this.$store.state.user.userType === "Business") {
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
            this.$store.dispatch("getPlaces")
            this.$store.commit("setZoom", 16)

        }
    }

}
</script>

<style>

.d-flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.hidden-map {
    visibility: hidden;
}
.nav-container {
    padding-bottom: 2px;
    color: white;
}
.form-control {
    height: 40px;
}
.btn {
    color: white;
    border: 1px solid red;
}
.navbar-brand, .nav-item{
    cursor: pointer;
    height: 40px;
}
.container-fluid {
    padding-right: 5px;
    padding-left: 5px;
}

</style>
