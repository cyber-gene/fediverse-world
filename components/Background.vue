<template>
  <canvas ref="canvas" aria-hidden="true" role="presentation"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const numStars = 500;
const stars = ref<{ x: number; y: number; z: number }[]>([]);
let animationId = 0;

const initCanvas = () => {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  ctx.value = canvas.value.getContext('2d') || null;
  createStars();
};

const createStars = () => {
  stars.value = Array.from({ length: numStars }, () => ({
    x: Math.random() * (canvas.value?.width || 0),
    y: Math.random() * (canvas.value?.height || 0),
    z: Math.random() * (canvas.value?.width || 0),
  }));
};

const updateStars = () => {
  stars.value.forEach((star) => {
    star.z -= 2;
    if (star.z <= 0) {
      star.z = canvas.value?.width || 0;
      star.x = Math.random() * (canvas.value?.width || 0);
      star.y = Math.random() * (canvas.value?.height || 0);
    }
  });
};

const drawStars = () => {
  if (!ctx.value || !canvas.value) return;

  ctx.value.fillStyle = 'black';
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);

  stars.value.forEach((star) => {
    let factor = 128.0 / star.z;
    let x =
      (star.x - (canvas.value?.width || 0) / 2) * factor +
      (canvas.value?.width || 0) / 2;
    let y =
      (star.y - (canvas.value?.height || 0) / 2) * factor +
      (canvas.value?.height || 0) / 2;
    let radius = factor;

    if (ctx.value) {
      ctx.value.beginPath();
      ctx.value.arc(x, y, radius, 0, Math.PI * 2);
      ctx.value.fillStyle = 'white';
      ctx.value.fill();
    }
  });
};

const animate = () => {
  updateStars();
  drawStars();
  animationId = requestAnimationFrame(animate);
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
};

onMounted(() => {
  initCanvas();
  animate();
  window.addEventListener('resize', initCanvas);
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', initCanvas);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
}
</style>
