import login from "./components/Login.vue";
import signup from "./components/signup.vue";
import Profil from "./components/Profil.vue";
import Chat from "./components/Chat.vue";

export default [
  { path: "/", component: login },
  { path: "/signup", component: signup },
  { path: "/chat", component: Chat },
  { path: "/profil", component: Profil }
];
