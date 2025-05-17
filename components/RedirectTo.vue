<!--
  RedirectTo.vue
  --------------
  Instantly redirects to the given route when mounted.
  Props:
    - to: string - the route to redirect to
-->
<script setup lang="ts">
const props = defineProps<{ to: string }>()
const router = useRouter()
router.replace(props.to)
</script>