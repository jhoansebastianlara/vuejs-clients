<template>
  <div class="nav">
    <ul>
      <router-link
        v-for="route in routes"
        :to="route.path"
        tag="li"
        activeClass="active" exact><a>{{ route.name }}</a></router-link>
    </ul>
  </div>
</template>

<script>
import { routes } from '../routes'

export default {
  data() {
    return {
      routes: routes
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/app.scss";

  .nav {
    ul {
      margin: 1em 0;
      padding: 0 1em;
      list-style: none;
    }

    li { display: inline-block; }

    a {
      display: block;
      padding: 6px 12px;
      text-decoration: none;
      color: color(primary);
    }

    .active {
      background-color: color(primary);
      border-radius: .25em;

      a {
        color: white;
      }
    }
  }
</style>
