<template>
  <div>
    <NuxtRouteAnnouncer />
    <Background />
    <div class="sections">
      <TopSection />
      <AboutFediverse />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';

let observer: IntersectionObserver | undefined;

onMounted(() => {
  const sections = document.querySelectorAll('.section');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

onUnmounted(() => {
  observer?.disconnect();
  observer = undefined;
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'JetBrains Mono', sans-serif;
  background-color: black;
  color: white;
}

.sections {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  border-radius: 10px;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 1s,
    transform 1s;
}

.section.active {
  opacity: 1;
  transform: translateY(0);
}

.section.center {
  align-items: center;
}

.section.left {
  align-items: flex-start;
}
</style>
