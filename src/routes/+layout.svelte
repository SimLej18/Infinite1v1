<script>
	import '../app.css';
    import NavBar from "../components/NavBar.svelte";
</script>

<div class="w-screen h-screen p-5">
    <NavBar/>
    <slot />
</div>
