<template>
    <div class="mapTree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <div class="maptree-header">
            <span>图层管理</span>
            <i class="el-icon-close" @click="closeMapTreePannel"></i>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.18/',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
    name: 'MapTree',
    components: {},

    data() {
        return {
            data: [
                {
                    label: '底图数据',
                    children: [
                        {
                            label: '暖色调图层',
                            layerid: 'layerid',
                            layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        },
                        {
                            label: '灰色调图层',
                            layerid: 'layerid',
                            layerurl: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                        },
                    ],
                },
                {
                    label: '行政区划数据',
                    children: [
                        {
                            label: '省数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHpravince_webMercator/FeatureServer',
                        },
                        {
                            label: '市数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHcity_webMercator/FeatureServer',
                        },
                        {
                            label: '县数据',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/XZQHconty_webMercator/FeatureServer',
                        },
                    ],
                },
                {
                    label: '业务数据',
                    children: [
                        {
                            label: '火车站数据 84',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/trainstationdata_wgs1984/FeatureServer',
                        },
                        {
                            label: '火车站数据 Merkator',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/trainstation_WebMerkator/FeatureServer',
                        },
                    ],
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
        };
    },
    mounted: function () {},
    methods: {
        async handleNodeClick(data) {
            console.log(data);

            if (data.layerurl) {
                const view = this.$store.getters._getDefaultView;
                const resultLayer = view.map.findLayerById('layerid');
                if (resultLayer) view.map.remove(resultLayer);

                const [TileLayer, FeatureLayer] = await loadModules(
                    ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
                    options,
                );
                const c = data.layerurl.split('/');
                const serverType = c[c.length - 1];
                let layer = '';
                switch (serverType) {
                    case 'MapServer':
                        layer = new TileLayer({ url: data.layerurl, id: data.layerid });
                        break;
                    case 'FeatureServer':
                        layer = new FeatureLayer({ url: data.layerurl, id: data.layerid });
                        break;
                    default:
                        break;
                }
                view.map.add(layer);
            }
        },
        closeMapTreePannel() {
            const currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
        },
    },
};
</script>

<style>
.mapTree-pannel {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 200px;
    height: 400px;
    background-color: #fff;
}
.maptree-header {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.maptree-header > span {
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
}
.maptree-header > i {
    line-height: 35px;
    cursor: pointer;
}
</style>
