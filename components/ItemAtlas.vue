<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { registerContributorContributions } from 'cocowiki/theme'
import items from '../data/items.json'

const query = ref('')
const rarity = ref('all')
const category = ref('all')
const sort = ref('rarity')
const rarityRank: Record<string, number> = { core: 3, stable: 2, extended: 1 }
const rarityLabel: Record<string, string> = { core: '核心', stable: '稳定', extended: '扩展' }
const categoryLabel: Record<string, string> = { data: '数据层', logic: '逻辑层', interface: '交互层' }
const rarities = ['core', 'stable', 'extended']
const categories = [...new Set(items.map((item) => item.category))]
const filtered = computed(() => items
  .filter((item) => !query.value || `${item.name} ${item.description}`.toLocaleLowerCase().includes(query.value.toLocaleLowerCase()))
  .filter((item) => rarity.value === 'all' || item.rarity === rarity.value)
  .filter((item) => category.value === 'all' || item.category === category.value)
  .sort((a, b) => sort.value === 'name' ? a.name.localeCompare(b.name, 'zh-CN') : rarityRank[b.rarity] - rarityRank[a.rarity]))
const allContributors = [...new Set(items.flatMap((item) => item.contributors))]
const unregisterContributions = registerContributorContributions('documentation-atlas', items.flatMap((item) => item.contributors))
onUnmounted(unregisterContributions)
</script>

<template>
  <div class="atlas">
    <header class="atlas-header">
      <div><p class="cw-kicker">INDEX // VUE PAGE EXAMPLE</p><h1>图鉴示例</h1><p>这是一张由静态 JSON 驱动的纯 Vue 页面，演示搜索、筛选、排序与贡献统计。</p></div>
      <strong>{{ filtered.length }} <small>ITEMS</small></strong>
    </header>

    <section class="atlas-toolbar" aria-label="图鉴筛选">
      <label class="atlas-search"><span>⌕</span><input v-model="query" type="search" placeholder="搜索组件名称或说明…"></label>
      <label><span>状态</span><select v-model="rarity"><option value="all">全部</option><option v-for="name in rarities" :key="name" :value="name">{{ rarityLabel[name] }}</option></select></label>
      <label><span>层级</span><select v-model="category"><option value="all">全部</option><option v-for="name in categories" :key="name" :value="name">{{ categoryLabel[name] }}</option></select></label>
      <label><span>排序</span><select v-model="sort"><option value="rarity">状态</option><option value="name">名称</option></select></label>
    </section>

    <section class="atlas-grid">
      <article v-for="(item, index) in filtered" :key="item.id" class="atlas-card">
        <span class="atlas-card__index">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="atlas-card__content">
          <div class="atlas-card__meta"><span>{{ categoryLabel[item.category] }}</span><b>{{ rarityLabel[item.rarity] }}</b></div>
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <footer><span>MAINTAINER</span><strong>{{ item.contributors.join(' · ') }}</strong></footer>
        </div>
      </article>
      <div v-if="!filtered.length" class="cw-empty"><strong>没有符合条件的项目</strong><p>调整关键词或筛选条件再试一次。</p></div>
    </section>

    <footer class="atlas-footer"><div><h2>页面维护者</h2><p>条目中的贡献者会通过框架接口计入贡献者总览。</p></div><ContributorList :names="allContributors" /></footer>
  </div>
</template>

<style scoped>
.atlas-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; padding: 6px 0 26px; border-bottom: 1px solid var(--cw-border-strong); }
.atlas-header h1 { margin: 6px 0 4px; font-size: clamp(2rem, 4.5vw, 2.85rem); font-weight: 750; letter-spacing: -.04em; line-height: 1.15; }
.atlas-header p:last-child { max-width: 620px; margin: 0; color: var(--cw-muted); font-size: .9rem; }
.atlas-header > strong { color: var(--cw-text); font-family: var(--cw-serif); font-size: 2.5rem; line-height: 1; }
.atlas-header > strong small { color: var(--cw-muted); font: 600 .68rem var(--cw-mono); letter-spacing: .08em; }
.atlas-toolbar { position: sticky; top: 60px; z-index: 15; display: grid; grid-template-columns: 1fr repeat(3, 140px); margin-bottom: 24px; border: 1px solid var(--cw-border-strong); border-top: 0; background: var(--cw-header); backdrop-filter: blur(12px); }
.atlas-toolbar label { display: flex; align-items: center; min-height: 46px; padding: 0 14px; border-left: 1px solid var(--cw-border); }
.atlas-toolbar label > span { margin-right: auto; color: var(--cw-muted); font-family: var(--cw-mono); font-size: .68rem; font-weight: 600; letter-spacing: .06em; }
.atlas-toolbar select { max-width: 78px; color: var(--cw-text); border: 0; outline: 0; background: transparent; font-size: .78rem; font-weight: 600; }
.atlas-toolbar .atlas-search { border-left: 0; gap: 10px; }
.atlas-search > span { margin-right: 0 !important; color: var(--cw-accent) !important; font-family: var(--cw-mono); font-size: 1.05rem !important; }
.atlas-search input { min-width: 0; flex: 1; color: var(--cw-text); border: 0; outline: 0; background: transparent; font-size: .84rem; }
.atlas-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--cw-border-strong); border-left: 1px solid var(--cw-border-strong); }
.atlas-card { display: grid; grid-template-columns: 42px 1fr; min-width: 0; padding: 20px; border-right: 1px solid var(--cw-border-strong); border-bottom: 1px solid var(--cw-border-strong); background: var(--cw-surface); transition: background .16s; }
.atlas-card:hover { background: var(--cw-surface-soft); }
.atlas-card__index { color: var(--cw-muted); font: 600 .72rem var(--cw-mono); }
.atlas-card__meta { display: flex; justify-content: space-between; color: var(--cw-muted); font-family: var(--cw-mono); font-size: .66rem; letter-spacing: .06em; }
.atlas-card__meta b { color: var(--cw-gold); }
.atlas-card h2 { margin: 6px 0 4px; font-size: 1.06rem; font-weight: 700; letter-spacing: -.015em; }
.atlas-card p { min-height: 2.8em; margin: 0; color: var(--cw-muted); font-size: .8rem; line-height: 1.55; }
.atlas-card footer { display: flex; justify-content: space-between; margin-top: 14px; padding-top: 10px; border-top: 1px dashed var(--cw-border); font-family: var(--cw-mono); font-size: .66rem; }
.atlas-card footer span { color: var(--cw-muted); }
.atlas-card:empty, .atlas-grid > .cw-empty { grid-column: 1 / -1; border-right: 1px solid var(--cw-border-strong); border-bottom: 1px solid var(--cw-border-strong); }
.atlas-footer { display: flex; align-items: center; justify-content: space-between; gap: 25px; margin-top: 34px; padding: 22px 0; border-top: 1px solid var(--cw-border-strong); }
.atlas-footer h2 { margin: 0; font-size: 1rem; font-weight: 700; }
.atlas-footer p { margin: 2px 0 0; color: var(--cw-muted); font-size: .78rem; }
@media (max-width: 760px) { .atlas-toolbar { position: static; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--cw-border-strong); } .atlas-search { grid-column: 1 / -1; } .atlas-grid { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .atlas-header { align-items: flex-start; flex-direction: column; } .atlas-toolbar label { border-bottom: 1px solid var(--cw-border); } .atlas-footer { align-items: flex-start; flex-direction: column; } }
</style>
