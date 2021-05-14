<template>
    <div>
        <nav class="navbar">
            <div class="empty-div" @click="goHome">222222222</div>
            <span class="navbar-brand h1">Create Account</span>
        </nav>
        <div class="form-container">
            <form class="form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" placeholder="Your Username">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Type of Account</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="accountType">
                        <option value="" selected disabled>Personal / Business</option>
                        <option>Personal</option>
                        <option>Business</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" v-model="confirmPassword" placeholder="Confirm Password">
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Do you agree with the Terms and Conditions?</label>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="createAccount">Create Account</button>
            </form>
        </div>          
    </div>
</template>

<script>
export default {
    name: "CreateAccount",
    data() {
        return {
            username: "",
            email: "",
            accountType: "",
            password: "",
            confirmPassword: ""
        }
    },
    methods: {

        createAccount() {
            const validator = this.inputValidator()

            console.log(validator)

            if (validator === "pass") {
                alert("Passwords do not match!")
            } else if (!validator) {
                alert("Please fill in everything")
            } else {

                const payload = {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    accountType: this.accountType
                }

                this.$store.dispatch("createUser", payload)
            }
        },

        inputValidator() {
            if (this.username === "" || this.password === "" || this.confirmPassword === "" || this.email === "") {
                return false
            } else if (this.password !== this.confirmPassword) {
                return "pass"
            } else {
                return true
            }
        },

        goHome() {
            this.$store.commit("setShowsToFalse")
        }
    }

}
</script>

<style>

.login-account {
    cursor: pointer;
}

.form-container {
    display: flex;
}

.form-group {
    margin: auto;
    margin-top: 5%;

}

.form-control {
    color:white
}

.navbar-brand.mb-0.h1 {
    margin-left: 1.5%;
    color: white;
}
.exampleInputPassword1 {
    box-sizing:content-box;
}
.btn.btn-primary {
    background-color: tomato;
}
.white-text {
    color: white;
}

</style>