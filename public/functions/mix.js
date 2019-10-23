function clearMix() {
    if ("undefined" != typeof (mix_particleSystem)) {
        for (var i = 0; i < viewer.dataSources.length; i++) {
            if (viewer.dataSources.get(i)._name) {
                var name = viewer.dataSources.get(i)._name;
                if (name == "ClampToGround.czml" || name == "ClampToGround.1.czml" || name == "ClampToGround.2.czml") {
                    viewer.dataSources.remove(viewer.dataSources.get(i), true);
                }
            }
        }
        scene.postRender.removeEventListener(mix_listener);
        viewer.scene.primitives.remove(mix_particleSystem);
        console.log("清除混合模型");
    }
}