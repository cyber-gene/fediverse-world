<template>
  <div class="section center active">
    <div class="typewriter-wrapper">
      <h1 class="typewriter typewriter-ghost" aria-hidden="true">{{ fullText }}_</h1>
      <h1 class="typewriter typewriter-visible">{{ text }}<span ref="cursorEl" class="cursor">_</span></h1>
    </div>
    <div
      class="scroll-indicator"
      :class="{ visible: showIndicator }"
      aria-hidden="true"
    >
      <span class="scroll-arrow"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const text = ref('');
const fullText = 'Dive into the "Federated" universe!!';
const index = ref(0);
const speed = 100; // タイピング速度（ミリ秒）
const HIDE_SCROLL_THRESHOLD_PX = 50;
const cursorEl = ref<HTMLElement | null>(null);
const showIndicator = ref(false);
let timerId: ReturnType<typeof setTimeout> | undefined;

const onScroll = () => {
  if (window.scrollY > HIDE_SCROLL_THRESHOLD_PX) {
    showIndicator.value = false;
    window.removeEventListener('scroll', onScroll);
  }
};

const typeEffect = () => {
  if (index.value < fullText.length) {
    text.value += fullText.charAt(index.value);
    index.value++;
    timerId = setTimeout(typeEffect, speed);
  } else {
    cursorEl.value?.classList.add('blink');
    if (window.scrollY <= HIDE_SCROLL_THRESHOLD_PX) {
      showIndicator.value = true;
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }
};

onMounted(() => {
  const el = cursorEl.value;
  if (!el) {
    typeEffect();
    return;
  }
  el.classList.add('blink');
  let count = 0;
  const onIteration = () => {
    count++;
    if (count >= 3) {
      el.removeEventListener('animationiteration', onIteration);
      el.classList.remove('blink');
      typeEffect();
    }
  };
  el.addEventListener('animationiteration', onIteration);
});

onUnmounted(() => {
  clearTimeout(timerId);
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.section {
  position: relative;
}

.typewriter-wrapper {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.typewriter {
  font-family: 'JetBrains Mono', sans-serif;
  /* 3.5vw でビューポート幅に追従、モバイル下限 0.7rem、デスクトップ上限 3rem */
  font-size: clamp(0.7rem, 3.5vw, 3rem);
  font-weight: 500;
  color: white;
  white-space: nowrap;
  margin: 0;
}

.typewriter-ghost {
  visibility: hidden;
  user-select: none;
  pointer-events: none;
}

.typewriter-visible {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
}

.cursor {
  display: inline-block;
}

.blink {
  animation: blink 0.7s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.8s ease;
}

.scroll-indicator.visible {
  opacity: 1;
}

.scroll-arrow {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-right: 2px solid rgba(255, 255, 255, 0.6);
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  transform: rotate(45deg);
  animation: bounce 1.2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) rotate(45deg);
  }
  50% {
    transform: translateY(6px) rotate(45deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-indicator {
    transition: none;
  }
  .scroll-arrow {
    animation: none;
  }
}
</style>
