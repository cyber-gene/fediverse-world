<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="section">
    <h2>{{ t('about.title') }}</h2>
    <i18n-t keypath="about.intro1" tag="p">
      <template #fediverse><b>Fediverse</b></template>
    </i18n-t>
    <p>{{ t('about.intro2') }}</p>
    <h3>{{ t('about.features.title') }}</h3>
    <ol>
      <li>
        {{ t('about.features.item1.title') }}
        <p>{{ t('about.features.item1.description') }}</p>
      </li>
      <li>
        {{ t('about.features.item2.title') }}
        <p>{{ t('about.features.item2.description') }}</p>
      </li>
      <li>
        {{ t('about.features.item3.title') }}
        <p>{{ t('about.features.item3.description') }}</p>
      </li>
      <li>
        {{ t('about.features.item4.title') }}
        <p>{{ t('about.features.item4.description') }}</p>
      </li>
    </ol>
    <h3>{{ t('about.howto.title') }}</h3>
    <p>{{ t('about.howto.description') }}</p>
  </div>
</template>

<style scoped></style>
