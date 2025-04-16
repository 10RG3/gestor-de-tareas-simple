<template>
  <div class="site-wrapper">
    <main class="site-content">
      <slot />
    </main>
    
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Desarrollado con Node.js, Nuxt.js y Bulma.
        </p>
        <p>
          &copy; 2025
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.site-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}

.footer {
  margin-top: auto;
  padding: 2rem 1.5rem;
}
</style>