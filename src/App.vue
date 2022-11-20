<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <section class="hero-area">
    <div class="banner">
      <h1>
        <RouterLink to="/">Roq Trading Solutions</RouterLink>
      </h1>
    </div>
  </section>

  <section class="main-area">
    <div class="content">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>
.hero-area {
  align-items: center;
  border-bottom: 1px solid #7f0102;
  display: flex;
  height: 100px;
  vertical-align: middle;
}
.banner {
  text-align: center;
  width: 100%;
}
.main-area {
  display: block;
  padding-top: 1.5em;
  background-color: #16304b;
}
.content {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
