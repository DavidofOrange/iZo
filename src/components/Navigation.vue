<template>
    <div class="nav-container">
<<<<<<< HEAD
    <nav class="navbar">
        <div class="container-fluid">
            <div class="empty-div">222222222</div>
            <form class="d-flex">
                <div class="nav-item" v-if="!this.$store.state.loggedIn" @click="login">Sign In</div>
                <div class="nav-item logo" v-if="this.$store.state.loggedIn" @click="settings">{{this.$store.state.user.username}}</div>
            </form>
        </div>
    </nav>  
    <nav class="contain">
        <div class="container-fluid">
            <form class="d-flex justify-content-between">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchInput" @keydown.enter="search">
                <button class="btn" type="submit"  @click.prevent="search">Search</button>
            </form>
        </div>
    </nav>
    <div class="hidden-map" ref="myRef"></div>
=======
        <nav class="navbar">
            <div class="container-fluid">
                <div class="empty-div">222222222</div>
                <form class="d-flex">
                    <div class="nav-item signin" v-if="!this.$store.state.loggedIn" @click="login">Sign In</div>
                    <div class="nav-item" v-if="this.$store.state.loggedIn" @click="settings">{{this.$store.state.user.username}}</div>
                </form>
            </div>
        </nav>  
        <nav class="contain">
            <div class="container-fluid">
                <form class="d-flex justify-content-between">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchInput" @keydown.enter="search">
                    <button class="btn" type="submit"  @click.prevent="search">Search</button>
                </form>
            </div>
        </nav>
        <div class="hidden-map" ref="myRef"></div>
>>>>>>> f11a76a68a3e2ca5620dd2bb17b181d2c83fad94
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

.navbar-brand.lego {
    cursor: pointer;
    width: 24vw;
    height: 13vh;
    margin-top: -3.5%;
    margin-bottom: -12%;
    z-index: -1;
}


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
.navbar-brand {
    cursor: pointer;
    height: 40px;
    color: white;
}
.container-fluid {
    padding-right: 0px;
    padding-left: 5px;
}
.nav-item.signin {
    padding-right: 15px;
    cursor: pointer;
}

.empty-div {
    background-color: aqua;
    opacity: 0;
    cursor: pointer;
}


.navbar-brand.lego {
    margin-bottom: -17%;
}

.nav-item.logo, .nav-item {
    cursor: pointer;
}

.empty-div {
    background-color: aqua;
    opacity: 0;
    cursor: pointer;
}
</style>
