<template>
    <div>
        <nav class="navbar navbar-light">
            <span class="navbar-brand mb-0 h1 light" @click.prevent="goHome">IZAKA-YA' OPEN</span>
            <span class="lead">Please Sign In</span>
        </nav>
        <div class="form-container">
            <form class="form-group">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
                <div class="login-account" @click.prevent="createAccount">Create Account</div>
            </form>
        </div>              
    </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        login() {
            this.$store.dispatch("verifyLogin", {username: this.username, password:this.password })
        },

        createAccount() {
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setShowCreateAccountToggle")
        },

        goHome() {
            this.$store.commit("setShowsToFalse")
        }
    },

    data() {
        return {
            username: "",
            password: "",
        }
    }

}
</script>

<style scope>

.lead {
    margin-right: 1%;
}

.login-account {
    cursor: pointer;
    margin-top: 5%;
    color: rgb(0, 54, 36);
}

.form-container {
    display: flex;
}

.form {
    margin: auto;
    margin-top: 15%;

}

.navbar-brand.mb-0.h1 {
    margin-left: 1.5%;
}


.btn.btn-primary {
   margin-top: 5%; 
} 
</style>