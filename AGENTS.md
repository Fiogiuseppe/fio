<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# Website project workflow

- Read the current Website Bible before each website task: https://docs.google.com/document/d/10hCMqucn9lKyE7vUY4g4fCfDGymYubbjAuxVQJRBm90/edit?usp=drivesdk
- Giuseppe gives creative direction in chat or by voice. ChatGPT implements approved requests directly in Fiogiuseppe/fio and uses the existing GitHub-to-Vercel deployment. Cursor is optional.
- Work on https://fiogiuseppe.vercel.app/. Keep fiogiuseppe.com unchanged until Giuseppe explicitly approves the finished site's migration.
- Preserve concurrent work. Validate the requested change, check the matching Vercel deployment and verify the live page before claiming completion.
- Never use em dashes (U+2014) in website copy, including imported content, accessibility labels and SEO metadata. Rewrite with appropriate punctuation. Run npm run check:copy before publishing.
- Follow Website Bible UPDATE 003 for a personal, specific and natural editorial voice. Review copy rather than promising results from AI detectors; preserve verified facts and the author's approved words. Apply new Bible updates as described in UPDATE 004.
- Record new decisions in the canonical Website Bible so another chat can resume from its latest version and the current GitHub code.
