<template>
    <div>
        <nav class="navbar navbar-light">
            <span class="navbar-brand mb-0 h1" @click.prevent="goHome">IZAKA-YA' OPEN</span>
            <span class="navbar-brand mb-0 h1">Add Business</span>
        </nav>
        <div class="form-container">
            <form class="form">
                <div class="form-group">
                    <label for="store-name">Store Name</label>
                    <input type="text" class="form-control" id="store-name" v-model="storeName" placeholder="Ex. Dominos">
                </div>
                <div class="form-group">
                    <label for="postcode">Postcode</label>
                    <input type="text" class="form-control" id="postcode" v-model="postcode" placeholder="000-0000">
                </div>
                <div class="form-group">
                    <label for="prefecture">Prefecture</label>
                    <input type="text" class="form-control" id="prefecture" v-model="prefecture" placeholder="Ex. Tokyo">
                </div>
                <div class="form-group">
                    <label for="address-one">Address 1</label>
                    <input type="text" class="form-control" id="address-one" v-model="addressOne" placeholder="Ex. Shinjuku 6-2-12">
                </div>
                <div class="form-group">
                    <label for="address-two">Address 2</label>
                    <input type="text" class="form-control" id="address-two" v-model="addressTwo" placeholder="Ex. Plaza Toko #301">
                </div> 
                <div class="form-group">
                    <label for="lat">Latitude</label>
                    <input type="text" class="form-control" id="lat" v-model="lat" placeholder="#000.000">
                </div>
                <div class="form-group">
                    <label for="lng">Longitude</label>
                    <input type="text" class="form-control" id="lng" v-model="lng" placeholder="#000.000">
                </div>                  
                <button type="submit" class="btn btn-primary" @click.prevent="addBusiness">Add Business</button>
                <button type="submit" class="btn btn-primary" @click.prevent="cancelAddBusiness">Cancel</button>
            </form>
        </div>          
    </div>
</template>

<script>
export default {
    name: "AddBusiness",
    data() {
        return {
            storeName: "",
            postcode: "",
            prefecture: "",
            addressOne: "",
            addressTwo: "",
            lat: "",
            lng: "",
        }
    },
    methods: {

        goHome() {
            this.$store.commit("setShowsToFalse")
        },

        cancelAddBusiness() {

        },

        addBusiness() {
            const validator = this.inputValidator()
            if (!validator) {
                alert("Please fill in everything")
            } else {
                const data = {
                    busName: this.storeName,
                    postalCode: this.postcode,
                    prefecture: this.prefecture,
                    address1: this.addressOne,
                    address2: this.addressTwo,
                    capacityStatus: 3,
                    lat: this.lat,
                    lng: this.lng,
                    ownerId: this.$store.state.user.userId
                }
                this.$store.dispatch("addBusiness", data)
            }
        },

        inputValidator() {
            if (this.name === "" || this.postcode === "" || this.prefecture === "" || this.addressOne === "" || this.lat === "" || this.lng === "") {
                return false
            } else {
                return true
            }
        }
    }

}
</script>

<style>

</style>