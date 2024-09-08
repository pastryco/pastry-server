<!-- src/components/Header.svelte -->
<script>
    import "../app.css";
    import { authStore, handleLogout } from "../stores/authStore";
    import MaterialSymbolsDarkModeRounded from "~icons/material-symbols/dark-mode-rounded";
    import MaterialSymbolsLightModeRounded from "~icons/material-symbols/light-mode-rounded";
    let user;
    $: user = $authStore.user;

    function logout() {
        handleLogout();
        window.location.href = "/login";
    }
</script>

<div class="min-h-screen">
    <header>
        <div class="p-2">
            <div
                class="navbar bg-base-300 flex justify-between items-center p-2 rounded-2xl"
            >
                <a class="btn btn-ghost text-xl flex items-center">
                    <img
                        src="/img/pastry.svg"
                        class="h-12 w-12 mr-1"
                        alt="Pastry Logo"
                    />
                    <span class="text-2xl text-accent">Pastry</span>
                </a>

                {#if user}
                    <div class="dropdown dropdown-end">
                        <label
                            tabindex="0"
                            class="btn btn-ghost btn-circle avatar"
                        >
                            <div class="w-10 rounded-full">
                                <img
                                    src={$authStore.user.avatar}
                                    alt="User Avatar"
                                />
                            </div>
                        </label>
                        <ul
                            tabindex="0"
                            class="menu menu-compact dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a>Profile <span class="badge">New</span></a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a on:click={logout}>Logout</a></li>
                        </ul>
                    </div>
                {:else}
                    <label class="btn btn-ghost btn-circle swap swap-rotate w-12 h-12 m-2">
                        <!-- this hidden checkbox controls the state -->
                        <input
                            type="checkbox"
                            class="theme-controller"
                            value="forest"
                        />

                        <MaterialSymbolsLightModeRounded
                            class="swap-off fill-current h-8 w-8"
                        />

                        <MaterialSymbolsDarkModeRounded
                            class="swap-on fill-current h-8 w-8"
                        />
                    </label>
                {/if}
            </div>
        </div>
    </header>
    <main class="flex-1 p-4">
        <slot />
    </main>
</div>
