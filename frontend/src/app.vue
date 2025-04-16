<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Para mejorar la apariencia de las tarjetas */
.card {
  transition: all 0.3s ease;
  height: 100%;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(10, 10, 10, 0.1);
}
</style>