# ElectronicRecycle.net SEO Content Automation

The website now has a data-driven resource system under `/az/resources` and `/tx/resources`.

A future automation can create one `ResourceArticle` record plus one branded hero image per post. Recommended starting cadence: 3 posts/week total, rotating local intent, device/service intent, and commercial intent.

## Required generation fields
- market: az or tx
- slug
- SEO title
- meta description
- primary keyword
- optional citySlug
- optional serviceSlug
- intro
- 3-6 useful sections
- image path + descriptive alt text
- published/updated dates

## Quality gate
Reject posts that invent addresses, hours, certifications, statistics, data-destruction claims, pricing, or pickup policies. Reject near-duplicate local pages and keyword-stuffed text. Every post should link to a relevant city/service page and answer a real question.

## Recommended pipeline
Keyword/topic queue -> draft -> policy/fact check -> duplicate check -> generate branded image -> internal-link check -> publish -> sitemap -> IndexNow/Bing notification -> Search Console performance review.
