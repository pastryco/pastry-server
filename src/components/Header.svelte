<!-- src/components/Header.svelte -->
<script>
    import { authStore, handleLogout } from "../stores/authStore";
    import MaterialSymbolsDarkMode from '~icons/material-symbols/dark-mode';
    import MaterialSymbolsLightMode from '~icons/material-symbols/light-mode';
    let user;
    $: user = $authStore.user;

    function logout() {
        handleLogout();
        window.location.href = "/login";
    }
</script>

<div class="navbar bg-base-300 flex justify-between items-center px-4">
    <a class="btn btn-ghost text-xl flex items-center">
        <img src="/img/pastry.svg" class="h-6 w-6 mr-2" alt="Pastry Logo">
        <span class="text-2xl font-bold">Pastry</span>
    </a>

    {#if user}
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img src={$authStore.user.avatar} alt="User Avatar"/>
                </div>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                <li><a>Profile <span class="badge">New</span></a></li>
                <li><a>Settings</a></li>
                <li><a on:click={logout}>Logout</a></li>
            </ul>
        </div>
    {:else}
        <label class="swap swap-rotate w-10 m-2">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" class="theme-controller" value="forest" />

            <MaterialSymbolsLightMode class="swap-off fill-current h-10 w-10" />

            <MaterialSymbolsDarkMode class="swap-on fill-current h-10 w-10" />
        </label>
    {/if}
</div>
