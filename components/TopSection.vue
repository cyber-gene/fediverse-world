<template>
  <div class="section center">
    <h1 class="typewriter">{{ text }}<span ref="cursorEl" class="cursor">_</span></h1>
    <div class="scroll-indicator" :class="{ visible: showIndicator }" aria-hidden="true">
      <span class="scroll-arrow"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const text = ref('');
const fullText = 'Dive into the "Federated" universe!!'; // 表示するテキスト
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
    // タイピングが完了したらカーソル点滅・インジケーター表示（既にスクロール済みなら表示しない）
    cursorEl.value?.classList.add('blink');
    if (window.scrollY <= HIDE_SCROLL_THRESHOLD_PX) {
      showIndicator.value = true;
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }
};

onMounted(() => {
  typeEffect();
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

.typewriter {
  font-family: 'JetBrains Mono', sans-serif;
  font-size: 3rem;
  font-weight: 500;
  color: white;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
  overflow: hidden;
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
  0%, 100% {
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
