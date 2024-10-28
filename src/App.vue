<template>
	<header>
		<router-link to="/">Home</router-link>
		<router-link to="/units">Units</router-link>
	</header>
	<main>
		<RouterView />
	</main>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style module lang="scss">
$header-height: 64px;

header {
  display: flex;
  padding: 1rem;
  background-color: #f0f0f0;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  height: $header-height;
}

header > a {
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-decoration: none;
  margin-left: 0.5rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: calc(100vh - $header-height);
}
</style>
