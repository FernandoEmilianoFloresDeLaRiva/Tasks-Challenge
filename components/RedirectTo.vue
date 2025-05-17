<script setup lang="ts">
const props = defineProps<{ to: string }>()
const router = useRouter()
router.replace(props.to)
</script>