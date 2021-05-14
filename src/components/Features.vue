<template>
    <div>
        <nav class="navbar">
            <div class="empty-div" @click="goHome">222222222</div>
            <span class="navbar-brand mb-0 h1">Add Business</span>
        </nav>
        <div>Update {{this.$store.state.currBusiness.busName}}</div>
        <div class="form-container">
            <form class="form">
                <div class="form-group">
                    <label for="slogan">Slogan</label>
                    <input type="text" class="form-control" id="slogan" v-model="slogan" placeholder="Ex. We are here for you!">
                </div>
                <div class="form-group">
                    <label for="theme">Theme</label>
                    <input type="text" class="form-control" id="theme" v-model="theme" placeholder="American Izakaya">
                </div>
                <div class="form-group">
                    <label for="specials">Specials</label>
                    <input type="text" class="form-control" id="specials" v-model="specials" placeholder="Ex. 500 yen Happy Hour!">
                </div>
                <div class="form-group open-hours-container">
                    <label class="time-label" for="opening-time">Open: </label>
                    <select class="form-control" id="opening-time" v-model="openTime" placeholder="Hello">
                        <option value="" selected disabled>open</option>
                        <option>1:00am</option><option>2:00am</option>
                        <option>3:00am</option><option>4:00am</option>
                        <option>5:00am</option><option>6:00am</option>
                        <option>7:00am</option><option>8:00am</option>
                        <option>9:00am</option><option>10:00am</option>
                        <option>11:00am</option><option>12:00pm</option>
                        <option>1:00pm</option><option>2:00pm</option>
                        <option>3:00pm</option><option>4:00pm</option>
                        <option>5:00pm</option><option>6:00pm</option>
                        <option>7:00pm</option><option>8:00pm</option>
                        <option>9:00pm</option><option>10:00pm</option>
                        <option>11:00pm</option><option>midnight</option>
                    </select>
                    <label class="time-label" for="closing-time">Close: </label>
                    <select class="form-control" id="closing-time" v-model="closeTime">
                        <option value="" selected disabled>close</option>
                        <option>1:00am</option><option>2:00am</option>
                        <option>3:00am</option><option>4:00am</option>
                        <option>5:00am</option><option>6:00am</option>
                        <option>7:00am</option><option>8:00am</option>
                        <option>9:00am</option><option>10:00am</option>
                        <option>11:00am</option><option>12:00pm</option>
                        <option>1:00pm</option><option>2:00pm</option>
                        <option>3:00pm</option><option>4:00pm</option>
                        <option>5:00pm</option><option>6:00pm</option>
                        <option>7:00pm</option><option>8:00pm</option>
                        <option>9:00pm</option><option>10:00pm</option>
                        <option>11:00pm</option><option>midnight</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="updateFeatures">Update</button>
                <button type="submit" class="btn btn-primary" @click.prevent="cancel">Cancel</button>
            </form>
        </div>          
    </div>
</template>

<script>
export default {
    name: "Features",
    data() {
        return {
            slogan: "",
            theme: "",
            specials: "",
            openTime: "",
            closeTime: ""
        }
    },
    methods: {

        goHome() {
            this.$store.commit("setShowsToFalse")
        },

        updateFeatures() {
            const validator = this.inputValidator()
            if (!validator) {
                alert("Please make a change")
            } else {

                let openHours;
                if (this.openTime !== "" && this.closeTime !== "") {
                    openHours = `${this.openTime} - ${this.closeTime}`
                }


                const tempData = {
                    slogan: this.slogan,
                    open_hours: openHours,
                    theme: this.theme,
                    specials: this.specials
                }

                let changes = {};
                for (let key in tempData) {
                    if (tempData[key] !== "" && tempData[key] !== undefined) {
                        changes[key] = tempData[key]
                    }
                }

                const data = {
                    busId: this.$store.state.currBusiness.busId,
                    data: changes
                }
                if (changes && Object.keys(changes).length === 0 && changes.constructor === Object) {
                    alert("Please enter valid inputs (did you set both a opening and closing time?)")
                } else {
                    this.$store.dispatch("updateBusiness", data)
                    this.$store.dispatch("getPlaces")
                }
            }
        },

        inputValidator() {
            if (this.slogan === "" && this.theme === "" && this.specials === "" && this.openTime === "" && this.closeTime === "") {
                return false
            } else {
                return true
            }
        },

        cancel() {
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setShowBusinessView")
        }
    }

}
</script>

<style>

.open-hours-container {
    display: flex;
}

.form-control {
    color: rgb(102, 102, 102);
}

.btn {
    margin: 1vh;
}

.time-label {
    margin: auto;
    margin-right: 0.5vh;
    margin-left: 0.5vh;
}

</style>