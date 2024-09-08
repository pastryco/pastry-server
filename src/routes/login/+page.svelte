<!-- src/routes/login/+page.svelte -->
<script>
    import { handleLogin } from '../../stores/authStore';
    let email = '';
    let password = '';
    let errorMessage = '';

    async function loginUser() {
        try {
            await handleLogin(email, password);
            window.location.href = '/';
        } catch (error) {
            errorMessage = 'Login failed. Please check your credentials.';
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-base-200">
    <div class="p-8 bg-base-100 rounded-lg shadow-lg">
        <h1 class="mb-4 text-2xl font-bold text-center">Login</h1>
        {#if errorMessage}
            <p class="mb-4 text-red-500">{errorMessage}</p>
        {/if}
        <form on:submit|preventDefault={loginUser}>
            <input type="email" placeholder="Email" bind:value={email} class="input input-bordered w-full mb-4"/>
            <input type="password" placeholder="Password" bind:value={password} class="input input-bordered w-full mb-4"/>
            <button type="submit" class="btn btn-primary w-full mb-4">Login</button>
        </form>
        <div class="divider">OR</div>
        <button class="btn btn-outline w-full">Sign in with Google</button>
    </div>
</div>
