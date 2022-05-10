<template>
    <div class="onemap-page">
        <MapView />
        <MapTools />
    </div>
</template>

<script>
import MapView from './../components/common/Mapview';
import MapTools from './../components/MapTools';

export default {
    name: 'OneMap',
    components: {
        MapView,
        MapTools,
    },
    mothods: {},
};
</script>

<style>
.onemap-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
