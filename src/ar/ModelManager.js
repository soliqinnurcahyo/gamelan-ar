import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

export function loadModel(data) {

  return new Promise((resolve, reject) => {

    loader.load(

      data.model,

      (gltf) => {

        const model = gltf.scene;

        // Hitung ukuran model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Geser model ke tengah pivot
        model.position.sub(center);

        // Buat pivot
        const pivot = new THREE.Group();
        pivot.add(model);

        // Atur posisi, skala, dan rotasi pivot
        pivot.position.set(
          data.position.x,
          data.position.y,
          data.position.z
        );

        pivot.scale.setScalar(data.scale);

        pivot.rotation.set(
          THREE.MathUtils.degToRad(data.rotation.x),
          THREE.MathUtils.degToRad(data.rotation.y),
          THREE.MathUtils.degToRad(data.rotation.z)
        );

        resolve(pivot);

      },

      undefined,

      reject

    );

  });

}