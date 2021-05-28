<template>
  <div>
    <div style="background-color:#4f9da6; width:110%;" class="py-4 pb-4">
      <h2>Chap App</h2>
    </div>

    <form class="details-box my-5">
      <div class="from-group">
        <h4>Login to Chat</h4>
        <input
          type="text"
          v-modal="email"
          class="form-control mb-4 mt-4"
          placeholder="Enter Your Email"
        />

        <input
          type="password"
          v-modal="Password"
          class="form-control mb-4 mt-4"
          placeholder="Enter Your Password"
          v-on:keyup.enter="login"
        />
        <a class="mb-4" href="/signup">Creta an Account</a> <br />
        <button type="botton" on:click="login" class="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style scope>
body {
  width: 100%;
  background: linear-gradient(to right, #7e0f4b, #1a5865);
}
.details-box {
  padding: 5px;
  border: 1px solid lightgray;
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
  border-radius: 5px;
  background: linear-gradient(to from);
}
</style>