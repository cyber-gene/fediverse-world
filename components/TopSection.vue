<template>
  <div class="section center">
    <h1 class="typewriter">{{ text }}<span ref="cursorEl" class="cursor">_</span></h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const text = ref('');
const fullText = 'Dive into the "Federated" universe!!'; // 表示するテキスト
const index = ref(0);
const speed = 100; // タイピング速度（ミリ秒）
const cursorEl = ref<HTMLElement | null>(null);

const typeEffect = () => {
  if (index.value < fullText.length) {
    text.value += fullText.charAt(index.value);
    index.value++;
    setTimeout(typeEffect, speed);
  } else {
    // タイピングが完了したらカーソル点滅
    cursorEl.value?.classList.add('blink');
  }
};

onMounted(() => {
  typeEffect();
});
</script>

<style scoped>
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
</style>
