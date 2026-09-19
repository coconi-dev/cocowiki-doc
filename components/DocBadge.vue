<script setup lang="ts">
defineProps<{
  label: string
  detail?: string
}>()
</script>

<template>
  <aside class="doc-badge">
    <span aria-hidden="true">✓</span>
    <div>
      <strong>{{ label }}</strong>
      <small v-if="detail">{{ detail }}</small>
    </div>
  </aside>
</template>

<style scoped>
.doc-badge {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  margin: 12px 0;
  padding: 10px 14px 10px 10px;
  border: 1px solid var(--cw-border);
  border-radius: 12px;
  background: var(--cw-surface-soft);
}
.doc-badge > span {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  color: white;
  border-radius: 9px;
  background: var(--cw-accent);
  font-weight: 800;
}
.doc-badge strong,
.doc-badge small { display: block; line-height: 1.35; }
.doc-badge strong { font-size: .82rem; }
.doc-badge small { margin-top: 2px; color: var(--cw-muted); font-size: .72rem; }
</style>
