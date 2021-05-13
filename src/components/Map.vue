<template>
<div class="map-container">
    <GmapMap 
        class="gmap-default"
        :center="this.$store.state.centerCoords"
        :zoom="this.$store.state.zoom"
        map-type-id="roadmap"
        :options="this.gmapOptions"
    >
        <GmapCustomMarker
            v-for="(place, index) in places"
            :key="index"
            :marker="{lat: place.lat, lng: place.lng}"
            @click.native="renderInfoBox(place.name)"
        >
        
        <InfoBoxTemp
            v-show="markers[place.name]"
            :place="place"
            @click="renderInfoBox(place.name)"
         />
        <img v-show="place.capacity == 0 && place.subStatus !== 'active'" src="../assets/open.png" />
        <img v-show="place.capacity == 1 && !place.subStatus !== 'active'" src="../assets/seats_available.png" />
        <img v-show="place.capacity == 2 && !place.subStatus !== 'active'" src="../assets/full.png" />
        <img v-show="place.capacity == 3 && !place.subStatus !== 'active'" src="../assets/closed.png" />   
        </GmapCustomMarker>

    </GmapMap>        
</div>  
</template>

<script>
import GmapCustomMarker from "vue2-gmap-custom-marker"
import InfoBoxTemp from "./InfoBoxTemp"

export default {
    name: "Map",
    components: {
        GmapCustomMarker,
        InfoBoxTemp
    },
    data() {
        return {
            gmapOptions: {
                styles: [{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                }]
            }

        }
    },

    computed: {
        places() {
            return this.$store.state.places
        },

        markers() {
            return this.$store.state.markers
        }
    },
    methods: {
        renderInfoBox(placeName) {

            const data = {}
            if (this.$store.state.markers[placeName] == true) {
                data[placeName] = false
            } else {
                data[placeName] = true
            }

            this.$store.commit("setMarkers", data)
        }

    }
}
</script>

<style>

.gmap-default {
    width: 100%;
    height: 88vh;
}

.map-container {
    display: flex;
    position: relative;
}

/* .info-box {
        width: 50px;
        height: 60px;
    } */
</style>
