const fs = require("fs");
const path = require("path");

const ARTICLES = {
  "do-these-5-things-today-to-curb-distractions": {
    title: "Do These 5 Things Today to Curb Distractions",
    description: "Five practical changes to reduce browser distractions today: choose one outcome, batch messages, save later tabs as tasks, add friction, and make a return plan.",
    dek: "Five small changes to quiet messages, tame open tabs, and return to the work that matters.",
    image: "https://www.luzora.app/assets/images/blog/curb-distractions/og.webp",
    dateLabel: "October 9, 2026",
    readTime: "6 min read",
    datePublished: "2026-10-09",
    dateModified: "2026-10-09",
    articleSection: "Guides",
    keywords: ["curb distractions", "browser distractions", "focus", "task switching", "notification batching", "open tabs"],
    bodyHtml: `<figure class="article-cover-image"><img src="/assets/images/blog/curb-distractions/intro.webp?v=20261009-white" alt="A browser task kept in focus while distracting messages, feeds, tabs, and videos sit outside it" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
<div class="article-lead" data-article-section>
<p>You open your laptop to finish one piece of work. An email arrives. You check it, notice a link you meant to read, and open another tab. Twenty minutes later, you have more pages open but no progress on the work you came to do.</p>
<p>That pattern is familiar in <a href="https://www.reddit.com/r/productivity/comments/1q1yp9h/i_lose_half_my_day_to_context_switching_between/" target="_blank" rel="noopener noreferrer">a Reddit discussion about context switching</a>: the writer described moving from an email notification to a new tab, then losing track of the original task. In <a href="https://www.reddit.com/r/productivity/comments/1kt55d2" target="_blank" rel="noopener noreferrer">another discussion</a>, someone said that even the tabs they kept open so they would not forget them became visual distractions.</p>
<p>There is a reason this feels tiring. The <a href="https://www.apa.org/research/action/multitask" target="_blank" rel="noopener noreferrer">American Psychological Association&#39;s overview of task-switching research</a> explains that repeatedly changing tasks carries a mental cost, especially when the work is complex. You cannot remove every interruption from a normal day. You can make it easier to stay with one task and easier to return when you drift.</p>
<p>Try these five changes today.</p>
</div>
<section class="article-section" id="1-decide-what-this-work-session-is-for" data-article-section>
<h2>1. Decide what this work session is for</h2>
<p>Before opening another tab, write down one result you want from the next work session. Make it small enough to recognize when you have done it.</p>
<p>“Work on my business” is too broad. “Send the draft proposal to Amara” is clearer. If that still feels large, write the first visible move: “Open the proposal and fix the pricing section.”</p>
<p>Put that sentence where you can see it. Keep the pages required for that task open. When you catch yourself switching elsewhere, ask whether the new page helps you finish that sentence. If it does not, leave it for later.</p>
<p><strong>Do it now:</strong> Write one outcome and one first action. Give that action 25 minutes on your calendar. The 25 minutes are a starting point, not a rule; use a shorter block if that helps you begin.</p>
</section>
<section class="article-section" id="2-give-messages-a-time-to-be-checked" data-article-section>
<h2>2. Give messages a time to be checked</h2>
<p>An alert can interrupt you even if you decide not to reply. And turning every notification off indefinitely may leave you worried about missing something important.</p>
<p>Try a more workable middle ground: silence non-urgent alerts during one focus block, keep the people or channels that truly need an immediate response available, and choose when you will check the rest. For example, finish your 25-minute block, then check messages for five minutes.</p>
<p>In a <a href="https://doi.org/10.1016/j.chb.2019.07.016" target="_blank" rel="noopener noreferrer">randomized field experiment with 237 people</a>, batching smartphone notifications into predictable deliveries was associated with better self-reported attention, productivity, mood and sense of control than receiving them continuously. Completely switching alerts off caused more anxiety and fear of missing out for some participants. The lesson is to choose your interruptions deliberately, not to pretend you never need messages.</p>
<p><strong>Do it now:</strong> Turn on your device&#39;s focus or Do Not Disturb mode for one work block. Set the exceptions you genuinely need, and decide when you will check your inbox.</p>
</section>
<section class="article-section" id="3-stop-asking-open-tabs-to-remember-for-you" data-article-section>
<h2>3. Stop asking open tabs to remember for you</h2>
<p>Some tabs stay open because you need them now. Others stay open because closing them feels like losing a promise to yourself: apply for that job, read that article, compare those products, revisit that idea.</p>
<p>People describe this directly in <a href="https://www.reddit.com/r/productivity/comments/1q9bn8e/i_closed_my_browser_with_500_open_tabs_and/" target="_blank" rel="noopener noreferrer">a tab-overload discussion</a>. Several were afraid they would forget why they had opened a page once it disappeared from view. A page address alone does not preserve the intention behind it.</p>
<p>In a <a href="https://news.ycombinator.com/item?id=27157225" target="_blank" rel="noopener noreferrer">Hacker News discussion about tab overload</a>, a reader described moving tabs that represented unfinished work into a task manager. It is a small distinction with a large practical effect: a tab is a place, while a task says what you intend to do there.</p>
<p>For each page you do not need in the current session, record three things: the link, the action, and when you want to return. “Read this article” is better than an unexplained bookmark. “Read this article on Friday before planning the newsletter” is better still. Then close the tab you no longer need in front of you.</p>
<p>This is one place <a href="https://chromewebstore.google.com/detail/luzora/fllkdopncjmakhohbepbhnnmgoodjhif" target="_blank" rel="noopener noreferrer">Luzora</a> can help. From a page in your browser, make a task that keeps the page attached to a specific action and schedule. A recurring website task can come back on the days you actually need it. Luzora helps you return to the page; it does not block distractions for you.</p>
<p><strong>Do it now:</strong> Choose three tabs you have kept open “for later.” Turn each into an action with a return time, then close them.</p>
</section>
<section class="article-section" id="4-put-one-obstacle-between-you-and-your-usual-detour" data-article-section>
<h2>4. Put one obstacle between you and your usual detour</h2>
<p>You may know exactly where you go when a task gets uncomfortable: a video site, social feed, shopping tab, news page or game. Relying on willpower means making the same decision every time the urge appears.</p>
<p>Change the route instead. Sign out of the site during work hours. Remove its pinned tab. Move your phone beyond arm&#39;s reach. If you repeatedly bypass those steps, use a site blocker for a defined work period.</p>
<p>A <a href="https://doi.org/10.1093/pnasnexus/pgaf017" target="_blank" rel="noopener noreferrer">preregistered randomized trial</a> found improvements in sustained attention and well-being when participants blocked mobile internet on their smartphones for two weeks. That is a much stronger intervention than most people need today, and it does not mean every distracting site should be blocked forever. It does show that changing access can matter.</p>
<p><strong>Do it now:</strong> Pick your most common detour and add one obstacle before your next focus block. Make the useful page easier to reach than the distracting one.</p>
</section>
<section class="article-section" id="5-make-a-plan-for-the-moment-you-slip" data-article-section>
<h2>5. Make a plan for the moment you slip</h2>
<p>You will probably get distracted again. The useful question is what you will do when you notice.</p>
<p>Write a short if–then plan: “If I open a social feed while working, then I will close it, look at my one-sentence task, and do the next action for two minutes.” Or: “If a new idea sends me to another tab, then I will save the link and return to the document.”</p>
<p>This works better than a vague promise to “focus harder” because it names both the trigger and the response. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8149892/" target="_blank" rel="noopener noreferrer">Research on implementation intentions</a> finds that these specific if–then plans can help people translate goals into action, though the effect varies by setting and person.</p>
<p>Do not use the plan to punish yourself. Notice the detour, return to the next small action, and keep going.</p>
<p><strong>Do it now:</strong> Write one if–then sentence for the distraction that most often catches you. Put it beside your work.</p>
</section>
<section class="article-section" id="a-quieter-browser-starts-with-one-block" data-article-section>
<h2>A quieter browser starts with one block</h2>
<p>You do not need a complete productivity system by tonight. Choose one outcome, quiet the messages that can wait, give your later tabs a place to return, add friction to one detour, and decide how you will recover when your attention wanders.</p>
<p>If the pages you mean to revisit keep getting lost among the pages you need right now, <a href="https://chromewebstore.google.com/detail/luzora/fllkdopncjmakhohbepbhnnmgoodjhif" target="_blank" rel="noopener noreferrer">try Luzora in your browser</a>. Save the page with the action you intend to take and choose when it should come back into view.</p>
</section>`
  },
  "luzora-v1-0-9-from-page-to-task-in-a-few-taps": {
    title: "Luzora v1.0.9 is live: From the page in front of you to a task in a few taps",
    description: "See what is new in Luzora v1.0.9: page-aware task suggestions, faster scheduling, live side-panel context, visible streaks, keyboard navigation, and clearer extension data deletion.",
    dek: "Page-aware task suggestions, a faster Action–When–Time flow, live side-panel context, visible streaks, better keyboard navigation, and clearer account deletion.",
    image: "https://www.luzora.app/assets/images/blog/v1-0-9/og.webp",
    dateLabel: "September 14, 2026",
    readTime: "7 min read",
    datePublished: "2026-09-14T09:00:00+01:00",
    dateModified: "2026-09-14T09:00:00+01:00",
    articleSection: "Product update",
    keywords: ["Luzora v1.0.9", "task suggestions", "Luzora Bolt", "browser task manager", "side panel", "daily streak", "Auto Return"],
    bodyHtml: `<figure class="article-cover-image"><img src="/assets/images/blog/v1-0-9/article.webp" alt="A golden bee turning a webpage into a scheduled task through action, date, and time suggestions" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
<div class="article-lead" data-article-section>
<p>Luzora works best when the distance between noticing something and deciding what to do about it is almost invisible.</p>
<p>Version 1.0.9 makes that distance much shorter. The Add Task experience can now suggest useful actions based on the page you are viewing, guide you through when the task should happen and help you choose a time.</p>
<p>This release also makes the side panel more aware of where you are, puts your current streak somewhere you can appreciate it every day, improves keyboard navigation and draws a clearer boundary between extension data and your wider Luzora and Hive identity.</p>
<p>Here is what changed.</p>
</div>
<section class="article-section" id="a-useful-place-to-begin" data-article-section>
<h2>Task creation now gives you a useful place to begin</h2>
<p>An empty description field can create unnecessary work. You may know that you want to return to the page in front of you but still need to decide what the action should be.</p>
<p>After Add Task opens, Luzora briefly studies the available page context and presents a small set of actions that make sense for that destination. A social post may suggest reviewing its performance or following up. A trading page may suggest checking a position or completing an exchange. An article may suggest reading, reviewing or continuing it.</p>
<p>These are starting points, not commands. You can ignore them and type your own task at any time.</p>
</section>
<section class="article-section" id="one-decision-at-a-time" data-article-section>
<h2>Build the task one decision at a time</h2>
<p>The suggestion experience follows three questions: What do you want to do? When should it happen? What time should Luzora bring you back?</p>
<p>Selecting an Action writes it directly into the description. Luzora then moves to When, where choices such as Today, Tomorrow, Twice weekly, Every weekday, Weekends and Monthly can be added. The Time step provides a compact hour selector and an animated AM or PM control.</p>
<p>Every choice becomes readable text in the description. You can see the task taking shape, continue typing and edit it at any point. Moving backwards and choosing something different updates the relevant part instead of forcing you to begin again.</p>
<p>Luzora Bolt follows the same principle. Its proposed action appears selected, but you can replace it immediately when another action fits better.</p>
</section>
<section class="article-section" id="the-description-remains-yours" data-article-section>
<h2>The description remains yours</h2>
<p>The description keeps or regains focus after a suggestion is selected, and each inserted suggestion leaves a trailing space. Tap an option and continue typing naturally.</p>
<p>Closing the suggestion card does not remove it permanently. A quiet light-bulb control remains near the lower-right corner of the composer and expands back into the card when you need help.</p>
<p>The card enters gently and uses subtle directional motion between Action, When and Time. It responds softly to pointer movement without distracting from the draft.</p>
</section>
<section class="article-section" id="compact-suggestions" data-article-section>
<h2>Suggestions stay compact, even when there are more choices</h2>
<p>Action and When options remain within two rows. When more choices are available, they continue horizontally instead of increasing the card's height. You can scroll or drag sideways, while soft edge fades show when more content is available.</p>
<p>Extra space beneath the draft also lets subtasks and the centred Add sub task control scroll fully above the suggestion card. This works in both the toolbar popup and the taller side panel.</p>
</section>
<section class="article-section" id="the-current-page-stays-attached" data-article-section>
<h2>The page you are viewing stays attached</h2>
<p>When you choose an Action suggestion, Luzora captures the live page address at that moment. It also carries the recognised website name and icon into the Project field.</p>
<p>This matters most in the side panel, which can remain open while the browser page changes. Version 1.0.9 listens for tab changes and completed navigation, then refreshes the available context. New suggestions come from the page you are currently viewing—not the page that happened to be open when the panel started.</p>
<p>Older page scans cannot overwrite a newer result. If two checks finish out of order, Luzora keeps the context from the most recent page.</p>
</section>
<section class="article-section" id="bolt-uses-the-live-tab" data-article-section>
<h2>Luzora Bolt now uses the live tab from the side panel</h2>
<p>In some side-panel sessions, pressing Bolt could prepare a task for a browser New Tab page rather than the webpage beside the panel. Bolt now resolves the live active tab before capturing the destination.</p>
<blockquote class="article-callout"><p>This page. This intention. The right place to return.</p></blockquote>
</section>
<section class="article-section" id="daily-streak-at-a-glance" data-article-section>
<h2>Your daily streak is now visible at a glance</h2>
<p>The signed-in header now includes a compact streak pill showing your current daily streak from Luzora's existing consistency system. It uses the same completion history that powers the consistency view, so it is not a separate counter.</p>
<p>Hovering over the pill reveals a gentle Streak tooltip beneath it after a short delay. Consistency is now something you can appreciate whenever you open Luzora, not something you have to look up.</p>
</section>
<section class="article-section" id="keyboard-navigation" data-article-section>
<h2>Keyboard navigation feels more complete</h2>
<p>On screens with a back action, Escape now returns to the previous Luzora screen. From Profile, for example, Escape returns to Home.</p>
<p>Confirmation experiences respect the keyboard too. In the logout confirmation, Escape cancels and Enter confirms Logout. These shortcuts make navigation faster while keeping destructive actions behind a clear confirmation.</p>
</section>
<section class="article-section" id="clearer-deletion-boundary" data-article-section>
<h2>Extension deletion no longer means deleting your Hive identity</h2>
<p>Luzora and the Hive are connected, but deleting extension data and requesting complete account deletion are different actions.</p>
<p>Delete extension data removes extension tasks, projects, folders, completion history, preferences and local extension account state. It does not silently erase the member's Hive identity, Hive Points, quests, referrals or wider Hive progress.</p>
<p>A complete deletion across Luzora remains a separate request through the Data Deletion page. The clearer boundary reduces the risk of someone removing more than they intended.</p>
</section>
<section class="article-section" id="small-details" data-article-section>
<h2>Small details make the extension feel calmer</h2>
<ul><li>The BETA tag has a quieter neutral background</li><li>The Home Bolt button no longer carries an unnecessary raised shadow</li><li>Recovery guidance has more breathing room</li><li>The streak tooltip appears beneath its control with a softer entrance</li><li>Suggestion spacing, edge fades and scrolling behave consistently across layouts</li><li>Task controls preserve their intended focus and typing flow across updates</li></ul>
<p>Price alerts are not included in v1.0.9. Supporting work may exist in development, but cryptocurrency target-price monitoring remains unavailable in the published extension.</p>
</section>
<section class="article-section" id="open-choose-decide" data-article-section>
<h2>Open the page. Choose the action. Decide when.</h2>
<p>Version 1.0.8 gave Luzora a persistent place beside your work. Version 1.0.9 makes that space more helpful.</p>
<p>Open Add Task on the page you want to return to. Choose an action that matches your intention, decide when it belongs and set a time if you need one. Edit as much or as little as you want, then let Luzora keep the page and the promise together.</p>
<blockquote class="article-callout"><p>The task still belongs to you. Luzora simply makes it easier to begin.</p></blockquote>
</section>`
  },
  "luzora-v1-0-8-your-work-now-stays-beside-you": {
    title: "Luzora v1.0.8 is live: Your work now stays beside you",
    description: "See what is new in Luzora v1.0.8: a persistent browser side panel, reliable shortcut routing, improved Luzora Bolt, link dropping, Auto Return improvements, and stronger security.",
    dek: "A complete side-panel workspace, shortcuts that choose one reliable destination, easier page capture, stronger Auto Return, and tighter security.",
    image: "https://www.luzora.app/assets/images/blog/v1-0-8/og.webp",
    dateLabel: "September 13, 2026",
    readTime: "6 min read",
    datePublished: "2026-09-13T19:00:00+01:00",
    dateModified: "2026-09-13T19:00:00+01:00",
    articleSection: "Product update",
    keywords: ["Luzora v1.0.8", "Luzora side panel", "Luzora Bolt", "browser task manager", "Chrome side panel", "Auto Return"],
    bodyHtml: `<figure class="article-cover-image"><img src="/assets/images/blog/v1-0-8/article.webp" alt="A browser workspace with a webpage and a persistent Luzora task panel working side by side" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
<div class="article-lead" data-article-section>
<p>Luzora has always lived where your work happens: inside the browser.</p>
<p>Version 1.0.8 takes that idea further by giving Luzora a place that can remain open beside the page you are using. Instead of reopening a small popup every time you want to check a task, create a reminder or use Luzora Bolt, you can now keep your workspace within reach in the browser’s side panel.</p>
<p>This is a focused update, but it changes the rhythm of using Luzora. The product no longer needs to appear for a moment and disappear. It can stay with you while you work.</p>
<p>Here is what changed.</p>
</div>
<section class="article-section" id="luzora-now-has-a-side-panel" data-article-section>
<h2>Luzora now has a side panel</h2>
<p>The toolbar popup is useful when you want to do something quickly. It opens, helps you act and gets out of the way. But some work needs more continuity.</p>
<p>You may want to review today’s tasks while researching, create several reminders without losing sight of the page in front of you, or capture an intention the moment it appears.</p>
<p>Version 1.0.8 introduces a complete side-panel experience for that kind of work. It carries the same Luzora experience as the popup, including Home, your task list, task creation, settings and Luzora Bolt. It remains available beside the current webpage, giving you more room without turning Luzora into a separate destination.</p>
<p>From Settings, you can switch from the popup to the side panel. If you prefer the compact experience, you can switch back at any time. The choice belongs to you.</p>
</section>
<section class="article-section" id="shortcuts-understand-where-luzora-is-open" data-article-section>
<h2>Your shortcuts now understand where Luzora is open</h2>
<p>A persistent interface is only useful when it behaves predictably.</p>
<p>Before version 1.0.8, a shortcut could not reliably tell whether Luzora was already active in the side panel. In some cases, the shortcut could address the panel and still open the popup, leaving two versions of Luzora on screen.</p>
<p>That is now fixed at the routing level. When you use a shortcut, Luzora first checks whether an active side panel is available in the current browser window:</p>
<ul><li>If the side panel confirms that it is active, Luzora uses that panel.</li><li>If no side panel responds, Luzora opens the toolbar popup.</li><li>It does not deliberately open both for the same action.</li></ul>
<p>The same rule applies to Luzora Bolt. The live panel must acknowledge the request before the extension decides where the action belongs, so the behaviour remains dependable even after Chrome restarts the background service worker.</p>
<blockquote class="article-callout"><p>One shortcut. One destination. One active Luzora experience.</p></blockquote>
</section>
<section class="article-section" id="bolt-feels-more-natural-in-the-panel" data-article-section>
<h2>Luzora Bolt feels more natural in the panel</h2>
<p>Luzora Bolt is designed to turn the page in front of you into an action you can return to.</p>
<p>While the page remains visible, Bolt can prepare a task from its address, title, icon and page context without forcing you to leave the workspace you are using. You can edit the suggested action, add a date or recurrence, and save it while the original page remains beside Luzora.</p>
<p>The panel also keeps up when you switch browser tabs. Bolt uses the page you are currently viewing rather than remaining attached to the tab where the panel was first opened.</p>
<p>The page and the intention stay in view together.</p>
</section>
<section class="article-section" id="drop-a-link-turn-it-into-a-task" data-article-section>
<h2>Drop a link. Turn it into a task.</h2>
<p>You can now drag a web link into Luzora from a page, the address bar or another compatible browser surface. Luzora recognises the destination and opens a Bolt draft around it. From there, describe what you want to do and decide when you want to return.</p>
<p>This is useful for articles you want to finish, dashboards you need to check, files you need to review, forms you need to submit or any browser destination that represents unfinished work.</p>
<p>Link drops are handled carefully. Luzora accepts normal HTTP and HTTPS destinations while rejecting executable links, embedded data and addresses containing credentials.</p>
</section>
<section class="article-section" id="a-side-panel-that-respects-focus" data-article-section>
<h2>A side panel that still respects focus</h2>
<p>Moving the full interface into a taller, persistent space revealed small interactions that matter more on compact and touch-enabled screens.</p>
<p>Version 1.0.8 improves how task fields retain focus and scroll position during editing. It also keeps confirmation sheets, including logout and unfinished-draft warnings, centred within the available panel rather than treating the interface like a fixed-size popup.</p>
<p>The side panel is not merely a stretched copy of the old window. It is the same product adapting to a different way of working.</p>
</section>
<section class="article-section" id="auto-return-is-more-dependable" data-article-section>
<h2>Auto Return is more dependable across browser themes</h2>
<p>The Auto Return notice now resolves the browser’s colour preference when it appears and applies the appropriate presentation directly. This keeps the countdown readable and consistent in light and dark environments without relying on the host page to interpret its theme.</p>
<p>Auto Return messages also reject communication that does not come from Luzora itself. The reminder remains isolated from the surrounding page while preserving the controls to cancel the return or go immediately.</p>
</section>
<section class="article-section" id="a-tighter-security-boundary" data-article-section>
<h2>A tighter security boundary</h2>
<p>Keeping Luzora open for longer makes clear boundaries even more important.</p>
<p>Version 1.0.8 strengthens the extension’s Content Security Policy. Extension pages can connect only to the services Luzora uses for account sync and product analytics. Embedded objects and frames are blocked, base-page rewriting is blocked, and other pages cannot frame the extension.</p>
<p>The side-panel messaging also validates the sending extension, the target browser window and a unique request identifier before treating a panel as active.</p>
<p>These changes are mostly invisible, as good security work often is. Their purpose is to ensure that the convenience of a persistent workspace does not loosen the rules around what the extension accepts or communicates with.</p>
</section>
<section class="article-section" id="a-cleaner-release" data-article-section>
<h2>A cleaner release</h2>
<p>Version 1.0.8 removes assets and experimental files that are not used by the published extension. Even with the complete side-panel interface and its new controls, the final release package is smaller than the previous package.</p>
<p>We also replaced the old Reddit shortcut in About Luzora with Telegram, making it easier to reach the active Luzora community.</p>
</section>
<section class="article-section" id="choose-how-luzora-works-with-you" data-article-section>
<h2>Choose how Luzora works with you</h2>
<p>Version 1.0.7 improved the beginning of the Luzora journey. Version 1.0.8 improves what it feels like to keep Luzora with you after that beginning.</p>
<p>Use the popup for a quick check. Use the side panel when you want your tasks and the page in front of you to share the same workspace. Move between them when your work changes, and let the shortcuts follow that choice without opening two interfaces at once.</p>
<p>Luzora is still a tool for remembering what to do, where to do it and when to return.</p>
<blockquote class="article-callout"><p>Now it can stay beside you while you do it.</p></blockquote>
</section>`
  },
  "luzora-v1-0-7-better-beginning-smoother-return": {
    title: "Luzora v1.0.7 is live: A better beginning and a smoother return",
    description: "See what is new in Luzora v1.0.7, including personalised onboarding, guided setup, improved Google and X sign-in, smarter page capture, Luzora Bolt, and Auto Return controls.",
    dek: "Personal onboarding, safer sign-in, a guided first routine, smarter page capture, clearer Bolt suggestions, and a more dependable Auto Return experience.",
    image: "https://www.luzora.app/assets/images/blog/v1-0-7/og.webp",
    dateLabel: "September 13, 2026",
    readTime: "8 min read",
    datePublished: "2026-09-13T09:00:00+01:00",
    dateModified: "2026-09-13T09:00:00+01:00",
    articleSection: "Product update",
    keywords: ["Luzora v1.0.7", "Luzora onboarding", "Luzora Bolt", "Auto Return", "browser task manager", "Google sign-in", "X sign-in"],
    bodyHtml: `<figure class="article-cover-image"><img src="/assets/images/blog/v1-0-7/article.webp" alt="A Luzora task interface connecting account setup, webpage context, completed tasks, security, and a timed return" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
<div class="article-lead" data-article-section>
<p>Luzora v1.0.7 is now live.</p>
<p>Our previous release made Luzora faster, safer and more reliable. Version 1.0.7 focuses on what happens when someone first meets Luzora, and how easily they can turn that first interaction into useful work.</p>
<p>New members now receive a more personal introduction. Signing in is safer and clearer. Creating the first task feels more guided. Luzora also understands the page behind a task more accurately, particularly when you are working with email.</p>
<p>Here is what changed.</p>
</div>
<section class="article-section" id="onboarding-now-begins-with-you" data-article-section>
<h2>Onboarding now begins with you</h2>
<p>A productivity tool should not assume everyone works the same way.</p>
<p>When someone joins Luzora, the new onboarding experience asks about the kind of work they do, the websites they regularly use and the activities they want to complete on those websites.</p>
<p>Luzora uses those answers to help create a practical starting routine.</p>
<p>A student might want to return to an online course three evenings each week. A creator might need to publish on YouTube and respond to comments. A job seeker may want to check new opportunities and follow up on applications.</p>
<p>Instead of giving everyone the same empty task list, Luzora helps each person begin with something relevant to their life.</p>
<p>The experience also:</p>
<ul><li>Shows one focused question at a time</li><li>Suggests websites based on the member’s work</li><li>Provides three practical activity ideas for supported websites</li><li>Lets members describe activities in their own words</li><li>Turns selected activities into actual Luzora tasks</li><li>Keeps answers safe if the extension closes midway</li><li>Allows onboarding to be skipped without creating unwanted tasks</li></ul>
<p>If someone decides to leave and start again, Luzora now asks before removing their progress.</p>
</section>
<section class="article-section" id="your-first-routine-is-ready" data-article-section>
<h2>Your first routine is ready before you enter Home</h2>
<p>The new onboarding process does more than collect answers.</p>
<p>Before account creation, Luzora prepares the chosen activities as a routine. Members can review what will be created, make sure it reflects what they want and continue when they are ready.</p>
<p>Those tasks are only committed after the account is properly established. Refreshing an authorization window or retrying a sign-in cannot create the same onboarding tasks twice.</p>
<p>This gives new members a useful Home screen without risking duplicate or incorrectly owned tasks.</p>
</section>
<section class="article-section" id="a-guided-tour-helps-you-find-your-way" data-article-section>
<h2>A guided tour helps you find your way</h2>
<p>After setup, Luzora now offers a short, interactive tour.</p>
<p>The tour introduces the parts of the extension by showing them in context:</p>
<ul><li>Today’s tasks and folders</li><li>The complete task list</li><li>Luzora Bolt</li><li>The Add New Task button</li><li>The task description field</li><li>Auto Return</li></ul>
<p>The guide does not simply describe these features from a separate help page. It leads members to the actual controls they will use.</p>
<p>After the first task is created, Luzora also explains Auto Return and gives the member a clear opportunity to activate it.</p>
<p>The goal is simple: a new user should not have to explore every screen alone before understanding how Luzora can help.</p>
</section>
<section class="article-section" id="google-and-x-sign-in-return-to-the-extension" data-article-section>
<h2>Google and X sign-in now return to the extension</h2>
<p>Signing into the extension should not accidentally take someone into the Hive.</p>
<p>Version 1.0.7 separates the extension authentication journey from the Hive experience. When members choose Google or X, the authorization window now returns the completed session to the extension.</p>
<p>Google sign-in also lets the user choose which Google account to continue with instead of silently selecting an account already open in the browser.</p>
<p>Email sign-in received smaller but important improvements too:</p>
<ul><li>Saved email suggestions wait until the email field is deliberately selected</li><li>New members receive validation messages that fit account creation</li><li>Members who skipped onboarding receive neutral, task-free signup messaging</li><li>Returning members are taken into the appropriate password flow</li><li>Verification and resend states are clearer</li><li>Passwords are never written into saved extension state</li></ul>
</section>
<section class="article-section" id="luzora-understands-the-page-behind-your-words" data-article-section>
<h2>Luzora understands the page behind your words</h2>
<p>A task is more useful when it remembers where the work needs to happen.</p>
<p>Luzora now recognises more ways people naturally refer to the page they are viewing. Phrases such as “reply to this email,” “finish this article,” or “continue this course” can connect the task to a compatible open page.</p>
<p>Email received special attention.</p>
<p>When you create a task such as “reply to this email tomorrow” while viewing a message in Gmail or another supported webmail service, Luzora can retain the exact message address, not merely the general inbox.</p>
<p>It also follows clear safeguards:</p>
<ul><li>“This email” will not attach an unrelated webpage</li><li>General mentions of email will not automatically capture the open message</li><li>A link you explicitly provide takes priority</li><li>A manually selected destination will not be overwritten later</li><li>Subtasks can keep destinations separate from their parent task</li></ul>
<p>This makes returning more precise. When the task comes back, Luzora has a better chance of bringing back the actual place where the action began.</p>
</section>
<section class="article-section" id="luzora-bolt-gives-you-a-clearer-starting-point" data-article-section>
<h2>Luzora Bolt gives you a clearer starting point</h2>
<p>Luzora Bolt now presents the page it detected before you create the task.</p>
<p>The suggested action remains editable, but the original page stays attached even if you replace the suggested description with your own words.</p>
<p>This makes Bolt feel less like a generic task shortcut and more like what it was created to be: a quick bridge between the page you are viewing and the action you want to remember.</p>
</section>
<section class="article-section" id="auto-return-is-easier-to-understand-and-control" data-article-section>
<h2>Auto Return is easier to understand and control</h2>
<p>Auto Return has a redesigned on-page notification.</p>
<p>The new presentation clearly shows:</p>
<ul><li>Where Luzora is preparing to return</li><li>The task connected to that destination</li><li>How much time remains</li><li>The option to cancel</li><li>The option to go immediately</li></ul>
<p>Members can now choose a countdown of 10, 20, 30 or 60 seconds.</p>
<p>The notification adapts to light and dark browser environments, remains compact and gives people enough information to understand what is happening before the page changes.</p>
<p>Auto Return remains optional. Website access is still requested only when the member decides to enable it.</p>
</section>
<section class="article-section" id="a-more-consistent-interface" data-article-section>
<h2>A more consistent interface</h2>
<p>Version 1.0.7 brings the extension’s major actions into the updated Luzora button system.</p>
<p>Primary, secondary, tertiary and text actions now share consistent sizing, colours, pressed states, disabled states and loading behaviour.</p>
<p>We also improved several surrounding details:</p>
<ul><li>Calendar month labels are visible and aligned</li><li>Add Task warns before an unfinished draft is discarded</li><li>The warning can be disabled and restored from Preferences</li><li>Projectless tasks receive clearer visual identities</li><li>Settings, privacy and account controls are better organised</li><li>Username conflicts are handled more safely across sign-in methods</li><li>Onboarding progress moves smoothly instead of snapping between steps</li><li>Motion respects reduced-motion preferences</li></ul>
<p>These changes are individually small, but together they make the extension feel more predictable.</p>
</section>
<section class="article-section" id="what-is-not-included-in-v1-0-7" data-article-section>
<h2>What is not included in v1.0.7</h2>
<p>Price alerts are not part of this release.</p>
<p>Some supporting work exists in development, but the feature remains deliberately hidden. Version 1.0.7 should not be presented as monitoring cryptocurrency prices or notifying members when a target price is reached.</p>
<p>This release is about onboarding, authentication, context capture, guidance and a more polished task experience.</p>
</section>
<section class="article-section" id="start-with-something-that-matters" data-article-section>
<h2>Start with something that matters</h2>
<p>Luzora v1.0.7 makes the first few minutes more useful.</p>
<p>It learns enough to help you begin. It guides you through the important controls. It keeps sign-in inside the extension. It connects your words to the right page more carefully. And when it is time to return, it gives you more control over how that return happens.</p>
<p>Open Luzora, create one task connected to something you genuinely want to complete, and choose when you want to see it again.</p>
<blockquote class="article-callout"><p>That is where consistency begins.</p></blockquote>
</section>`
  },
  "meet-the-hive-how-participation-and-value-work": {
    title: "Meet the Hive: How Participation and Value Work",
    description: "Meet the Luzora Hive and learn how quests, Hive Points, referrals, profiles, member Hives, public schedules, collaboration, and community value work.",
    dek: "The Hive is where participation becomes visible: complete quests, create useful work, grow your reputation, build a community, and help Luzora move forward.",
    image: "https://www.luzora.app/assets/images/blog/meet-the-hive/cover.webp",
    dateLabel: "September 10, 2026",
    readTime: "8 min read",
    datePublished: "2026-09-10T09:00:00+01:00",
    dateModified: "2026-09-10T09:00:00+01:00",
    articleSection: "Announcements",
    keywords: ["Luzora Hive", "Hive Points", "HP", "community participation", "Luzora quests", "member Hives", "public schedules", "Luzora marketplace"],
    bodyHtml: `
      <figure class="article-cover-image"><img src="/assets/images/blog/meet-the-hive/cover.webp" alt="A thriving community of bees completing quests, creating schedules and contributing to connected Hives" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
      <div class="article-lead is-revealed" data-article-section>
        <p>Luzora helps people return to the things they intend to do. The Hive gives that follow-through a community.</p>
        <p>It is being built as the home of participation across Luzora: a place to complete quests, join conquests, share knowledge, create useful work, build a visible reputation and contribute to victories that are larger than one person.</p>
        <p>Inside the Hive, participation should not disappear into a feed. Useful actions should leave a record. Consistency should be visible. The people who teach, welcome, create, refer, test and advocate should be able to show how they helped the product and its community grow.</p>
        <p>That is the role of the Hive—and this is how its main parts fit together.</p>
      </div>
      <section class="article-section is-revealed" id="a-home-for-participation-conquests-and-victory" data-article-section>
        <h2>A home for participation, conquests and victory</h2>
        <p>The Hive brings Luzora’s community activity into one connected system.</p>
        <p>Members can take part in quests, learn about Luzora, support campaigns and compete for positions on the leaderboard. Some activities are individual. Others can become conquests in which people or Hives work toward a shared objective.</p>
        <p>The leaderboard is not meant to reward noise. It is meant to make meaningful participation visible. A member who consistently completes useful activities, helps others and creates work the community can use should build a stronger record over time than someone who appears once, posts repeatedly and adds no real value.</p>
        <p>This also makes competition more constructive. The goal is not simply to collect points. The goal is to give people clear ways to contribute, show what they have done and keep moving toward the next useful action.</p>
      </section>
      <section class="article-section is-revealed" id="your-profile-is-your-record" data-article-section>
        <h2>Your profile is your record</h2>
        <p>Every member has a Hive profile. Over time, that profile is intended to become a richer record of what the person does and how consistently they have shown up.</p>
        <p>A profile can bring together participation such as:</p>
        <ul><li>Quests and conquests completed</li><li>Hive Points earned</li><li>Referral and community-building activity</li><li>Content and other verified contributions</li><li>Schedules created for public use</li><li>Recognitions, rankings and community achievements</li></ul>
        <p>This matters because a username tells people very little. A history of useful action tells them much more.</p>
        <p>Someone may become known for writing excellent guides, creating reliable schedules, welcoming new members, producing strong videos or representing Luzora in public. The profile gives those contributions somewhere to accumulate instead of letting each one disappear after it happens.</p>
      </section>
      <section class="article-section is-revealed" id="how-hive-points-work" data-article-section>
        <h2>How Hive Points work</h2>
        <p>Hive Points, or HP, are Luzora’s measure of participation and contribution. They connect activity in the Hive with useful activity across the wider Luzora product.</p>
        <p>Members can earn eligible Hive Points by:</p>
        <ul><li>Completing tasks with the Luzora extension or future Luzora apps</li><li>Following through on eligible recurring activities</li><li>Completing Hive quests and taking part in conquests</li><li>Referring verified members to Luzora</li><li>Helping referrals become active Luzora users</li><li>Creating useful, verifiable content</li><li>Supporting other community members</li><li>Representing Luzora online or at physical events</li></ul>
        <p>Task-completion rewards can vary by plan. Free members and Pro members may earn different amounts for eligible activity, with Pro participation receiving a higher rate where the applicable reward rules say so. Quest cards show the amount available before a member begins.</p>
        <p>Not every action automatically earns HP. Some activities can be verified by the product, while others need evidence and a team or community review. Clear eligibility rules protect the system from spam and make the record more meaningful for everyone.</p>
        <blockquote class="article-callout"><p>Hive Points are not money, a cryptocurrency or a promise of future cash value. They are a visible record used within Luzora’s participation and reward system.</p></blockquote>
        <p>As the system grows, HP is also planned to unlock practical uses. One example is streak repair: a member who breaks an eligible streak may be able to spend Hive Points to restore it, subject to the rules shown at the time. More uses will be introduced carefully as the Hive develops.</p>
      </section>
      <section class="article-section is-revealed" id="creating-value-is-bigger-than-completing-a-quest" data-article-section>
        <h2>Creating value is bigger than completing a quest</h2>
        <p>Quests provide a clear starting point, but value is not limited to a button on a task card.</p>
        <p>A member can create value by making something that helps another person understand, use or discover Luzora. That could be a thoughtful article, an educational thread, a useful video, a product demonstration, a translation, a community resource or constructive feedback that improves the experience.</p>
        <p>Value can also be created through advocacy. A member might explain Luzora during an X Space, introduce it at a school or professional community, demonstrate it at an event or help someone set up the product in person. When that effort can be recorded and verified, it can form part of the member’s contribution history.</p>
        <p>The same principle applies to referrals. Inviting a person is useful, but helping the right person discover Luzora and become an active user creates more lasting value. The system is therefore intended to recognise both the introduction and the quality of participation that follows it.</p>
        <p>Good contribution is not measured only by reach. A clear answer that helps one new member can be more useful than a loud post that helps nobody. The Hive should make room for both visible creators and the quieter people who keep a community healthy.</p>
      </section>
      <section class="article-section is-revealed" id="building-your-own-hive" data-article-section>
        <h2>Building your own Hive</h2>
        <p>The Hive is not only a name for the entire Luzora community. It is also the model for smaller member-led communities inside it.</p>
        <p>Today, referrals form the earliest version of these relationships. When someone joins through your referral, that person becomes part of your Hive network. The value created by active referrals can contribute to your own progress and, as the system expands, to the standing of your Hive.</p>
        <p>The fuller member-Hive system is planned to let members create a Hive, invite others and compete on a shared Hive leaderboard. A person will belong to only one member Hive at a time, but they will not be trapped there. Members will be able to move when another community better matches the value, culture or support they need.</p>
        <p>That creates a healthy responsibility for Hive leaders. Recruitment may bring someone in, but leadership must give them reasons to stay.</p>
        <p>A strong Hive might provide:</p>
        <ul><li>Useful guidance for new members</li><li>Shared goals and organised conquests</li><li>Accountability and encouragement</li><li>Education, resources and practical support</li><li>Recognition for members who contribute</li><li>A culture that makes participation worth returning to</li></ul>
        <p>When members create value, they strengthen their own records. When a Hive consistently helps its members create value, the Hive itself can grow in standing. Individual progress and collective progress reinforce each other.</p>
      </section>
      <section class="article-section is-revealed" id="public-schedules-and-the-marketplace" data-article-section>
        <h2>Public schedules and the marketplace</h2>
        <p>Luzora is built around turning intentions into actions at the right place and time. Some of the best action plans should not have to be rebuilt by every person from scratch.</p>
        <p>An upcoming part of the Hive will allow members to create schedules for public use. A creator might publish a revision plan, a job-search routine, a course-completion schedule, a fitness sequence or a structured way to follow an important online process.</p>
        <p>Those schedules are intended to live in a Hive marketplace where other members can discover them, obtain them and import them into Luzora. The creator’s profile can show what they have published, while ratings, usage and review systems can help the community identify schedules that genuinely work.</p>
        <p>This turns practical knowledge into something reusable. Instead of only telling someone to “be consistent,” a creator can give them a sequence they can actually follow.</p>
        <p>Marketplace availability, purchasing methods, creator rewards and review rules will be explained when those features are released. Until then, references to the marketplace describe the direction of the product, not a currently available transaction or guaranteed earning opportunity.</p>
      </section>
      <section class="article-section is-revealed" id="a-place-for-partner-communities" data-article-section>
        <h2>A place for partner communities</h2>
        <p>The Hive is also being designed for collaboration beyond Luzora.</p>
        <p>Projects may be able to bring educational activities, product tasks and community campaigns into the Hive. Luzora members can discover and participate in those activities, while partner communities can use the Hive to organise contributions and introduce their members to Luzora’s system.</p>
        <p>Done well, this creates more than promotion. It can give members new things to learn, new problems to solve and new communities to meet. It can also give partner projects a clearer way to recognise genuine participation instead of relying only on impressions or follower counts.</p>
        <p>Every collaboration will need transparent requirements, verification rules and rewards. Members should be able to understand what they are being asked to do, what evidence is required and what they can earn before taking part.</p>
      </section>
      <section class="article-section is-revealed" id="what-the-hive-is-building-toward" data-article-section>
        <h2>What the Hive is building toward</h2>
        <p>The Hive begins with a simple idea: useful participation deserves to be visible.</p>
        <p>Quests make the next contribution clear. Profiles preserve the record. Hive Points help measure eligible participation. Referrals connect people. Member Hives will turn those relationships into communities. Public schedules will let members package knowledge into something others can use. The marketplace will help that work travel further. Conquests and partner activities will give individuals and Hives bigger goals to pursue together.</p>
        <p>Some of these systems are available now. Others are being built in stages. As each one becomes live, its exact eligibility, verification, reward and participation rules will be shown in the product.</p>
        <p>What will remain consistent is the principle beneath them:</p>
        <blockquote class="article-callout"><p>Create value for yourself. Create value for another person. Create value for the community and the product we are building together.</p></blockquote>
        <p>The Hive is where that work can be seen, remembered and carried forward.</p>
        <p><a href="https://hive.luzora.app/" target="_blank" rel="noopener noreferrer">Enter the Hive</a>, complete your next quest and begin building your record of contribution.</p>
      </section>
    `
  },
  "finish-online-course-on-time": {
    title: "Found a New Course? 5 Ways to Stay on Track and Finish It on Time",
    description: "Learn how to finish an online course on time by defining the outcome, scheduling realistic sessions, reducing return friction, studying actively, and planning for missed days.",
    dek: "A practical, research-backed system for turning a new online course into scheduled sessions, useful learning, and a finish line you can actually reach.",
    image: "https://www.luzora.app/assets/images/blog/course-completion/og.webp",
    dateLabel: "September 8, 2026",
    readTime: "7 min read",
    datePublished: "2026-09-08T09:00:00+01:00",
    dateModified: "2026-09-08T09:00:00+01:00",
    articleSection: "Guides",
    keywords: ["finish online course", "online course completion", "online learning", "study schedule", "self-regulated learning", "course motivation", "Luzora"],
    faqs: [
      { question: "How can I finish an online course without losing motivation?", answer: "Do not make motivation responsible for the entire course. Define the result you want, schedule realistic sessions, record exactly where to return and use a recovery rule whenever you miss a session." },
      { question: "How many times a week should I study an online course?", answer: "Choose a schedule you can maintain during a normal week. Two or three focused sessions are often more realistic than promising to study every day and abandoning the plan when life becomes busy." },
      { question: "What should I do when I fall behind?", answer: "Return during your next available session, even if you can only study for 15 minutes. Continue from the next clear action, adjust the deadline if necessary and avoid turning one missed day into a complete restart." }
    ],
    bodyHtml: `
      <figure class="article-cover-image"><img src="/assets/images/blog/course-completion/cover.webp" alt="A laptop course connected to a weekly learning plan and seven steps leading to completion" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
      <div class="article-lead is-revealed" data-article-section>
        <p>Buying a course can feel suspiciously similar to making progress.</p>
        <p>You find the perfect course. You watch the introduction. Perhaps you complete the first lesson. For a few days, becoming better at the subject feels almost inevitable.</p>
        <p>Then the course becomes another open tab.</p>
        <p>Work gets busy. You miss one study session. Returning now requires finding the course, remembering your password, locating your last lesson and figuring out what you were learning.</p>
        <p>Eventually, “I’m taking a course” quietly becomes “I bought a course.”</p>
        <p>This usually is not a problem of intelligence or even motivation. Online courses give us flexibility, but flexibility means we must provide our own structure. Research into online learning repeatedly points to skills such as time management, effort regulation and monitoring your own understanding—not enthusiasm alone—as important parts of academic success. <a href="https://www.sciencedirect.com/science/article/pii/S1096751615000251" target="_blank" rel="noopener noreferrer">Read Broadbent and Poon’s systematic review</a>.</p>
        <p>Here are five ways to create that structure.</p>
      </div>
      <section class="article-section is-revealed" id="1-decide-what-completing-the-course-means" data-article-section>
        <h2>1. Decide what completing the course means</h2>
        <p>Before watching another lesson, answer one question:</p>
        <blockquote class="article-callout"><p>What should I be able to do when this course is over?</p></blockquote>
        <p>“Learn graphic design” is too broad.</p><p>“Design a complete landing page for my business” gives the course a destination.</p>
        <p>“Understand digital marketing” is vague.</p><p>“Create and launch my first advertising campaign” gives you something concrete to work toward.</p>
        <p>Review the course curriculum and identify:</p>
        <ul><li>The lessons you must complete</li><li>The exercises that matter</li><li>The project you want to produce</li><li>The date you want to finish</li></ul>
        <p>Not every bonus lesson deserves the same attention. Your goal is not necessarily to consume every minute of video. Your goal is to gain and apply the skill you came for.</p>
        <p>Write your finish line somewhere visible:</p>
        <blockquote class="article-callout"><p>By October 30, I will complete this course and use it to create my first portfolio website.</p></blockquote>
        <p>Now the course is connected to a real outcome.</p>
      </section>
      <section class="article-section is-revealed" id="2-turn-the-course-into-scheduled-sessions" data-article-section>
        <h2>2. Turn the course into scheduled sessions</h2>
        <p>“I’ll study when I have time” sounds reasonable, but it leaves every study session open to negotiation.</p>
        <p>A better plan specifies when and where the work will happen:</p>
        <blockquote class="article-callout"><p>On Tuesday and Thursday at 7 p.m., I will complete one lesson at my desk.</p></blockquote>
        <p>This resembles an implementation intention: a plan that connects a specific situation to a specific action. A meta-analysis of 94 independent tests found that these plans helped people translate intentions into action. <a href="https://doi.org/10.1016/S0065-2601%2806%2938002-1" target="_blank" rel="noopener noreferrer">Read the implementation-intentions research</a>.</p>
        <p>You can create a realistic course schedule with a simple calculation:</p>
        <ol><li>Count the lessons or modules.</li><li>Decide how many sessions you can genuinely complete each week.</li><li>Estimate your finish date.</li><li>Add an extra week for interruptions.</li></ol>
        <p>If a course has 24 lessons and you can complete three each week, plan for eight weeks—then add some breathing room.</p>
        <p>Avoid building the schedule around your most ambitious week. Build it around a normal week.</p>
        <p>Two reliable sessions every week are more valuable than promising yourself two hours every day and disappearing after Wednesday.</p>
      </section>
      <section class="article-section is-revealed" id="3-make-returning-ridiculously-easy" data-article-section>
        <h2>3. Make returning ridiculously easy</h2>
        <p>Sometimes you are not avoiding the lesson itself. You are avoiding everything required to get back into it.</p>
        <p>You need to find the platform, open the correct course, locate the last module and remember what you intended to do next. Each step is small, but together they create enough friction to make “later” attractive.</p>
        <p>End every session by recording three things:</p>
        <ul><li>Where you stopped</li><li>What you understood</li><li>What you need to do next</li></ul>
        <p>For example:</p>
        <blockquote class="article-callout"><p>Stopped at Module 4, Lesson 2. Learned how customer interviews expose weak assumptions. Next: write five interview questions before continuing.</p></blockquote>
        <p>This is one of the problems Luzora is being built to solve.</p>
        <p>Luzora helps connect an intention to the place where it needs to happen and the time you want to return. Instead of keeping “continue my course” as a vague promise, you can save the course page, describe the next action and choose when you want to come back.</p>
        <p>When that moment arrives, you are not beginning with a search. You are returning to the work.</p>
        <p>That distinction matters because consistency often breaks in the space between remembering something and actually getting started.</p>
      </section>
      <section class="article-section is-revealed" id="4-stop-measuring-learning-by-videos-watched" data-article-section>
        <h2>4. Stop measuring learning by videos watched</h2>
        <p>Finishing twelve videos does not necessarily mean you learned twelve lessons.</p>
        <p>Watching can create a feeling of familiarity. The instructor’s explanation makes sense while it is playing, so it feels as though the knowledge is already yours. The real test comes when you try to explain or use it without the instructor.</p>
        <p>After each lesson, close the video and ask:</p>
        <ul><li>What were the three most important ideas?</li><li>Can I explain them without checking my notes?</li><li>Where could I apply this?</li><li>What question can I now answer?</li><li>What small thing can I create with what I learned?</li></ul>
        <p>Research consistently supports retrieving information from memory and spreading practice across multiple sessions. Practice testing and distributed practice were among the highest-rated techniques in a major review of learning methods. <a href="https://doi.org/10.1177/1529100612453266" target="_blank" rel="noopener noreferrer">Review the learning-techniques research</a>.</p>
        <p>Retrieval does not require a formal examination. You could write questions for yourself, explain the lesson aloud, recreate an example without watching, teach the idea to someone, complete a small project, or review yesterday’s lesson before starting today’s.</p>
        <p>Experiments have also found that retrieving information can produce stronger delayed retention than repeatedly studying the same material. <a href="https://doi.org/10.1111/j.1467-9280.2006.01693.x" target="_blank" rel="noopener noreferrer">Read the test-enhanced learning study</a>.</p>
        <p>A completed course is useful. A skill you can remember and apply is better.</p>
      </section>
      <section class="article-section is-revealed" id="5-create-a-recovery-rule-before-you-fall-behind" data-article-section>
        <h2>5. Create a recovery rule before you fall behind</h2>
        <p>You will probably miss a session.</p>
        <p>The dangerous part is not missing Tuesday. It is deciding that the week is ruined and waiting for the perfect Monday to start again.</p>
        <p>Create your recovery rule in advance:</p>
        <blockquote class="article-callout"><p>If I miss a study session, I will complete at least 15 minutes during my next available study period.</p></blockquote>
        <p>That 15-minute session may not recover everything you missed. Its purpose is to prevent one interruption from becoming abandonment.</p>
        <p>Do not punish yourself with a four-hour catch-up session. Return to the normal schedule and adjust the finish date if necessary.</p>
        <p>Once a week, review:</p>
        <ul><li>What did I complete?</li><li>What can I now explain or do?</li><li>Where am I getting stuck?</li><li>Is my schedule still realistic?</li><li>What is the next lesson or action?</li></ul>
        <p>This is metacognition in practical language: paying attention to how well your learning system is working and changing it when necessary.</p>
        <p>Consistency does not mean following the original plan perfectly. It means having a reliable way to return when the plan is interrupted.</p>
      </section>
      <section class="article-section is-revealed" id="your-course-completion-plan" data-article-section>
        <h2>Your course completion plan</h2>
        <p>Before leaving this page, write down:</p>
        <ul><li><strong>My outcome:</strong> What will this course help me produce or do?</li><li><strong>My deadline:</strong> When do I intend to finish?</li><li><strong>My sessions:</strong> Which days and times will I study?</li><li><strong>My next lesson:</strong> Where exactly will I continue?</li><li><strong>My recovery rule:</strong> What will I do after missing a session?</li><li><strong>My proof of learning:</strong> How will I practise or test myself?</li></ul>
        <p>A new course gives you information. A completion system gives that information somewhere to go.</p>
        <p>Luzora is being built for that gap between deciding and doing: saving what matters, keeping it connected to the right place and helping you return when it is time to follow through.</p>
        <p>Because the course sitting in your account cannot improve your life.</p>
        <p>The part you return to, understand and apply can.</p>
      </section>
      <section class="article-section is-revealed" id="common-questions-about-completing-an-online-course" data-article-section>
        <h2>Common questions about completing an online course</h2>
        <p><strong>How can I finish an online course without losing motivation?</strong> Do not make motivation responsible for the entire course. Define the result you want, schedule realistic sessions, record exactly where to return and use a recovery rule whenever you miss a session.</p>
        <p><strong>How many times a week should I study an online course?</strong> Choose a schedule you can maintain during a normal week. Two or three focused sessions are often more realistic than promising to study every day and abandoning the plan when life becomes busy.</p>
        <p><strong>What should I do when I fall behind?</strong> Return during your next available session, even if you can only study for 15 minutes. Continue from the next clear action, adjust the deadline if necessary and avoid turning one missed day into a complete restart.</p>
      </section>
    `
  },
  "out-of-sight-out-of-mind": {
    title: "Out of Sight, Out of Mind: Your Productivity Tool Should Bring the Task Back to You",
    description: "See how Luzora and Auto Return bring forgotten browser tasks and their context back into view at the right time.",
    dek: "When an important action disappears with a closed tab, remembering is not enough. The right system should bring the task and its context back into view.",
    image: "https://www.luzora.app/assets/images/blog/out-of-sight/og.webp",
    dateLabel: "September 6, 2026",
    readTime: "7 min read",
    datePublished: "2026-09-06T09:00:00+01:00",
    dateModified: "2026-09-06T09:00:00+01:00",
    articleSection: "Productivity",
    keywords: ["out of sight out of mind", "forgotten tasks", "visual reminders", "browser productivity", "Auto Return", "ADHD object permanence"],
    bodyHtml: `
      <figure class="article-cover-image"><img src="/assets/images/blog/out-of-sight/cover.webp" alt="A saved email task returning through a glowing yellow Auto Return portal" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
      <div class="article-lead is-revealed" data-article-section>
        <p>You open an email that needs a thoughtful reply.</p>
        <p>You find a course you want to continue, a form you need to complete, or a document you should review before Friday.</p>
        <p>The intention is real. You mean to return.</p>
        <p>Then another tab opens. A message arrives. The browser moves on, and the action quietly disappears with the page.</p>
        <p>Hours or days later, you may remember that something needed your attention, but not what it was, where it was, or what you planned to do next.</p>
        <p>The task did not become less important. It simply left your field of view.</p>
      </div>
      <section class="article-section is-revealed" id="when-an-action-disappears-from-awareness" data-article-section>
        <h2>When an action disappears from awareness</h2>
        <p>Within ADHD communities, people sometimes use the phrase “object permanence” to describe an “out of sight, out of mind” experience.</p>
        <p>This is not object permanence in its clinical, developmental meaning. Adults do not suddenly believe that a hidden email, document, or responsibility has stopped existing. Instead, the phrase is commonly used as a metaphor for the difficulty of keeping something present in your awareness without a visible cue.</p>
        <p>A more accurate description is that some people find it harder to recall or prioritise tasks once those tasks are no longer visible. External cues and reminders can help bring them back into awareness. <a href="https://www.simplypsychology.org/object-permanence-and-adhd.html" target="_blank" rel="noopener noreferrer">Simply Psychology explains this distinction</a>, while <a href="https://lifeskillsadvocate.com/blog/object-permanence-adhd-workarounds/" target="_blank" rel="noopener noreferrer">Life Skills Advocate outlines visibility and context-based reminders as practical workarounds</a>.</p>
        <p>This experience is not limited to any single group. A closed tab, buried notification, crowded inbox, or forgotten bookmark can make an intention disappear for almost anyone.</p>
      </section>
      <section class="article-section is-revealed" id="the-hidden-problem-with-productivity-tools" data-article-section>
        <h2>The hidden problem with productivity tools</h2>
        <p>Most productivity tools ask you to do something surprisingly difficult: remember to open the tool that contains the things you are already struggling to remember.</p>
        <p>You must remember the original action. Then you must remember which app contains it. Then you must open that app, find the task, locate the original page, and reconstruct what you intended to do.</p>
        <p>The tool may have stored the task perfectly, but it still depends on you returning to the tool before it can help.</p>
        <p>That creates a structural problem. A productivity system hidden behind an icon can become another thing that is out of sight.</p>
        <p>The task is saved, but the action remains forgotten.</p>
      </section>
      <section class="article-section is-revealed" id="visibility-is-part-of-the-system" data-article-section>
        <h2>Visibility is part of the system</h2>
        <p>Good reminders do more than preserve information. They make the right information visible at a useful moment.</p>
        <p>This is why people place important items near the door, keep notes where they naturally look, or set reminders for ordinary actions, not only major appointments. The environment carries part of the responsibility for remembering.</p>
        <p>Digital tools should be able to do the same.</p>
        <p>Instead of expecting you to repeatedly check another list, the system should meet you where the intention was created and bring that intention back when it is time to act.</p>
        <p>That is the idea behind Luzora.</p>
        <p class="article-callout">The system should not only save the task. It should help the task become visible again.</p>
      </section>
      <section class="article-section is-revealed" id="luzora-begins-where-the-intention-is-formed" data-article-section>
        <h2>Luzora begins where the intention is formed</h2>
        <p>Luzora lives in the browser because that is where many intentions begin.</p>
        <p>You are already looking at the email, application, article, course, chart, document, or website that requires an action. You can capture the task while the page and your reason for returning are still clear.</p>
        <p>Rather than saving only a sentence such as “Reply tomorrow,” Luzora can keep the task connected to the page where the reply needs to happen.</p>
        <p>You decide what you need to do, where you need to do it, and when you want to return.</p>
        <p>The task no longer has to survive as a loose thought. Luzora preserves both the intention and its destination.</p>
      </section>
      <section class="article-section is-revealed" id="auto-return-brings-forgotten-actions-back-into-view" data-article-section>
        <h2>Auto Return brings forgotten actions back into view</h2>
        <p>A normal reminder can tell you that it is time to do something.</p>
        <p>Auto Return goes a step further by helping the place where the action happens reappear.</p>
        <p>Imagine opening an important email and creating the task “Reply to this email tomorrow at 10:00 AM.”</p>
        <p>When the task becomes due, Auto Return can bring you back to that email instead of leaving you with a notification and expecting you to find it again.</p>
        <p>The same structure can work for a course lesson, an application deadline, a document awaiting approval, an invoice follow-up, an article you want to read, or a saved chart you need to review.</p>
        <p>Before returning, Luzora displays a short countdown on the page you are currently viewing. You can go immediately, cancel the automatic return, or dismiss the visual warning.</p>
        <p>If the destination is already open, Luzora can focus the matching tab without unnecessarily reloading it. If it is not open, Luzora can create a new tab instead of replacing the unrelated page you are using.</p>
        <p>Auto Return is optional and remains under the user’s control. It must be enabled, applies to eligible timed tasks with saved destinations, and depends on the browser being open when the task becomes due.</p>
        <p class="article-callout">A reminder tells you what to do. Auto Return can bring back the place where you can do it.</p>
      </section>
      <section class="article-section is-revealed" id="a-reminder-tells-you-a-return-restores-the-context" data-article-section>
        <h2>A reminder tells you. A return restores the context.</h2>
        <p>“Continue your course” may be accurate, but it still leaves questions: Which course? Which lesson? Where did you stop?</p>
        <p>“Review the document” can create the same friction: Which document? Where is it? What needed reviewing?</p>
        <p>Every missing step gives the action another opportunity to be postponed.</p>
        <p>Luzora reduces that gap by reconnecting the reminder to the place where the intention began. When the page returns, more of the original context returns with it.</p>
        <p>You are not being asked to remember the entire chain. You can continue from the place you previously chose.</p>
        <p>That is the structural difference. Luzora does not only wait inside a task list. It sits closer to the moment an intention is created and reappears at the moment of return.</p>
      </section>
      <section class="article-section is-revealed" id="support-not-treatment" data-article-section>
        <h2>Support, not treatment</h2>
        <p>Luzora is not a diagnostic tool or a treatment for ADHD. It does not decide why someone forgets an action, and it cannot replace personalised support from a qualified professional.</p>
        <p>What it can provide is a practical mechanism: externalise an intention, keep it connected to its context, and make it visible again at a chosen time.</p>
        <p>People should not have to blame themselves every time a hidden task falls out of awareness. Sometimes the system is asking too much of memory.</p>
        <p>A better system can carry more of that load.</p>
      </section>
      <section class="article-section is-revealed" id="what-did-you-mean-to-return-to" data-article-section>
        <h2>What did you mean to return to?</h2>
        <p>Think about the tabs you closed this week.</p>
        <p>Was there an email you intended to answer? A form you planned to complete? A lesson, proposal, article, or application you genuinely wanted to revisit?</p>
        <p>Choose one action. Save the place where it needs to happen. Decide when you want it brought back into view.</p>
        <p>Then let Luzora help you return to what matters.</p>
        <p class="article-callout">Save the place. Keep the intention. Return when it matters.</p>
      </section>`
  },
  "stop-gaming-from-taking-over-your-life": {
    "title": "4 Practical Ways to Stop Gaming From Taking Over Your Life",
    "description": "Four practical ways to regain control of gaming: recognise harmful patterns, meet your needs, set boundaries, and make real-world progress visible.",
    "dek": "Four practical ways to regain control of gaming: recognise harmful patterns, meet your needs, set boundaries, and make real-world progress visible.",
    "image": "https://www.luzora.app/assets/images/blog/gaming/og.webp",
    "dateLabel": "September 3, 2026",
    "readTime": "6 min read",
    "datePublished": "2026-09-03T22:00:00+01:00",
    "dateModified": "2026-09-03T22:00:00+01:00",
    "articleSection": "Guides",
    "keywords": [
      "gaming",
      "gaming habits",
      "gaming boundaries",
      "focus",
      "digital wellbeing"
    ],
    "bodyHtml": "<figure class=\"article-cover-image\"><img src=\"/assets/images/blog/gaming/cover.webp\" alt=\"A charcoal game controller shaped into a maze, with a yellow path and a person at its entrance\" width=\"1731\" height=\"909\" decoding=\"async\" loading=\"eager\" fetchpriority=\"high\" /></figure>\n<div class=\"article-lead is-revealed\" data-article-section>\n<p>Games are designed to make progress easy to understand.</p>\n<p>You know the objective. You receive immediate feedback. You can see yourself improving. Even failure gives you useful information for the next attempt.</p>\n<p>Real life rarely works that way.</p>\n<p>You can work for weeks without knowing whether you are getting closer to your goal. Important tasks are often unclear, uncomfortable and slow to reward you. Gaming becomes especially difficult to control when it offers progress, confidence and connection that are missing elsewhere.</p>\n<p>The goal, therefore, is not simply to play fewer games. It is to understand what keeps pulling you back and build a life that can compete for your attention.</p>\n<p>Here are four practical ways to begin.</p>\n</div>\n<section class=\"article-section is-revealed\" id=\"1-measure-the-damage-not-just-the-hours\" data-article-section>\n<h2>1. Measure the damage, not just the hours</h2>\n<p>Playing for several hours does not automatically mean you have a gaming problem. Someone may play extensively without neglecting their responsibilities, while another person’s shorter sessions may consistently damage their sleep, work or relationships.</p>\n<p>The more useful questions are:</p>\n<ul><li>Are you repeatedly playing longer than you intended?</li><li>Are you postponing important work to play?</li><li>Is gaming affecting your sleep?</li><li>Have you lost interest in activities you previously enjoyed?</li><li>Do you continue playing despite problems it is causing?</li><li>Have you tried to reduce your gaming and repeatedly failed?</li></ul>\n<p>The World Health Organization identifies impaired control, increasing priority given to gaming and continued play despite negative consequences as the central features of gaming disorder. This does not mean everyone who games heavily has a disorder. It gives us a better way to evaluate whether gaming is becoming harmful. <a href=\"https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder\" target=\"_blank\" rel=\"noopener noreferrer\">Read the WHO explanation</a>.</p>\n<p>For one week, record when you start, when you stop and what you postpone.</p>\n<p>Do not estimate. Write it down.</p>\n<p>You may discover that the issue is not gaming every day. It might be gaming after midnight, playing whenever work becomes difficult or turning a short break into an entire afternoon.</p>\n<p>A specific pattern is easier to change than a vague feeling that you “play too much.”</p>\n</section>\n<section class=\"article-section is-revealed\" id=\"2-identify-the-need-gaming-is-meeting\" data-article-section>\n<h2>2. Identify the need gaming is meeting</h2>\n<p>People do not only play games because games are entertaining.</p>\n<p>Games can provide:</p>\n<ul><li>Achievement</li><li>Competition</li><li>Social connection</li><li>Relief from stress</li><li>A sense of control</li><li>Escape from difficult emotions</li><li>Visible and predictable progress</li></ul>\n<p>Research has found that escapism and using gaming to cope with negative emotions are strongly associated with problematic gaming symptoms. Achievement and social motivations can also contribute. <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9872536/\" target=\"_blank\" rel=\"noopener noreferrer\">Review the research on gaming motivations</a>.</p>\n<p>Ask yourself:</p>\n<blockquote class=\"article-callout\"><p>What becomes easier for me when I am playing?</p></blockquote>\n<p>Perhaps you stop thinking about money. You feel capable. You have people to talk to. You receive recognition. You know exactly what to do next.</p>\n<p>Your answer tells you what must be addressed outside the game.</p>\n<p>If gaming is your main social activity, reducing it without creating another source of connection may leave you isolated.</p>\n<p>If it provides achievement, you need real-world goals with visible progress.</p>\n<p>If it helps you avoid anxiety, removing the game will not resolve the work, conversation or decision creating that anxiety.</p>\n<p>Do not leave an important need empty. Find a healthier way to meet it.</p>\n</section>\n<section class=\"article-section is-revealed\" id=\"3-replace-unlimited-gaming-with-a-defined-session\" data-article-section>\n<h2>3. Replace unlimited gaming with a defined session</h2>\n<p>“Play less” is too vague to work.</p>\n<p>A better plan answers four questions:</p>\n<ol><li>When will I begin?</li><li>When will I stop?</li><li>What is my final match?</li><li>What will I do immediately afterward?</li></ol>\n<p>For example:</p>\n<blockquote class=\"article-callout\"><p>I can play between 7:30 and 9:00 p.m. I will not start another match after 8:40. When I finish, I will shut down the computer and prepare for tomorrow.</p></blockquote>\n<p>The final-match rule matters because many games do not end neatly when your alarm rings. If you decide when to stop only after finishing a match, “one more” remains available forever.</p>\n<p>Make the boundary easier to follow:</p>\n<ul><li>Set an alarm before your final match.</li><li>Disable automatic game launches.</li><li>Remove games from devices you use for work.</li><li>Avoid gaming in bed.</li><li>Tell teammates when you plan to leave.</li><li>Keep controllers and gaming devices out of immediate reach when the session ends.</li></ul>\n<p>These changes are not punishments. They create a pause between wanting to play and automatically opening the game.</p>\n<p>Identifying triggers, monitoring behaviour and planning different responses are common elements in cognitive behavioural approaches to problematic gaming. Research suggests these interventions can help, although the quality and strength of evidence vary between studies. <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9940764/\" target=\"_blank\" rel=\"noopener noreferrer\">See the review of randomized trials</a>.</p>\n</section>\n<section class=\"article-section is-revealed\" id=\"4-make-real-world-progress-easier-to-see\" data-article-section>\n<h2>4. Make real-world progress easier to see</h2>\n<p>A game might show your rank, experience points, completed missions and the exact requirements for your next reward.</p>\n<p>Your real goals may exist as statements like:</p>\n<ul><li>Get a better job</li><li>Build my business</li><li>Improve my health</li><li>Finish my course</li></ul>\n<p>These are directions, not actions. Their size and uncertainty make gaming more attractive.</p>\n<p>Convert them into actions you can finish:</p>\n<ul><li>Improve one section of my CV.</li><li>Contact one potential customer.</li><li>Walk for 20 minutes.</li><li>Complete one lesson.</li><li>Write 200 words.</li><li>Send the email I have been avoiding.</li></ul>\n<p>Track these actions somewhere visible.</p>\n<p>You can also use gaming as a reward instead of allowing it to interrupt the work:</p>\n<blockquote class=\"article-callout\"><p>After completing my most important task, I can play for one planned session.</p></blockquote>\n<p>The objective is not to turn your whole life into a game. It is to stop making real progress invisible.</p>\n</section>\n<section class=\"article-section is-revealed\" id=\"when-self-imposed-limits-are-not-enough\" data-article-section>\n<h2>When self-imposed limits are not enough</h2>\n<p>Some people can regain control by changing their schedule and environment. Others may need professional support.</p>\n<p>Consider speaking with a qualified mental-health professional if gaming is seriously affecting your education, work, health, relationships or finances—especially if repeated attempts to reduce it have failed.</p>\n<p>Cognitive behavioural therapy is one of the most studied psychological approaches for problematic gaming. Reviews also suggest potential benefits from mindfulness and family-supported interventions, although more high-quality research is still needed. <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9705304/\" target=\"_blank\" rel=\"noopener noreferrer\">Read the treatment review</a>.</p>\n<p>Seeking support is not an overreaction. Once a behaviour is repeatedly harming your life and feels outside your control, getting help is a practical response.</p>\n</section>\n<section class=\"article-section is-revealed\" id=\"start-with-one-week-not-forever\" data-article-section>\n<h2>Start with one week, not forever</h2>\n<p>Do not begin by promising never to play another game.</p>\n<p>Run a seven-day experiment:</p>\n<ul><li>Track every gaming session.</li><li>Complete one important task before playing.</li><li>Set a final-match time.</li><li>Protect your normal sleeping time.</li><li>Replace one gaming session with another rewarding activity.</li><li>Review what caused you to break your limits.</li></ul>\n<p>At the end of the week, you will have something more useful than guilt: evidence.</p>\n<p>You will know when you are most vulnerable, what gaming provides for you and which boundaries you can realistically maintain.</p>\n<p>The aim is not to prove that you can live without games.</p>\n<p>It is to make sure you are still building a life you do not constantly need to escape from.</p>\n</section>"
  },
  "stop-doomscrolling-when-you-have-real-work-to-do": {
    title: "3 Tips to Stop Doomscrolling When You Have Real Work to Complete",
    description: "Learn three practical ways to stop doomscrolling when you need to work: add friction, create a stopping point, and make the real task easier to begin.",
    dek: "Three research-backed ways to escape the endless feed, make your phone less tempting, and return to the work that deserves your attention.",
    image: "https://www.luzora.app/assets/images/blog/doomscrolling/cover.webp?v=20260903",
    dateLabel: "August 31, 2026",
    readTime: "7 min read",
    datePublished: "2026-08-31T09:00:00+01:00",
    dateModified: "2026-08-31T09:00:00+01:00",
    articleSection: "Guides",
    keywords: ["doomscrolling", "stop doomscrolling", "social media distraction", "focus", "procrastination", "screen time", "digital wellbeing"],
    faqs: [
      {
        question: "Why do I doomscroll when I have important work to do?",
        answer: "Doomscrolling can provide immediate relief from work that feels difficult, uncertain, boring, or emotionally uncomfortable. The feed is easy to enter and offers continuous novelty, while the work may require effort before providing any reward."
      },
      {
        question: "How can I stop doomscrolling immediately?",
        answer: "Close the application, place your phone out of reach, and define one small action you can complete in ten minutes. If you repeatedly reopen the application, temporarily block it or disable mobile internet during the work period."
      },
      {
        question: "Does turning my phone to grayscale reduce scrolling?",
        answer: "Experimental research suggests that grayscale can reduce screen time by making the phone less visually attractive. It is best treated as a small piece of environmental friction, not a complete solution."
      },
      {
        question: "Should I stop following the news?",
        answer: "Not necessarily. Choose a small number of trustworthy sources and check them during a planned window. The objective is intentional consumption rather than complete avoidance."
      }
    ],
    bodyHtml: `
      <figure class="article-cover-image"><img src="/assets/images/blog/doomscrolling/cover.webp?v=20260903" alt="An endless phone feed crossing three yellow stopping points before leading back to focused work on a laptop" width="1731" height="909" decoding="async" loading="eager" fetchpriority="high" /></figure>
      <div class="article-lead is-revealed" data-article-section>
        <p>It is 9:18 in the morning.</p>
        <p>You sit down to finish a proposal that should have gone out yesterday. Before opening the document, you pick up your phone to check one message.</p>
        <p>There is a worrying headline beneath it. You open the story. Then the comments. Someone links to another post with an even worse headline. A video starts playing. You scroll to see what happens next.</p>
        <p>When you finally look at the time, it is 9:57.</p>
        <p>The proposal has not moved. You feel less prepared to begin it than you did before—and now you are annoyed with yourself too.</p>
        <p>If this happens to you, the obvious advice is to put your phone down and exercise more discipline. But that misses part of the story.</p>
        <p>Sometimes you are not scrolling because the content is particularly enjoyable. You are scrolling because the work in front of you feels uncertain, difficult, or uncomfortable—and the phone offers somewhere easier to go.</p>
        <p>To stop, you need more than willpower. You need to make scrolling less automatic, give it a clear ending, and make your real work easier to enter.</p>
      </div>
      <section class="article-section is-revealed" id="quick-answer" data-article-section>
        <h2>The short answer</h2>
        <p>To stop doomscrolling when you need to work, add friction before you open the feed, decide how the scrolling session will end before it begins, and make the first step of your real task small enough to start immediately.</p>
        <p>You do not have to give up your phone or stop following the news. The goal is to prevent an unplanned check from deciding how you spend the next hour.</p>
        <p class="article-callout">Make the scroll less convenient. Give it an ending. Make the work easier to enter.</p>
      </section>
      <section class="article-section is-revealed" id="why-doomscrolling-is-difficult-to-stop" data-article-section>
        <h2>Why doomscrolling is so difficult to stop</h2>
        <p>Doomscrolling is the repeated consumption of negative or distressing news, even after the experience has stopped being useful and has started making you feel worse.</p>
        <p>You may begin because you genuinely want information. Something important is happening, and knowing more feels like a way to become safer or more prepared. But there is always another update, opinion, warning, or prediction. The feed never says, “You understand enough now.”</p>
        <p>Research on problematic news consumption has found that some people become preoccupied with the news, struggle to reduce their consumption, and continue checking even when it interferes with the rest of their lives. Higher levels of this behaviour have also been associated with poorer mental and physical well-being. The research does not prove that scrolling caused every outcome, but it shows that the pattern can become genuinely disruptive. <a href="https://pubmed.ncbi.nlm.nih.gov/35999665/" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>And when uncomfortable work is waiting nearby, the feed becomes even harder to leave. Facing a task with an uncertain outcome requires effort. Moving your thumb produces something new immediately. That is not a fair fight, so change the conditions.</p>
      </section>
      <section class="article-section is-revealed" id="add-friction-before-the-urge-arrives" data-article-section>
        <h2>1. Add friction before the urge arrives</h2>
        <p>Imagine putting a bowl of sweets on your desk and telling yourself not to notice it. You might resist for a while. But every time you see the bowl, you have to make the decision again.</p>
        <p>Your phone can work the same way. A notification appears. You see an application badge. Your hand reaches for the device before you have consciously decided to stop working.</p>
        <p>The solution is not to make the correct choice fifty times. It is to remove some of the unnecessary choices.</p>
        <p class="article-list-intro">Before beginning important work:</p>
        <ul>
          <li>Turn off notifications that do not require an immediate response.</li>
          <li>Move distracting applications away from your home screen.</li>
          <li>Put your phone somewhere that requires you to stand up.</li>
          <li>Use grayscale if colourful feeds keep pulling you back.</li>
          <li>Block social media or mobile internet during one focused work period.</li>
        </ul>
        <p>You do not need to apply all five. Choose the smallest change that creates a pause between the urge and the action.</p>
        <p>A preregistered field experiment found that putting smartphones into grayscale produced an immediate reduction in objectively measured screen time. Self-imposed time limits also helped, although their effect was smaller and more gradual. The researchers did not find an immediate improvement in academic performance or well-being, so grayscale is not a magical productivity switch. It simply makes the phone a little less visually persuasive. <a href="https://doi.org/10.1089/cyber.2022.0027" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>A larger randomized study blocked mobile internet on participants’ phones for two weeks while still allowing calls and text messages. Participants showed improvements in sustained attention, mental health, and subjective well-being. <a href="https://doi.org/10.1093/pnasnexus/pgaf017" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>You do not have to turn your smartphone into a basic phone for two weeks. Try it for 30 minutes. Put the phone across the room, block the two applications that most often take you away, and open only what your work requires. If 30 minutes feels unrealistic, begin with ten.</p>
        <p class="article-callout">Do not make your self-control fight the same battle every five minutes. Change the environment before the urge arrives.</p>
      </section>
      <section class="article-section is-revealed" id="decide-where-the-scroll-ends" data-article-section>
        <h2>2. Decide where the scroll ends before you open it</h2>
        <p>“I’ll quickly check the news” is not a complete plan. What does quickly mean? Which news? How will you know when you have seen enough? If those questions have no answers, the feed will answer them for you.</p>
        <p>Before opening an application, decide your purpose, which source you will use, how long you will stay, and what action signals that you are finished.</p>
        <p>A real plan might sound like this: “After lunch, I will check these two trusted sources for ten minutes. When the timer rings, I will close the application and return to the report.” That is different from promising yourself that you will use social media less. It gives the session an edge.</p>
        <p>In one experiment, 143 university students were assigned either to continue using social media normally or to limit Facebook, Instagram, and Snapchat to ten minutes per platform each day. After three weeks, the limited-use group showed reductions in loneliness and depression compared with the control group. The study involved a relatively small student sample and examined well-being rather than productivity, so 30 minutes should not be treated as a universal prescription. Its more useful lesson is that a specific limit is easier to act on than a vague intention. <a href="https://doi.org/10.1521/jscp.2018.37.10.751" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>You can also replace the endless feed with a finite source. Instead of opening a homepage that refreshes forever, subscribe to one daily briefing. Save two publications you trust. Read the story you intended to read without entering the comments.</p>
        <p>You are not trying to become uninformed. You are choosing a container for the information.</p>
        <p>When the timer rings, do not negotiate for one more post. Close the application, place the phone down, and physically change your position. Stand up, take a breath, or get a glass of water. That small movement marks the end of one activity and the beginning of another.</p>
        <p class="article-callout">An endless feed will not tell you when you have seen enough. Bring your own stopping point.</p>
      </section>
      <section class="article-section is-revealed" id="make-the-work-easier-to-enter" data-article-section>
        <h2>3. Make the work easier to enter</h2>
        <p>You have put the phone down. Now the proposal is still waiting.</p>
        <p>This is the moment many productivity tips ignore. Removing the distraction does not automatically make the real task appealing.</p>
        <p>Perhaps you do not know how the proposal should begin. Maybe you are worried that the client will reject it. Perhaps the project has grown so large that opening the document makes you feel behind before you have written a word. So your brain looks for relief. The phone happens to be the closest exit.</p>
        <p>Research on procrastination has repeatedly connected delay with task aversiveness—how unpleasant, confusing, or intimidating a task feels. Procrastination can offer short-term mood relief, even when it creates a larger problem for your future self. <a href="https://doi.org/10.1016/S0191-8869(99)00091-4" target="_blank" rel="noopener noreferrer">Read about task aversiveness</a> and <a href="https://doi.org/10.1111/spc3.12011" target="_blank" rel="noopener noreferrer">short-term mood repair</a>.</p>
        <p>Before blaming yourself for scrolling, ask: “What am I trying not to feel about this task?” The answer may be boredom, confusion, fear, resentment, or simple tiredness. Naming the feeling will not complete the work, but it can show you what kind of entrance you need.</p>
        <p>If the task feels confusing, define the next visible action. If it feels too large, reduce the amount you are asking yourself to complete. If it feels intimidating, give yourself permission to produce a rough first attempt.</p>
        <p>“Finish the proposal” is not an entrance. “Open the proposal, read the last paragraph, add three section headings, and work on the first section for ten minutes” gives you somewhere to begin.</p>
        <p>The goal of those ten minutes is not to finish. It is to cross the distance between avoiding the task and being inside it. Before your next break, leave yourself a return note such as, “Next: add the price comparison beneath the second heading.” Returning will no longer require you to understand the entire project again.</p>
        <p class="article-callout">If the work feels too heavy to approach, do not wait for motivation. Make the entrance smaller.</p>
      </section>
      <section class="article-section is-revealed" id="when-you-are-already-trapped" data-article-section>
        <h2>What to do when you are already trapped in the feed</h2>
        <p>Sometimes you notice the problem only after 40 minutes have disappeared. Do not spend the next ten minutes insulting yourself. That simply makes returning to work feel worse.</p>
        <p class="article-list-intro">Use this reset:</p>
        <ol>
          <li>Close the application completely.</li>
          <li>Put the phone beyond arm’s reach.</li>
          <li>Say what you intended to be doing.</li>
          <li>Write down the smallest visible action.</li>
          <li>Work on it for ten minutes.</li>
        </ol>
        <p>For example: “I intended to prepare tomorrow’s presentation. The next action is to open the deck and name the first three slides.” Then begin before your mind starts another debate.</p>
        <p>You are not trying to rescue the entire day in one dramatic burst. You are rescuing the next ten minutes.</p>
      </section>
      <section class="article-section is-revealed" id="build-a-boundary-that-fits-your-life" data-article-section>
        <h2>You do not need to become unreachable</h2>
        <p>Not everyone can turn off their phone for hours. You may care for someone who needs to reach you. Your team may rely on you. Your work may happen through the same device that distracts you.</p>
        <p>Build a boundary that matches your actual life. Allow calls from important contacts while silencing application notifications. Block one feed rather than the entire internet. Work for 25 minutes instead of two hours. Tell your team when you will check messages again.</p>
        <p>The best boundary is not the strictest one. It is the one you can trust yourself to use repeatedly.</p>
      </section>
      <section class="article-section is-revealed" id="a-better-way-to-measure-progress" data-article-section>
        <h2>A better way to measure progress</h2>
        <p>Do not ask whether you avoided every unnecessary scroll today. Ask whether you noticed when scrolling stopped being useful, created at least one protected period for real work, and returned to the task more quickly than you normally would.</p>
        <p>The habit changes each time you interrupt the loop.</p>
        <p>Some days, you will catch yourself before opening the application. Other days, you will catch yourself after half an hour. Both moments still offer the same choice: continue moving through a feed without an ending, or return to one small piece of work that can actually move your life forward.</p>
        <p>Your phone does not have to disappear. It just should not decide what deserves your day.</p>
        <p class="article-callout">Make the scroll less convenient. Give it an ending. Make the work easier to enter.</p>
      </section>
      <section class="article-section is-revealed" id="common-questions-about-doomscrolling" data-article-section>
        <h2>Common questions about doomscrolling</h2>
        <p>Why do I doomscroll when I have important work to do? Doomscrolling can provide immediate relief from work that feels difficult, uncertain, boring, or emotionally uncomfortable. The feed is easy to enter and offers continuous novelty, while the work may require effort before providing any reward.</p>
        <p>How can I stop doomscrolling immediately? Close the application, place your phone out of reach, and define one small action you can complete in ten minutes. If you repeatedly reopen the application, temporarily block it or disable mobile internet during the work period.</p>
        <p>Does turning my phone to grayscale reduce scrolling? Experimental research suggests that grayscale can reduce screen time by making the phone less visually attractive. It is best treated as a small piece of environmental friction, not a complete solution.</p>
        <p>Should I stop following the news? Not necessarily. Choose a small number of trustworthy sources and check them during a planned window. The objective is intentional consumption rather than complete avoidance.</p>
      </section>`
  },
  "how-to-get-work-done-when-you-have-too-much-to-do": {
    title: "4 Ways to Get Real Work Done When You Already Have Too Much to Do",
    description: "Discover four practical ways to get real work done when you have too much to do: reset the overload, start smaller, protect focus, and negotiate trade-offs.",
    dek: "Four practical ways to stop reacting, decide what matters, and make meaningful progress without working yourself into the ground.",
    image: "https://www.luzora.app/assets/images/blog/overloaded-work/cover.png?v=20260830-textless",
    dateLabel: "August 30, 2026",
    readTime: "7 min read",
    datePublished: "2026-08-30T09:00:00+01:00",
    dateModified: "2026-08-30T09:00:00+01:00",
    articleSection: "Guides",
    keywords: ["feeling overwhelmed", "too much to do", "prioritizing work", "time management", "focus", "workload management"],
    bodyHtml: `
      <div class="article-lead is-revealed" data-article-section>
        <p>It is 9:07 in the morning. You open your laptop with good intentions, see three messages marked urgent, remember the report you did not finish yesterday, and notice the tab for the course you promised yourself you would continue.</p>
        <p>So you answer one message. Then another. You check the report, jump into a meeting, return to your inbox, and spend the rest of the day moving quickly. By evening, you are tired—but the work that mattered most is still waiting.</p>
        <p>If that feels familiar, the problem is probably not laziness. You are trying to make decisions while carrying too many open commitments in your head.</p>
        <p>When you already have too much to do, the answer is not to become faster at doing everything. It is to reduce the number of things competing for this moment, choose one useful result, and make starting it easy.</p>
      </div>
      <section class="article-section is-revealed" id="quick-answer" data-article-section>
        <h2>The short answer</h2>
        <p>When you have too much to do, stop reacting for 20 minutes. Write down every open commitment, separate real consequences from noise, remove or renegotiate work that does not fit, choose one meaningful outcome for today, and give it a protected place on your calendar. Then define the first action so clearly that you can begin without another decision.</p>
        <p>That small reset will not make the workload disappear. It will stop the workload from deciding your day for you.</p>
        <p class="article-callout">You do not need to finish everything today. You need to know what deserves today.</p>
      </section>
      <section class="article-section is-revealed" id="why-busy-days-produce-so-little" data-article-section>
        <h2>Why a busy day can still produce so little</h2>
        <p>An overloaded day makes every request feel equally important. It is not. Research on the <a href="https://academic.oup.com/jcr/article-abstract/45/3/673/4847790" target="_blank" rel="noopener noreferrer">mere urgency effect</a> found that people often choose urgent tasks over more important ones—even when the urgent task has a smaller payoff.</p>
        <p>Switching constantly has a cost too. When you leave one unfinished task for another, part of your attention can remain stuck on the first one. Researchers call this <a href="https://www.sciencedirect.com/science/article/pii/S0749597809000399" target="_blank" rel="noopener noreferrer">attention residue</a>. In ordinary language: your hands have moved to the next task, but a piece of your mind has not.</p>
        <p>This is why doing a little of twelve things can feel exhausting while creating very little progress. The goal is not to squeeze more activity into the day. It is to create fewer, cleaner decisions.</p>
      </section>
      <section class="article-section is-revealed" id="the-20-minute-overload-reset" data-article-section>
        <h2>1. Reset the overload before you do more</h2>
        <p>Imagine pausing that frantic morning before answering the next message. Take a sheet of paper, open a plain note, or use whatever task tool you already trust. Set a timer for 20 minutes.</p>
        <p class="article-list-intro">Then work through these four steps:</p>
        <ol>
          <li>Capture for five minutes. Write down every promise, task, worry, follow-up, and half-finished job. Do not organise yet. Your first job is to stop using your memory as a storage room.</li>
          <li>Question the list for five minutes. For each item, ask: What happens if this waits? Who is affected? Is the deadline real, assumed, or self-imposed? A task with no meaningful consequence may not deserve today.</li>
          <li>Match the work to reality for five minutes. Look at the hours you actually have after meetings, care work, meals, and rest. If the work does not fit, choose what to delay, decline, delegate, shorten, or renegotiate. A crowded calendar cannot be repaired by optimism.</li>
          <li>Choose today's win for five minutes. Complete this sentence: If only one useful thing moves forward today, it will be ____. Pick an outcome, not a vague activity. “Send the proposal” is clearer than “work on proposal.”</li>
        </ol>
        <p>Planning also helps your mind release unfinished work. In one set of studies, making a specific plan reduced the mental interference caused by uncompleted goals. You can read the <a href="https://pubmed.ncbi.nlm.nih.gov/21688924/" target="_blank" rel="noopener noreferrer">research on plan-making and unfinished goals</a> if you want to explore why this works.</p>
      </section>
      <section class="article-section is-revealed" id="make-the-first-step-almost-too-easy" data-article-section>
        <h2>2. Make the first step almost too easy</h2>
        <p>A task such as “finish the presentation” still asks your brain to solve several problems before it can begin. Which file? Which section? What does finished mean? That uncertainty creates friction.</p>
        <p>Shrink the entry point until it looks almost boring: “Open the client deck and write the three slide headings.” Once you begin, the next step is easier to see.</p>
        <p>Now give the action a time and place: “At 10:00, after this call, I will close my inbox, open the client deck, and write the three headings.” Psychologists call this an implementation intention. A large review of the evidence found that these <a href="https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes" target="_blank" rel="noopener noreferrer">if-then plans can improve goal achievement</a>.</p>
        <p>You are not trying to feel motivated first. You are removing the decisions that normally stand between you and the start.</p>
      </section>
      <section class="article-section is-revealed" id="build-a-short-runway-for-focus" data-article-section>
        <h2>3. Build a short runway for focused work</h2>
        <p>You do not need a perfect two-hour morning routine. Start with one protected block of 25 to 45 minutes.</p>
        <p>Put the block on your calendar. Open only what the task needs. Silence the one interruption most likely to pull you away. Keep a small “not now” note nearby; when another thought appears, park it there instead of following it.</p>
        <p>If you must stop before the work is done, leave yourself a return note: “Next: compare the two price options and write the recommendation.” Research suggests that a <a href="https://pubsonline.informs.org/doi/abs/10.1287/orsc.2017.1184" target="_blank" rel="noopener noreferrer">ready-to-resume plan</a> can make it easier to switch away without carrying as much unfinished work into the next task.</p>
        <p>The point is not heroic concentration. It is making your return cheap. When the right file, page, and next action are easy to find, you spend less energy reconstructing your intention.</p>
      </section>
      <section class="article-section is-revealed" id="protect-your-plan-with-a-simple-script" data-article-section>
        <h2>4. Protect your plan by making trade-offs visible</h2>
        <p>New work will still arrive. Instead of accepting it silently and hoping the day stretches, make the trade-off visible.</p>
        <p>Try saying: “I can take this on. I am currently finishing the proposal for 3 PM. Which should come first?” Or: “I cannot finish both well today. I can send a shorter version by 4 PM or the complete version tomorrow morning. Which is more useful?”</p>
        <p>That is not being difficult. It is honest planning. When everything is called a priority, ask the person assigning the work to choose the consequence with you.</p>
        <p class="article-callout">A new yes should come with a clear decision about what moves.</p>
      </section>
      <section class="article-section is-revealed" id="when-the-problem-is-bigger-than-productivity" data-article-section>
        <h2>When the problem is bigger than productivity</h2>
        <p>Sometimes the list is not disorganised; it is simply too large. No morning routine can make one person sustainably do the work of three.</p>
        <p>If you regularly work late, cannot recover after rest, miss important tasks despite careful planning, or face more fixed commitments than available hours, treat that as a capacity problem. Bring evidence to the conversation: the work requested, the time available, the likely trade-offs, and your recommendation about what should pause.</p>
        <p>A useful sentence is: “Here is what fits this week, here is what does not, and here is the order I recommend.” Productivity should help you use your capacity well. It should not teach you to ignore your limits.</p>
      </section>
      <section class="article-section is-revealed" id="a-gentler-way-to-end-the-day" data-article-section>
        <h2>A gentler way to end the day</h2>
        <p>At the end of the day, do not judge yourself by the number of boxes you touched. Ask three questions: What moved? What did I learn? What is the next visible action for tomorrow?</p>
        <p>Then close the loop. Record the next step, save the place where the work continues, and let the rest of the list wait in a system you trust.</p>
        <p>Tomorrow may still be full. But it will not have to begin with twelve competing voices. It can begin with one clear return.</p>
        <p class="article-callout">Less reacting. Fewer open loops. One meaningful piece of progress at a time.</p>
      </section>
      <section class="article-section is-revealed" id="common-questions" data-article-section>
        <h2>Common questions when you feel overwhelmed</h2>
        <p>Where should I start when everything feels important? Start with consequences. Choose the task whose delay creates the most meaningful harm—or whose completion unlocks the most useful progress.</p>
        <p>How many priorities should I have today? Keep one main outcome and, if capacity allows, one or two smaller commitments. A list of ten priorities is still just a list.</p>
        <p>What if urgent requests keep interrupting me? Ask who is affected, what the real deadline is, and what should move if you accept the request. Genuine emergencies survive those questions; manufactured urgency usually becomes negotiable.</p>
      </section>`
  },
  "meet-luzora-return-to-what-matters": {
    title: "Meet Luzora: The tool that brings you back to what matters",
    description: "Meet Luzora, the tool that helps you return to the right place at the right time, follow through on what matters, and build consistency with The Hive.",
    image: "https://www.luzora.app/assets/images/blog/introducing-luzora/cover.webp",
    datePublished: "2026-08-24T12:00:00+01:00",
    dateModified: "2026-08-24T12:00:00+01:00"
  },
  "luzora-v1-0-6-faster-safer-smarter": {
    title: "Luzora v1.0.6 is live: Faster, safer, and smarter",
    description: "See what is new in Luzora v1.0.6, including Dynamic Context Preview, faster Home loading, task search, safe bulk deletion, stronger sync, smarter capture, and more reliable reminders.",
    image: "https://www.luzora.app/assets/brand-kit/social/open-graph/luzora-v1-0-6-product-update-og.png",
    datePublished: "2026-08-11T12:00:00+01:00",
    dateModified: "2026-08-11T12:00:00+01:00"
  },
  "luzora-v1-0-5-return-to-the-right-page": {
    title: "Luzora v1.0.5: Return to the Right Page at the Right Time",
    description: "See what is new in Luzora v1.0.5, including Smart Return, Auto Return, live countdowns, multiple reminders, improved scheduling, and more reliable browser tasks.",
    image: "https://www.luzora.app/assets/brand-kit/social/luzora-v1-0-5-product-update.png",
    datePublished: "2026-08-01T12:00:00+01:00",
    dateModified: "2026-08-01T12:00:00+01:00"
  },
  "hive-report-01-luzora-goes-public": {
    title: "The Hive Report #01: Luzora Goes Public, Gets Smarter, and Learns From You",
    description: "The first Hive Report covers Luzora's public launch, v1.0.4, Smart Return, community feedback, fixes, and the people helping shape the product.",
    image: "https://www.luzora.app/assets/brand-kit/social/hive-report-01.png?v=20260726-transparent",
    datePublished: "2026-07-26T18:00:00+01:00",
    dateModified: "2026-07-26T18:00:00+01:00"
  },
  "referral-system-is-live-invite-your-hive": {
    title: "Referral System Is Live: Invite Your Hive",
    description: "The Luzora referral system is live. Sign the Manifesto, share your unique referral link, and invite your community to join the Hive.",
    image: "https://www.luzora.app/assets/brand-kit/social/referral-system-article-preview.png",
    datePublished: "2026-07-21T09:00:00+01:00",
    dateModified: "2026-07-21T09:00:00+01:00"
  },
  "help-shape-luzora-private-testing-is-opening": {
    title: "Help shape Luzora: Private testing is opening",
    description: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
    image: "https://www.luzora.app/assets/brand-kit/other%20assets/worker-bee-in-private-test.avif",
    datePublished: "2026-07-18T09:00:00+01:00",
    dateModified: "2026-07-18T09:00:00+01:00"
  }
};

const templatePath = path.join(process.cwd(), "blog-article.html");

function escapeAttribute(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[character]);
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = function handler(request, response) {
  const rawSlug = Array.isArray(request.query.slug) ? request.query.slug[0] : request.query.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : "";

  if (!Object.prototype.hasOwnProperty.call(ARTICLES, slug)) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("X-Robots-Tag", "noindex");
    response.status(404).send("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>Article not found | Luzora</title></head><body><main><h1>Article not found</h1><p>This Luzora Journal article does not exist.</p><p><a href=\"/blog\">Return to The Hive Journal</a></p></main></body></html>");
    return;
  }

  const article = ARTICLES[slug];
  const title = escapeAttribute(article.title);
  const description = escapeAttribute(article.description);
  const image = escapeAttribute(article.image);
  const canonical = `https://www.luzora.app/blog/${slug}`;
  const articleBody = stripHtml(article.bodyHtml);
  const structuredDataGraph = [{
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    mainEntityOfPage: canonical,
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    articleSection: article.articleSection,
    keywords: article.keywords,
    articleBody: articleBody || undefined,
    wordCount: articleBody ? articleBody.split(/\s+/).length : undefined,
    author: {
      "@type": "Organization",
      name: "Luzora Team",
      url: "https://www.luzora.app/"
    },
    publisher: {
      "@id": "https://www.luzora.app/#organization"
    },
    isPartOf: {
      "@id": "https://www.luzora.app/blog#blog"
    },
    inLanguage: "en-US"
  }];

  if (Array.isArray(article.faqs) && article.faqs.length) {
    structuredDataGraph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: article.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
  }

  const articleStructuredData = serializeJsonLd({
    "@context": "https://schema.org",
    "@graph": structuredDataGraph
  });

  let html = fs.readFileSync(templatePath, "utf8");
  html = html
    .replace("<title>Luzora Journal Article</title>", `<title>${title} | Luzora</title>`)
    .replace('<link rel="canonical" href="https://www.luzora.app/blog" />', `<link rel="canonical" href="${canonical}" />`)
    .replace('<meta name="description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="description" content="${description}" />`)
    .replace('<meta property="og:title" content="Luzora Journal Article" />', `<meta property="og:title" content="${title}" />`)
    .replace('<meta property="og:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta property="og:description" content="${description}" />`)
    .replace('<meta property="og:url" content="https://www.luzora.app/blog" />', `<meta property="og:url" content="${canonical}" />`)
    .replace('<meta property="og:image" content="https://www.luzora.app/assets/images/og-image.png" />', `<meta property="og:image" content="${image}" />`)
    .replace('<meta property="article:published_time" content="2026-07-21T09:00:00+01:00" />', `<meta property="article:published_time" content="${article.datePublished}" />`)
    .replace('<meta name="twitter:title" content="Luzora Journal Article" />', `<meta name="twitter:title" content="${title}" />`)
    .replace('<meta name="twitter:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="twitter:description" content="${description}" />`)
    .replace('<meta name="twitter:image" content="https://www.luzora.app/assets/images/og-image.png" />', `<meta name="twitter:image" content="${image}" />`)
    .replace('<span data-article-breadcrumb>Blog title</span>', `<span data-article-breadcrumb>${title}</span>`)
    .replace('<h1 data-article-title>Welcome to Luzora Field Notes</h1>', `<h1 data-article-title>${title}</h1>`)
    .replace('<p data-article-dek>Stay up to date with the latest announcements, and news from Luzora.</p>', `<p data-article-dek>${escapeAttribute(article.dek || article.description)}</p>`)
    .replace('<span data-article-date>May 18, 2026</span>', `<span data-article-date>${escapeAttribute(article.dateLabel || "")}</span>`)
    .replace('<span data-article-read>5 min read</span>', `<span data-article-read>${escapeAttribute(article.readTime || "")}</span>`)
    .replace('<div class="article-body" data-article-body></div>', `<div class="article-body" data-article-body>${article.bodyHtml || ""}</div>`)
    .replace("<!-- ARTICLE_STRUCTURED_DATA -->", `<script type="application/ld+json">${articleStructuredData}</script>`);

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).send(html);
};
