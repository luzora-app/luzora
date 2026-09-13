(function () {
  "use strict";

  var ARTICLES = [
    {
      slug: "luzora-v1-0-7-better-beginning-smoother-return",
      title: "Luzora v1.0.7 is live: A better beginning and a smoother return",
      dek: "Personal onboarding, safer sign-in, a guided first routine, smarter page capture, clearer Bolt suggestions, and a more dependable Auto Return experience.",
      metaDescription: "See what is new in Luzora v1.0.7, including personalised onboarding, guided setup, improved Google and X sign-in, smarter page capture, Luzora Bolt, and Auto Return controls.",
      category: "Product update",
      date: "September 13, 2026",
      readTime: "8 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/v1-0-7/preview.webp",
      socialImage: "/assets/images/blog/v1-0-7/og.webp",
      cardImageAlt: "A Luzora task interface connecting a secure account, webpage context, completed tasks, and a timed return",
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
    {
      slug: "meet-the-hive-how-participation-and-value-work",
      title: "Meet the Hive: How Participation and Value Work",
      dek: "The Hive is where participation becomes visible: complete quests, create useful work, grow your reputation, build a community, and help Luzora move forward.",
      metaDescription: "Meet the Luzora Hive and learn how quests, Hive Points, referrals, profiles, member Hives, public schedules, collaboration, and community value work.",
      category: "Announcements",
      date: "September 10, 2026",
      readTime: "8 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/meet-the-hive/preview.webp",
      socialImage: "/assets/images/blog/meet-the-hive/cover.webp",
      cardImageAlt: "Three bees contributing to a golden community Hive and climbing toward a shared trophy",
      bodyHtml: `<figure class="article-cover-image"><img src="/assets/images/blog/meet-the-hive/cover.webp" alt="A thriving community of bees completing quests, creating schedules and contributing to connected Hives" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
<div class="article-lead" data-article-section>
<p>Luzora helps people return to the things they intend to do. The Hive gives that follow-through a community.</p>
<p>It is being built as the home of participation across Luzora: a place to complete quests, join conquests, share knowledge, create useful work, build a visible reputation and contribute to victories that are larger than one person.</p>
<p>Inside the Hive, participation should not disappear into a feed. Useful actions should leave a record. Consistency should be visible. The people who teach, welcome, create, refer, test and advocate should be able to show how they helped the product and its community grow.</p>
<p>That is the role of the Hive—and this is how its main parts fit together.</p>
</div>
<section class="article-section" id="a-home-for-participation-conquests-and-victory" data-article-section>
<h2>A home for participation, conquests and victory</h2>
<p>The Hive brings Luzora’s community activity into one connected system.</p>
<p>Members can take part in quests, learn about Luzora, support campaigns and compete for positions on the leaderboard. Some activities are individual. Others can become conquests in which people or Hives work toward a shared objective.</p>
<p>The leaderboard is not meant to reward noise. It is meant to make meaningful participation visible. A member who consistently completes useful activities, helps others and creates work the community can use should build a stronger record over time than someone who appears once, posts repeatedly and adds no real value.</p>
<p>This also makes competition more constructive. The goal is not simply to collect points. The goal is to give people clear ways to contribute, show what they have done and keep moving toward the next useful action.</p>
</section>
<section class="article-section" id="your-profile-is-your-record" data-article-section>
<h2>Your profile is your record</h2>
<p>Every member has a Hive profile. Over time, that profile is intended to become a richer record of what the person does and how consistently they have shown up.</p>
<p>A profile can bring together participation such as:</p>
<ul><li>Quests and conquests completed</li><li>Hive Points earned</li><li>Referral and community-building activity</li><li>Content and other verified contributions</li><li>Schedules created for public use</li><li>Recognitions, rankings and community achievements</li></ul>
<p>This matters because a username tells people very little. A history of useful action tells them much more.</p>
<p>Someone may become known for writing excellent guides, creating reliable schedules, welcoming new members, producing strong videos or representing Luzora in public. The profile gives those contributions somewhere to accumulate instead of letting each one disappear after it happens.</p>
</section>
<section class="article-section" id="how-hive-points-work" data-article-section>
<h2>How Hive Points work</h2>
<p>Hive Points, or HP, are Luzora’s measure of participation and contribution. They connect activity in the Hive with useful activity across the wider Luzora product.</p>
<p>Members can earn eligible Hive Points by:</p>
<ul><li>Completing tasks with the Luzora extension or future Luzora apps</li><li>Following through on eligible recurring activities</li><li>Completing Hive quests and taking part in conquests</li><li>Referring verified members to Luzora</li><li>Helping referrals become active Luzora users</li><li>Creating useful, verifiable content</li><li>Supporting other community members</li><li>Representing Luzora online or at physical events</li></ul>
<p>Task-completion rewards can vary by plan. Free members and Pro members may earn different amounts for eligible activity, with Pro participation receiving a higher rate where the applicable reward rules say so. Quest cards show the amount available before a member begins.</p>
<p>Not every action automatically earns HP. Some activities can be verified by the product, while others need evidence and a team or community review. Clear eligibility rules protect the system from spam and make the record more meaningful for everyone.</p>
<blockquote class="article-callout"><p>Hive Points are not money, a cryptocurrency or a promise of future cash value. They are a visible record used within Luzora’s participation and reward system.</p></blockquote>
<p>As the system grows, HP is also planned to unlock practical uses. One example is streak repair: a member who breaks an eligible streak may be able to spend Hive Points to restore it, subject to the rules shown at the time. More uses will be introduced carefully as the Hive develops.</p>
</section>
<section class="article-section" id="creating-value-is-bigger-than-completing-a-quest" data-article-section>
<h2>Creating value is bigger than completing a quest</h2>
<p>Quests provide a clear starting point, but value is not limited to a button on a task card.</p>
<p>A member can create value by making something that helps another person understand, use or discover Luzora. That could be a thoughtful article, an educational thread, a useful video, a product demonstration, a translation, a community resource or constructive feedback that improves the experience.</p>
<p>Value can also be created through advocacy. A member might explain Luzora during an X Space, introduce it at a school or professional community, demonstrate it at an event or help someone set up the product in person. When that effort can be recorded and verified, it can form part of the member’s contribution history.</p>
<p>The same principle applies to referrals. Inviting a person is useful, but helping the right person discover Luzora and become an active user creates more lasting value. The system is therefore intended to recognise both the introduction and the quality of participation that follows it.</p>
<p>Good contribution is not measured only by reach. A clear answer that helps one new member can be more useful than a loud post that helps nobody. The Hive should make room for both visible creators and the quieter people who keep a community healthy.</p>
</section>
<section class="article-section" id="building-your-own-hive" data-article-section>
<h2>Building your own Hive</h2>
<p>The Hive is not only a name for the entire Luzora community. It is also the model for smaller member-led communities inside it.</p>
<p>Today, referrals form the earliest version of these relationships. When someone joins through your referral, that person becomes part of your Hive network. The value created by active referrals can contribute to your own progress and, as the system expands, to the standing of your Hive.</p>
<p>The fuller member-Hive system is planned to let members create a Hive, invite others and compete on a shared Hive leaderboard. A person will belong to only one member Hive at a time, but they will not be trapped there. Members will be able to move when another community better matches the value, culture or support they need.</p>
<p>That creates a healthy responsibility for Hive leaders. Recruitment may bring someone in, but leadership must give them reasons to stay.</p>
<p>A strong Hive might provide:</p>
<ul><li>Useful guidance for new members</li><li>Shared goals and organised conquests</li><li>Accountability and encouragement</li><li>Education, resources and practical support</li><li>Recognition for members who contribute</li><li>A culture that makes participation worth returning to</li></ul>
<p>When members create value, they strengthen their own records. When a Hive consistently helps its members create value, the Hive itself can grow in standing. Individual progress and collective progress reinforce each other.</p>
</section>
<section class="article-section" id="public-schedules-and-the-marketplace" data-article-section>
<h2>Public schedules and the marketplace</h2>
<p>Luzora is built around turning intentions into actions at the right place and time. Some of the best action plans should not have to be rebuilt by every person from scratch.</p>
<p>An upcoming part of the Hive will allow members to create schedules for public use. A creator might publish a revision plan, a job-search routine, a course-completion schedule, a fitness sequence or a structured way to follow an important online process.</p>
<p>Those schedules are intended to live in a Hive marketplace where other members can discover them, obtain them and import them into Luzora. The creator’s profile can show what they have published, while ratings, usage and review systems can help the community identify schedules that genuinely work.</p>
<p>This turns practical knowledge into something reusable. Instead of only telling someone to “be consistent,” a creator can give them a sequence they can actually follow.</p>
<p>Marketplace availability, purchasing methods, creator rewards and review rules will be explained when those features are released. Until then, references to the marketplace describe the direction of the product, not a currently available transaction or guaranteed earning opportunity.</p>
</section>
<section class="article-section" id="a-place-for-partner-communities" data-article-section>
<h2>A place for partner communities</h2>
<p>The Hive is also being designed for collaboration beyond Luzora.</p>
<p>Projects may be able to bring educational activities, product tasks and community campaigns into the Hive. Luzora members can discover and participate in those activities, while partner communities can use the Hive to organise contributions and introduce their members to Luzora’s system.</p>
<p>Done well, this creates more than promotion. It can give members new things to learn, new problems to solve and new communities to meet. It can also give partner projects a clearer way to recognise genuine participation instead of relying only on impressions or follower counts.</p>
<p>Every collaboration will need transparent requirements, verification rules and rewards. Members should be able to understand what they are being asked to do, what evidence is required and what they can earn before taking part.</p>
</section>
<section class="article-section" id="what-the-hive-is-building-toward" data-article-section>
<h2>What the Hive is building toward</h2>
<p>The Hive begins with a simple idea: useful participation deserves to be visible.</p>
<p>Quests make the next contribution clear. Profiles preserve the record. Hive Points help measure eligible participation. Referrals connect people. Member Hives will turn those relationships into communities. Public schedules will let members package knowledge into something others can use. The marketplace will help that work travel further. Conquests and partner activities will give individuals and Hives bigger goals to pursue together.</p>
<p>Some of these systems are available now. Others are being built in stages. As each one becomes live, its exact eligibility, verification, reward and participation rules will be shown in the product.</p>
<p>What will remain consistent is the principle beneath them:</p>
<blockquote class="article-callout"><p>Create value for yourself. Create value for another person. Create value for the community and the product we are building together.</p></blockquote>
<p>The Hive is where that work can be seen, remembered and carried forward.</p>
<p><a href="https://hive.luzora.app/" target="_blank" rel="noopener noreferrer">Enter the Hive</a>, complete your next quest and begin building your record of contribution.</p>
</section>`
    },
    {
      slug: "finish-online-course-on-time",
      title: "Found a New Course? 5 Ways to Stay on Track and Finish It on Time",
      dek: "A practical, research-backed system for turning a new online course into scheduled sessions, useful learning, and a finish line you can actually reach.",
      metaDescription: "Learn how to finish an online course on time by defining the outcome, scheduling realistic sessions, reducing return friction, studying actively, and planning for missed days.",
      category: "Guides",
      date: "September 8, 2026",
      readTime: "7 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/course-completion/card.webp",
      socialImage: "/assets/images/blog/course-completion/og.webp",
      cardImageAlt: "An online course connected to seven scheduled learning sessions and a completion check",
      bodyHtml: `<figure class="article-cover-image"><img src="/assets/images/blog/course-completion/cover.webp" alt="A laptop course connected to a weekly learning plan and seven steps leading to completion" width="1536" height="1024" decoding="async" loading="eager" fetchpriority="high" /></figure>
<div class="article-lead" data-article-section>
<p>Buying a course can feel suspiciously similar to making progress.</p>
<p>You find the perfect course. You watch the introduction. Perhaps you complete the first lesson. For a few days, becoming better at the subject feels almost inevitable.</p>
<p>Then the course becomes another open tab.</p>
<p>Work gets busy. You miss one study session. Returning now requires finding the course, remembering your password, locating your last lesson and figuring out what you were learning.</p>
<p>Eventually, “I’m taking a course” quietly becomes “I bought a course.”</p>
<p>This usually is not a problem of intelligence or even motivation. Online courses give us flexibility, but flexibility means we must provide our own structure. Research into online learning repeatedly points to skills such as time management, effort regulation and monitoring your own understanding—not enthusiasm alone—as important parts of academic success. <a href="https://www.sciencedirect.com/science/article/pii/S1096751615000251" target="_blank" rel="noopener noreferrer">Read Broadbent and Poon’s systematic review</a>.</p>
<p>Here are five ways to create that structure.</p>
</div>
<section class="article-section" id="1-decide-what-completing-the-course-means" data-article-section>
<h2>1. Decide what completing the course means</h2>
<p>Before watching another lesson, answer one question:</p>
<blockquote class="article-callout"><p>What should I be able to do when this course is over?</p></blockquote>
<p>“Learn graphic design” is too broad.</p>
<p>“Design a complete landing page for my business” gives the course a destination.</p>
<p>“Understand digital marketing” is vague.</p>
<p>“Create and launch my first advertising campaign” gives you something concrete to work toward.</p>
<p>Review the course curriculum and identify:</p>
<ul><li>The lessons you must complete</li><li>The exercises that matter</li><li>The project you want to produce</li><li>The date you want to finish</li></ul>
<p>Not every bonus lesson deserves the same attention. Your goal is not necessarily to consume every minute of video. Your goal is to gain and apply the skill you came for.</p>
<p>Write your finish line somewhere visible:</p>
<blockquote class="article-callout"><p>By October 30, I will complete this course and use it to create my first portfolio website.</p></blockquote>
<p>Now the course is connected to a real outcome.</p>
</section>
<section class="article-section" id="2-turn-the-course-into-scheduled-sessions" data-article-section>
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
<section class="article-section" id="3-make-returning-ridiculously-easy" data-article-section>
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
<section class="article-section" id="4-stop-measuring-learning-by-videos-watched" data-article-section>
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
<section class="article-section" id="5-create-a-recovery-rule-before-you-fall-behind" data-article-section>
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
<section class="article-section" id="your-course-completion-plan" data-article-section>
<h2>Your course completion plan</h2>
<p>Before leaving this page, write down:</p>
<ul><li><strong>My outcome:</strong> What will this course help me produce or do?</li><li><strong>My deadline:</strong> When do I intend to finish?</li><li><strong>My sessions:</strong> Which days and times will I study?</li><li><strong>My next lesson:</strong> Where exactly will I continue?</li><li><strong>My recovery rule:</strong> What will I do after missing a session?</li><li><strong>My proof of learning:</strong> How will I practise or test myself?</li></ul>
<p>A new course gives you information. A completion system gives that information somewhere to go.</p>
<p>Luzora is being built for that gap between deciding and doing: saving what matters, keeping it connected to the right place and helping you return when it is time to follow through.</p>
<p>Because the course sitting in your account cannot improve your life.</p>
<p>The part you return to, understand and apply can.</p>
</section>
<section class="article-section" id="common-questions-about-completing-an-online-course" data-article-section>
<h2>Common questions about completing an online course</h2>
<p><strong>How can I finish an online course without losing motivation?</strong> Do not make motivation responsible for the entire course. Define the result you want, schedule realistic sessions, record exactly where to return and use a recovery rule whenever you miss a session.</p>
<p><strong>How many times a week should I study an online course?</strong> Choose a schedule you can maintain during a normal week. Two or three focused sessions are often more realistic than promising to study every day and abandoning the plan when life becomes busy.</p>
<p><strong>What should I do when I fall behind?</strong> Return during your next available session, even if you can only study for 15 minutes. Continue from the next clear action, adjust the deadline if necessary and avoid turning one missed day into a complete restart.</p>
</section>`
    },
    {
      slug: "out-of-sight-out-of-mind",
      title: "Out of Sight, Out of Mind: Your Productivity Tool Should Bring the Task Back to You",
      dek: "When an important action disappears with a closed tab, remembering is not enough. The right system should bring the task and its context back into view.",
      metaDescription: "See how Luzora and Auto Return bring forgotten browser tasks and their context back into view at the right time.",
      category: "Productivity",
      date: "September 6, 2026",
      readTime: "7 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/out-of-sight/cover.webp",
      socialImage: "/assets/images/blog/out-of-sight/og.webp",
      cardImageAlt: "A saved email task returning through a glowing yellow Auto Return portal",
      coverImage: {
        src: "/assets/images/blog/out-of-sight/cover.webp",
        alt: "A saved email task returning through a glowing yellow Auto Return portal",
        width: 1536,
        height: 1024
      },
      lead: [
        "You open an email that needs a thoughtful reply.",
        "You find a course you want to continue, a form you need to complete, or a document you should review before Friday.",
        "The intention is real. You mean to return.",
        "Then another tab opens. A message arrives. The browser moves on, and the action quietly disappears with the page.",
        "Hours or days later, you may remember that something needed your attention, but not what it was, where it was, or what you planned to do next.",
        "The task did not become less important. It simply left your field of view."
      ],
      sections: [
        {
          id: "when-an-action-disappears-from-awareness",
          title: "When an action disappears from awareness",
          body: [
            "Within ADHD communities, people sometimes use the phrase “object permanence” to describe an “out of sight, out of mind” experience.",
            "This is not object permanence in its clinical, developmental meaning. Adults do not suddenly believe that a hidden email, document, or responsibility has stopped existing. Instead, the phrase is commonly used as a metaphor for the difficulty of keeping something present in your awareness without a visible cue.",
            "A more accurate description is that some people find it harder to recall or prioritise tasks once those tasks are no longer visible. External cues and reminders can help bring them back into awareness. [Simply Psychology explains this distinction](https://www.simplypsychology.org/object-permanence-and-adhd.html), while [Life Skills Advocate outlines visibility and context-based reminders as practical workarounds](https://lifeskillsadvocate.com/blog/object-permanence-adhd-workarounds/).",
            "This experience is not limited to any single group. A closed tab, buried notification, crowded inbox, or forgotten bookmark can make an intention disappear for almost anyone."
          ]
        },
        {
          id: "the-hidden-problem-with-productivity-tools",
          title: "The hidden problem with productivity tools",
          body: [
            "Most productivity tools ask you to do something surprisingly difficult: remember to open the tool that contains the things you are already struggling to remember.",
            "You must remember the original action. Then you must remember which app contains it. Then you must open that app, find the task, locate the original page, and reconstruct what you intended to do.",
            "The tool may have stored the task perfectly, but it still depends on you returning to the tool before it can help.",
            "That creates a structural problem. A productivity system hidden behind an icon can become another thing that is out of sight.",
            "The task is saved, but the action remains forgotten."
          ]
        },
        {
          id: "visibility-is-part-of-the-system",
          title: "Visibility is part of the system",
          body: [
            "Good reminders do more than preserve information. They make the right information visible at a useful moment.",
            "This is why people place important items near the door, keep notes where they naturally look, or set reminders for ordinary actions, not only major appointments. The environment carries part of the responsibility for remembering.",
            "Digital tools should be able to do the same.",
            "Instead of expecting you to repeatedly check another list, the system should meet you where the intention was created and bring that intention back when it is time to act.",
            "That is the idea behind Luzora."
          ],
          callout: "The system should not only save the task. It should help the task become visible again."
        },
        {
          id: "luzora-begins-where-the-intention-is-formed",
          title: "Luzora begins where the intention is formed",
          body: [
            "Luzora lives in the browser because that is where many intentions begin.",
            "You are already looking at the email, application, article, course, chart, document, or website that requires an action. You can capture the task while the page and your reason for returning are still clear.",
            "Rather than saving only a sentence such as “Reply tomorrow,” Luzora can keep the task connected to the page where the reply needs to happen.",
            "You decide what you need to do, where you need to do it, and when you want to return.",
            "The task no longer has to survive as a loose thought. Luzora preserves both the intention and its destination."
          ]
        },
        {
          id: "auto-return-brings-forgotten-actions-back-into-view",
          title: "Auto Return brings forgotten actions back into view",
          body: [
            "A normal reminder can tell you that it is time to do something.",
            "Auto Return goes a step further by helping the place where the action happens reappear.",
            "Imagine opening an important email and creating the task “Reply to this email tomorrow at 10:00 AM.”",
            "When the task becomes due, Auto Return can bring you back to that email instead of leaving you with a notification and expecting you to find it again.",
            "The same structure can work for a course lesson, an application deadline, a document awaiting approval, an invoice follow-up, an article you want to read, or a saved chart you need to review.",
            "Before returning, Luzora displays a short countdown on the page you are currently viewing. You can go immediately, cancel the automatic return, or dismiss the visual warning.",
            "If the destination is already open, Luzora can focus the matching tab without unnecessarily reloading it. If it is not open, Luzora can create a new tab instead of replacing the unrelated page you are using.",
            "Auto Return is optional and remains under the user’s control. It must be enabled, applies to eligible timed tasks with saved destinations, and depends on the browser being open when the task becomes due."
          ],
          callout: "A reminder tells you what to do. Auto Return can bring back the place where you can do it."
        },
        {
          id: "a-reminder-tells-you-a-return-restores-the-context",
          title: "A reminder tells you. A return restores the context.",
          body: [
            "“Continue your course” may be accurate, but it still leaves questions: Which course? Which lesson? Where did you stop?",
            "“Review the document” can create the same friction: Which document? Where is it? What needed reviewing?",
            "Every missing step gives the action another opportunity to be postponed.",
            "Luzora reduces that gap by reconnecting the reminder to the place where the intention began. When the page returns, more of the original context returns with it.",
            "You are not being asked to remember the entire chain. You can continue from the place you previously chose.",
            "That is the structural difference. Luzora does not only wait inside a task list. It sits closer to the moment an intention is created and reappears at the moment of return."
          ]
        },
        {
          id: "support-not-treatment",
          title: "Support, not treatment",
          body: [
            "Luzora is not a diagnostic tool or a treatment for ADHD. It does not decide why someone forgets an action, and it cannot replace personalised support from a qualified professional.",
            "What it can provide is a practical mechanism: externalise an intention, keep it connected to its context, and make it visible again at a chosen time.",
            "People should not have to blame themselves every time a hidden task falls out of awareness. Sometimes the system is asking too much of memory.",
            "A better system can carry more of that load."
          ]
        },
        {
          id: "what-did-you-mean-to-return-to",
          title: "What did you mean to return to?",
          body: [
            "Think about the tabs you closed this week.",
            "Was there an email you intended to answer? A form you planned to complete? A lesson, proposal, article, or application you genuinely wanted to revisit?",
            "Choose one action. Save the place where it needs to happen. Decide when you want it brought back into view.",
            "Then let Luzora help you return to what matters."
          ],
          callout: "Save the place. Keep the intention. Return when it matters."
        }
      ]
    },
    {
      "slug": "stop-gaming-from-taking-over-your-life",
      "title": "4 Practical Ways to Stop Gaming From Taking Over Your Life",
      "dek": "Four practical ways to regain control of gaming: recognise harmful patterns, meet your needs, set boundaries, and make real-world progress visible.",
      "metaDescription": "Four practical ways to regain control of gaming: recognise harmful patterns, meet your needs, set boundaries, and make real-world progress visible.",
      "category": "Guides",
      "date": "September 3, 2026",
      "readTime": "6 min read",
      "author": "Luzora Team",
      "cardImage": "/assets/images/blog/gaming/cover.webp",
      "socialImage": "/assets/images/blog/gaming/og.webp",
      "cardImageAlt": "A charcoal game controller shaped into a maze, with a yellow path and a person at its entrance",
      "bodyHtml": "<figure class=\"article-cover-image\"><img src=\"/assets/images/blog/gaming/cover.webp\" alt=\"A charcoal game controller shaped into a maze, with a yellow path and a person at its entrance\" width=\"1731\" height=\"909\" decoding=\"async\" loading=\"eager\" fetchpriority=\"high\" /></figure>\n<div class=\"article-lead\" data-article-section>\n<p>Games are designed to make progress easy to understand.</p>\n<p>You know the objective. You receive immediate feedback. You can see yourself improving. Even failure gives you useful information for the next attempt.</p>\n<p>Real life rarely works that way.</p>\n<p>You can work for weeks without knowing whether you are getting closer to your goal. Important tasks are often unclear, uncomfortable and slow to reward you. Gaming becomes especially difficult to control when it offers progress, confidence and connection that are missing elsewhere.</p>\n<p>The goal, therefore, is not simply to play fewer games. It is to understand what keeps pulling you back and build a life that can compete for your attention.</p>\n<p>Here are four practical ways to begin.</p>\n</div>\n<section class=\"article-section\" id=\"1-measure-the-damage-not-just-the-hours\" data-article-section>\n<h2>1. Measure the damage, not just the hours</h2>\n<p>Playing for several hours does not automatically mean you have a gaming problem. Someone may play extensively without neglecting their responsibilities, while another person’s shorter sessions may consistently damage their sleep, work or relationships.</p>\n<p>The more useful questions are:</p>\n<ul><li>Are you repeatedly playing longer than you intended?</li><li>Are you postponing important work to play?</li><li>Is gaming affecting your sleep?</li><li>Have you lost interest in activities you previously enjoyed?</li><li>Do you continue playing despite problems it is causing?</li><li>Have you tried to reduce your gaming and repeatedly failed?</li></ul>\n<p>The World Health Organization identifies impaired control, increasing priority given to gaming and continued play despite negative consequences as the central features of gaming disorder. This does not mean everyone who games heavily has a disorder. It gives us a better way to evaluate whether gaming is becoming harmful. <a href=\"https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder\" target=\"_blank\" rel=\"noopener noreferrer\">Read the WHO explanation</a>.</p>\n<p>For one week, record when you start, when you stop and what you postpone.</p>\n<p>Do not estimate. Write it down.</p>\n<p>You may discover that the issue is not gaming every day. It might be gaming after midnight, playing whenever work becomes difficult or turning a short break into an entire afternoon.</p>\n<p>A specific pattern is easier to change than a vague feeling that you “play too much.”</p>\n</section>\n<section class=\"article-section\" id=\"2-identify-the-need-gaming-is-meeting\" data-article-section>\n<h2>2. Identify the need gaming is meeting</h2>\n<p>People do not only play games because games are entertaining.</p>\n<p>Games can provide:</p>\n<ul><li>Achievement</li><li>Competition</li><li>Social connection</li><li>Relief from stress</li><li>A sense of control</li><li>Escape from difficult emotions</li><li>Visible and predictable progress</li></ul>\n<p>Research has found that escapism and using gaming to cope with negative emotions are strongly associated with problematic gaming symptoms. Achievement and social motivations can also contribute. <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9872536/\" target=\"_blank\" rel=\"noopener noreferrer\">Review the research on gaming motivations</a>.</p>\n<p>Ask yourself:</p>\n<blockquote class=\"article-callout\"><p>What becomes easier for me when I am playing?</p></blockquote>\n<p>Perhaps you stop thinking about money. You feel capable. You have people to talk to. You receive recognition. You know exactly what to do next.</p>\n<p>Your answer tells you what must be addressed outside the game.</p>\n<p>If gaming is your main social activity, reducing it without creating another source of connection may leave you isolated.</p>\n<p>If it provides achievement, you need real-world goals with visible progress.</p>\n<p>If it helps you avoid anxiety, removing the game will not resolve the work, conversation or decision creating that anxiety.</p>\n<p>Do not leave an important need empty. Find a healthier way to meet it.</p>\n</section>\n<section class=\"article-section\" id=\"3-replace-unlimited-gaming-with-a-defined-session\" data-article-section>\n<h2>3. Replace unlimited gaming with a defined session</h2>\n<p>“Play less” is too vague to work.</p>\n<p>A better plan answers four questions:</p>\n<ol><li>When will I begin?</li><li>When will I stop?</li><li>What is my final match?</li><li>What will I do immediately afterward?</li></ol>\n<p>For example:</p>\n<blockquote class=\"article-callout\"><p>I can play between 7:30 and 9:00 p.m. I will not start another match after 8:40. When I finish, I will shut down the computer and prepare for tomorrow.</p></blockquote>\n<p>The final-match rule matters because many games do not end neatly when your alarm rings. If you decide when to stop only after finishing a match, “one more” remains available forever.</p>\n<p>Make the boundary easier to follow:</p>\n<ul><li>Set an alarm before your final match.</li><li>Disable automatic game launches.</li><li>Remove games from devices you use for work.</li><li>Avoid gaming in bed.</li><li>Tell teammates when you plan to leave.</li><li>Keep controllers and gaming devices out of immediate reach when the session ends.</li></ul>\n<p>These changes are not punishments. They create a pause between wanting to play and automatically opening the game.</p>\n<p>Identifying triggers, monitoring behaviour and planning different responses are common elements in cognitive behavioural approaches to problematic gaming. Research suggests these interventions can help, although the quality and strength of evidence vary between studies. <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9940764/\" target=\"_blank\" rel=\"noopener noreferrer\">See the review of randomized trials</a>.</p>\n</section>\n<section class=\"article-section\" id=\"4-make-real-world-progress-easier-to-see\" data-article-section>\n<h2>4. Make real-world progress easier to see</h2>\n<p>A game might show your rank, experience points, completed missions and the exact requirements for your next reward.</p>\n<p>Your real goals may exist as statements like:</p>\n<ul><li>Get a better job</li><li>Build my business</li><li>Improve my health</li><li>Finish my course</li></ul>\n<p>These are directions, not actions. Their size and uncertainty make gaming more attractive.</p>\n<p>Convert them into actions you can finish:</p>\n<ul><li>Improve one section of my CV.</li><li>Contact one potential customer.</li><li>Walk for 20 minutes.</li><li>Complete one lesson.</li><li>Write 200 words.</li><li>Send the email I have been avoiding.</li></ul>\n<p>Track these actions somewhere visible.</p>\n<p>You can also use gaming as a reward instead of allowing it to interrupt the work:</p>\n<blockquote class=\"article-callout\"><p>After completing my most important task, I can play for one planned session.</p></blockquote>\n<p>The objective is not to turn your whole life into a game. It is to stop making real progress invisible.</p>\n</section>\n<section class=\"article-section\" id=\"when-self-imposed-limits-are-not-enough\" data-article-section>\n<h2>When self-imposed limits are not enough</h2>\n<p>Some people can regain control by changing their schedule and environment. Others may need professional support.</p>\n<p>Consider speaking with a qualified mental-health professional if gaming is seriously affecting your education, work, health, relationships or finances—especially if repeated attempts to reduce it have failed.</p>\n<p>Cognitive behavioural therapy is one of the most studied psychological approaches for problematic gaming. Reviews also suggest potential benefits from mindfulness and family-supported interventions, although more high-quality research is still needed. <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC9705304/\" target=\"_blank\" rel=\"noopener noreferrer\">Read the treatment review</a>.</p>\n<p>Seeking support is not an overreaction. Once a behaviour is repeatedly harming your life and feels outside your control, getting help is a practical response.</p>\n</section>\n<section class=\"article-section\" id=\"start-with-one-week-not-forever\" data-article-section>\n<h2>Start with one week, not forever</h2>\n<p>Do not begin by promising never to play another game.</p>\n<p>Run a seven-day experiment:</p>\n<ul><li>Track every gaming session.</li><li>Complete one important task before playing.</li><li>Set a final-match time.</li><li>Protect your normal sleeping time.</li><li>Replace one gaming session with another rewarding activity.</li><li>Review what caused you to break your limits.</li></ul>\n<p>At the end of the week, you will have something more useful than guilt: evidence.</p>\n<p>You will know when you are most vulnerable, what gaming provides for you and which boundaries you can realistically maintain.</p>\n<p>The aim is not to prove that you can live without games.</p>\n<p>It is to make sure you are still building a life you do not constantly need to escape from.</p>\n</section>"
    },
    {
      slug: "stop-doomscrolling-when-you-have-real-work-to-do",
      title: "3 Tips to Stop Doomscrolling When You Have Real Work to Complete",
      dek: "Three research-backed ways to escape the endless feed, make your phone less tempting, and return to the work that deserves your attention.",
      metaDescription: "Learn three practical ways to stop doomscrolling when you need to work: add friction, create a stopping point, and make the real task easier to begin.",
      category: "Guides",
      date: "August 31, 2026",
      readTime: "7 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/doomscrolling/cover.webp?v=20260903",
      socialImage: "/assets/images/blog/doomscrolling/cover.webp?v=20260903",
      cardImageAlt: "An endless phone feed crossing three yellow stopping points before leading back to focused work on a laptop",
      coverImage: {
        src: "/assets/images/blog/doomscrolling/cover.webp?v=20260903",
        alt: "An endless phone feed crossing three yellow stopping points before leading back to focused work on a laptop",
        width: 1731,
        height: 909
      },
      lead: [
        "It is 9:18 in the morning.",
        "You sit down to finish a proposal that should have gone out yesterday. Before opening the document, you pick up your phone to check one message.",
        "There is a worrying headline beneath it. You open the story. Then the comments. Someone links to another post with an even worse headline. A video starts playing. You scroll to see what happens next.",
        "When you finally look at the time, it is 9:57.",
        "The proposal has not moved. You feel less prepared to begin it than you did before—and now you are annoyed with yourself too.",
        "If this happens to you, the obvious advice is to put your phone down and exercise more discipline. But that misses part of the story.",
        "Sometimes you are not scrolling because the content is particularly enjoyable. You are scrolling because the work in front of you feels uncertain, difficult, or uncomfortable—and the phone offers somewhere easier to go.",
        "To stop, you need more than willpower. You need to make scrolling less automatic, give it a clear ending, and make your real work easier to enter."
      ],
      sections: [
        {
          id: "quick-answer",
          title: "The short answer",
          body: [
            "To stop doomscrolling when you need to work, add friction before you open the feed, decide how the scrolling session will end before it begins, and make the first step of your real task small enough to start immediately.",
            "You do not have to give up your phone or stop following the news. The goal is to prevent an unplanned check from deciding how you spend the next hour."
          ],
          callout: "Make the scroll less convenient. Give it an ending. Make the work easier to enter."
        },
        {
          id: "why-doomscrolling-is-difficult-to-stop",
          title: "Why doomscrolling is so difficult to stop",
          body: [
            "Doomscrolling is the repeated consumption of negative or distressing news, even after the experience has stopped being useful and has started making you feel worse.",
            "You may begin because you genuinely want information. Something important is happening, and knowing more feels like a way to become safer or more prepared. But there is always another update, opinion, warning, or prediction. The feed never says, 'You understand enough now.'",
            "Research on problematic news consumption has found that some people become preoccupied with the news, struggle to reduce their consumption, and continue checking even when it interferes with the rest of their lives. Higher levels of this behaviour have also been associated with poorer mental and physical well-being. The research does not prove that scrolling caused every outcome, but it shows that the pattern can become genuinely disruptive. [Read the study](https://pubmed.ncbi.nlm.nih.gov/35999665/).",
            "And when uncomfortable work is waiting nearby, the feed becomes even harder to leave. Facing a task with an uncertain outcome requires effort. Moving your thumb produces something new immediately. That is not a fair fight, so change the conditions."
          ]
        },
        {
          id: "add-friction-before-the-urge-arrives",
          title: "1. Add friction before the urge arrives",
          body: [
            "Imagine putting a bowl of sweets on your desk and telling yourself not to notice it. You might resist for a while. But every time you see the bowl, you have to make the decision again.",
            "Your phone can work the same way. A notification appears. You see an application badge. Your hand reaches for the device before you have consciously decided to stop working.",
            "The solution is not to make the correct choice fifty times. It is to remove some of the unnecessary choices."
          ],
          listType: "ul",
          listIntro: "Before beginning important work:",
          list: [
            "Turn off notifications that do not require an immediate response.",
            "Move distracting applications away from your home screen.",
            "Put your phone somewhere that requires you to stand up.",
            "Use grayscale if colourful feeds keep pulling you back.",
            "Block social media or mobile internet during one focused work period."
          ],
          afterList: [
            "You do not need to apply all five. Choose the smallest change that creates a pause between the urge and the action.",
            "A preregistered field experiment found that putting smartphones into grayscale produced an immediate reduction in objectively measured screen time. Self-imposed time limits also helped, although their effect was smaller and more gradual. The researchers did not find an immediate improvement in academic performance or well-being, so grayscale is not a magical productivity switch. It simply makes the phone a little less visually persuasive. [Read the study](https://doi.org/10.1089/cyber.2022.0027).",
            "A larger randomized study blocked mobile internet on participants' phones for two weeks while still allowing calls and text messages. Participants showed improvements in sustained attention, mental health, and subjective well-being. [Read the study](https://doi.org/10.1093/pnasnexus/pgaf017).",
            "You do not have to turn your smartphone into a basic phone for two weeks. Try it for 30 minutes. Put the phone across the room, block the two applications that most often take you away, and open only what your work requires. If 30 minutes feels unrealistic, begin with ten."
          ],
          callout: "Do not make your self-control fight the same battle every five minutes. Change the environment before the urge arrives."
        },
        {
          id: "decide-where-the-scroll-ends",
          title: "2. Decide where the scroll ends before you open it",
          body: [
            "'I'll quickly check the news' is not a complete plan. What does quickly mean? Which news? How will you know when you have seen enough? If those questions have no answers, the feed will answer them for you.",
            "Before opening an application, decide your purpose, which source you will use, how long you will stay, and what action signals that you are finished.",
            "A real plan might sound like this: 'After lunch, I will check these two trusted sources for ten minutes. When the timer rings, I will close the application and return to the report.' That is different from promising yourself that you will use social media less. It gives the session an edge.",
            "In one experiment, 143 university students were assigned either to continue using social media normally or to limit Facebook, Instagram, and Snapchat to ten minutes per platform each day. After three weeks, the limited-use group showed reductions in loneliness and depression compared with the control group. The study involved a relatively small student sample and examined well-being rather than productivity, so 30 minutes should not be treated as a universal prescription. Its more useful lesson is that a specific limit is easier to act on than a vague intention. [Read the study](https://doi.org/10.1521/jscp.2018.37.10.751).",
            "You can also replace the endless feed with a finite source. Instead of opening a homepage that refreshes forever, subscribe to one daily briefing. Save two publications you trust. Read the story you intended to read without entering the comments.",
            "You are not trying to become uninformed. You are choosing a container for the information.",
            "When the timer rings, do not negotiate for one more post. Close the application, place the phone down, and physically change your position. Stand up, take a breath, or get a glass of water. That small movement marks the end of one activity and the beginning of another."
          ],
          callout: "An endless feed will not tell you when you have seen enough. Bring your own stopping point."
        },
        {
          id: "make-the-work-easier-to-enter",
          title: "3. Make the work easier to enter",
          body: [
            "You have put the phone down. Now the proposal is still waiting.",
            "This is the moment many productivity tips ignore. Removing the distraction does not automatically make the real task appealing.",
            "Perhaps you do not know how the proposal should begin. Maybe you are worried that the client will reject it. Perhaps the project has grown so large that opening the document makes you feel behind before you have written a word. So your brain looks for relief. The phone happens to be the closest exit.",
            "Research on procrastination has repeatedly connected delay with task aversiveness—how unpleasant, confusing, or intimidating a task feels. Procrastination can offer short-term mood relief, even when it creates a larger problem for your future self. [Read about task aversiveness](https://doi.org/10.1016/S0191-8869(99)00091-4) and [short-term mood repair](https://doi.org/10.1111/spc3.12011).",
            "Before blaming yourself for scrolling, ask: 'What am I trying not to feel about this task?' The answer may be boredom, confusion, fear, resentment, or simple tiredness. Naming the feeling will not complete the work, but it can show you what kind of entrance you need.",
            "If the task feels confusing, define the next visible action. If it feels too large, reduce the amount you are asking yourself to complete. If it feels intimidating, give yourself permission to produce a rough first attempt.",
            "'Finish the proposal' is not an entrance. 'Open the proposal, read the last paragraph, add three section headings, and work on the first section for ten minutes' gives you somewhere to begin.",
            "The goal of those ten minutes is not to finish. It is to cross the distance between avoiding the task and being inside it. Before your next break, leave yourself a return note such as, 'Next: add the price comparison beneath the second heading.' Returning will no longer require you to understand the entire project again."
          ],
          callout: "If the work feels too heavy to approach, do not wait for motivation. Make the entrance smaller."
        },
        {
          id: "when-you-are-already-trapped",
          title: "What to do when you are already trapped in the feed",
          body: [
            "Sometimes you notice the problem only after 40 minutes have disappeared. Do not spend the next ten minutes insulting yourself. That simply makes returning to work feel worse."
          ],
          listIntro: "Use this reset:",
          list: [
            "Close the application completely.",
            "Put the phone beyond arm's reach.",
            "Say what you intended to be doing.",
            "Write down the smallest visible action.",
            "Work on it for ten minutes."
          ],
          afterList: [
            "For example: 'I intended to prepare tomorrow's presentation. The next action is to open the deck and name the first three slides.' Then begin before your mind starts another debate.",
            "You are not trying to rescue the entire day in one dramatic burst. You are rescuing the next ten minutes."
          ]
        },
        {
          id: "build-a-boundary-that-fits-your-life",
          title: "You do not need to become unreachable",
          body: [
            "Not everyone can turn off their phone for hours. You may care for someone who needs to reach you. Your team may rely on you. Your work may happen through the same device that distracts you.",
            "Build a boundary that matches your actual life. Allow calls from important contacts while silencing application notifications. Block one feed rather than the entire internet. Work for 25 minutes instead of two hours. Tell your team when you will check messages again.",
            "The best boundary is not the strictest one. It is the one you can trust yourself to use repeatedly."
          ]
        },
        {
          id: "a-better-way-to-measure-progress",
          title: "A better way to measure progress",
          body: [
            "Do not ask whether you avoided every unnecessary scroll today. Ask whether you noticed when scrolling stopped being useful, created at least one protected period for real work, and returned to the task more quickly than you normally would.",
            "The habit changes each time you interrupt the loop.",
            "Some days, you will catch yourself before opening the application. Other days, you will catch yourself after half an hour. Both moments still offer the same choice: continue moving through a feed without an ending, or return to one small piece of work that can actually move your life forward.",
            "Your phone does not have to disappear. It just should not decide what deserves your day."
          ],
          callout: "Make the scroll less convenient. Give it an ending. Make the work easier to enter."
        },
        {
          id: "common-questions-about-doomscrolling",
          title: "Common questions about doomscrolling",
          body: [
            "Why do I doomscroll when I have important work to do? Doomscrolling can provide immediate relief from work that feels difficult, uncertain, boring, or emotionally uncomfortable. The feed is easy to enter and offers continuous novelty, while the work may require effort before providing any reward.",
            "How can I stop doomscrolling immediately? Close the application, place your phone out of reach, and define one small action you can complete in ten minutes. If you repeatedly reopen the application, temporarily block it or disable mobile internet during the work period.",
            "Does turning my phone to grayscale reduce scrolling? Experimental research suggests that grayscale can reduce screen time by making the phone less visually attractive. It is best treated as a small piece of environmental friction, not a complete solution.",
            "Should I stop following the news? Not necessarily. Choose a small number of trustworthy sources and check them during a planned window. The objective is intentional consumption rather than complete avoidance."
          ]
        }
      ]
    },
    {
      slug: "how-to-get-work-done-when-you-have-too-much-to-do",
      title: "4 Ways to Get Real Work Done When You Already Have Too Much to Do",
      dek: "Four practical ways to stop reacting, decide what matters, and make meaningful progress without working yourself into the ground.",
      metaDescription: "Discover four practical ways to get real work done when you have too much to do: reset the overload, start smaller, protect focus, and negotiate trade-offs.",
      category: "Guides",
      date: "August 30, 2026",
      readTime: "7 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/overloaded-work/cover.png?v=20260830-textless",
      socialImage: "/assets/images/blog/overloaded-work/cover.png?v=20260830-textless",
      cardImageAlt: "Overlapping browser tasks becoming four clear steps that lead to today's most important task",
      lead: [
        "It is 9:07 in the morning. You open your laptop with good intentions, see three messages marked urgent, remember the report you did not finish yesterday, and notice the tab for the course you promised yourself you would continue.",
        "So you answer one message. Then another. You check the report, jump into a meeting, return to your inbox, and spend the rest of the day moving quickly. By evening, you are tired—but the work that mattered most is still waiting.",
        "If that feels familiar, the problem is probably not laziness. You are trying to make decisions while carrying too many open commitments in your head.",
        "When you already have too much to do, the answer is not to become faster at doing everything. It is to reduce the number of things competing for this moment, choose one useful result, and make starting it easy."
      ],
      sections: [
        {
          id: "quick-answer",
          title: "The short answer",
          body: [
            "When you have too much to do, stop reacting for 20 minutes. Write down every open commitment, separate real consequences from noise, remove or renegotiate work that does not fit, choose one meaningful outcome for today, and give it a protected place on your calendar. Then define the first action so clearly that you can begin without another decision.",
            "That small reset will not make the workload disappear. It will stop the workload from deciding your day for you."
          ],
          callout: "You do not need to finish everything today. You need to know what deserves today."
        },
        {
          id: "why-busy-days-produce-so-little",
          title: "Why a busy day can still produce so little",
          body: [
            "An overloaded day makes every request feel equally important. It is not. Research on the [mere urgency effect](https://academic.oup.com/jcr/article-abstract/45/3/673/4847790) found that people often choose urgent tasks over more important ones—even when the urgent task has a smaller payoff.",
            "Switching constantly has a cost too. When you leave one unfinished task for another, part of your attention can remain stuck on the first one. Researchers call this [attention residue](https://www.sciencedirect.com/science/article/pii/S0749597809000399). In ordinary language: your hands have moved to the next task, but a piece of your mind has not.",
            "This is why doing a little of twelve things can feel exhausting while creating very little progress. The goal is not to squeeze more activity into the day. It is to create fewer, cleaner decisions."
          ]
        },
        {
          id: "the-20-minute-overload-reset",
          title: "1. Reset the overload before you do more",
          body: [
            "Imagine pausing that frantic morning before answering the next message. Take a sheet of paper, open a plain note, or use whatever task tool you already trust. Set a timer for 20 minutes."
          ],
          listType: "ol",
          listIntro: "Then work through these four steps:",
          list: [
            "Capture for five minutes. Write down every promise, task, worry, follow-up, and half-finished job. Do not organise yet. Your first job is to stop using your memory as a storage room.",
            "Question the list for five minutes. For each item, ask: What happens if this waits? Who is affected? Is the deadline real, assumed, or self-imposed? A task with no meaningful consequence may not deserve today.",
            "Match the work to reality for five minutes. Look at the hours you actually have after meetings, care work, meals, and rest. If the work does not fit, choose what to delay, decline, delegate, shorten, or renegotiate. A crowded calendar cannot be repaired by optimism.",
            "Choose today's win for five minutes. Complete this sentence: If only one useful thing moves forward today, it will be ____. Pick an outcome, not a vague activity. 'Send the proposal' is clearer than 'work on proposal.'"
          ],
          afterList: [
            "Planning also helps your mind release unfinished work. In one set of studies, making a specific plan reduced the mental interference caused by uncompleted goals. You can read the [research on plan-making and unfinished goals](https://pubmed.ncbi.nlm.nih.gov/21688924/) if you want to explore why this works."
          ]
        },
        {
          id: "make-the-first-step-almost-too-easy",
          title: "2. Make the first step almost too easy",
          body: [
            "A task such as 'finish the presentation' still asks your brain to solve several problems before it can begin. Which file? Which section? What does finished mean? That uncertainty creates friction.",
            "Shrink the entry point until it looks almost boring: 'Open the client deck and write the three slide headings.' Once you begin, the next step is easier to see.",
            "Now give the action a time and place: 'At 10:00, after this call, I will close my inbox, open the client deck, and write the three headings.' Psychologists call this an implementation intention. A large review of the evidence found that these [if-then plans can improve goal achievement](https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes).",
            "You are not trying to feel motivated first. You are removing the decisions that normally stand between you and the start."
          ]
        },
        {
          id: "build-a-short-runway-for-focus",
          title: "3. Build a short runway for focused work",
          body: [
            "You do not need a perfect two-hour morning routine. Start with one protected block of 25 to 45 minutes.",
            "Put the block on your calendar. Open only what the task needs. Silence the one interruption most likely to pull you away. Keep a small 'not now' note nearby; when another thought appears, park it there instead of following it.",
            "If you must stop before the work is done, leave yourself a return note: 'Next: compare the two price options and write the recommendation.' Research suggests that a [ready-to-resume plan](https://pubsonline.informs.org/doi/abs/10.1287/orsc.2017.1184) can make it easier to switch away without carrying as much unfinished work into the next task.",
            "The point is not heroic concentration. It is making your return cheap. When the right file, page, and next action are easy to find, you spend less energy reconstructing your intention."
          ]
        },
        {
          id: "protect-your-plan-with-a-simple-script",
          title: "4. Protect your plan by making trade-offs visible",
          body: [
            "New work will still arrive. Instead of accepting it silently and hoping the day stretches, make the trade-off visible.",
            "Try saying: 'I can take this on. I am currently finishing the proposal for 3 PM. Which should come first?' Or: 'I cannot finish both well today. I can send a shorter version by 4 PM or the complete version tomorrow morning. Which is more useful?'",
            "That is not being difficult. It is honest planning. When everything is called a priority, ask the person assigning the work to choose the consequence with you."
          ],
          callout: "A new yes should come with a clear decision about what moves."
        },
        {
          id: "when-the-problem-is-bigger-than-productivity",
          title: "When the problem is bigger than productivity",
          body: [
            "Sometimes the list is not disorganised; it is simply too large. No morning routine can make one person sustainably do the work of three.",
            "If you regularly work late, cannot recover after rest, miss important tasks despite careful planning, or face more fixed commitments than available hours, treat that as a capacity problem. Bring evidence to the conversation: the work requested, the time available, the likely trade-offs, and your recommendation about what should pause.",
            "A useful sentence is: 'Here is what fits this week, here is what does not, and here is the order I recommend.' Productivity should help you use your capacity well. It should not teach you to ignore your limits."
          ]
        },
        {
          id: "a-gentler-way-to-end-the-day",
          title: "A gentler way to end the day",
          body: [
            "At the end of the day, do not judge yourself by the number of boxes you touched. Ask three questions: What moved? What did I learn? What is the next visible action for tomorrow?",
            "Then close the loop. Record the next step, save the place where the work continues, and let the rest of the list wait in a system you trust.",
            "Tomorrow may still be full. But it will not have to begin with twelve competing voices. It can begin with one clear return."
          ],
          callout: "Less reacting. Fewer open loops. One meaningful piece of progress at a time."
        },
        {
          id: "common-questions",
          title: "Common questions when you feel overwhelmed",
          body: [
            "Where should I start when everything feels important? Start with consequences. Choose the task whose delay creates the most meaningful harm—or whose completion unlocks the most useful progress.",
            "How many priorities should I have today? Keep one main outcome and, if capacity allows, one or two smaller commitments. A list of ten priorities is still just a list.",
            "What if urgent requests keep interrupting me? Ask who is affected, what the real deadline is, and what should move if you accept the request. Genuine emergencies survive those questions; manufactured urgency usually becomes negotiable."
          ]
        }
      ]
    },
    {
      slug: "meet-luzora-return-to-what-matters",
      title: "Meet Luzora: The tool that brings you back to what matters",
      dek: "Luzora turns intentions into actions by helping you return to the right place, with the right context, when it is time to follow through.",
      metaDescription: "Meet Luzora, the tool that helps you return to the right place at the right time, follow through on what matters, and build consistency with The Hive.",
      category: "Announcements",
      date: "August 24, 2026",
      readTime: "8 min read",
      author: "Luzora Team",
      cardImage: "/assets/images/blog/introducing-luzora/cover.webp",
      socialImage: "/assets/images/blog/introducing-luzora/cover.webp",
      cardImageAlt: "Luzora, the hive of consistency",
      coverImage: {
        src: "/assets/images/blog/introducing-luzora/cover.webp",
        alt: "Luzora, the hive of consistency",
        width: 2000,
        height: 1067
      },
      lead: [
        "You open a page because something on it matters.",
        "A course you want to finish. A portfolio you need to review. An invoice you should send. A market you want to check before making a decision.",
        "Then life continues. Another tab opens. A message arrives. The page disappears into the rest of your browser, and the thing you meant to do becomes one more intention waiting for the right moment.",
        "Luzora was built for that moment."
      ],
      sections: [
        {
          id: "what-luzora-is",
          title: "What Luzora is",
          image: {
            src: "/assets/images/blog/introducing-luzora/what-luzora-is.webp",
            alt: "What you need to do, where you need to do it, and when you need to return",
            width: 2000,
            height: 1067
          },
          body: [
            "Luzora is a tool that turns intentions into actions.",
            "It helps you save what you need to do, where you need to do it, and when you need to return. When the time comes, Luzora brings the task and its context back into view so you can act instead of trying to reconstruct what you meant earlier.",
            "That distinction matters. A reminder can tell you to review your portfolio. Luzora can bring you back to the portfolio you meant to review. A calendar can tell you to continue your course. Luzora can return you to the course page where you stopped.",
            "Today, Luzora lives as a Chrome extension because so much of modern work already happens in the browser. Over time, we plan to bring that same experience to mobile and integrated desktop products. The form may change. The purpose will not."
          ],
          callout: "Save the place. Keep the intention. Return when it matters."
        },
        {
          id: "luzora-for-finance",
          title: "Luzora for finance",
          image: {
            src: "/assets/images/blog/introducing-luzora/finance.webp",
            alt: "A Luzora finance task to review an eToro portfolio every Friday",
            width: 2000,
            height: 1067
          },
          body: [
            "Money rarely needs your attention every minute. It needs your attention at the right time.",
            "You may want to review your portfolio every Friday, check a subscription before its trial ends, pay an invoice on a particular date, or return to a budgeting sheet at the end of the month. The intention is clear when you make it. The difficult part is arriving at the right page when the moment comes.",
            "With Luzora, the task stays connected to its destination. When it is time to review, pay, cancel, or compare, you are not starting with a search. You are returning to the work."
          ]
        },
        {
          id: "luzora-for-study",
          title: "Luzora for study",
          image: {
            src: "/assets/images/blog/introducing-luzora/study.webp",
            alt: "A Luzora study task to continue an Udemy course every weekday at 8am",
            width: 2000,
            height: 1067
          },
          body: [
            "Most people do not abandon a course because they stopped caring about the subject. The course simply loses the fight for attention.",
            "The lecture is in one tab. The reading list is somewhere else. The assignment portal has another login. By the time you remember, you have to find everything again, and that small amount of friction is enough to postpone the session.",
            "Luzora gives study a place and a rhythm. Save the lecture, reading, research page, or practice platform. Choose when you want to return. Then let the next session begin where the last intention left off."
          ]
        },
        {
          id: "luzora-for-web3",
          title: "Luzora for Web3",
          image: {
            src: "/assets/images/blog/introducing-luzora/web3.webp",
            alt: "A Luzora Web3 task connected to a Polymarket prediction market",
            width: 2000,
            height: 1067
          },
          body: [
            "Web3 moves quickly, but useful participation is not the same as watching everything all day.",
            "You may need to revisit a governance proposal before voting closes, check a position at a set time, return to a research thread, or review a prediction market before an event. These are time-sensitive actions attached to specific destinations.",
            "Luzora helps you step away without losing the thread. Save the exact place, set the moment that matters, and return with the context intact."
          ]
        },
        {
          id: "luzora-for-administration",
          title: "Luzora for administration",
          image: {
            src: "/assets/images/blog/introducing-luzora/administration.webp",
            alt: "A Luzora administration task to follow up on an email twice weekly",
            width: 2000,
            height: 1067
          },
          body: [
            "Administration is full of small tasks that carry real consequences.",
            "Follow up on an email. Send the invoice. Submit the form. Check whether the application changed. Review the document before Friday. None of these tasks is especially complicated. They are simply easy to miss while more urgent things are making noise.",
            "Luzora keeps those promises visible and connected to the place where you can complete them.",
            "The examples change from one person to another, but the pattern stays the same. A designer can return to a client board. A recruiter can revisit a candidate profile. A trader can review a chart. A student can continue a lesson. A founder can follow up on a proposal.",
            "Luzora does not decide what matters for you. It helps you return to what you already decided matters."
          ]
        },
        {
          id: "meet-the-hive",
          title: "Meet The Hive",
          image: {
            src: "/assets/images/blog/introducing-luzora/meet-the-hive.webp",
            alt: "Members of The Hive gathered around a Luzora podium",
            width: 2000,
            height: 1067
          },
          body: [
            "Luzora is the tool. The Hive is the community growing around it.",
            "The Hive is for people who are trying to become more consistent in whatever they care about. Not people pretending to have perfect routines. People who miss days, return, learn, and keep building.",
            "We are creating Luzora with that community, not merely presenting a finished product to it. Members test ideas, share how they work, take part in activities, challenge one another, and help us understand where follow-through breaks down in real life.",
            "The Hive is built on a simple belief: productivity should bring you back to the things that benefit you. It should not turn your life into an endless list of things to optimise."
          ]
        },
        {
          id: "what-are-hive-points",
          title: "What are Hive Points?",
          image: {
            src: "/assets/images/blog/introducing-luzora/hive-points.webp",
            alt: "A Hive Point token and a reward of 100 HP",
            width: 2000,
            height: 1067
          },
          body: [
            "Hive Points, or HP, are a measure of contribution inside The Hive.",
            "They recognise three kinds of value: value to yourself, value to other people, and value to Luzora. Showing up for a challenge can create value for you. Helping another member can create value for someone else. Testing a feature or sharing useful feedback can create value for the product we are building together.",
            "Hive Points are not money, and they are not a cryptocurrency. They are a visible record of participation, effort, and contribution in the community.",
            "Before the official launch of Luzora, The Hive will run contests, conquests, and community activities that give members opportunities to earn HP and move up the leaderboard. Before launch, we will recognise and award the top members who helped make the community and the product stronger.",
            "The leaderboard is not there to reward noise. It is there to make meaningful contribution visible."
          ]
        },
        {
          id: "return-to-what-matters",
          title: "Return to what matters",
          image: {
            src: "/assets/images/blog/introducing-luzora/return-to-what-matters.webp",
            alt: "The Luzora symbol on a yellow background",
            width: 2000,
            height: 1067
          },
          body: [
            "Luzora begins with a practical problem. We mean to do things, but the right place and the right moment rarely meet on their own.",
            "We are building the tool that brings them together.",
            "For the course you want to finish. The money you want to manage better. The work you need to follow up on. The research you want to revisit. The habit you are tired of restarting from zero.",
            "You already know what matters to you. Luzora helps you get back to it."
          ],
          callout: "Save the site. Show up on time."
        }
      ]
    },
    {
      slug: "luzora-v1-0-6-faster-safer-smarter",
      title: "Luzora v1.0.6 is live: Faster, safer, and smarter",
      dek: "A faster Home experience, Dynamic Context Preview, task search, safer bulk actions, stronger sync, and smarter capture make it easier to keep moving.",
      metaDescription: "See what is new in Luzora v1.0.6, including Dynamic Context Preview, faster Home loading, task search, safe bulk deletion, stronger sync, smarter capture, and more reliable reminders.",
      category: "Product update",
      date: "August 11, 2026",
      readTime: "8 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/social/luzora-v1-0-6-product-update.png",
      socialImage: "/assets/brand-kit/social/open-graph/luzora-v1-0-6-product-update-og.png",
      cardImageAlt: "A Luzora browser task interface surrounded by reminder, calendar, progress, and return symbols",
      lead: [
        "Luzora v1.0.6 is now live.",
        "This release makes Luzora faster, safer, and easier to use when your task list grows or you move between browsers and sessions.",
        "Home gets you to today's work sooner. Dynamic Context Preview shows what Luzora understands while you type. Search and bulk actions make a long task list easier to manage. Behind the interface, stronger sync and reminder systems protect the work you have already saved.",
        "The result is a release built to help you capture what matters quickly, find it again easily, and trust that it will still be there when you return."
      ],
      sections: [
        {
          id: "home-gets-you-moving-faster",
          title: "Home gets you moving faster",
          body: [
            "Opening Luzora should not make you wait for work that is not yet on screen. Version 1.0.6 changes the startup path so today's tasks render first while adjacent days prepare in the background.",
            "Cached state can appear before slower browser capability checks finish, and the natural-language engine now loads only when Add Task, Edit Task, or Luzora Bolt actually needs it."
          ],
          listType: "ul",
          listIntro: "That means:",
          list: [
            "Today's tasks appear before off-screen days finish loading",
            "Add Task can paint immediately while language processing prepares",
            "Date and time formatting work is reused instead of repeated",
            "Draft changes are grouped into fewer storage writes"
          ],
          afterList: [
            "The published extension remains compact at about 1.29 MiB, even with the new features and reliability work in this release."
          ]
        },
        {
          id: "dynamic-context-preview-shows-what-luzora-understands",
          title: "Dynamic Context Preview shows what Luzora understands",
          body: [
            "Start typing a task and Luzora now reveals the details it captures as editable chips. The preview stays quiet until there is something useful to show, so an empty draft remains focused.",
            "Attach stays fixed on the left for adding details, while captured folder, link, schedule, date, time, countdown, and reminder context appears beside it. Existing chips can still be edited or removed."
          ],
          afterList: [
            "Full links and long reminder schedules now open in accessible tooltips anchored to the relevant chip, without clipping outside the popup."
          ]
        },
        {
          id: "find-and-manage-the-right-tasks",
          title: "Find and manage the right tasks",
          body: [
            "A growing task list should become easier to use, not harder to scan. Version 1.0.6 adds a fixed search field to Task List and keeps matching results organised under Active Tasks and Ended Tasks."
          ],
          listType: "ul",
          listIntro: "Search now covers:",
          list: [
            "Task names",
            "Projects and folders",
            "Schedule text",
            "Active or ended status"
          ],
          afterList: [
            "You can also select and delete several active or ended tasks at once. A clear confirmation step protects against accidental removal, and bulk deletion preserves completion history, consistency, and streaks."
          ]
        },
        {
          id: "sync-that-protects-a-growing-history",
          title: "Sync that protects a growing history",
          body: [
            "The most important reliability work is often the work you should never have to notice. Luzora now retrieves large task histories in stable pages instead of stopping at an older row limit.",
            "Account-specific caches preserve local-first work when you sign out and back in. Incomplete remote responses can no longer be treated as a complete account and used to remove locally cached tasks."
          ],
          listType: "ul",
          listIntro: "The new sync path also:",
          list: [
            "Loads tasks, projects, completions, and versions in stable 1,000-row pages",
            "Merges remote results without deleting work missing from a partial response",
            "Replaces temporary local IDs as soon as remote creation succeeds",
            "Orders storage writes so older state cannot overwrite newer work"
          ]
        },
        {
          id: "smarter-capture-with-more-control",
          title: "Smarter capture with more control",
          body: [
            "Natural-language capture now handles more of the shorthand people use in real tasks. Year and month abbreviations are interpreted more carefully, incomplete reminder phrases stay undecided while you are still typing, and reminder clauses no longer hide useful project, link, date, or time context that follows them."
          ],
          listType: "ul",
          listIntro: "Chip controls are more predictable too:",
          list: [
            "Removing an automatically captured chip dismisses only that value",
            "The next eligible date, time, reminder, or platform can still be captured",
            "Month shorthand such as 3 mons is understood without confusing Mon with Monday",
            "Year shorthand works after digits or number words"
          ],
          afterList: [
            "The deterministic one-million-description benchmark completed with 1,000,000 exact synthetic-context passes and zero failures."
          ]
        },
        {
          id: "reliable-navigation-and-reminders",
          title: "Reliable navigation and reminders",
          body: [
            "Home day navigation now moves one day at a time immediately. From Today, the left arrow opens Yesterday and the right arrow opens Tomorrow, making the direction of travel predictable.",
            "Reminder scheduling is more efficient as well. Exact alarms still deliver time-sensitive reminders, while recovery work now wakes Luzora near the next known event instead of polling every minute. Badge refresh follows the next local day boundary and still responds immediately to task or storage changes."
          ],
          afterList: [
            "Notification recovery and background scheduling received additional reliability work so delayed browser wake-ups are handled more safely."
          ]
        },
        {
          id: "tested-before-publication",
          title: "Tested before publication",
          body: [
            "Version 1.0.6 was validated before publication with 205 automated regression tests and the one-million-description natural-language benchmark.",
            "The published Chrome Manifest V3 package contains 131 runtime files, supports English, Spanish, and Simplified Chinese, and adds no new required host permission. Website access remains optional."
          ],
          afterList: [
            "Development-only files, test suites, package sources, and internal handoff documents are not included in the published extension."
          ]
        },
        {
          id: "keep-what-matters-in-sight",
          title: "Keep what matters in sight",
          body: [
            "Luzora v1.0.6 improves the whole path from capturing a browser task to finding it again, syncing it safely, and receiving the reminder that brings you back.",
            "Update to v1.0.6 and keep the things that matter in sight."
          ]
        }
      ]
    },
    {
      slug: "luzora-v1-0-5-return-to-the-right-page",
      title: "Luzora v1.0.5: Return to the Right Page at the Right Time",
      dek: "Smart Return, Auto Return, richer reminders, live countdowns, and better natural-language scheduling make browser tasks far more precise.",
      metaDescription: "See what is new in Luzora v1.0.5, including Smart Return, Auto Return, live countdowns, multiple reminders, improved scheduling, and more reliable browser tasks.",
      category: "Product update",
      date: "August 1, 2026",
      readTime: "10 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/social/luzora-v1-0-5-product-update.png",
      cardImageAlt: "A browser task, reminder bell, calendar, countdown, and return arrow representing the Luzora v1.0.5 product update",
      lead: [
        "Luzora v1.0.5 is built around one question: when the moment arrives, can Luzora return you to exactly what matters without making you retrace your steps?",
        "With this release, the answer gets much closer to yes.",
        "Version 1.0.5 was submitted to the Chrome Web Store on Tuesday, July 28. It introduces Smart Return and Auto Return, expands the ways Luzora understands schedules and reminders, and makes creating and managing browser tasks feel more focused.",
        "The theme of this release is simple: return to the right task, page, and context at the right time."
      ],
      sections: [
        {
          id: "smart-return-remembers-the-work",
          title: "Smart Return remembers the work behind the URL",
          body: [
            "A URL does not always tell the whole story. Some web tools use one address for many internal views, which means reopening the saved link may not restore what you were actually doing.",
            "TradingView made this problem clear. A trader may analyse XAUUSD, change the interval, select a chart layout, and plan to return later. Saving only the generic TradingView address can bring them back to the platform while losing the chart context that made the task useful.",
            "Smart Return solves this by letting Luzora understand provider-specific page context. TradingView is the first completed adapter."
          ],
          listType: "ul",
          listIntro: "Luzora can now remember:",
          list: [
            "The selected market or trading pair",
            "The chart interval or timeframe",
            "The active chart layout",
            "The captured page and resource label"
          ],
          afterList: [
            "When the task opens, Luzora reconstructs the intended destination instead of returning to a generic chart.",
            "We also built Smart Return as a provider-neutral adapter system. TradingView is the beginning, not a one-off. Other browser tools can receive their own context adapters as we learn what each workflow needs."
          ]
        },
        {
          id: "auto-return-brings-the-page-back",
          title: "Auto Return brings the page back when it is time",
          body: [
            "Auto Return is an optional preference for timed tasks with a destination.",
            "Ten seconds before an eligible task is due, Luzora displays a compact countdown notch over the current webpage. It tells you where you are returning and gives you a moment to decide what should happen next."
          ],
          listType: "ul",
          listIntro: "You stay in control throughout the countdown:",
          list: [
            "Close notch hides the visual while preserving the scheduled return",
            "Cancel stops the automatic redirect without cancelling the normal reminder",
            "Go now opens the task immediately",
            "Letting the countdown reach zero returns you automatically and keeps the ordinary reminder"
          ],
          afterList: [
            "Auto Return checks for an existing matching tab first. If one exists, Luzora focuses it without an unnecessary reload. If the page is not open, Luzora creates a new tab rather than replacing the unrelated page you are using.",
            "The notch can follow you as you browse during the countdown, and Luzora can bring the browser forward when another desktop application is in focus."
          ]
        },
        {
          id: "natural-language-understands-the-complete-instruction",
          title: "Natural language understands more of the complete instruction",
          body: [
            "Scheduling is rarely expressed in one perfect format. People say today, tomorrow, at 7, every three hours, Monday to Friday, twice weekly, or remind me three months before. Luzora now uses more of the complete description before deciding which words describe the action, time, recurrence, reminder, destination, or boundary.",
            "One-time tasks are now the default unless the user clearly asks for recurrence. A time on its own creates one future occurrence, not an accidental daily task. Bare hours without AM or PM resolve to the next reasonable future time."
          ],
          listType: "ul",
          listIntro: "The updated parser also supports:",
          list: [
            "Readable Today and Tomorrow date chips",
            "Weekday lists and ranges such as Monday to Friday",
            "Boundaries such as till Friday and till Friday next week",
            "Occurrence counts such as twice weekly",
            "Every-N schedules across minutes, hours, days, weeks, months, and years",
            "Fixed interval schedules and schedules that restart after completion",
            "Common spelling mistakes without altering URLs, email addresses, or handles",
            "More precise product identities, such as Google Meet instead of generic Google"
          ],
          afterList: [
            "Preview chips now show only the context Luzora captured. Hidden defaults stay hidden until the user actually states them."
          ]
        },
        {
          id: "reminders-from-seconds-to-years",
          title: "Reminders now stretch from seconds to years",
          body: [
            "Some tasks need a single alert. Others need a sequence of reminders before one important event.",
            "A passport renewal five years from now can carry reminders three months, two months, and one month before the due date. A meeting can remind you five minutes beforehand and again when it begins."
          ],
          listType: "ul",
          listIntro: "Version 1.0.5 adds:",
          list: [
            "Multiple reminders on one task",
            "Offsets in seconds, minutes, hours, days, months, and years",
            "Calendar-aware month calculations for distant events",
            "Years on distant date chips",
            "Compact purple reminder chips with full details in a tooltip",
            "A separate alert at the actual task time"
          ],
          afterList: [
            "Relative phrases such as in 10 seconds or in 36 hours now create countdown tasks instead of misleading clock times. The countdown starts when the task is saved, displays only the units it needs, and changes to Due at zero.",
            "Recurring intervals cannot run more frequently than every 30 seconds, but one-time countdowns can still be shorter. If several interval occurrences are missed, Luzora surfaces only the most recent one."
          ]
        },
        {
          id: "projects-keep-related-work-together",
          title: "Projects keep related work and destinations together",
          body: [
            "Projects now behave more like useful destination containers and less like simple labels.",
            "Recognised websites receive the correct project name and favicon. A project website becomes the default destination for its tasks, while a task-specific link can override that destination for only the task that needs it.",
            "Add Current website captures the page URL, name, favicon, and available context. Using it on a subtask does not overwrite the shared project."
          ],
          afterList: [
            "Editing one task can now restore the active group of related project tasks. You can add, edit, or remove them together while natural-language capture continues to work. The current task stays prominent, sibling drafts dim, and inactive chips collapse into a cleaner single row."
          ]
        },
        {
          id: "faster-navigation-and-keyboard-workflows",
          title: "Faster navigation and keyboard workflows",
          body: [
            "Luzora should feel quick enough to use without breaking your train of thought. This release brings smoother day navigation, better folder controls, and faster creation and editing shortcuts."
          ],
          listType: "ul",
          listIntro: "You can now:",
          list: [
            "Swipe, drag, or use the arrow buttons to move between days",
            "Press Shift + Enter to add another task draft",
            "Press Shift + Delete to remove the focused draft",
            "Press Ctrl/Cmd + Enter to save a new or edited task",
            "Press Esc on Add Task to return Home without closing Luzora",
            "Rename a folder with immediate focus and selected text"
          ],
          afterList: [
            "Luzora Bolt can also be triggered on any eligible page, even if that website is already connected to another task. It captures safe page context to prepare an editable suggestion while avoiding private form controls and protected browser pages."
          ]
        },
        {
          id: "reminders-you-can-trust",
          title: "Reminders you can trust",
          body: [
            "A reminder product is only useful when its timing and state are dependable, so v1.0.5 includes important reliability work behind the interface."
          ],
          listType: "ul",
          listIntro: "The release improves how Luzora handles:",
          list: [
            "Delayed browser wake-ups and missed interval checks",
            "Deleted, completed, and paused tasks",
            "Several reminders that occur on the same day",
            "Durable countdown deadlines across extension restarts",
            "Duplicate notifications across browsers signed into the same account",
            "Offline and temporary network failures"
          ],
          afterList: [
            "The active or most recently active Luzora browser takes responsibility for desktop reminders, reducing duplicate alerts across devices. Stale recovery can no longer recreate a deleted task or keep its notifications alive."
          ]
        },
        {
          id: "control-and-privacy-remain-part-of-the-design",
          title: "Control and privacy remain part of the design",
          body: [
            "Auto Return is off by default. Website access is optional and requested only when the user enables the feature.",
            "The countdown notch runs in an isolated environment. Task content is inserted safely, the webpage never receives the destination URL, and the service worker revalidates the destination before navigation.",
            "Natural-language interpretation happens locally in the extension. Product analytics excludes task titles, URLs, project names, folders, email addresses, passwords, tokens, and other sensitive task context."
          ],
          afterList: [
            "Protected browser pages cannot display the Auto Return notch, TradingView is currently the first specialised Smart Return adapter, and recurring intervals cannot be shorter than 30 seconds. These boundaries keep the feature predictable while we expand it carefully."
          ]
        },
        {
          id: "save-the-page-keep-the-context",
          title: "Save the page. Keep the context. Show up when it matters.",
          body: [
            "Luzora v1.0.5 turns a saved browser task into a more complete return experience.",
            "It can understand a richer instruction, remember more than the URL, warn you before the moment arrives, and bring you back without disrupting the page you are already using.",
            "Smart Return begins with TradingView. Auto Return begins with timed tasks. Both point toward the same future: a browser that helps you return with purpose, not just another collection of tabs you meant to revisit."
          ]
        }
      ]
    },
    {
      slug: "hive-report-01-luzora-goes-public",
      title: "The Hive Report #01: Luzora Goes Public, Gets Smarter, and Learns From You",
      dek: "Luzora stepped into the public eye, shipped v1.0.4, introduced Smart Return, and learned what real users need from the browser.",
      metaDescription: "The first Hive Report covers Luzora's public launch, v1.0.4, Smart Return, community feedback, fixes, and the people helping shape the product.",
      category: "Announcements",
      date: "July 26, 2026",
      readTime: "12 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/social/hive-report-01.png?v=20260726-transparent",
      cardImageAlt: "Worker Bee surrounded by Luzora product updates, Smart Return, referral, and task editing cards",
      lead: [
        "Hello, you. Welcome to our first Hive Report. 🐝",
        "Every week, we will share what happened inside the Luzora hive. You will see what we shipped, what we fixed, what we learned, and how your feedback is helping us build a better product.",
        "This was a big week.",
        "Luzora stepped into the public eye, launched version 1.0.4, opened applications for private testing, and introduced the Manifesto to the world.",
        "We also spoke with people across trading, education, design, development, and Web3. Those conversations helped us understand one thing even more clearly:",
        "People constantly find important things online, but returning to them and following through is still harder than it should be.",
        "That is the problem Luzora is here to solve.",
        "If you signed the Manifesto, shared a post, replied to us, tested the extension, or told us about your workflow, you helped shape this week.",
        "Thank you. Now, let us show you what the hive has been working on."
      ],
      sections: [
        {
          id: "luzora-stepped-into-the-public-eye",
          title: "Luzora stepped into the public eye",
          body: [
            "This week, we officially introduced Luzora and invited people to join us early.",
            "We launched the Luzora Manifesto, opened beta access applications, and started welcoming our first private testers.",
            "Every Manifesto signer now receives a unique referral link, a personalized public page, and a downloadable Manifesto card they can proudly share."
          ],
          listType: "ul",
          listIntro: "We also added:",
          list: [
            "Live referral counts",
            "Referral attribution",
            "Share and copy actions",
            "Social verification activities",
            "Personalized Manifesto cards",
            "Better referral messaging",
            "A smoother welcome experience",
            "New mascot, product, and promotional assets"
          ],
          afterList: [
            "We also published “Referral System Is Live: Invite Your Hive” to explain how referrals work and how early supporters can help the community grow.",
            "The website received several improvements too. We updated metadata, canonical URLs, structured data, keyboard shortcut information, and search visibility.",
            "The hive now has a stronger front door."
          ]
        },
        {
          id: "luzora-v1-0-4-arrived",
          title: "Luzora v1.0.4 arrived",
          body: [
            "While Luzora was making noise in public, the extension was becoming much smarter behind the scenes.",
            "Version 1.0.4 shipped to the Web Store with major improvements to task creation, scheduling, reminders, navigation, and reliability.",
            "Luzora can now understand more natural ways of describing when work should happen."
          ],
          listType: "ul",
          listIntro: "Examples include:",
          list: [
            "Every 3 hours",
            "Monday to Friday at 3 PM",
            "Remind me 10 minutes before",
            "10 minutes after completion",
            "Come back in 30 seconds"
          ],
          afterList: [
            "We added live countdowns for seconds, minutes, and hours. We also introduced multiple reminders for important events and support for schedules based on when a task was last completed.",
            "Task creation received plenty of love too.",
            "You can now create multiple tasks more smoothly, edit tasks across an entire project, use faster keyboard controls, and work with cleaner project fields, folders, task chips, and notification messages.",
            "Luzora also became better at recognising websites, favicons, links, projects, and the real identity of the page you are using."
          ]
        },
        {
          id: "meet-smart-return",
          title: "Meet Smart Return",
          body: [
            "One of our favourite updates this week started with a conversation.",
            "During a product review, forex trader Vito showed us how he uses TradingView.",
            "He might analyse EURUSD, draw his setup, and decide to return in two hours. At the same time, he could be monitoring TRXUSDT and need to return in ten minutes.",
            "Saving the TradingView URL was not enough. Several charts can appear to share the same address, even when the selected pair, interval, layout, and analysis are different.",
            "Vito did not simply need to remember that he had a task.",
            "He needed to return to the exact chart where the task began.",
            "That insight inspired Smart Return.",
            "Luzora can now remember important TradingView context, including the selected pair, chart layout, and interval. When the reminder arrives, Luzora brings the user back to the intended analysis.",
            "We also created a reusable adapter structure so other websites and tools can receive similar contextual support in the future.",
            "One conversation uncovered an entirely new layer of the product.",
            "This is exactly why we are involving real people early."
          ]
        },
        {
          id: "what-we-fixed-on-the-website",
          title: "What we fixed on the website",
          body: [
            "Launching publicly helped us catch places where a technically successful action could still feel broken to the person using it.",
            "The Manifesto flow was our biggest example.",
            "Sometimes a signature was saved successfully, but the public card was not ready immediately. The database said everything worked. The person waiting for their card saw something very different.",
            "We rebuilt the experience to recover missing card information, keep checking while the card is being prepared, and only complete the journey when the result is ready to view."
          ],
          listType: "ul",
          listIntro: "We also:",
          list: [
            "Restored Manifesto card sharing and downloads",
            "Added better recovery and retry handling",
            "Improved copy link and copy email support across browsers",
            "Standardized our contact email as hello@luzora.app",
            "Improved the signed Manifesto layout",
            "Clarified referral messaging",
            "Added correct 404 and noindex handling for missing articles",
            "Corrected the verified data deletion timeline to no later than 30 days"
          ],
          afterList: [
            "The lesson was simple:",
            "A database success message is not the same thing as a successful human experience."
          ]
        },
        {
          id: "what-we-fixed-inside-the-extension",
          title: "What we fixed inside the extension",
          body: [
            "Reminders are only useful when people can trust them, so reliability received serious attention this week."
          ],
          listType: "ul",
          listIntro: "We fixed cases where:",
          list: [
            "Deleted tasks continued to send reminders",
            "Completed tasks still triggered notifications",
            "Missed recurring reminders fired repeatedly",
            "Browser sleep caused reminder failures",
            "Extension restarts interrupted scheduled reminders",
            "Ambiguous times such as “at 2” selected the wrong future time",
            "Daily recurrence was assumed incorrectly",
            "Timed completion history grew when only daily history was needed"
          ],
          afterList: [
            "We also improved cross device notification coordination. The active or most recently active browser can now take responsibility for delivering notifications, reducing duplicates across devices.",
            "Task links and projects became more accurate too.",
            "We fixed Google Meet being identified only as Google, prevented project links from replacing task specific links, and improved how Luzora recognises page identity.",
            "Folders also received attention. Hidden content now stays hidden when a folder is collapsed, and editing, renaming, hovering, and focusing feel more reliable.",
            "Finally, we improved remote synchronization, expired refresh token handling, missing database field recovery, and noisy offline alerts.",
            "Not every fix is flashy, but these are the improvements that make Luzora feel dependable every day."
          ]
        },
        {
          id: "context-is-the-final-boss",
          title: "Context is the final boss",
          body: [
            "One of our biggest product lessons this week came from natural language.",
            "Understanding individual words is not enough.",
            "Consider this sentence:",
            "“Every week, Monday to Friday, at 3 PM.”",
            "“Every week” is not one task. “Monday to Friday” is not another. “At 3 PM” is not a separate reminder.",
            "Together, they describe one complete schedule.",
            "Luzora must understand the whole sentence before deciding what is an action, date, time, recurrence, reminder, project, or link.",
            "That idea became one of our guiding rules this week:",
            "Context is the final boss.",
            "The better Luzora understands the full intention, the less work you have to do."
          ]
        },
        {
          id: "built-from-your-feedback",
          title: "Built from your feedback",
          body: [
            "Smart Return was not the only idea shaped by conversations this week."
          ],
          listIntro: "Your feedback also inspired:",
          listType: "ul",
          list: [
            "Better multi device reminders",
            "Project wide task editing",
            "Faster keyboard controls",
            "Appointment workflow ideas",
            "More contextual support for web applications"
          ],
          afterList: [
            "We are learning that the best feature ideas often begin with someone describing a small frustration from their normal day.",
            "Our job is to listen carefully, find the real problem underneath it, and build something useful.",
            "One of those conversations was with TimX, a senior product designer with about nine years of experience.",
            "After installing Luzora and trying it himself, he told us, “If you need any validation of Luzora importance, take my words as that validation.”",
            "Luzora exceeded his expectations. He was especially impressed by how naturally it understood his task descriptions, and he told us, “I will pay to use this.”",
            "His feedback also led to a practical improvement. You can now edit folder names directly from the Tasks page without leaving the workflow."
          ]
        },
        {
          id: "who-we-spoke-with",
          title: "Who we spoke with",
          body: [
            "This week, we connected with people whose work happens heavily inside the browser.",
            "Vito is an experienced forex trader. He helped us understand chart monitoring workflows and inspired Smart Return.",
            "Favour is a teacher and UI/UX designer. She is helping us explore online teaching, education, and design workflows.",
            "Mowo is a frontend developer. He is giving us insight into how Luzora can support developers working across documentation, deployments, tasks, and browser tools.",
            "Sanera is an active Web3 community member. She clearly explained how Luzora can help with testnets, governance, research, trading routines, and community events.",
            "TimX is a senior product designer with about nine years of experience. His first hand experience validated Luzora's importance, highlighted the strength of its natural language understanding, and helped us improve folder editing from the Tasks page.",
            "They work in different fields, but the problem is familiar.",
            "They find something important online. They intend to return. Other things demand their attention. The page disappears into browser history, bookmarks, open tabs, or memory.",
            "Luzora helps them come back and show up."
          ]
        },
        {
          id: "the-hive-is-getting-noticed",
          title: "The hive is getting noticed",
          body: [
            "Our first public week produced encouraging early results.",
            "The official beta and Manifesto announcement reached 2.1K views and received 14 replies.",
            "The founder's introduction to Luzora reached 2.2K views, with 15 likes, 4 reposts, and 6 bookmarks.",
            "Sanera's independent post about Luzora's value for Web3 users reached 9.2K views, with 41 replies and 44 likes.",
            "Together, these highlighted posts generated at least:"
          ],
          listType: "ul",
          list: [
            "13.5K displayed views",
            "57 replies",
            "63 likes",
            "5 reposts",
            "6 bookmarks"
          ],
          afterList: [
            "The official Luzora X account is now verified too. We ended the week with 63 followers and 29 posts.",
            "These are early numbers, but they tell us something important.",
            "The problem resonates.",
            "People understand what Luzora is trying to solve, and they want to see where it goes."
          ]
        },
        {
          id: "what-happens-next",
          title: "What happens next",
          body: [
            "This week gave us a stronger product, a growing community, and a clearer direction.",
            "Now we keep listening.",
            "We will continue bringing private testers into the hive, improving how Luzora understands tasks, strengthening reminder reliability, and expanding Smart Return to more browser based workflows.",
            "We will also keep sharing the process with you.",
            "The wins. The bugs. The lessons. The ideas that came from a single conversation and became something real.",
            "Luzora is being built to help you return to what matters and follow through.",
            "One webpage at a time.",
            "One task at a time.",
            "One week at a time.",
            "Thank you for being here this early. The hive is only getting started. 🐝",
            "[Apply for private testing and join the community](https://www.luzora.app).",
            "Keep buzzing. Keep showing up."
          ],
          cta: {
            label: "Sign the Luzora Manifesto",
            href: "/manifesto"
          }
        }
      ]
    },
    {
      slug: "referral-system-is-live-invite-your-hive",
      title: "Referral System Is Live: Invite Your Hive",
      dek: "You can now share your unique Luzora referral link, invite others to sign the Manifesto, and watch your Hive grow.",
      metaDescription: "The Luzora referral system is live. Sign the Manifesto, share your unique referral link, and invite your community to join the Hive.",
      category: "Announcements",
      date: "July 21, 2026",
      readTime: "4 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/social/referral-system-article-preview.png",
      cardImageAlt: "Elite Bee offering a Luzora invite beside the words Invite Your Hive",
      lead: [
        "Consistency may begin with one person, but it grows stronger when people show up together.",
        "Today, we are making that easier.",
        "The Luzora referral system is now live. Everyone who signs the Luzora Manifesto receives a unique referral link they can share with friends, teammates, and their wider community.",
        "When someone signs through your link, they become part of your Hive."
      ],
      sections: [
        {
          id: "your-invitation-to-the-hive",
          title: "Your invitation to the Hive",
          body: [
            "The Luzora Manifesto is a commitment to something simple:"
          ],
          listType: "ul",
          list: [
            "To return to what matters.",
            "To follow through on the small tasks that move life forward.",
            "To keep showing up, even when motivation changes."
          ],
          afterList: [
            "Thousands of important activities happen inside the browser. We start courses, save research, discover opportunities, open applications, find useful tools, and promise ourselves that we will return later.",
            "Too often, later never comes.",
            "Luzora is being built to change that. It turns webpages into scheduled or recurring tasks, helping you return with a clear purpose at the right time.",
            "Now, you can invite others to make that commitment with you."
          ]
        },
        {
          id: "how-the-referral-system-works",
          title: "How the referral system works",
          body: [],
          listIntro: "Getting started takes only a few steps:",
          list: [
            "Visit the [Luzora Manifesto](/manifesto).",
            "Sign the Manifesto and claim your unique Hive name.",
            "Open your signed Manifesto card.",
            "Select Share link or Copy link.",
            "Send your referral link to your community."
          ],
          afterList: [
            "When someone opens your link and signs the Manifesto, your referral count increases.",
            "You can return to your signed Manifesto card at any time to see how many Bees you have invited."
          ]
        },
        {
          id: "your-referrals-stay-connected",
          title: "Your referrals stay connected",
          body: [
            "Every referral link contains your unique Hive name. This lets Luzora remember who sent the invitation.",
            "When someone signs through your link, the referral is recorded immediately. If they create their Luzora account using the same email address, the referral remains connected when Luzora launches.",
            "They get their own Hive identity, and your growing community stays connected to you.",
            "No codes to enter. No complicated steps. Just share your link and invite people to join."
          ]
        },
        {
          id: "who-should-you-invite",
          title: "Who should you invite?",
          body: [],
          listIntro: "Invite the people who are always trying to return to something important online.",
          listType: "ul",
          list: [
            "A student working through an online course",
            "A developer keeping up with documentation",
            "A job seeker returning to applications and job boards",
            "A creator managing publishing routines",
            "A researcher reviewing saved papers",
            "A designer following project feedback",
            "A Web3 user tracking governance and community activities",
            "A friend who has far too many tabs open"
          ],
          afterList: [
            "If their browser is part of the task, Luzora is being built for them."
          ]
        },
        {
          id: "share-with-purpose",
          title: "Share with purpose",
          body: [
            "A referral is more than a number.",
            "It is an invitation to build better follow-through together. It is a way to bring people into Luzora early and give them a place in the Hive before the public launch.",
            "You do not need a huge audience. Start with one person who would genuinely benefit from remembering what to do on a webpage and returning when it matters.",
            "One thoughtful invitation is worth more than a hundred empty clicks."
          ]
        },
        {
          id: "private-testing-begins-july-28",
          title: "Private testing begins July 28",
          body: [
            "Luzora's private test begins July 28.",
            "Selected testers will get the chance to use Luzora before beta access, share feedback, help uncover issues, and shape what comes next. Active participants can also earn the Founding bee role.",
            "If you want to help build Luzora with us, [learn more about private testing](/blog/help-shape-luzora-private-testing-is-opening)."
          ]
        },
        {
          id: "invite-your-hive",
          title: "Invite your Hive",
          body: [
            "Your referral link is ready.",
            "Sign the Manifesto, claim your Hive name, and invite the people you want beside you when Luzora launches."
          ],
          cta: {
            label: "Sign the Luzora Manifesto",
            href: "/manifesto"
          }
        }
      ]
    },
    {
      slug: "help-shape-luzora-private-testing-is-opening",
      title: "Help shape Luzora: Private testing is opening",
      dek: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
      category: "Announcements",
      date: "July 18, 2026",
      readTime: "5 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/other%20assets/worker-bee-in-private-test.avif",
      cardImageAlt: "Worker Bee preparing Luzora private testing",
      sections: [
        {
          id: "what-luzora-is",
          title: "What Luzora is",
          body: [
            "Luzora is a browser extension that helps you turn any webpage into a recurring task. Instead of saving a link and hoping you remember why it mattered, you can save the page, add what you need to do, set when you want to return, and let Luzora bring it back at the right time.",
            "It is for students, researchers, designers, developers, job seekers, Web3 users, creators, and anyone whose work happens across websites.",
            "If the page is part of the task, Luzora helps you come back to it with purpose."
          ]
        },
        {
          id: "private-testing-is-opening",
          title: "We are opening private testing",
          body: [
            "Before Luzora goes public, we want to test it with people who care about consistency, focus, and finishing the small things that quietly move life forward.",
            "The private test is not just about finding bugs, although bug reports are very welcome. It is about learning how Luzora fits into real browsing habits.",
            "We want to understand where Luzora feels useful, where the experience feels confusing, what reminders people actually create, what workflows Luzora should support better, what needs to be clearer before public launch, and what features should come next.",
            "This stage is about building with real users, not guessing in silence.",
            "The Hive opens for private testing on July 28, 2026. Applications are open now and close on July 26, 2026.",
            "Apply now for a chance to test Luzora early, earn the Founding bee role, and help shape what comes before beta access."
          ]
        },
        {
          id: "who-we-are-looking-for",
          title: "Who we are looking for",
          body: [
            "We are looking for people who actively use their browser to get things done across work, study, research, building, investing, creating, or everyday follow-ups.",
            "You do not need to be technical. You only need to use the web often, have access to an extension-supported browser, and be willing to test Luzora in real life."
          ],
          list: [
            "Use a laptop browser regularly to work, study, build, apply, research, trade, design, or manage tasks.",
            "Have access to a browser that supports extensions.",
            "Save tabs because you plan to come back later.",
            "Use bookmarks but rarely revisit them.",
            "Work across tools like Notion, Gmail, GitHub, Canva, ChatGPT, YouTube, job boards, dashboards, Web3 apps, or research sites.",
            "Want a simple way to remember what to do on a specific webpage.",
            "Are willing to test early software and give honest feedback.",
            "Care about building better habits around follow-through."
          ]
        },
        {
          id: "how-to-join",
          title: "How to join the private test",
          body: [],
          listIntro: "Access to the private test will happen in these steps:",
          list: [
            "Sign the [Luzora manifesto](/manifesto).",
            "Apply to join the [Luzora Discord](https://discord.gg/saVrVzeh3) and submit the application form.",
            "Wait for our review and email response.",
            "If approved, join the private test channel with the Founding bee badge."
          ],
          afterList: [
            "The Founding bee badge gives you access to the private test channel, where you will find the test guide, setup instructions, feedback threads, and updates from the Luzora team.",
            "Applications are open now and close on July 26, 2026. Selected testers will be contacted before private testing begins on July 28, 2026."
          ]
        },
        {
          id: "what-we-expect",
          title: "What we expect from testers",
          body: [
            "Private testers are encouraged to use Luzora consistently during the test period.",
            "You do not need to be perfect. You do not need to send feedback every day. But we do want testers who are willing to actually use the product, try it in different situations, and tell us what works and what does not.",
            "To retain the Founding bee badge, testers should stay active during the test period by using Luzora, joining product discussions, reporting bugs, sharing ideas, or giving feedback when possible.",
            "The goal is simple: help us make Luzora better before the public launch."
          ]
        },
        {
          id: "why-feedback-matters",
          title: "Why your feedback matters",
          body: [
            "Luzora is still early, and early feedback has a special kind of power.",
            "A small comment can change how onboarding works. A bug report can prevent frustration for thousands of future users. A real use case can shape an entire feature. A thoughtful suggestion can help Luzora become simpler, clearer, and more useful.",
            "Your ideas, bug reports, questions, and honest reactions will help guide the next phase of Luzora's journey.",
            "We are building Luzora for people who want to return to what matters and actually follow through. If that sounds like you, we would love to have you in the Hive."
          ],
          callout: "Consistency is gold here. Come help us build it."
        }
      ]
    }
  ];

  var CARD_IMAGE = "/assets/brand-kit/logos/symbol/luzora-logo-yellow.svg";
  var CALENDAR_ICON = "/assets/icons/Interface essential/Calendar-Black.svg";
  var CLOCK_ICON = "/assets/icons/fi_clock-Black.svg";
  var SHARE_ICON = "/assets/icons/fi_share-2-Black.svg";

  function getArticleUrl(article) {
    return "/blog/" + article.slug;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function renderInline(value) {
    var source = String(value);
    var output = "";
    var pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g;
    var lastIndex = 0;
    var match;
    while ((match = pattern.exec(source)) !== null) {
      output += escapeHtml(source.slice(lastIndex, match.index));
      var label = escapeHtml(match[1]);
      var href = escapeHtml(match[2]);
      var isExternal = /^https?:\/\//.test(match[2]);
      var opensNewTab = isExternal || match[2] === "/manifesto";
      output += '<a href="' + href + '"' + (opensNewTab ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + label + "</a>";
      lastIndex = pattern.lastIndex;
    }
    output += escapeHtml(source.slice(lastIndex));
    return output.replace(/\bFounding bee\b/g, '<span class="founding-bee-badge">@Founding bee</span>');
  }

  function articleFromPath() {
    var params = new URLSearchParams(window.location.search);
    var querySlug = params.get("slug");
    var path = window.location.pathname.replace(/\/+$/, "");
    var slug = querySlug || path.split("/").filter(Boolean).pop();
    if (slug === "blog-article.html") slug = ARTICLES[0].slug;
    return ARTICLES.find(function (article) { return article.slug === slug; }) || ARTICLES[0];
  }

  function cardTemplate(article, compact) {
    var articleUrl = getArticleUrl(article);
    var cardImage = article.cardImage || CARD_IMAGE;
    var cardImageAlt = article.cardImageAlt || "";
    var hasCustomImage = Boolean(article.cardImage);
    return (
      '<article class="blog-card" data-blog-reveal data-category="' + escapeHtml(article.category) + '">' +
        '<a class="blog-card__image' + (hasCustomImage ? " blog-card__image--custom" : "") + '" href="' + articleUrl + '" aria-label="Read ' + escapeHtml(article.title) + '"><img src="' + cardImage + '" alt="' + escapeHtml(cardImageAlt) + '" /></a>' +
        '<div class="blog-card__body">' +
          '<span class="blog-pill">' + escapeHtml(article.category) + '</span>' +
          '<h3><a class="blog-card__title-link" href="' + articleUrl + '">' + escapeHtml(article.title) + '</a></h3>' +
          '<p>' + escapeHtml(article.dek) + '</p>' +
          '<div class="blog-card__meta">' +
            '<span><img src="' + CALENDAR_ICON + '" alt="" />' + escapeHtml(article.date) + '</span>' +
            '<span><img src="' + CLOCK_ICON + '" alt="" />' + escapeHtml(article.readTime.replace(" read", "")) + '</span>' +
            (compact ? "" : '<button class="blog-card__share lz-btn lz-btn--tertiary lz-btn--mode-primary lz-btn--sm lz-btn--icon" type="button" data-card-share data-share-url="' + articleUrl + '" data-share-title="' + escapeHtml(article.title) + '" data-share-text="' + escapeHtml(article.dek) + '" aria-label="Share ' + escapeHtml(article.title) + '"><img src="' + SHARE_ICON + '" alt="" aria-hidden="true" /><span class="blog-card__share-tip" role="tooltip">Share</span></button>') +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initCardShareButtons(root) {
    var buttons = Array.from((root || document).querySelectorAll("[data-card-share]"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var url = new URL(button.getAttribute("data-share-url"), window.location.origin).href;
        var title = button.getAttribute("data-share-title") || document.title;
        var text = button.getAttribute("data-share-text") || "";

        function markCopied() {
          button.classList.add("is-copied");
          var tip = button.querySelector(".blog-card__share-tip");
          if (tip) tip.textContent = "Copied";
          setTimeout(function () {
            button.classList.remove("is-copied");
            if (tip) tip.textContent = "Share";
          }, 1400);
        }

        if (navigator.share) {
          navigator.share({ title: title, text: text, url: url }).catch(function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(markCopied, markCopied);
        } else {
          markCopied();
        }
      });
    });
  }

  function revealCards() {
    var cards = Array.from(document.querySelectorAll("[data-blog-reveal]"));
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) { card.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    cards.forEach(function (card, index) {
      card.style.transitionDelay = Math.min(index * 70, 280) + "ms";
      observer.observe(card);
    });
  }

  function initBlogIndex() {
    var list = document.querySelector("[data-blog-list]");
    if (!list) return;

    var empty = document.querySelector("[data-blog-empty]");
    var searchWrap = document.querySelector("[data-blog-search]");
    var searchInput = document.querySelector("[data-blog-search-input]");
    var activeCategory = "All";
    var query = "";

    function render() {
      var filtered = ARTICLES.filter(function (article) {
        var inCategory = activeCategory === "All" || article.category === activeCategory;
        var haystack = (article.title + " " + article.dek + " " + article.category).toLowerCase();
        return inCategory && haystack.indexOf(query.toLowerCase()) !== -1;
      });
      list.innerHTML = filtered.map(function (article) { return cardTemplate(article); }).join("");
      if (empty) empty.hidden = filtered.length > 0;
      revealCards();
      initCardShareButtons(list);
    }

    document.querySelectorAll("[data-blog-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeCategory = button.getAttribute("data-blog-filter");
        document.querySelectorAll("[data-blog-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        render();
      });
    });

    var searchToggle = document.querySelector("[data-blog-search-toggle]");
    if (searchToggle && searchWrap && searchInput) {
      searchToggle.addEventListener("click", function () {
        searchWrap.hidden = !searchWrap.hidden;
        if (!searchWrap.hidden) searchInput.focus();
      });
      searchInput.addEventListener("input", function () {
        query = searchInput.value.trim();
        render();
      });
    }

    var reset = document.querySelector("[data-blog-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        activeCategory = "All";
        query = "";
        if (searchInput) searchInput.value = "";
        document.querySelectorAll("[data-blog-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item.getAttribute("data-blog-filter") === "All");
        });
        render();
      });
    }

    render();
  }

  function renderArticleImage(image, className, eager) {
    if (!image || !image.src) return "";
    var width = Number(image.width) || 2000;
    var height = Number(image.height) || 1067;
    var loading = eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"';
    return '<figure class="' + className + '"><img src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.alt || "") + '" width="' + width + '" height="' + height + '" decoding="async"' + loading + ' /></figure>';
  }

  function renderArticleBody(article) {
    // Only repository-authored article HTML is accepted here, never user input.
    if (article.bodyHtml) return article.bodyHtml;
    var cover = renderArticleImage(article.coverImage, "article-cover-image", true);
    var lead = article.lead ? '<div class="article-lead" data-article-section>' + article.lead.map(function (paragraph) {
      return "<p>" + renderInline(paragraph) + "</p>";
    }).join("") + "</div>" : "";

    return cover + lead + article.sections.map(function (section) {
      var paragraphs = section.body.map(function (paragraph) {
        return "<p>" + renderInline(paragraph) + "</p>";
      }).join("");
      var listIntro = section.listIntro ? '<p class="article-list-intro">' + renderInline(section.listIntro) + "</p>" : "";
      var listTag = section.listType === "ul" ? "ul" : "ol";
      var list = section.list ? "<" + listTag + ">" + section.list.map(function (item) {
        return "<li>" + renderInline(item) + "</li>";
      }).join("") + "</" + listTag + ">" : "";
      var afterList = section.afterList ? section.afterList.map(function (paragraph) {
        return "<p>" + renderInline(paragraph) + "</p>";
      }).join("") : "";
      var cta = section.cta ? '<p class="article-cta"><a class="article-cta-button lz-btn lz-btn--primary lz-btn--mode-brand lz-btn--md" href="' + escapeHtml(section.cta.href) + '">' + escapeHtml(section.cta.label) + "</a></p>" : "";
      var callout = section.callout ? '<p class="article-callout">' + renderInline(section.callout) + "</p>" : "";
      var image = renderArticleImage(section.image, "article-section__image", false);
      return '<section class="article-section" id="' + section.id + '" data-article-section>' + image + '<h2>' + escapeHtml(section.title) + "</h2>" + paragraphs + listIntro + list + afterList + cta + callout + "</section>";
    }).join("");
  }

  function updateArticleMetadata(article) {
    var description = article.metaDescription || article.dek;
    var canonicalUrl = "https://www.luzora.app" + getArticleUrl(article);
    var imageUrl = new URL(article.socialImage || article.cardImage || CARD_IMAGE, "https://www.luzora.app").href;

    function setMeta(selector, value) {
      var meta = document.querySelector(selector);
      if (meta) meta.setAttribute("content", value);
    }

    document.title = article.title + " | The Hive Journal";
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', article.title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', imageUrl);
    setMeta('meta[name="twitter:title"]', article.title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', imageUrl);

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);
  }

  function initArticleReveals() {
    var sections = Array.from(document.querySelectorAll("[data-article-section]"));
    if (!sections.length) return;
    if (!("IntersectionObserver" in window)) {
      sections.forEach(function (section) { section.classList.add("is-revealed"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function initShareButtons(article) {
    var share = document.querySelector("[data-share-article]");
    function copyLink() {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
      }
    }
    if (share) {
      share.addEventListener("click", function () {
        if (navigator.share) {
          navigator.share({ title: article.title, text: article.dek, url: window.location.href }).catch(function () {});
        } else {
          copyLink();
        }
      });
    }
  }

  function initPrivateTestJump(article) {
    var button = document.querySelector("[data-private-test-jump]");
    if (!button) return;

    var target = document.getElementById("how-to-join");
    if (!target || article.slug !== "help-shape-luzora-private-testing-is-opening") {
      button.hidden = true;
      return;
    }

    button.hidden = false;

    function animateScrollTo(y) {
      var start = window.scrollY || window.pageYOffset || 0;
      var distance = y - start;
      var duration = 900;
      var startedAt = null;
      var root = document.documentElement;
      var previousBehavior = root.style.scrollBehavior;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      root.style.scrollBehavior = "auto";

      requestAnimationFrame(function step(timestamp) {
        if (!startedAt) startedAt = timestamp;
        var progress = Math.min((timestamp - startedAt) / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          root.style.scrollBehavior = previousBehavior;
        }
      });
    }

    button.addEventListener("click", function () {
      var top = target.getBoundingClientRect().top + window.pageYOffset - 120;
      var y = Math.max(top, 0);
      if (typeof window.luzoraSmoothScrollTo === "function") {
        window.luzoraSmoothScrollTo(y);
      } else {
        animateScrollTo(y);
      }
    });

    function setButtonVisibility() {
      var rect = target.getBoundingClientRect();
      var isAtSection = rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120;
      var hasPassedSection = rect.bottom < 120;
      button.classList.toggle("is-hidden", isAtSection);
      button.classList.toggle("is-past-target", hasPassedSection);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          button.classList.toggle("is-hidden", entry.isIntersecting);
        });
      }, { rootMargin: "-12% 0px -52%", threshold: 0.01 });
      observer.observe(target);
    }

    setButtonVisibility();
    window.addEventListener("scroll", setButtonVisibility, { passive: true });
    window.addEventListener("resize", setButtonVisibility);
  }

  function initArticlePage() {
    var body = document.querySelector("[data-article-body]");
    if (!body) return;
    var article = articleFromPath();

    updateArticleMetadata(article);
    var title = document.querySelector("[data-article-title]");
    var dek = document.querySelector("[data-article-dek]");
    var breadcrumb = document.querySelector("[data-article-breadcrumb]");
    var date = document.querySelector("[data-article-date]");
    var read = document.querySelector("[data-article-read]");
    var author = document.querySelector("[data-article-author]");
    if (title) title.textContent = article.title;
    if (dek) dek.textContent = article.dek;
    if (breadcrumb) breadcrumb.textContent = article.title;
    if (date) date.textContent = article.date;
    if (read) read.textContent = article.readTime;
    if (author) author.textContent = article.author;

    body.innerHTML = renderArticleBody(article);

    var related = ARTICLES.filter(function (item) { return item.slug !== article.slug; }).slice(0, 3);
    var relatedList = document.querySelector("[data-related-list]");
    var relatedSection = document.querySelector(".article-related");
    if (relatedList) relatedList.innerHTML = related.map(function (item) { return cardTemplate(item, true); }).join("");
    if (relatedSection) relatedSection.hidden = related.length === 0;

    initArticleReveals();
    revealCards();
    initShareButtons(article);
    initPrivateTestJump(article);
  }

  function start() {
    initBlogIndex();
    initArticlePage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
