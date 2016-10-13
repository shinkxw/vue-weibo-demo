<template>
  <footer class="footer">
    <small>
      The <a href="https://github.com/shinkxw/vue-weibo-demo/">vue weibo demo</a>
      by <a href="https://github.com/shinkxw/">Shink</a>
    </small>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'about' }"> 关于本站</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
