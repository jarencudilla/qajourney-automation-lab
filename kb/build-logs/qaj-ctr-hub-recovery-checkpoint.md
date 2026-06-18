# QAJ CTR + Hub Recovery — Checkpoint

**Date:** 2026-06-18
**Status:** In progress, compounding confirmed (early but real)

## Context

QAJourney had a cohort of posts that previously ranked positions 1-10 and decayed over time to the 50s-80s range. This is normal decay for non-evergreen QA topics, not a one-off failure. Two levers were applied in combination:

1. **Title rewrites** — shift from soft/cheesy titles to CTR-aggressive titles
2. **Hub structure** — hub posts + internal linking to push link equity back into decayed posts and recover position

Most QAJ posts have now received one or both treatments. A minority are still untreated or mid-treatment.

## Evidence (28-day Site Kit summary, as of 2026-06-18)

- Unique visitors: 754 (+42.8%)
- Impressions: 6.7K (+21.5%)
- Clicks: 11 (+22.2%)
- Avg time on page: 3m 37s (+408.5%)

7-day GSC trend shows clicks, CTR, and position improving in the same window — the expected compounding signature of title-CTR + hub-position working together rather than independently.

## Specific observations

- Posts that decayed into the 50s are recovering into the 20s-30s range — consistent with hub link equity propagating.
- `manual-vs-automated-testing-when-and-why-to-use-each-approach`: was position ~8, now 80.7, 637 impressions, 0% CTR. This is **not** treatment failure — post is still untreated/mid-queue, and the topic has query volume that spikes periodically (e.g. hiring cycles, bootcamp cohorts) rather than holding steady. Expected to recover once treated and/or when query demand returns.
- Only one post in this dataset (`casino-game-qa-testing-claude-collaborator`) showed standout CTR (5.3% at position 10.2) — initially misread as the rewrite signal, but confirmed this post was untreated. The real signal is the network-wide lift, not a single post.

## Caveats

- Most posts are mid-treatment — this is a partial rollout read, not a completed one.
- GSC logging gap (May 2025-Apr 2026) and normal crawl/re-score lag mean this is a smoothed, delayed view, not real-time.
- Click volume is still low in absolute terms (11-23 across windows) — directionally meaningful, not yet statistically heavy.

## Conclusion

Thesis is holding: CTR-aggressive titles + hub-driven position recovery are compounding as designed. Checkpoint, not final proof — revisit after more of the cohort is treated and a longer window (3mo+) is available.
