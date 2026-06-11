<template>
  <div>
    <NuxtRouteAnnouncer />
    <StarBackground />
    <div class="lang-switcher">
      <button
        v-for="loc in locales"
        :key="loc.code"
        type="button"
        :class="{ active: locale === loc.code }"
        :aria-pressed="locale === loc.code"
        @click="setLocale(loc.code)"
      >
        {{ loc.code.toUpperCase() }}
      </button>
    </div>
    <div class="sections">
      <TopSection />
      <AboutFediverse />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';

const { locale, locales, setLocale } = useI18n();

let observer: IntersectionObserver | undefined;

onMounted(() => {
  const sections = document.querySelectorAll('.section');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer?.unobserve(entry.target);
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

.lang-switcher {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  gap: 0.5rem;
}

.lang-switcher button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.6);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-switcher button:hover {
  border-color: rgba(255, 255, 255, 0.8);
  color: white;
}

.lang-switcher button.active {
  border-color: white;
  color: white;
  background: rgba(255, 255, 255, 0.1);
}
</style>
